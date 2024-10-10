import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCardImage,
  MDBBtn,
  MDBCardHeader,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { FONT_MAIN, MAIN_COLOR } from "../../config/Constant.js";
import { SidebarOption } from "../../config/Constant";
import SideBar from "../../components/SideBar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { formatToVND } from "../../service/StringService.js";
import useAxios from "../../utils/useAxios.jsx";
import HttpStatus from "../../config/HttpStatus.js";
import API from "../../config/API.js";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLocation, useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
/**
 * Author: Phan Nguyễn Mạnh Cường
 */
export default function ManageBuyerMoney() {
  const [user, setUser] = React.useState({});
  const api = useAxios();

  const [money, setMoney] = React.useState("");

  const [link, setLink] = React.useState();

  const handleChange = (event) => {
    setMoney(event.target.value);
  };

  const location = useLocation();
  const { paymentResponse } = location.state || {};
  const [successMessage, setSuccessMessage] = React.useState({
    status: false,
    message: "",
  });
  const [errorMessage, setErrorMessage] = React.useState({
    status: false,
    message: "",
  });

  console.log(paymentResponse)
  useEffect(() => {
    if (paymentResponse) {
      if (paymentResponse?.object) {
        setSuccessMessage({ status: true, message: paymentResponse.message });
        setErrorMessage({ status: false, message: '' });
      } else {
        setErrorMessage({ status: true, message: 'Nạp Không thành công' });
        setSuccessMessage({ status: false, message: '' });
      }
    }
  }, [paymentResponse]);

  const handleDeposite = () => {
    const fetchData = async () => {
      try {
        const response = await api.get(API.Payment.DEPOSITED_USER_API, {
          params: {
            amount: money,
            orderInfo: "DEPOSIT",
            customerCode: user?.customerCode,
          },
        });
        if (response.data.httpStatus === HttpStatus.OK) {
          console.log(response.data);
          setLink(response.data.object);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (!link) fetchData(); // Only call fetchData here without recursion
  };

  useEffect(() => {
    if (link) window.location.href = link;
  }, [link]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(API.User.GET_USER_INFO);
      if (response.data.httpStatus === HttpStatus.OK) {
        console.log(response.data.object);
        setUser(response.data.object);
      }
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div>
      <Header />
      <MDBContainer fluid mb="5">
        <MDBRow style={{ marginTop: "7%" }}>
          <MDBCol md="2">
            <SideBar user={user} sideBarOption={SidebarOption.BALANCE} />
          </MDBCol>
          <MDBCol md="10">
            <MDBBtn style={{ backgroundColor: MAIN_COLOR, marginRight: "2%" }}>
              Lịch sử nạp tiền
            </MDBBtn>
            <MDBBtn style={{ backgroundColor: MAIN_COLOR }}>
              Lịch sử rút tiền
            </MDBBtn>
            <MDBRow>
              <MDBCardHeader
                style={{ textAlign: "center", fontSize: "30px", color: "red" }}
              >
                Tiền của bạn: {formatToVND(user?.balance)}
              </MDBCardHeader>
              <hr />
            </MDBRow>
            <MDBRow>
              <Alert
                severity="info"
                style={{ fontFamily: FONT_MAIN, fontSize: 16 }}
              >
                <AlertTitle style={{ fontFamily: FONT_MAIN }}>
                  <strong style={{ fontSize: "20px" }}>Thông báo</strong>
                </AlertTitle>
                <p>
                  Nạp vào số điện thoại sẽ không được xử lí, vui lòng chọn các
                  phương thức nạp bên dưới và làm theo hướng dẫn
                </p>
                <p style={{ color: "red" }}>
                  * Quan trọng! Chỉ chấp nhận giao dịch từ 10,000đ, những giao
                  dịch thấp hơn sẽ không được cộng tiền.
                </p>
                <p style={{ color: "red" }}>
                  * Quan trọng! Chuyển khoản Ngân hàng sẽ bị chậm vì hệ thống
                  ngân hàng có thay đổi, hệ thống sẽ tự cập nhật sau khi nhận
                  được tiền, vui lòng bình tĩnh đừng hối~
                </p>
              </Alert>
            </MDBRow>
            <MDBRow style={{ marginTop: "2%", marginBottom: "2%" }}>
              <MDBCol>
                <MDBCard>
                  <MDBCardHeader
                    style={{
                      textAlign: "center",
                      fontSize: "24px",
                      color: MAIN_COLOR,
                    }}
                  >
                    Thông tin nạp tiền
                  </MDBCardHeader>
                  <MDBCardBody>
                    {/* <p>
                      <strong>Ngân hàng:</strong> Ngân hàng Thương mại cổ phần
                      Đầu tư và Phát triển Việt Nam
                    </p>
                    <p>
                      <strong>Số tài khoản:</strong> 7621904570
                    </p>
                    <p>
                      <strong>Tên người nhận:</strong> Phan Nguyễn Mạnh Cường
                    </p>
                    <p>Hoặc bạn có thể mở app ngân hàng, quét mã sau:</p>
                    <MDBCardImage
                      src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(4).jpg"
                      alt="QR Code"
                      position="top"
                      style={{ width: "100%", marginBottom: "1rem" }}
                    /> */}

                    <FormControl fullWidth style={{ marginBottom: "1rem" }}>
                      <InputLabel id="select-money-label">
                        Nhập số tiền của bạn
                      </InputLabel>
                      <Select
                        labelId="select-money-label"
                        id="select-money"
                        value={money}
                        label="Nhập số tiền của bạn"
                        onChange={handleChange}
                      >
                        <MenuItem value={10000}>{formatToVND(10000)}</MenuItem>
                        <MenuItem value={20000}>{formatToVND(20000)}</MenuItem>
                        <MenuItem value={50000}>{formatToVND(50000)}</MenuItem>
                        <MenuItem value={100000}>
                          {formatToVND(100000)}
                        </MenuItem>
                        <MenuItem value={200000}>
                          {formatToVND(200000)}
                        </MenuItem>
                        <MenuItem value={500000}>
                          {formatToVND(500000)}
                        </MenuItem>
                        <MenuItem value={1000000}>
                          {formatToVND(1000000)}
                        </MenuItem>
                        <MenuItem value={5000000}>
                          {formatToVND(5000000)}
                        </MenuItem>
                        <MenuItem value={10000000}>
                          {formatToVND(10000000)}
                        </MenuItem>
                      </Select>
                    </FormControl>

                    <MDBBtn
                      style={{ backgroundColor: MAIN_COLOR, width: "100%" }}
                      onClick={handleDeposite}
                    >
                      Nạp tiền
                    </MDBBtn>
                    {successMessage.message && (
                      <Stack
                        sx={{ width: "100%", paddingTop: "10px" }}
                        spacing={2}
                      >
                        <Alert severity="success" size="small">
                          {successMessage.message}
                          <div></div>
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
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol>
                <MDBCardHeader style={{ fontSize: "20px" }}>
                  Bảng tỉ lệ quy đổi
                </MDBCardHeader>
                <MDBRow style={{ marginTop: "2%" }}>
                  <MDBCol>
                    <MDBCardHeader>Số tiền nạp</MDBCardHeader>
                    <p>10,000 đ</p>
                    <p>20,000 đ</p>
                    <p>30,000 đ</p>
                    <p>40,000 đ</p>
                    <p>50,000 đ</p>
                    <p>100,000 đ</p>
                    <p>200,000 đ</p>
                    <p>500,000 đ</p>
                    <p>1,000,000 đ</p>
                    <p>...</p>
                  </MDBCol>
                  <MDBCol>
                    <MDBCardHeader>Số tiền nhận</MDBCardHeader>
                    <p>10,000 đ</p>
                    <p>20,000 đ</p>
                    <p>30,000 đ</p>
                    <p>40,000 đ</p>
                    <p>50,000 đ</p>
                    <p>100,000 đ</p>
                    <p>200,000 đ</p>
                    <p>500,000 đ</p>
                    <p>1,000,000 đ</p>
                    <p>...</p>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <Footer />
    </div>
  );
}
