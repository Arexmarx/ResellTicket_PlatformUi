import React, { useEffect, useState } from "react";
import {
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
} from "mdb-react-ui-kit";
import TelegramIcon from "@mui/icons-material/Telegram";
import ThreePIcon from "@mui/icons-material/ThreeP";
import { CHAT_PAGE, MAIN_COLOR } from "../config/Constant";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import API from "../config/API";
import HttpStatus from "../config/HttpStatus";
import { toast, ToastContainer } from "react-toastify";

const styleIcon = {
  width: "50px",
  height: "50px",
  marginTop: "10%",
};

export default function ChatBubble() {
    const navigate = useNavigate();

    const api = useAxios();
    const [user, setUser] = useState();

    const errorNotification = (str) => toast.error(str);
    useEffect(() => {
        const fetchData = async () => {
          const response = await api.get(API.User.GET_USER_INFO)
          if (response.data.httpStatus === HttpStatus.OK) {
            setUser(response.data.object)
          }
        }
        fetchData().catch(console.error)
      }, [])

    const handleSubmit = (note) => {
        if(note != null){
            if(note === 'Zalo'){
                window.location.href = 'https://zalo.me/pc'
            } else if( note === 'Mess'){
                window.location.href = 'https://www.messenger.com/'
            } else if( note === 'Chat'){
                if(user){
                    navigate(CHAT_PAGE)
                } else {
                    errorNotification('Cần đăng nhập để chat trực tiếp')
                    return
                }
            }
        }
           
    }
  return (
    
    <MDBDropdown
      dropup
      style={{
        position: "fixed",
        bottom: "20px",
        right: "50px",
        width: "60px",
        height: "60px",
        backgroundColor: '#transparent',
      }}
    >
    <ToastContainer style={{marginTop: '3%'}}/>
      <MDBDropdownToggle style={{borderRadius: '55%',backgroundColor: MAIN_COLOR}}>
        <TelegramIcon style={{ width: "30px", height: "30px" ,}} />
      </MDBDropdownToggle>

      <MDBDropdownMenu
        style={{
          border: "none",
          padding: "10px 0",
          backgroundColor: "transparent",
          boxShadow: "none",
          display: "flex", // Align items using flexbox
          flexDirection: "column", // Ensure the items are in a column layout
          alignItems: "center", // Align the icons to the right
        }}
      >
        <MDBDropdownItem onClick={() => handleSubmit('Zalo')}>
          <img src="..\..\src/assets/logo/Zalo.png" style={styleIcon} />
        </MDBDropdownItem>
        <MDBDropdownItem onClick={() => handleSubmit('Mess')}>
        <img src="..\..\src/assets/logo/Messenger.png" style={styleIcon} />
        </MDBDropdownItem>
        <MDBDropdownItem onClick={() => handleSubmit('Chat')}>
          <ThreePIcon style={styleIcon} />
        </MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
  );
}
