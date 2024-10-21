import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
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

export default function ChatPage() {
  const [user, setUser] = React.useState({});
  const [messages, setMessages] = React.useState([]); // State to hold messages
  const [newMessage, setNewMessage] = React.useState(""); // State for the new message input
  const [otherUsers, setOtherUsers] = React.useState([]); // State to hold other users in chat
  const api = useAxios();

  React.useEffect(() => {
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
      const response = await api.get(API.Chat.GET_OTHER_USERS); // Adjust the API endpoint as needed
      if (response.data.httpStatus === HttpStatus.OK) {
        setOtherUsers(response.data.object); // Assuming this returns an array of users
      }
    };
    fetchOtherUsers().catch(console.error);
  }, []);

  const handleSendMessage = () => {
    // Add the new message to the messages array
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: user.name }]); // Adjust according to user data
      setNewMessage("");
    }
  };

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
                    />
                  </MDBInputGroup>
                </MDBRow>
                <MDBCard style={{marginTop: '2%'}}>
                  <MDBCardBody>
                    <h5>Chat List</h5>
                    <MDBListGroup>
                      {otherUsers.map((otherUser, index) => (
                        <MDBListGroupItem
                          key={index}
                          className="d-flex justify-content-between align-items-start"
                        >
                          {otherUser.name}
                          <MDBBtn size="sm" color="primary">
                            Chat
                          </MDBBtn>{" "}
                          {/* Button to start chat */}
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
                            msg.sender === user.name ? "text-end" : "text-start"
                          }
                        >
                          <div
                            className={`message p-2 mb-2 rounded ${
                              msg.sender === user.name
                                ? "bg-primary text-white"
                                : "bg-light"
                            }`}
                            style={{ maxWidth: "70%", display: "inline-block" }}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </MDBCardBody>
                  {/* Message Input Area */}
                  <div className="p-3">
                    <MDBInput
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      style={{ width: "85%", display: "inline-block" }}
                    />
                    <MDBBtn
                      onClick={handleSendMessage}
                      style={{ display: "inline-block", marginTop: '1%' }}
                    >
                      Send
                    </MDBBtn>
                  </div>
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
