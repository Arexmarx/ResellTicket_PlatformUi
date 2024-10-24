import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import SideBar from "../../components/SideBar";
import { SidebarOption } from "../../config/Constant";
import useAxios from "../../utils/useAxios";
import API from "../../config/API";
import HttpStatus from "../../config/HttpStatus";
import { Avatar } from "@mui/material";

export default function ChatPage() {
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]); // State to hold messages
  const [newMessage, setNewMessage] = useState(""); // State for the new message input
  const [otherUsers, setOtherUsers] = useState([]); // State to hold other users in chat
  const [fullUserlist, setFullUserList] = useState([]);
  const [searchUser, setSearchUser] = useState(""); // Initialize as an empty string
  const [conversation, setConversation] = useState(null); // Initialize as null
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const api = useAxios();

  // Ref for auto-scrolling
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(API.User.GET_USER_INFO);
      if (response.data.httpStatus === HttpStatus.OK) {
        console.log(response.data.object);
        setUser(response.data.object);
      }
    };
    fetchData().catch(console.error);

    // Fetch other users (or chats)
    const fetchOtherUsers = async () => {
      const response = await api.get(API.User.GET_ALL_USER_BY_NAME, {
        params: { name: "" },
      });
      if (response.data.httpStatus === HttpStatus.OK) {
        setOtherUsers(response.data.object); // Assuming this returns an array of users
      }
    };
    fetchOtherUsers().catch(console.error);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && stompClient) {
      const chatMessage = {
          senderId: user.id,
          message: newMessage,
          time: new Date().toISOString(),
      };
      stompClient.send(
        `/chat/chat.sendMessage/${conversation.conversationId}`,
        {},
        JSON.stringify(chatMessage)
      ); // Send message to room
      setNewMessage(""); // Clear the input after sending
      onConnected
    }
  };

  useEffect(() => {
    if (otherUsers.length > 0) {
      if (user) {
        setFullUserList(
          otherUsers.filter((users) => users.id && users.id !== user.id)
        );
      }
    } else {
      console.log("No Users to filter.");
    }
  }, [otherUsers]);

  const handleSearchKeyDown = (value) => {
    if (value.key === "Enter") {
      if (searchUser.length > 0) {
        setFullUserList(
          otherUsers.filter((users) =>
            fullname(users.firstname, users.lastname)
              .toLowerCase()
              .includes(searchUser.toLowerCase())
          )
        );
      } else {
        if (otherUsers.length > 0) {
          if (user) {
            setFullUserList(
              otherUsers.filter((users) => users.id && users.id !== user.id)
            );
          }
        }
        console.log("No users to filter.");
      }
    }
  };

  const fullname = (firstname, lastname) => {
    return firstname + " " + lastname;
  };

  const getRoomChat = async (userChat) => {
    try {
      const chatResponse = await api.post(
        API.Chat.GET_OR_CREATE_ROOM,
        {},
        { params: { firstMemberId: user.id, secondMemberId: userChat.id } }
      );
      if (chatResponse.data.httpStatus === HttpStatus.OK) {
        console.log(chatResponse.data.object);
        setConversation(chatResponse.data.object); // Set conversation state
        connect(chatResponse.data.object.conversationId); // Connect to the WebSocket with conversation ID
        setMessages(chatResponse.data.object.messages); // Set initial messages from the chat room
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connect = (conversationId) => {
      const socket = new SockJS("http://localhost:9009/ws");
      const client = Stomp.over(socket);
      client.connect(
        {},
        () => {
        console.log("Connected to WebSocket");
          setConnected(true);
        onConnected(client, conversationId); // Pass conversationId to onConnected
        },
        onError
      );
      setStompClient(client);
  };

  const onConnected = (client, conversationId) => {
    client.subscribe(`/room/${conversationId}`, onMessageReceived, {
      onError: (error) => console.error("Subscription error:", error),
    });
    console.log(`Subscribed to topic: /room/${conversationId}`);
  };

  const onMessageReceived = (payload) => {
    try {
      const message = JSON.parse(payload.body);
      console.log("Received message:", message); // Log the message received
      setMessages((prevMessages) => [...prevMessages, message]); // Update messages
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // Auto-scroll to the latest message
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  };

  const onError = (error) => {
    console.error(
      "Could not connect to WebSocket server. Please refresh this page to try again!",
      error
    );
    setConnected(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Auto-scroll to the bottom when messages change

  return (
    <div>
      <Header />
      <MDBContainer fluid mb="5">
        <MDBRow style={{ marginTop: "7%" }}>
          <MDBCol md="2">
            <SideBar user={user} sideBarOption={SidebarOption.CHAT} />
          </MDBCol>
          <MDBCol md="10">
            <MDBRow>
              <MDBCol md="3">
                <MDBRow>
                  <MDBInputGroup className="full-width" noBorder>
                    <MDBInput
                      autoComplete="off"
                      className="active"
                      type="search"
                      placeholder="Search"
                      style={{ minWidth: "225px" }}
                      onChange={(e) => setSearchUser(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                    />
                  </MDBInputGroup>
                </MDBRow>
                <MDBCard style={{ marginTop: "2%" }}>
                  <MDBCardBody>
                    <h5>Chat List</h5>
                    <MDBListGroup>
                      {fullUserlist.map((otherUser, index) => (
                        <MDBListGroupItem
                          key={index}
                          className="d-flex justify-content-between align-items-start"
                        >
                          <div className="col-md-1 d-flex justify-content-center align-items-center">
                            <Avatar
                              src={
                                otherUser.avatar
                                  ? "data:image/png;base64, " + otherUser.avatar
                                  : "broken-image.jpg"
                              }
                            />
                          </div>
                          {otherUser.firstname + " " + otherUser.lastname}
                          <MDBBtn
                            size="sm"
                            color="primary"
                            onClick={() => getRoomChat(otherUser)}
                          >
                            Chat
                          </MDBBtn>
                        </MDBListGroupItem>
                      ))}
                    </MDBListGroup>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol md="9">
                <MDBCard
                  style={{
                    height: "80vh",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <MDBCardBody className="overflow-auto">
                    {/* Message Display Area */}
                    <div
                      className="chat-messages"
                      style={{ maxHeight: "70vh", overflowY: "scroll" }}
                    >
                      {messages.map((msg, index) => (
                        <div
                          key={index}
                          className={
                            msg.senderId === user.id ? "text-end" : "text-start"
                          }
                        >
                          <div
                            className={`message p-2 mb-2 rounded ${
                              msg.senderId === user.id
                                ? "bg-primary text-white"
                                : "bg-light"
                            }`}
                            style={{ maxWidth: "70%", display: "inline-block" }}
                          >
                            {msg.message}
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />{" "}
                      {/* Reference for auto-scrolling */}
                    </div>
                  </MDBCardBody>
                  <MDBCardBody>
                    <MDBInputGroup>
                    <MDBInput
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage();
                          }
                        }}
                    />
                      <MDBBtn color="primary" onClick={handleSendMessage}>
                      Send
                    </MDBBtn>
                    </MDBInputGroup>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer />
    </div>
  );
}
