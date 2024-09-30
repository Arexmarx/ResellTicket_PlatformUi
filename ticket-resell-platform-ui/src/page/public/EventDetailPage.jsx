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
  MDBCardHeader,
} from "mdb-react-ui-kit";
import { BUY_TICKET_PAGE, USER_ID_KEY } from "../../config/Constant.js";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx";
import { Avatar, Typography } from "@mui/material";
import { MAIN_COLOR } from "../../config/Constant.js";
import { SELLER } from "../../test/DataTest.js";
import { formatDateTime } from "../../service/DateService.js";
import TicketAPI from "../../service/api/TicketAPI.js";
import HttpStatus from "../../config/HttpStatus.js";
/**
 * Author: Phan Nguyễn Mạnh Cường
 */
const seller = SELLER;

export default function EventDetail() {

  const location = useLocation();
  const navigate = useNavigate();
  const { event } = location.state || {};
  const userId = localStorage.getItem(USER_ID_KEY)

  if (!event) {
    return <div>No event data available</div>;
  }

  const handleBuy = (x) => {
    navigate(BUY_TICKET_PAGE, { state: { ticket: x} });
  };

  // Get all selling genericTicket by event

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sellingGenericTicket, setSellingGenericTicket] = useState(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      
      const fetchData = async () => {
        const response = await TicketAPI.getGenericTicketByEvent(event.id);
        if (response.data.httpStatus == HttpStatus.OK) {
          console.log(response.data.object);
          setSellingGenericTicket(response.data.object)
        }
      }

      fetchData().catch(console.log)
    }, [event.id])
  

  return (
    <div >
      <Header />
      <MDBContainer style={{ marginTop: "5%" }}>
        <MDBRow className="justify-content-center">
          <MDBCol md="6" className="mb-6">
            <MDBCard>
              <MDBCardBody>
                <MDBCardHeader style={{ fontSize: '35px' }}>{event.name}</MDBCardHeader>
                <div className="mt-3">
                  <MDBCardText><strong>Mô tả sự kiện:</strong> {event.detail}</MDBCardText>
                  <MDBCardText><strong>Ngày bắt đầu:</strong> {formatDateTime(event.startDate)}</MDBCardText>
                  <MDBCardText><strong>Ngày kết thúc:</strong> {formatDateTime(event.endDate)}</MDBCardText>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="6" className="mb-6">
            <MDBCard>
              <MDBCardImage
                // src={event.image}
                src={"data:image/png;base64, " + event.image}
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
          <MDBCol style={{ marginBottom: "3%" }}>
            <MDBCardHeader style={{ textAlign: "center", fontSize: "30px" }}>
              VÉ ĐANG BÁN
            </MDBCardHeader>
            {
              sellingGenericTicket &&
              sellingGenericTicket.map((gTicket) => ( userId != gTicket.seller.id &&
                <MDBCard key={gTicket.id} style={{ marginTop: "2%" }}>
                  <MDBCardBody>
                    <MDBRow className="align-items-center">
                      <MDBCol size="auto">
                        <Avatar alt="Seller" src={gTicket.seller.avatar ? "data:image/png;base64, " + gTicket.seller.avatar : "broken-image.jpg" }  /> 
                        {/* src="broken-image.jpg" */}
                        {/* "data:image/png;base64, " + gTicket.seller.image */}
                      </MDBCol>
                      <MDBCol>
                        <div>Người Bán: {gTicket.seller.firstname} {gTicket.seller.lastname}</div>
                      </MDBCol>
                      <MDBCol>
                        <div>Tên vé: {gTicket.ticketName}</div>
                      </MDBCol>
                      <MDBCol>
                        <div>Loại vé: {gTicket.isPaper ? "Giấy" : "Online"}</div>
                      </MDBCol>
                      <MDBCol>
                        <div>Khu vực: {gTicket.area}</div>
                      </MDBCol>
                      {/* <MDBCol>
                        <div>Mô tả: {gTicket.description}</div>
                      </MDBCol> */}
                      <MDBCol>
                        <div>Giá bán: {gTicket.price}</div>
                      </MDBCol>
                      <MDBCol size="auto">
                        <MDBBtn
                          style={{ backgroundColor: MAIN_COLOR }}
                          onClick={() => handleBuy(gTicket)}
                        >
                          Mua
                        </MDBBtn>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              ))
            }
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer />
    </div>
  );
}
