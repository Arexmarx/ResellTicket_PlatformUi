/* eslint-disable react/prop-types */
import { Avatar, Box, Button, Divider } from "@mui/material";
import { formatToVND, stringAvatar } from "../service/StringService";
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
} from "mdb-react-ui-kit";
import Rating from "@mui/material/Rating";
import { useState } from "react";

const titleCss = {
  fontSize: "70%",
  marginBottom: "5px",
};
/*
 * Author: Nguyen Tien Thuan
 */
export default function TicketInfoRowBox({ ticket }) {
  const [basicModal, setBasicModal] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);
  const [value, setValue] = useState(0);
  const [ratingDetail, setRatingDetail] = useState();

  const toggleOpen = () => setBasicModal(!basicModal);
  const toggleOpenRating = () => setRatingModal(!ratingModal);

  return (
    <Box>
      <div className="row mt-3 shadow-sm p-3 mb-5 bg-body rounded">
        <div className="row d-flex align-content-center ">
          <div className="col-md-1 d-flex justify-content-center align-items-center">
            <Avatar {...stringAvatar(ticket.seller.name)} />
          </div>
          <div className="col-md-2">
            <div style={titleCss} className="row">
              Người bán
            </div>
            <div className="row">{ticket.seller.name}</div>
          </div>
          <div className="col-md-2">
            <div style={titleCss} className="row">
              Tên vé
            </div>
            <div className="row">{ticket.ticketName}</div>
          </div>
          <div className="col-md-1">
            <div style={titleCss} className="row">
              Giá bán
            </div>
            <div className="row">{formatToVND(ticket.price)}</div>
          </div>
          <div className="col-md-1">
            <div style={titleCss} className="row">
              Loại vé
            </div>
            <div className="row">{ticket.ticketType.name}</div>
          </div>
          <div className="col-md-2">
            <div style={titleCss} className="row">
              Ngày bắt đầu - kết thúc sự kiện
            </div>
            <div className="row">
              {ticket.event.startDate} - {ticket.event.endDate}
            </div>
          </div>
          <div className="col-md-1">
            <div style={titleCss} className="row">
              Số lượng
            </div>
            <div className="row">x{ticket.quantity}</div>
          </div>
          <div className="col-md-1">
            <div style={titleCss} className="row">
              Ngày mua
            </div>
            <div className="row">{ticket.boughtDate}</div>
          </div>
          <div className="col-md-1">
            <div style={titleCss} className="row">
              Tình trạng
            </div>
            <div className="row">{ticket.process.name}</div>
          </div>
        </div>
        <div className="row mt-3 mb-3">
          <Divider />
        </div>
        <div className="d-flex justify-content-end">
          <div>
            <MDBBtn
              onClick={toggleOpenRating}
              style={{ marginRight: 5 }}
              outline
              color="secondary"
            >
              Đánh giá
            </MDBBtn>
            <MDBBtn
              onClick={toggleOpen}
              style={{ marginRight: 5 }}
              outline
              color="secondary"
            >
              Chi tiết
            </MDBBtn>
            <MDBBtn style={{ marginRight: 5 }} outline color="danger">
              Hủy đơn hàng
            </MDBBtn>
          </div>
        </div>
      </div>
      <MDBModal
        open={basicModal}
        onClose={() => setBasicModal(false)}
        tabIndex="-1"
      >
        <MDBModalDialog centered={true} scrollable size="x2">
          <MDBModalContent>
            <MDBModalBody>
              {ticket.orderDetail.map((detail) => (
                <div key={detail.serial}>
                  <p>Mã số vé: {detail.serial}</p>
                  <p>Ngày hết hạn: {detail.expireDate}</p>
                  <img src={detail.image} alt="" />
                </div>
              ))}
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn onClick={toggleOpen} color="success">
                Đóng
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <MDBModal open={ratingModal} onClose={() => setRatingModal(false)}>
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
      </MDBModal>
    </Box>
  );
}
