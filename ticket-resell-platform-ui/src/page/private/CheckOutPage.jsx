import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MAIN_COLOR } from "../../config/Constant.js";
import { USER_DATA } from "../../test/DataTest.js";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
/**
 * Author: Phan Nguyễn Mạnh Cường
 */
export default function CheckOutPage() {
  const location = useLocation();
  const { ticket, quantity } = location.state || {};
  if (!ticket) {
    return <div>No event data available</div>;
  }

  return (
    <div>
      <Header />

      <MDBContainer style={{ marginTop: "5%" , marginBottom: "5%"}}>
        <MDBRow>
          <MDBCol md="8">
            <MDBCard>
              <MDBCardHeader style={{ textAlign: "center", fontSize: "30px" }}>
                Thông tin thanh toán
              </MDBCardHeader>
              <MDBCardBody>
                <MDBCardText>Tên người mua: {USER_DATA.name}</MDBCardText>
                <MDBCardText>Số điện thoại: {USER_DATA.phone}</MDBCardText>
                <MDBCardText>Email: {USER_DATA.email}</MDBCardText>
                <MDBCardText>Địa chỉ giao hàng (nếu có): {USER_DATA.add}</MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="4">
            <MDBCard>
              <MDBCardHeader style={{ textAlign: "center", fontSize: "30px" }}>
                Chi tiết đơn hàng
              </MDBCardHeader>
              <MDBCardBody>
                <MDBCardText>Tên vé: {ticket.ticketName}</MDBCardText>
                <MDBCardText>Loại vé: {ticket.ticketType}</MDBCardText>
                <MDBCardText>Giá vé: {ticket.ticketPrice}</MDBCardText>
                <MDBCardText>Số lượng: {quantity} cái</MDBCardText>
                <MDBCardText>
                  Tổng tiền: {ticket.ticketPrice * quantity}
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBBtn style={{ backgroundColor: MAIN_COLOR, marginLeft: '30%', marginTop: '2%'}} >Thanh toán</MDBBtn>
      </MDBContainer>

      <Footer />
    </div>
  );
}
