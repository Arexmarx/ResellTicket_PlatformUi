import {
  MDBBadge,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBFooter,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import {
  ADD_TICKET_PAGE,
  SidebarOption,
  TicketProcess
} from "../config/Constant";
import { useState } from "react";
import { useEffect } from "react";
import HttpStatus from "../config/HttpStatus";
import { formatDateTime } from "../service/DateService";
import { formatToVND, getFirstFiveChars } from "../service/StringService";
import useAxios from "../utils/useAxios";
import API from "../config/API";
import LoadEffect from "./LoadEffect";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const titleCss = {
  marginBottom: "5px",
  fontSize: "70%",
};

// eslint-disable-next-line react/prop-types
export default function DetailSellingTicket({ user }) {

  const api = useAxios()
  const successNotification = (str) => toast.success(str)
  const errorNotification = (str) => toast.error(str)

  const [tickets, setTickets] = useState(null);
  const [openTicketId, setOpenTicketId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(null);
  const [checked, setChecked] = useState(false);
  //console.log(user);


  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(API.Ticket.GET_ALL_TICKET_OF_SELLER + user?.id)
      //console.log(response.data)
      if (response.data.httpStatus === HttpStatus.OK) {
        //console.log(response.data.object)
        setTickets(response.data.object)
      }
    }
    fetchData().catch(console.log)
  }, [user.id]);

  const toggleOpen = (ticketId) => {
    // Toggle collapse for specific ticket by ID
    setOpenTicketId(openTicketId === ticketId ? null : ticketId);
  };

  const handleSaveChange = async (ticketId) => {
    console.log(ticketId);
    const response = await api.put(API.Ticket.MARK_TICKET_IS_BOUGHT + ticketId)
    if (response.data.httpStatus === HttpStatus.OK) {
      successNotification(response.data.message)
    }
    else {
      errorNotification(response.data.message)
    }
  }

  if (!tickets) {
    return (
      <LoadEffect />
    )
  }

  if (!Array.isArray(tickets)) {
    return (
      <LoadEffect/>
    )
  }


  return (
    <div>
      <ToastContainer/>
      <MDBContainer fluid>
        <MDBCol>
          <a
            href={ADD_TICKET_PAGE}
            className="btn btn-warning"
            style={{ marginBottom: "2%" }}
          >
            Thêm vé mới
          </a>
          <MDBRow style={{ marginLeft: '1%', marginRight: '1%' }}>
            {tickets &&
              tickets.map((x, index) => (
                x.process != TicketProcess.SUCCESS && x.process != TicketProcess.REJECTED &&
                <MDBRow
                  className="shadow-sm p-3 mb-5 bg-body rounded"
                  key={index}

                  center
                >
                  <MDBCol md="1">
                    <MDBRow style={titleCss}>Số Seri</MDBRow>
                    <MDBRow>{getFirstFiveChars(x.ticketSerial)}*****</MDBRow>
                  </MDBCol>
                  <MDBCol md="2" style={{ marginRight: '2%' }}>
                    <MDBRow style={titleCss}>Tên vé</MDBRow>
                    <MDBRow>{x.genericTicketObject.ticketName}</MDBRow>
                  </MDBCol>
                  {/* <MDBCol md="2">
                  <MDBRow style={titleCss}>Ghi chú</MDBRow>
                  <MDBRow>{x.note}</MDBRow>
                </MDBCol> */}
                  <MDBCol md="2">
                    <MDBRow style={titleCss}>Ngày hết hạn</MDBRow>
                    <MDBRow>{formatDateTime(x.genericTicketObject.expiredDateTime)}</MDBRow>
                  </MDBCol>
                  <MDBCol md="1">
                    <MDBRow style={titleCss}>Thể loại vé</MDBRow>
                    <MDBRow>
                      {x.genericTicketObject.isPaper ? "Giấy" : "Online"}
                    </MDBRow>
                  </MDBCol>
                  <MDBCol md="1">
                    <MDBRow style={titleCss}>Trạng thái</MDBRow>
                    <MDBRow>
                      {x.process === TicketProcess.SELLING ? "Đang bán" : "Không xác định"}

                    </MDBRow>
                  </MDBCol>
                  <MDBCol md="1">
                    <MDBRow style={titleCss}>Kiểm duyệt</MDBRow>
                    <MDBRow>
                      {
                        x.isChecked ?
                          <MDBBadge style={{ width: 'auto' }} color='success' light>Đã duyệt</MDBBadge>
                          :
                          <MDBBadge style={{ width: 'auto' }} color='danger' light>Chờ duyệt</MDBBadge>
                      }
                    </MDBRow>
                  </MDBCol>
                  <MDBCol md="1">
                    <MDBRow style={titleCss}>Hợp lệ</MDBRow>
                    <MDBRow>
                      {
                        x.isValid ?
                          <MDBBadge style={{ width: 'auto' }} color='success' light><MDBIcon fas icon="check" /></MDBBadge>
                          :
                          <MDBBadge style={{ width: 'auto' }} color='danger' light><MDBIcon fas icon="times" /></MDBBadge>
                      }
                    </MDBRow>
                  </MDBCol>
                  <MDBCol md="1">
                    {/* <MDBRow style={titleCss}>Chỉnh sửa</MDBRow> */}
                    <MDBBtn color="info" size="sm" onClick={() => setEditModalOpen(index)}>
                      Chỉnh sửa
                    </MDBBtn>
                  </MDBCol>

                  <MDBCol md="1">
                    <MDBBtn outline color="tertiary" style={{ borderColor: 'fbf9f9' }} size="sm" onClick={() => (toggleOpen(x.ticketSerial))} >
                      Chi tiết
                    </MDBBtn>
                  </MDBCol>

                  <MDBModal open={editModalOpen === index}>
                    <MDBModalDialog centered={true} size="lg">
                      <MDBModalContent>
                        <MDBModalHeader>Chỉnh sửa</MDBModalHeader>
                        <MDBModalBody>
                          <MDBTypography tag="h6">Số Seri: {getFirstFiveChars(x.ticketSerial)}*****</MDBTypography>
                          <hr />
                          <MDBCheckbox
                            id='controlledCheckbox'
                            label='Đánh dấu đã bán'
                            checked={checked}
                            onChange={() => setChecked(!checked)}
                          />
                        </MDBModalBody>
                        <MDBModalFooter>
                          <MDBBtn color="success" disabled={!checked} onClick={() => handleSaveChange(x.ticketId)}>
                            Lưu
                          </MDBBtn>
                          <MDBBtn color="secondary" onClick={() => {
                            setChecked(false)
                            setEditModalOpen(null)
                          }}>
                            Đóng
                          </MDBBtn>
                        </MDBModalFooter>
                      </MDBModalContent>
                    </MDBModalDialog>
                  </MDBModal>

                  <MDBModal open={openTicketId === x.ticketSerial}>
                    <MDBModalDialog centered={true} size="lg">
                      <MDBModalContent>
                        <MDBModalHeader>Chi tiết vé</MDBModalHeader>
                        <MDBModalBody>
                          <MDBRow>
                            {/* Left side: Ticket information */}
                            <MDBCol md="7">
                              <MDBTypography tag="h6">Số Seri:</MDBTypography>
                              <p>{getFirstFiveChars(x.ticketSerial)}*****</p>

                              <MDBTypography tag="h6">Tên vé:</MDBTypography>
                              <p>{x.genericTicketObject.ticketName}</p>

                              <MDBTypography tag="h6">Giá vé:</MDBTypography>
                              <p>{formatToVND(x.genericTicketObject.price)}</p>

                              <MDBTypography tag="h6">Giảm giá:</MDBTypography>
                              <p>{x.genericTicketObject.salePercent}%</p>

                              <MDBTypography tag="h6">
                                Ngày hết hạn:
                              </MDBTypography>
                              <p>{formatDateTime(x.genericTicketObject.expiredDateTime)}</p>

                              <MDBTypography tag="h6">Khu vực:</MDBTypography>
                              <p>{x.genericTicketObject.area}</p>

                              <MDBTypography tag="h6">Loại vé:</MDBTypography>
                              <p>
                                {x.genericTicketObject.isPaper
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
                                src={"data:image/png;base64, " + x.image}
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
