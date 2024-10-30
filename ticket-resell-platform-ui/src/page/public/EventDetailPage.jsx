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
import { BUY_TICKET_PAGE, PERSONAL_PAGE } from "../../config/Constant.js";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx";
import { Alert, Avatar, Box, Chip, Typography } from "@mui/material";
import { MAIN_COLOR } from "../../config/Constant.js";
import { formatDateTime } from "../../service/DateService.js";
import TicketAPI from "../../service/api/TicketAPI.js";
import HttpStatus from "../../config/HttpStatus.js";
import { formatToVND } from "../../service/StringService.js";
import useAxios from "../../utils/useAxios.jsx";
import API from "../../config/API.js";
import "../../assets/css/BoxDateTime.css";
import { getDay, getMonth, getYear } from "../../service/DateService";
import ChatBubble from "../../components/ChatBubble.jsx";

/**
 * Author: Phan Nguyễn Mạnh Cường
 */
export default function EventDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { event } = location.state || {};

  const [user, setUser] = useState();
  const api = useAxios();

  const navigator = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(API.User.GET_USER_INFO);
      if (response.data.httpStatus === HttpStatus.OK) {
        setUser(response.data.object);
      }
    };
    fetchData().catch(console.error);
  }, []);

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
        setSellingGenericTicket(response.data.object);
      }
    };

    fetchData().catch(console.log);
  }, [event.id]);

  const handleClickPersonalAvatar = (account) => {
    navigator(PERSONAL_PAGE, { state: { seller: account } });
  };

  return (
    <div>
      <Header />
      <MDBContainer style={{ marginTop: "5%" }}>
        <MDBRow className="justify-content-center">
          <MDBCol md="6" className="mb-6">
            <MDBCard>
              <MDBCardBody>
                <MDBCardHeader style={{ fontSize: "35px" }}>
                  {event.name}
                </MDBCardHeader>
                <div className="mt-3">
                  <MDBCardText>
                    <strong>Mô tả sự kiện:</strong> {event.detail}
                  </MDBCardText>
                  <MDBCardText>
                    <strong>Từ ngày:</strong> {formatDateTime(event.startDate)}
                  </MDBCardText>
                  <MDBCardText>
                    <strong>Đến ngày:</strong> {formatDateTime(event.endDate)}
                  </MDBCardText>
                  <MDBCardText>
                    <strong>Hashtags:</strong>{" "}
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                      }}
                    >
                      {" "}
                      {event.hashtags.map((x, index) => (
                        <span style={{ marginLeft: "1%" }} key={index}>
                          <Chip key={x.id} label={"#" + x.name} style={{backgroundColor: MAIN_COLOR, borderColor: MAIN_COLOR,color:'white'}} />
                        </span>
                      ))}
                    </Box>
                  </MDBCardText>
                  {new Date(event.endDate) < new Date() && (
                    <h5>
                      <MDBBadge color="danger" light>
                        *Sự kiện đã diễn ra
                      </MDBBadge>
                    </h5>
                  )}
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
                  cursor: "pointer",
                  borderRadius: "15px", // Add rounded corners
                  border: "2px solid #ddd", // Add a border
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Optional: add a subtle shadow
                }}
              />
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-4">
          <MDBCol style={{ marginBottom: "3%" }}>
            <MDBCardHeader
              style={{
                textAlign: "center",
                fontSize: "30px",
                fontWeight: "bold",
                color: MAIN_COLOR,
                paddingBottom: "15px",
              }}
            >
              VÉ ĐANG BÁN
            </MDBCardHeader>

            {!user && (
              <Alert severity="error" sx={{ marginY: 2 }}>
                Bạn cần đăng nhập để mua vé
              </Alert>
            )}

            {/* Display selling ticket when events are available */}
            {new Date(event.endDate) > new Date() &&
              sellingGenericTicket &&
              sellingGenericTicket.map(
                (gTicket) =>
                  user?.id !== gTicket.seller.id && (
                    <MDBCard
                      key={gTicket.id}
                      style={{
                        marginTop: "2%",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <MDBCardBody>
                        <MDBRow className="align-items-center">
                          <MDBCol size="auto">
                            <div
                              onClick={() =>
                                handleClickPersonalAvatar(gTicket.seller)
                              }
                              style={{ cursor: "pointer" }}
                              title="Xem trang cá nhân"
                            >
                              <Avatar
                                sx={{
                                  width: 48,
                                  height: 48,
                                  border: `2px solid ${MAIN_COLOR}`,
                                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)",
                                }}
                                alt="Seller"
                                src={
                                  gTicket.seller.avatar
                                    ? "data:image/png;base64, " +
                                      gTicket.seller.avatar
                                    : "/src/assets/logo/broken-image.jpg"
                                }
                              />
                            </div>
                            <Typography
                              variant="subtitle2"
                              align="center"
                              sx={{ fontWeight: "bold", marginTop: "8px" }}
                            >
                              {gTicket.seller.firstname}{" "}
                              {gTicket.seller.lastname}
                            </Typography>
                          </MDBCol>

                          <MDBCol md="3">
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold", color: "#333" }}
                            >
                              {gTicket.ticketName}
                            </Typography>
                          </MDBCol>

                          <MDBCol md="2">
                            <Typography variant="body2" color="text.secondary">
                              Loại vé: {gTicket.isPaper ? "Giấy" : "Online"}
                            </Typography>
                          </MDBCol>

                          <MDBCol md="2">
                            <Typography variant="body2" color="text.secondary">
                              Khu vực: {gTicket.area}
                            </Typography>
                          </MDBCol>

                          <MDBCol md="2">
                            <Typography
                              variant="body1"
                              sx={{
                                color: gTicket.salePercent > 0 ? "red" : "#333",
                                fontWeight:
                                  gTicket.salePercent > 0 ? "bold" : "normal",
                              }}
                            >
                              Giá:
                              {gTicket.salePercent > 0 && (
                                <span>
                                  <del style={{ marginRight: "8px" }}>
                                    {formatToVND(gTicket.price)}
                                  </del>
                                </span>
                              )}
                              {formatToVND(
                                gTicket.price -
                                  gTicket.price * (gTicket.salePercent / 100)
                              )}
                            </Typography>
                          </MDBCol>

                          <MDBCol size="auto">
                            <MDBBtn
                              disabled={!user}
                              onClick={() => handleBuy(gTicket)}
                              style={{
                                backgroundColor: MAIN_COLOR,
                                color: "#fff",
                                fontWeight: "bold",
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                              }}
                            >
                              Mua
                            </MDBBtn>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  )
              )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <ChatBubble />
      <Footer />
    </div>
  );
}
