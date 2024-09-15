import { useState } from "react";
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
import { MAIN_COLOR, CHECK_OUT_PAGE } from "../../config/Constant.js";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
/**
 * Author: Phan Nguyễn Mạnh Cường
 */
export default function BuyTicketPage() {
  const location = useLocation();
  const { ticket } = location.state || {};
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1); // Khởi tạo số lượng là 1

  if (!ticket) {
    return <div>No event data available</div>;
  }

  const handleBuy = (x) => {
    navigate(CHECK_OUT_PAGE, { state: { ticket: x, quantity: quantity } });
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + delta;
      return newQuantity < 1 ? 1 : newQuantity; // Đảm bảo số lượng không nhỏ hơn 1
    });
  };

  return (
    <div>
      <Header />
      <MDBContainer style={{ marginTop: "5%" }}>
        <MDBRow className="justify-content-center ">
          <MDBCol md="6" className="mb-6">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>Tên: {ticket.ticketName}</MDBCardTitle>
                <MDBCardText>Loại vé: {ticket.ticketType}</MDBCardText>
                <MDBCardText>Khu vực vé: {ticket.ticketArea}</MDBCardText>
                <MDBCardText>Mô tả: {ticket.ticketDetailDiscipt}</MDBCardText>
                <MDBCardTitle>Giá vé: {ticket.ticketPrice}</MDBCardTitle>

                <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                  <MDBBtn
                    color="danger"
                    outline
                    onClick={() => handleQuantityChange(-1)}
                    style={{ marginRight: "10px"}}
                  >
                    -
                  </MDBBtn>
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    style={{ width: "50px", textAlign: "center" }}
                  />
                  <MDBBtn
                    color="success"
                    outline
                    onClick={() => handleQuantityChange(1)}
                    style={{ marginLeft: "10px" }}
                  >
                    +
                  </MDBBtn>
                </div>

                <MDBBtn
                  style={{ backgroundColor: MAIN_COLOR }}
                  onClick={() => handleBuy(ticket)}
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
      </MDBContainer>
      <Footer />
    </div>
  );
}
