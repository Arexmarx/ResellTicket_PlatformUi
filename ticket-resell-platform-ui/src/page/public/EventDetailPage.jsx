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
  MDBBadge,
} from "mdb-react-ui-kit";
import { BUY_TICKET_PAGE } from "../../config/Constant.js";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx";
import { Alert, Avatar } from "@mui/material";
import { MAIN_COLOR } from "../../config/Constant.js";
import { formatDateTime } from "../../service/DateService.js";
import TicketAPI from "../../service/api/TicketAPI.js";
import HttpStatus from "../../config/HttpStatus.js";
import { formatToVND } from "../../service/StringService.js";
import useAxios from "../../utils/useAxios.jsx";
import API from "../../config/API.js";
import '../../assets/css/BoxDateTime.css'
import { getDay, getMonth, getYear } from "../../service/DateService";

/**
 * Author: Phan Nguyễn Mạnh Cường
 */
export default function EventDetail() {

  const location = useLocation();
  const navigate = useNavigate();
  const { event } = location.state || {};

  const [user, setUser] = useState();
  const api = useAxios();


  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(API.User.GET_USER_INFO)
      if (response.data.httpStatus === HttpStatus.OK) {
        setUser(response.data.object)
      }
    }
    fetchData().catch(console.error)
  }, [])

  if (!event) {
    return <div>No event data available</div>;
  }

  const handleBuy = (x) => {
    if (user) {
      navigate(BUY_TICKET_PAGE, { state: { ticket: x } });
    }
  };

  // Get all selling genericTicket by event

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [sellingGenericTicket, setSellingGenericTicket] = useState(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {

    const fetchData = async () => {
      const response = await TicketAPI.getGenericTicketByEvent(event.id);
      if (response.data.httpStatus == HttpStatus.OK) {
        //console.log(response.data.object);
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
                  <MDBCardText><strong>Từ ngày:</strong> {formatDateTime(event.startDate)}</MDBCardText>
                  <MDBCardText><strong>Đến ngày:</strong> {formatDateTime(event.endDate)}</MDBCardText>
                  {
                    new Date(event.endDate) < new Date() && (
                      <h5>
                        <MDBBadge color='danger' light>
                          *Sự kiện đã diễn ra
                        </MDBBadge>
                      </h5>
                    )
                  }
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
              !user && <Alert severity="error">Bạn cần đăng nhập để mua vé</Alert>
            }
            {
              // Display selling ticket when event are available
              new Date(event.endDate) > new Date() &&
              sellingGenericTicket &&
              sellingGenericTicket.map((gTicket) => (user?.id != gTicket.seller.id &&
                <MDBCard key={gTicket.id} style={{ marginTop: "2%" }}>
                  <MDBCardBody>
                    <MDBRow className="align-items-center">
                      <MDBCol size="auto">

                        {/* src="broken-image.jpg" */}
                        {/* "data:image/png;base64, " + gTicket.seller.image */}
                      </MDBCol>
                      <MDBCol style={{ marginRight: '1%' }}>
                        <div className="d-flex justify-content-center">
                          <Avatar
                            sx={{ width: 42, height: 42 }} alt="Seller"
                            src={gTicket.seller.avatar ? "data:image/png;base64, " + gTicket.seller.avatar : "broken-image.jpg"}
                          />
                        </div>
                        <div className="d-flex justify-content-center">
                          <div>{gTicket.seller.firstname} {gTicket.seller.lastname}</div>
                        </div>
                      </MDBCol>
                      <MDBCol size={3}>
                        <div> {gTicket.ticketName}</div>
                      </MDBCol>
                      <MDBCol size={2}>
                        <div>Loại vé: {gTicket.isPaper ? "Giấy" : "Online"}</div>
                      </MDBCol>
                      <MDBCol size={2}>
                        <div>Khu vực: {gTicket.area}</div>
                      </MDBCol>
                      {/* <MDBCol>
                        <div>Mô tả: {gTicket.description}</div>
                      </MDBCol> */}
                      <MDBCol size={2}>
                        <div>
                          {gTicket.salePercent > 0 ?
                            <span>
                              <del className="text-danger">{formatToVND(gTicket.price)}</del>
                            </span>
                            : null
                          }
                          {formatToVND(gTicket.price - (gTicket.price * (gTicket.salePercent / 100)))}
                        </div>
                      </MDBCol>
                      <MDBCol size="auto">
                        <MDBBtn disabled={user == null}
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
