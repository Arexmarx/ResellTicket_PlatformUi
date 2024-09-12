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
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx";
import { Avatar, Typography } from "@mui/material";
const seller = [
  {
    name: 'A',
    ticketName:'Vé Hạng S',
    ticketType:'Vé Online',
    ticketDiscription:'Vé siêu cấp vip Pro',
    ticketPrice:'1000000'    
  },
  {
      name: 'B',
      ticketName:'Vé Hạng D',
      ticketType:'Vé giấy',
      ticketDiscription:'Vé siêu ngon',
      ticketPrice:'1000000'
  },
  {
      name: 'C',
      ticketName:'Vé Hạng A',
      ticketType:'Vé online',
      ticketDiscription:'Vé mới mua chưa sử dụng',
      ticketPrice:'222222'
  },
  {
      name: 'D',
      ticketName:'Vé Hạng B',
      ticketType:'vé giấy',
      ticketDiscription:'vé siêu rẻ',
      ticketPrice:'343434'
  },
]
export default function EventDetail() {
  const location = useLocation();
  const { event } = location.state || {};

  if (!event) {
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
                <MDBCardTitle>{event.title}</MDBCardTitle>
                <MDBCardText>{event.description}</MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="6" className="mb-6">
            <MDBCard>
              <MDBCardImage
                src={event.image}
                alt={event.title}
                position="top"
              />
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol>
            {seller.map((x) => (
                <MDBCard key={x}>
                <MDBCardBody>
                  <MDBRow className="align-items-center">
                    <MDBCol size="auto">
                      <Avatar alt="Seller" src="broken-image.jpg" />
                    </MDBCol>
                    <MDBCol>
                      <Typography>Người Bán:{x.name}</Typography>
                    </MDBCol>
                    <MDBCol>
                      <Typography>Tên vé: {x.ticketName}</Typography>
                    </MDBCol>
                    <MDBCol>
                      <Typography>Loại vé: {x.ticketType}</Typography>
                    </MDBCol>
                    <MDBCol>
                      <Typography>Mô tả: {x.ticketDiscription}</Typography>
                    </MDBCol>
                    <MDBCol>
                      <Typography>Giá bán: {x.ticketPrice}</Typography>
                    </MDBCol>
                    <MDBCol size="auto">
                      <MDBBtn color="primary">Mua</MDBBtn>
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
