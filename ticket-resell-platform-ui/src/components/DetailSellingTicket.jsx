import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";
import { useLocation } from "react-router-dom";
import {
  ADD_TICKET_PAGE,
  SidebarOption,
  USER_ID_KEY,
} from "../config/Constant";

import { TICKET_DATA } from "../test/DataTest";
import { useState } from "react";
import { useEffect } from "react";
const titleCss = {
  marginBottom: "5px",
  fontSize: "70%",
};

export default function DetailSellingTicket() {
  const [tickets, setTickets] = useState([]);
  const [openTicketId, setOpenTicketId] = useState(null);

  useEffect(() => {
    // Fetch tickets data
    setTickets(ADD_TICKET_PAGE);
  }, []);

  const toggleOpen = (ticketId) => {
    // Toggle collapse for specific ticket by ID
    setOpenTicketId(openTicketId === ticketId ? null : ticketId);
  };

  return (
    <div>
      <MDBContainer fluid>
        <MDBCol>
          <a
            href={ADD_TICKET_PAGE}
            className="btn btn-warning"
            style={{ marginBottom: "2%" }}
          >
            Thêm vé mới
          </a>
          <MDBRow>
            {TICKET_DATA.map((x, index) => (
              <MDBRow
                key={index}
                style={{ marginBottom: "2", marginTop: "2%" }}
                center
              >
                <MDBCol md="1">
                  <MDBRow style={titleCss}>Số Seri</MDBRow>
                  <MDBRow>{x.ticketSerial}</MDBRow>
                </MDBCol>
                <MDBCol md="2">
                  <MDBRow style={titleCss}>Tên vé</MDBRow>
                  <MDBRow>{x.genericTicketObject.ticketName}</MDBRow>
                </MDBCol>
                <MDBCol md="2">
                  <MDBRow style={titleCss}>Ghi chú</MDBRow>
                  <MDBRow>{x.note}</MDBRow>
                </MDBCol>
                <MDBCol md="1">
                  <MDBRow style={titleCss}>Ngày hết hạn</MDBRow>
                  <MDBRow>{x.genericTicketObject.expiredDate}</MDBRow>
                </MDBCol>
                <MDBCol md="1">
                  <MDBRow style={titleCss}>Thể loại vé</MDBRow>
                  <MDBRow>
                    {x.genericTicketObject.isPaper ? "Vé giấy" : "Vé online"}
                  </MDBRow>
                </MDBCol>
                <MDBCol md="1">
                  <MDBRow style={titleCss}>Trạng thái</MDBRow>
                  <MDBRow>{x.process}</MDBRow>
                </MDBCol>
                <MDBCol md="1">
                  <MDBRow style={titleCss}>Kiểm duyệt</MDBRow>
                  <MDBRow>{x.IsCheck ? "Rồi" : "Chưa"}</MDBRow>
                </MDBCol>
                <MDBCol md="1">
                  <MDBRow style={titleCss}>Đã mua</MDBRow>
                  <MDBRow>{x.IsBought ? "Rồi" : "Chưa"}</MDBRow>
                </MDBCol>
                
                <MDBCol md="1">
                  <MDBBtn outline color="tertiary" style={{ borderColor:'fbf9f9'}} size="sm" onClick={() => (toggleOpen(x.ticketSerial))} >
                    Chi tiết
                  </MDBBtn>
                </MDBCol>

                <MDBModal
                  open={openTicketId === x.ticketSerial}
                  
                >
                  <MDBModalDialog centered={true} size="lg">
                    <MDBModalContent>
                      <MDBModalHeader>Chi tiết vé</MDBModalHeader>
                      <MDBModalBody>
                        <MDBRow>
                          {/* Left side: Ticket information */}
                          <MDBCol md="7">
                            <MDBTypography tag="h6">Số Seri:</MDBTypography>
                            <p>{x.ticketSerial}</p>

                            <MDBTypography tag="h6">Tên vé:</MDBTypography>
                            <p>{x.genericTicketObject.ticketName}</p>

                            <MDBTypography tag="h6">Giá vé:</MDBTypography>
                            <p>{x.genericTicketObject.price} VND</p>

                            <MDBTypography tag="h6">Giảm giá:</MDBTypography>
                            <p>{x.genericTicketObject.salePercent}%</p>

                            <MDBTypography tag="h6">
                              Ngày hết hạn:
                            </MDBTypography>
                            <p>{x.genericTicketObject.expiredDate}</p>

                            <MDBTypography tag="h6">Khu vực:</MDBTypography>
                            <p>{x.genericTicketObject.area}</p>

                            <MDBTypography tag="h6">Loại vé:</MDBTypography>
                            <p>
                              {x.genericTicketObject.isPaperL
                                ? "Vé giấy"
                                : "Vé online"}
                            </p>
                            <MDBTypography tag="h6">Mô tả:</MDBTypography>
                            <p>{x.genericTicketObject.description}</p>

                            <MDBTypography tag="h6">
                              Liên kết sự kiện:
                            </MDBTypography>
                            <a
                              href={x.genericTicketObject.linkEvent}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Xem chi tiết sự kiện
                            </a>
                          </MDBCol>

                          {/* Right side: Ticket image */}
                          <MDBCol md="5" className="text-center">
                            <img
                              src={x.image}
                              alt="Ticket"
                              className="img-fluid"
                              style={{
                                maxHeight: "300px",
                                borderRadius: "10px",
                              }}
                            />
                          </MDBCol>
                        </MDBRow>
                      </MDBModalBody>
                      <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={toggleOpen}>
                          Đóng
                        </MDBBtn>
                      </MDBModalFooter>
                    </MDBModalContent>
                  </MDBModalDialog>
                </MDBModal>
              </MDBRow>
            ))}
          </MDBRow>
        </MDBCol>
      </MDBContainer>
    </div>
  );
}
