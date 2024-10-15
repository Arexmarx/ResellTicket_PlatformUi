/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import HttpStatus from "../config/HttpStatus";
import API from "../config/API";
import LoadEffect from "./LoadEffect";
import {
  MDBBadge,
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBRow,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";
import {
  ADD_TICKET_PAGE,
  MAIN_COLOR,
  SidebarOption,
  TicketProcess,
} from "../config/Constant";
import { formatDateTime } from "../service/DateService";
import { formatToVND, getFirstFiveChars } from "../service/StringService";
import { Alert, Avatar, Stack } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const titleCss = {
  marginBottom: "5px",
  fontSize: "70%",
};
export default function BoughtTicketBox({ user }) {
  const api = useAxios();
  const [boughtTickets, setBoughtTickets] = useState([]);
  const [openTicketId, setOpenTicketId] = useState(null);
  const [openReport, setOpenReport] = useState(null);
  const [typeReport, setTypeReport] = useState("");

  const [contentReport, setContentReport] = useState(null);
  const [imageReport, setImageReport] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [TicketId, setTicketId] = useState(null);
  const [staffId, setStaffId] = useState(null);

  const [reportType, setReportType] = useState([]);

  const [successMessage, setSuccessMessage] = useState({
    status: false,
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
  });

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const response = await api.get(
          API.Ticket.GET_ALL_BOUGHT_TICKET_BY_BUYER + user?.id
        );
        if (response.data.httpStatus === HttpStatus.OK) {
          console.log(response.data.object);
          setBoughtTickets(response.data.object);
        }
      };
      fetchData().catch(console.error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(API.ReportType.GET_ALL_REPORT_TYPE);

        if (response.data.httpStatus === HttpStatus.OK) {
          console.log(response.data.object);
          setReportType(response.data.object); // Set only the object field
        }
      } catch (error) {
        console.error("Error fetching report types:", error);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageReport(file);

    // Generate preview URL
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
    }
  };

  const handleSubmitReport = async () => {
    let reportFraudRequest = {
      content: contentReport,
      reportTypeId: typeReport,
      ticketId: TicketId,
      accuserId: user.id,
      staffId: staffId,
    };

    const file = await fetch(imageReport).then((res) => res.blob());
    const formData = new FormData();
    formData.append(
      "reportFraudRequest",
      new Blob([JSON.stringify(reportFraudRequest)], {
        type: "application/json",
      })
    );
    formData.append("proofFile", file);
    api
      .post(API.Report.CREATE_REPORT_API, formData)
      .then((response) => {
        if (response.data.httpStatus === HttpStatus.CREATED) {
          setSuccessMessage({ status: true, message: "Báo cáo thành công" });
          setErrorMessage({ status: false, message: "" });
        } else {
          setErrorMessage({ status: true, message: "Báo cáo đã tồn tại" });
          setSuccessMessage({ status: false, message: "" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!user || !boughtTickets) {
    return <LoadEffect />;
  }

  const toggleOpen = (ticketId) => {
    // Toggle collapse for specific ticket by ID
    setOpenTicketId(openTicketId === ticketId ? null : ticketId);
  };

  const toggleOpenReport = (x) => {
    setTicketId(x.ticketId);
    setStaffId(x.verifyStaffId);
    setOpenReport(openReport === x.ticketId ? null : x.ticketId);

    console.log(reportType);
  };

  const handleChange = (event) => {
    setTypeReport(event.target.value);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <div>
      <MDBContainer fluid>
        <MDBCol>
          <MDBRow style={{ marginLeft: "1%", marginRight: "1%" }}>
            {boughtTickets &&
              boughtTickets.map(
                (x, index) =>
                  x.process === TicketProcess.SUCCESS && (
                    <MDBRow
                      className="shadow-sm p-3 mb-5 bg-body rounded"
                      key={index}
                      center
                    >
                      <MDBCol md="1">
                        <MDBRow style={titleCss}>Số Seri</MDBRow>
                        <MDBRow>
                          {getFirstFiveChars(x.ticketSerial)}*****
                        </MDBRow>
                      </MDBCol>
                      <MDBCol md="3" style={{ marginRight: "2%" }}>
                        <MDBRow style={titleCss}>Tên vé</MDBRow>
                        <MDBRow>{x.genericTicketObject.ticketName}</MDBRow>
                      </MDBCol>
                      {/* <MDBCol md="2">
                  <MDBRow style={titleCss}>Ghi chú</MDBRow>
                  <MDBRow>{x.note}</MDBRow>
                </MDBCol> */}
                      <MDBCol md="2">
                        <MDBRow style={titleCss}>Ngày hết hạn</MDBRow>
                        <MDBRow>
                          {formatDateTime(
                            x.genericTicketObject.expiredDateTime
                          )}
                        </MDBRow>
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
                          {x.process === TicketProcess.SUCCESS ? (
                            <MDBBadge
                              style={{ width: "auto" }}
                              color="success"
                              light
                            >
                              Hoàn thành
                            </MDBBadge>
                          ) : (
                            "Không xác định"
                          )}
                        </MDBRow>
                      </MDBCol>
                      <MDBCol md="1">
                        <MDBRow style={titleCss}>Tải ảnh vé</MDBRow>
                        <MDBRow>
                          <MDBIcon
                            fas
                            icon="arrow-down"
                            size="lg"
                            style={{ marginTop: "3%" }}
                          />
                        </MDBRow>
                      </MDBCol>
                      <MDBCol md="1">
                        <MDBBtn
                          outline
                          color="tertiary"
                          style={{ borderColor: "fbf9f9" }}
                          size="sm"
                          onClick={() => toggleOpen(x.ticketSerial)}
                        >
                          Chi tiết
                        </MDBBtn>
                      </MDBCol>
                      <MDBCol md="1">
                        <MDBBtn
                          outline
                          color="danger"
                          style={{ borderColor: "fbf9f9" }}
                          size="sm"
                          onClick={() => toggleOpenReport(x)}
                          disabled={(() => {
                            const currentDate = new Date();
                            const expiredDate = new Date(
                              x.genericTicketObject.expiredDateTime
                            );
                            const diffInDays =
                              (currentDate - expiredDate) /
                              (1000 * 60 * 60 * 24);
                            return !(diffInDays > 0 && diffInDays <= 3); // Only enable if 0 < diffInDays <= 3
                          })()}
                        >
                          Báo cáo
                        </MDBBtn>
                      </MDBCol>

                      <MDBModal open={openReport === x.ticketId}>
                        <MDBModalDialog centered={true} size="lg">
                          <MDBModalContent>
                            <MDBModalHeader>Báo cáo vé</MDBModalHeader>
                            <MDBModalBody>
                              <MDBRow>
                                {/* Left side: Ticket information */}
                                <MDBCol md="7">
                                  <MDBTypography tag="h6">
                                    Tên vé:
                                  </MDBTypography>
                                  <p>{x.genericTicketObject.ticketName}</p>

                                  <MDBTypography tag="h6">
                                    Giá vé:
                                  </MDBTypography>
                                  <p>
                                    {formatToVND(x.genericTicketObject.price)}
                                  </p>

                                  <MDBTypography tag="h6">
                                    Ngày hết hạn:
                                  </MDBTypography>
                                  <p>
                                    {formatDateTime(
                                      x.genericTicketObject.expiredDateTime
                                    )}
                                  </p>

                                  <MDBTypography tag="h6">
                                    Loại vé:
                                  </MDBTypography>
                                  <p>
                                    {x.genericTicketObject.isPaper
                                      ? "Vé giấy"
                                      : "Vé online"}
                                  </p>
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
                              <hr />
                              <MDBRow>
                                <MDBCol md="1">
                                  <Avatar
                                    src={
                                      x.genericTicketObject.seller.avatar
                                        ? "data:image/png;base64, " +
                                          x.genericTicketObject.seller.avatar
                                        : "broken-image.jpg"
                                    }
                                  />
                                </MDBCol>
                                <MDBCol md="2">
                                  <MDBRow style={titleCss}>Người bán</MDBRow>
                                  <MDBRow>
                                    {x.genericTicketObject.seller.firstname +
                                      " " +
                                      x.genericTicketObject.seller.lastname}
                                  </MDBRow>
                                </MDBCol>
                                <MDBCol md="4">
                                  <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                      Chọn thể loại báo cáo
                                    </InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={typeReport}
                                      label="chọn thể loại báo cáo"
                                      onChange={handleChange}
                                    >
                                      {reportType.map((reportType, index) => (
                                        <MenuItem
                                          value={reportType.id}
                                          key={index}
                                        >
                                          {reportType.name}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </MDBCol>
                                <MDBCol md="4">
                                  <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    sx={{ backgroundColor: MAIN_COLOR }}
                                  >
                                    Tải ảnh vé lên
                                    <VisuallyHiddenInput
                                      type="file"
                                      onChange={handleImageChange}
                                      multiple
                                    />
                                  </Button>
                                </MDBCol>
                                {/* Image Preview */}
                                {imagePreviewUrl && (
                                  <MDBCol md="8" className="text-center">
                                    <img
                                      src={imagePreviewUrl}
                                      alt="Ticket Preview"
                                      className="img-fluid"
                                      style={{
                                        maxHeight: "200px",
                                        borderRadius: "10px",
                                        marginTop: "15px",
                                      }}
                                    />
                                  </MDBCol>
                                )}
                                <MDBCol md="12" style={{ marginTop: "2%" }}>
                                  <MDBTextArea
                                    label="Nhập chi tiết nội dung báo cáo"
                                    rows="4"
                                    onChange={(content) =>
                                      setContentReport(content.target.value)
                                    }
                                  ></MDBTextArea>
                                </MDBCol>
                              </MDBRow>
                            </MDBModalBody>
                            <MDBModalFooter>
                              <MDBBtn
                                color="secondary"
                                onClick={toggleOpenReport}
                              >
                                Đóng
                              </MDBBtn>
                              <MDBBtn
                                color="success"
                                onClick={handleSubmitReport}
                              >
                                Nộp báo cáo
                              </MDBBtn>
                            </MDBModalFooter>
                            {successMessage.message && (
                              <Stack
                                sx={{ width: "100%", paddingTop: "10px" }}
                                spacing={2}
                              >
                                <Alert severity="success" size="small">
                                  {successMessage.message}
                                </Alert>
                              </Stack>
                            )}
                            {errorMessage.message && (
                              <Stack
                                sx={{ width: "100%", paddingTop: "10px" }}
                                spacing={2}
                              >
                                <Alert severity="error" size="small">
                                  {errorMessage.message}
                                </Alert>
                              </Stack>
                            )}
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
                                  <MDBTypography tag="h6">
                                    Số Seri:
                                  </MDBTypography>
                                  <p>
                                    {getFirstFiveChars(x.ticketSerial)}*****
                                  </p>

                                  <MDBTypography tag="h6">
                                    Tên vé:
                                  </MDBTypography>
                                  <p>{x.genericTicketObject.ticketName}</p>

                                  <MDBTypography tag="h6">
                                    Giá vé:
                                  </MDBTypography>
                                  <p>
                                    {formatToVND(x.genericTicketObject.price)}
                                  </p>

                                  <MDBTypography tag="h6">
                                    Giảm giá:
                                  </MDBTypography>
                                  <p>{x.genericTicketObject.salePercent}%</p>

                                  <MDBTypography tag="h6">
                                    Ngày hết hạn:
                                  </MDBTypography>
                                  <p>
                                    {formatDateTime(
                                      x.genericTicketObject.expiredDateTime
                                    )}
                                  </p>

                                  <MDBTypography tag="h6">
                                    Khu vực:
                                  </MDBTypography>
                                  <p>{x.genericTicketObject.area}</p>

                                  <MDBTypography tag="h6">
                                    Loại vé:
                                  </MDBTypography>
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
                  )
              )}
          </MDBRow>
        </MDBCol>
      </MDBContainer>
    </div>
  );
}
