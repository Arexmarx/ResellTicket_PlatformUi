import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBCardHeader,
  MDBCard,
  MDBCardBody,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import {
  FONT_MAIN,
  MAIN_COLOR,
  VIEW_HISTORY_DEPOSITED_PAGE,
} from "../../config/Constant.js";
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
import { Stack, TextField } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


/**
 * Author: Phan Nguyễn Mạnh Cường
 */

function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );
}

export default function ManageBuyerMoney() {

  const api = useAxios();
  const navigate = useNavigate();
  const [user, setUser] = React.useState({});
  const [money, setMoney] = React.useState("");
  const [link, setLink] = React.useState();
  const [withdrawalAmount, setWithdrawalAmount] = useState(0)
  const [bankNumber, setBankNumber]= useState('')

  const successNotification = (str) => toast.success(str)
  const errorNotification = (str) => toast.error(str)
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);


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

  // console.log(paymentResponse);
  useEffect(() => {
    if (paymentResponse) {
      if (paymentResponse?.object) {
        setSuccessMessage({ status: true, message: paymentResponse.message });
        setErrorMessage({ status: false, message: "" });
      } else {
        setErrorMessage({ status: true, message: "Nạp Không thành công" });
        setSuccessMessage({ status: false, message: "" });
      }
    }
  }, [paymentResponse]);

  const checkValidAmount = () => {
    return money >= 10000 && money % 1000 === 0;
  }

  const handleWithdrawal = async () => {
    const withdrawalRequest = {
      userId: user.id,
      amount: withdrawalAmount
    };
    if (bankNumber) {
      if (withdrawalAmount >= 10000 && withdrawalAmount % 1000 === 0) {
        const response = await api.post(API.Payment.WITHDRAWAL_AMOUNT, withdrawalRequest)
        if (response.data.httpStatus === HttpStatus.OK) {
          successNotification(response.data.message)
          await timeout(1500)
          window.location.reload()
        }
        else {
          errorNotification(response.data.message)
        }
      }
      else errorNotification("Số tiền nhập vào không hợp lệ!")
    }
    else errorNotification("Số tài khoản không được để trống!")
  }

  const handleDeposite = () => {
    if (checkValidAmount(money)) {
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
            // console.log(response.data);
            setLink(response.data.object);
          }
        } catch (error) {
          // console.error(error);  
          errorNotification(error);
        }
      };
      if (!link) fetchData();
    }
    else {
      errorNotification("Số tiền nạp không hợp lệ!")
    }
  };

  const handleCustomAmountChange = (event) => {
    const input = event.target.value;
    if (!isNaN(input) && Number(input) >= 0) {
      setMoney(input);
    }
  };

  useEffect(() => {
    if (link) window.location.href = link;
  }, [link]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(API.User.GET_USER_INFO);
      if (response.data.httpStatus === HttpStatus.OK) {
        // console.log(response.data.object);
        setUser(response.data.object);
      }
    };
    fetchData().catch(console.error);
  }, []);

  const handleViewDeposited = () => {
    navigate(VIEW_HISTORY_DEPOSITED_PAGE);
  };


  return (
    <div>
      <Header />
      <MDBContainer fluid mb="5">
        <ToastContainer />
        <MDBRow style={{ marginTop: "7%" }}>
          <MDBCol md="2">
            <SideBar user={user} sideBarOption={SidebarOption.BALANCE} />
          </MDBCol>
          <MDBCol md="10">
            <MDBBtn
              style={{ backgroundColor: MAIN_COLOR, marginRight: "2%" }}
              onClick={handleViewDeposited}
            >
              Lịch sử giao dịch
            </MDBBtn>
            <MDBBtn onClick={() => setWithdrawalModalOpen(!withdrawalModalOpen)} style={{ backgroundColor: MAIN_COLOR }}>
              Rút tiền
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
                        Chọn số tiền bạn muốn nạp
                      </InputLabel>
                      <Select
                        labelId="select-money-label"
                        id="select-money"
                        value={money}
                        label="Chọn số tiền bạn muốn nạp"
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
                      <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                        <hr style={{ flexGrow: 1, border: 'none', borderTop: '1px solid #000' }} />
                        <span style={{ margin: '0 10px' }}>Hoặc</span>
                        <hr style={{ flexGrow: 1, border: 'none', borderTop: '1px solid #000' }} />
                      </div>
                      <TextField
                        fullWidth
                        label="Nhập số tiền khác"
                        variant="outlined"
                        value={money}
                        onChange={handleCustomAmountChange}
                        style={{ marginBottom: "1rem", marginTop: '2%' }}
                        name="input-amount"
                      />
                    </FormControl>

                    <MDBBtn
                      style={{ backgroundColor: MAIN_COLOR, width: "100%" }}
                      onClick={handleDeposite}
                      name="deposite-btn"
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

        <MDBModal open={withdrawalModalOpen} onClose={() => setWithdrawalModalOpen(false)} tabIndex='-1'>
          <MDBModalDialog centered={true}>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Rút tiền</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={() => setWithdrawalModalOpen(false)}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <label className="label-control">Nhập số tài khoản của bạn<span className="text-danger">*</span> </label>
                <input onChange={(e) => setBankNumber(e.target.value)} className="form-control" />
                <label className="label-control mt-2">Nhập số tiền<span className="text-danger">*</span></label>
                <input onChange={(e) => setWithdrawalAmount(e.target.value)} className="form-control" />
                <p className="mt-2 text-danger"><strong>Lưu ý</strong>: Số tiền rút tối thiểu 10.000đ</p>
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color='secondary' onClick={() => setWithdrawalModalOpen(false)}>
                  Đóng
                </MDBBtn>
                <MDBBtn onClick={handleWithdrawal} color="success">Xác nhận</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </MDBContainer>

      <Footer />
    </div>
  );
}
