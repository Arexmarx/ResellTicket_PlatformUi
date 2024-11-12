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
  MDBCardHeader,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import SideBar from "../../components/SideBar";
import { SidebarOption } from "../../config/Constant";
import useAxios from "../../utils/useAxios";
import API from "../../config/API";
import HttpStatus from "../../config/HttpStatus";
import { Avatar } from "@mui/material";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ScrollToTop from "../../components/ScrollToTop";

export default function ChatPage() {
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [otherUsers, setOtherUsers] = useState([]);
  const [fullUserlist, setFullUserList] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [conversation, setConversation] = useState(null);
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const api = useAxios();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(API.User.GET_USER_INFO);
        if (response.data.httpStatus === HttpStatus.OK) {
          setUser(response.data.object);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const response = await api.get(API.User.GET_ALL_USER_BOX_CHAT + user.id);
        if (response.data.httpStatus === HttpStatus.OK) {
          setOtherUsers(response.data.object);
          console.log(response.data.object);
        }
      } catch (error) {
        console.error("Error fetching other users:", error);
      }
    };
  
    if (user) {
      fetchOtherUsers();
    }
  }, [user]);

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
      );
      setNewMessage("");
      scrollToBottom();
    }
  };

  useEffect(() => {
    if (otherUsers.length > 0) {
      if (user) {
        setFullUserList(
          otherUsers.filter((users) => users.id && users.id !== user.id)
        );
      }
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
        setConversation(chatResponse.data.object);
        setSelectedUser(userChat);
        connect(chatResponse.data.object.conversationId);
        setMessages(chatResponse.data.object.messages);
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
        setConnected(true);
        onConnected(client, conversationId);
      },
      onError
    );
    setStompClient(client);
  };

  const onConnected = (client, conversationId) => {
    client.subscribe(`/room/${conversationId}`, onMessageReceived);
  };

  const onMessageReceived = (payload) => {
    try {
      const message = JSON.parse(payload.body);
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  };

  const onError = (error) => {
    console.error("WebSocket connection error:", error);
    setConnected(false);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <div>
      <Header />
      <MDBContainer fluid mb="5" style={{ marginBottom: '5%' }}>
        <MDBRow style={{ marginTop: "7%" }}>
          <MDBCol md="2">
            <SideBar user={user} sideBarOption={SidebarOption.CHAT} />
          </MDBCol>
          <MDBCol md="10">
            <MDBRow>
              <MDBCol md="9">
                <MDBCard style={{ height: "80vh", display: "flex", flexDirection: "column" }}>
                  <MDBCardHeader>
                    <div className="col-md-12 d-flex justify-content-start align-items-center">
                      {selectedUser && (
                        <>
                          <Avatar
                            className="me-3"
                            src={selectedUser.avatar ? `data:image/png;base64, ${selectedUser.avatar}` : "broken-image.jpg"}
                          />
                          {selectedUser.firstname + " " + selectedUser.lastname}
                        </>
                      )}
                    </div>
                  </MDBCardHeader>
                  <MDBCardBody className="overflow-auto">
                    <div
                      className="chat-messages"
                      style={{ maxHeight: "70vh", overflowY: "auto" }}
                    >
                      {messages.map((msg, index) => (
                        <div
                          key={index}
                          className={msg.senderId === user.id ? "text-end" : "text-start"}
                        >
                          <div
                            className={`message p-2 mb-2 rounded ${msg.senderId === user.id
                              ? "bg-primary text-white"
                              : "bg-light"
                              }`}
                            style={{ maxWidth: "70%", display: "inline-block" }}
                          >
                            {msg.message}
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </MDBCardBody>
                  <MDBCardFooter>
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
                        <SendRoundedIcon />
                      </MDBBtn>
                    </MDBInputGroup>
                  </MDBCardFooter>
                </MDBCard>
              </MDBCol>
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
                              src={otherUser.avatar ? `data:image/png;base64, ${otherUser.avatar}` : "broken-image.jpg"}
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
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
