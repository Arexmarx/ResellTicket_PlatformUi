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
  MDBCardHeader,
} from "mdb-react-ui-kit";
import { BUY_TICKET_PAGE } from "../../config/Constant.js";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx";
import { Avatar, Typography } from "@mui/material";
import { MAIN_COLOR } from "../../config/Constant.js";
import { SELLER } from "../../test/DataTest.js";
/**
 * Author: Phan Nguyễn Mạnh Cường
 */
const seller = SELLER;
export default function EventDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { event } = location.state || {};

  if (!event) {
    return <div>No event data available</div>;
  }

  const handleBuy = (x) => {
    navigate(BUY_TICKET_PAGE, { state: { ticket: x } });
  };
  return (
    <div >
      <Header />
      <MDBContainer style={{ marginTop: "5%" }}>
        <MDBRow className="justify-content-center">
          <MDBCol md="6" className="mb-6">
            <MDBCard>
              <MDBCardBody>
                <MDBCardHeader style={{fontSize:'35px'}}>{event.title}</MDBCardHeader>
                <MDBCardText>{event.description}</MDBCardText>
                <MDBCardText>Ngày bắt đầu: {event.startDate}</MDBCardText>
                <MDBCardText>Ngày kết thúc: {event.endDate}</MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="6" className="mb-6">
            <MDBCard>
              <MDBCardImage
                src={event.image}
                alt={event.title}
                position="top"
                style={{
                  cursor: 'pointer',
                  borderRadius: '15px', // Add rounded corners
                  border: '2px solid #ddd', // Add a border
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Optional: add a subtle shadow
                }}
              />
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol style={{marginBottom: "3%"}}>
            <MDBCardHeader style={{ textAlign: "center" ,fontSize:"30px"}}>
              VÉ ĐANG BÁN
            </MDBCardHeader>
            {seller.map((x) => (
              <MDBCard key={x} style={{ marginTop: "2%" }}>
                <MDBCardBody>
                  <MDBRow className="align-items-center">
                    <MDBCol size="auto">
                      <Avatar alt="Seller" src="broken-image.jpg" />
                    </MDBCol>
                    <MDBCol>
                      <div>Người Bán:{x.name}</div>
                    </MDBCol>
                    <MDBCol>
                      <div>Tên vé: {x.ticketName}</div>
                    </MDBCol>
                    <MDBCol>
                      <div>Loại vé: {x.ticketType}</div>
                    </MDBCol>
                    <MDBCol>
                      <div>Khu vực: {x.ticketArea}</div>
                    </MDBCol>
                    <MDBCol>
                      <div>Mô tả: {x.ticketDiscription}</div>
                    </MDBCol>
                    <MDBCol>
                      <div>Giá bán: {x.ticketPrice}</div>
                    </MDBCol>
                    <MDBCol size="auto">
                      <MDBBtn
                        style={{ backgroundColor: MAIN_COLOR }}
                        onClick={() => handleBuy(x)}
                      >
                        Mua
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            ))}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer />
    </div>
  );
}
