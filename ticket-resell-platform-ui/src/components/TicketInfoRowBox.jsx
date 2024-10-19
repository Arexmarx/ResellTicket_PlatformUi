/* eslint-disable react/prop-types */
import { Avatar, Box, Divider } from "@mui/material";
import { formatToVND } from "../service/StringService";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBCheckbox,
  MDBCollapse,
  MDBRow,
  MDBContainer,
  MDBBadge,
} from "mdb-react-ui-kit";
import { useState } from "react";
import LoadEffect from "./LoadEffect";
import { formatDateTime } from "../service/DateService";

const titleCss = {
  fontSize: "70%",
  marginBottom: "5px",
};
/*
 * Author: Nguyen Tien Thuan
 */
export default function TicketInfoRowBox({ item }) {

  const [basicModal, setBasicModal] = useState(false);
  const [confirmCancelModal, setConfirmCancalModal] = useState(false)


  if (!item) {
    return (
      <LoadEffect />
    )
  }

  return (
    <Box>
      <div className="row mt-3 shadow-sm p-3 mb-5 bg-body rounded">
        <div className="row d-flex align-content-center ">
          <div className="col-md-1 d-flex justify-content-center align-items-center">
            <Avatar src={item.genericTicket.seller.avatar ? "data:image/png;base64, " + item.genericTicket.seller.avatar : "broken-image.jpg"} />
          </div>
          <div className="col-md-2">
            <div style={titleCss} className="row">
              Người bán
            </div>
            <div className="row">{item.genericTicket.seller.firstname + " " + item.genericTicket.seller.lastname}</div>
          </div>
          <div className="col-md-2">
            <div style={titleCss} className="row">
              Tên vé
            </div>
            <div className="row">{item.genericTicket.ticketName}</div>
          </div>
          <div className="col-md-1">
            <div style={titleCss} className="row">
              Giá bán
            </div>
            <div className="row">{formatToVND(item.totalPrice)}</div>
          </div>
          <div className="col-md-1">
            <div style={titleCss} className="row">
              Loại vé
            </div>
            <div className="row">{item.genericTicket.isPaper ? 'Giấy' : 'Online'}</div>
          </div>
          <div className="col-md-2">
            <div style={titleCss} className="row">
              Ngày bắt đầu - kết thúc sự kiện
            </div>
            <div className="row">
              {formatDateTime(item.genericTicket.event.startDate)} - {formatDateTime(item.genericTicket.event.endDate)}
            </div>
          </div>
          <div className="col-md-1">
            <div style={titleCss} className="row">
              Số lượng
            </div>
            <div className="row">x{item.quantity}</div>
          </div>
          {/* <div className="col-md-1">
            <div style={titleCss} className="row">
              Ngày mua
            </div>
            <div className="row">{item.boughtDate}</div>
          </div> */}
          <div className="col-md-1">
            <div style={titleCss} className="row">
              Tình trạng
            </div>
            <div className="row">
              Đang xử lý
            </div>
          </div>
        </div>
        <div className="row mt-3 mb-3">
          <Divider />
        </div>
        <div className="d-flex justify-content-end">
          <div>
            {/* <MDBBtn
              onClick={toggleOpenRating}
              style={{ marginRight: 5 }}
              outline
              color="secondary"
            >
              Đánh giá
            </MDBBtn> */}
            {/* <MDBBtn
              onClick={toggleOpen}
              style={{ marginRight: 5 }}
              outline
              color="secondary"
            >
              Chi tiết
            </MDBBtn> */}
            <MDBBtn onClick={() => setConfirmCancalModal(!confirmCancelModal)} style={{ marginRight: 5 }} outline color="danger">
              Hủy đơn hàng
            </MDBBtn>
          </div>
        </div>
      </div>
      <MDBCollapse
        open={basicModal}
        onClose={() => setBasicModal(false)}
      >
        <MDBContainer fluid>
          <MDBRow>
            {
              item.orderDetail ?
                item.orderDetail.map((detail) => (
                  <div key={detail.serial}>
                    <p>Mã số vé: {detail.serial}</p>
                    <p>Ngày hết hạn: {detail.expireDate}</p>
                    <img src={detail.image} alt="" />
                  </div>
                ))
                : ''
            }
          </MDBRow>
        </MDBContainer>
      </MDBCollapse>

      <MDBModal open={confirmCancelModal} onClose={() => setConfirmCancalModal(false)}>
        <MDBModalDialog centered={true} size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Xác nhận hủy đơn hàng</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setConfirmCancalModal(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="mt-2">Tên vé: <strong>{item.genericTicket.ticketName}</strong></div>
              <div className="mt-2">Tổng tiền: <strong>{formatToVND(item.totalPrice)}</strong></div>
              <div className="mt-2">Số lượng:&nbsp;
                <MDBBadge pill color='success' light>
                  x{item.quantity}
                </MDBBadge>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <button className="btn btn-danger">Hủy đơn</button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>


      {/* <MDBModal open={ratingModal} onClose={() => setRatingModal(false)}>
        <MDBModalDialog centered={true} size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <p>Đánh giá đơn hàng</p>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="row d-flex align-content-center">
                <div className="col-md-3">
                  <div style={titleCss} className="row">
                    Người bán
                  </div>
                  <div className="row">{ticket.seller.name}</div>
                </div>
                <div className="col-md-3">
                  <div style={titleCss} className="row">
                    Tên vé
                  </div>
                  <div className="row">{ticket.ticketName}</div>
                </div>
                <div className="col-md-3">
                  <div style={titleCss} className="row">
                    Giá bán
                  </div>
                  <div className="row">{formatToVND(ticket.price)}</div>
                </div>
                <div className="col-md-3">
                  <div style={titleCss} className="row">
                    Ngày sự kiện
                  </div>
                  <div className="row">
                    {ticket.event.startDate} {ticket.event.endDate}
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </div>
              <div className="row mt-3">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Viết đánh giá của bạn (tùy chọn)"
                  value={ratingDetail}
                  onChange={(e) => setRatingDetail(e.target.value)}
                ></textarea>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn onClick={toggleOpenRating} color="success">
                Gửi đánh giá
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal> */}
    </Box>
  );
}
