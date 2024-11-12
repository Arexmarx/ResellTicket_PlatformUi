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
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

import { MAIN_COLOR } from "../../config/Constant.js";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { formatToVND } from "../../service/StringService.js";
import { Alert, Avatar } from "@mui/material";
import TicketAPI from "../../service/api/TicketAPI.js";
import HttpStatus from "../../config/HttpStatus.js";
import useAxios from "../../utils/useAxios.jsx";
import API from "../../config/API.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/**
 * Author: Phan Nguyễn Mạnh Cường
 */

export default function BuyTicketPage() {

  const location = useLocation();
  const { ticket } = location.state || {};

  const errorNotification = (str) => toast.error(str)
  const successNotification = (str) => toast.success(str)

  const [quantity, setQuantity] = useState(1); // Khởi tạo số lượng là 1
  const [numberOfTickets, setNumberOfTickets] = useState()
  const [paymentMethods, setPaymentMethods] = useState([])
  const [orderMessage, setOrderMessage] = useState({ status: false, message: '' })
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);


  const api = useAxios()
  const [user, setUser] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(API.User.GET_USER_INFO)
      if (response.data.httpStatus === HttpStatus.OK) {
        setUser(response.data.object)
      }
    }
    fetchData().catch(console.error)
  }, [])


  useEffect(() => {
    const fetchData = async () => {
      const response = await TicketAPI.getTotalTicketsInGenericTicket(ticket.id)
      if (response.data.httpStatus == HttpStatus.OK) {
        setNumberOfTickets(response.data.object)
      }
    }
    fetchData().catch(console.log)
  }, [ticket.id])


  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(API.PaymentMethod.GET_NOT_DELETED_PAYMENT_METHOD)
      if (response.data.object) {
        setPaymentMethods(response.data.object)
      }
    }
    fetchData().catch(console.log)
  }, [])


  if (!ticket) {
    return <div>No event data available</div>;
  }

  const handleBuy = async () => {
    const finalPrice = ticket.price - (ticket.price * (ticket.salePercent / 100))
    if (user?.balance >= finalPrice) {
      const orderTicketRequest = {
        genericTicketId: ticket.id,
        buyerId: user.id,
        quantity: quantity,
        paymentMethodId: ticket.isPaper ? 2 : 1,
        totalPrice: quantity * (ticket.price - (ticket.price * (ticket.salePercent / 100))),
        isPaper: ticket.isPaper
      }
      const response = await api.post(API.GenericTicket.ORDER_GENERIC_TICKET, orderTicketRequest)
      if (response.data.httpStatus === HttpStatus.OK) {
        setOrderMessage({ status: true, message: response.data.message })
        successNotification(response.data.message)
      }
      else {
        setOrderMessage({ status: false, message: response.data.message })
        errorNotification(response.data.message)
      }
      setConfirmModalOpen(false)
    }
    else {
      setOrderMessage({ status: false, message: 'Bạn không đủ số dư để mua!' })
      errorNotification('Bạn không đủ số dư để mua!')
    }
    //navigate(CHECK_OUT_PAGE, { state: { ticket: x, quantity: quantity } });
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + delta;
      return newQuantity < 1 ? 1 : (newQuantity > numberOfTickets ? numberOfTickets : newQuantity); // Đảm bảo số lượng không nhỏ hơn 1
    });
  };


  return (
    <div>
      <Header />
      <ToastContainer/>
      <MDBContainer style={{ marginTop: "5%" }}>
        <MDBRow className="justify-content-center ">
          <MDBCol md="6" className="mb-6">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>
                  <div className="d-flex align-items-center">
                    <Avatar alt="Seller" src={ticket.seller.avatar ? "data:image/png;base64, " + ticket.seller.avatar : "broken-image.jpg"} />
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
                <MDBCardText><strong>Khuyến mãi:</strong> {ticket.salePercent}%</MDBCardText>
                <MDBCardText>
                  {
                    ticket.salePercent > 0 ?
                      <>
                        <strong>Giá vé:&nbsp;</strong>
                        <span className="text-danger"><del>{formatToVND(ticket.price)}</del></span>&nbsp;&nbsp;
                        <span className="text-danger">{formatToVND(ticket.price - (ticket.price * (ticket.salePercent / 100)))}</span>
                      </>
                      :
                      <>
                        <strong>Giá vé:</strong> <span className="text-danger">{formatToVND(ticket.price)}</span>
                      </>
                  }

                </MDBCardText>
                <MDBCardText><strong>Số lượng hiện có: </strong> {numberOfTickets ? numberOfTickets : '0'}</MDBCardText>
                <MDBCardText>
                  <strong>Phương thức thanh toán:</strong> {ticket.isPaper ? 'Thanh toán trực tiếp với người bán' : 'Số dư hệ thống'}
                </MDBCardText>
                <hr />
                <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                  <MDBBtn
                    color="danger"
                    outline
                    onClick={() => {
                      handleQuantityChange(-1)
                    }}
                    style={{ marginRight: "10px" }}
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
                    onClick={() => {
                      handleQuantityChange(1)
                    }}
                    style={{ marginLeft: "10px" }}
                  >
                    +
                  </MDBBtn>
                </div>
                {
                  orderMessage.status && orderMessage.message &&
                  <div className="mb-3">
                    <Alert severity="success">{orderMessage.message}</Alert>
                  </div>
                }
                {
                  !orderMessage.status && orderMessage.message &&
                  <div className="mb-3">
                    <Alert severity="error">{orderMessage.message}</Alert>
                  </div>
                }
                <MDBBtn
                  style={{ backgroundColor: MAIN_COLOR }}
                  // onClick={() => handleBuy(ticket)}
                  onClick={() => setConfirmModalOpen(!confirmModalOpen)}
                  disabled={numberOfTickets ? false : true}
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
                  borderRadius: '15px', 
                  border: '2px solid #ddd', 
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
                }}
              />
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* Confirm modal */}
      <MDBModal tabIndex="-1" open={confirmModalOpen}>
        <MDBModalDialog centered="true">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Xác nhận mua vé</MDBModalTitle>
              <MDBBtn onClick={() => setConfirmModalOpen(!confirmModalOpen)}
                className="btn-close"
                color="none"
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div>Số lượng vé: <strong>{quantity}</strong></div>
              <div className="mt-2">Tổng tiền: <strong>{formatToVND(quantity * (ticket.price - (ticket.price * (ticket.salePercent / 100))))}</strong></div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="success" onClick={handleBuy}>Xác nhận</MDBBtn>
              <MDBBtn color="secondary" onClick={() => setConfirmModalOpen(!confirmModalOpen)}>
                Đóng
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      
      <Footer />
    </div>
  );
}
