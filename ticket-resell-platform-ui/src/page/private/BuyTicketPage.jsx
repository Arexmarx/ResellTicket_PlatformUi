import React from "react";
import { useLocation } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { MAIN_COLOR } from "../../config/Constant.js";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
/**
 * Author: Phan Nguyễn Mạnh Cường
 */
export default function BuyTicketPage() {
  const location = useLocation();
  const { ticket } = location.state || {};

  if (!ticket) {
    return <div>No event data available</div>;
  }
  return (
    <div>
      <Header />
      <MDBContainer style={{ marginTop: "5%" }}>
        <MDBRow className="justify-content-center">
          <MDBCol md="6" className="mb-6">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>Tên vé: {ticket.ticketName}</MDBCardTitle>
                <MDBCardText>Người bán: {ticket.name}</MDBCardText>
                <MDBCardText>Loại vé: {ticket.ticketType}</MDBCardText>
                <MDBCardText>Khu vực vé: {ticket.ticketArea}</MDBCardText>
                <MDBCardText>Mô tả: {ticket.ticketDetailDiscipt}</MDBCardText>
                <MDBCardTitle>Giá vé: {ticket.ticketPrice}</MDBCardTitle>
                <MDBBtn
                  style={{ backgroundColor: MAIN_COLOR}}
                >
                  Mua
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="6" className="mb-6">
            <MDBCard>
              <MDBCardImage
                src={ticket.ticketImage}
                alt={ticket.title}
                position="top"
              />
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer />
    </div>
  );
}
