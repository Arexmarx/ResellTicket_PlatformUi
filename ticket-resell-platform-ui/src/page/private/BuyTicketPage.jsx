import { useEffect, useState } from "react";
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
import { formatToVND } from "../../service/StringService.js";
import { Avatar } from "@mui/material";
import TicketAPI from "../../service/api/TicketAPI.js";
import HttpStatus from "../../config/HttpStatus.js";
/**
 * Author: Phan Nguyễn Mạnh Cường
 */
export default function BuyTicketPage() {
  const location = useLocation();
  const { ticket } = location.state || {};
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1); // Khởi tạo số lượng là 1
  const [numberOfTickets, setNumberOfTickets] = useState()

  console.log(ticket);
  // console.log(event);
  

  if (!ticket) {
    return <div>No event data available</div>;
  }

  const handleBuy = (x) => {
    navigate(CHECK_OUT_PAGE, { state: { ticket: x, quantity: quantity } });
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + delta;
      return newQuantity < 1 ? 1 : ( newQuantity > numberOfTickets ? numberOfTickets : newQuantity ); // Đảm bảo số lượng không nhỏ hơn 1
    });
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {

    const fetchData = async () => {
      const response = await TicketAPI.getTotalTicketsInGenericTicket(ticket.id)
      if (response.data.httpStatus == HttpStatus.OK) {
        setNumberOfTickets(response.data.object)
      }
    }

    fetchData().catch(console.log)
  }, [ticket.id])

  return (
    <div>
      <Header />
      <MDBContainer style={{ marginTop: "5%" }}>
        <MDBRow className="justify-content-center ">
          <MDBCol md="6" className="mb-6">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>
                    <div className="d-flex align-items-center">
                      <Avatar alt="Seller" src={ticket.seller.avatar ? "data:image/png;base64, " + ticket.seller.avatar : "broken-image.jpg" }  />
                      <MDBCol className="mx-3">
                            {ticket.seller.firstname} {ticket.seller.lastname}
                      </MDBCol>
                    </div>
                </MDBCardTitle>
                <hr />
                <MDBCardTitle><strong>{ticket.ticketName}</strong></MDBCardTitle>
                <MDBCardText><strong>Loại vé:</strong> {ticket.isPaper ? "Giấy" : "Online"}</MDBCardText>
                <MDBCardText><strong>Khu vực vé:</strong> {ticket.area}</MDBCardText>
                <MDBCardText><strong>Mô tả:</strong> {ticket.description}</MDBCardText>
                <MDBCardText><strong>Giá vé:</strong> <span className="text-danger">{formatToVND(ticket.price)}</span></MDBCardText>
                <MDBCardText><strong>Số lượng hiện có: </strong> {numberOfTickets ? numberOfTickets : '0' }</MDBCardText>
                <hr />
                <div  style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
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
                  disabled={ numberOfTickets ? false : true }
                >
                  Mua
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="6" className="mb-6">
            <MDBCard>
              <MDBCardImage
                // src={ticket.ticketImage}
                src={"data:image/png;base64, " + ticket.event.image}
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
