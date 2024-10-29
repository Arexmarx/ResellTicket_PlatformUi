import {
  Button,
  Card,
  FormControl,
  FormGroup,
  Typography,
  CircularProgress,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import LoginIcon from "@mui/icons-material/Login";
import * as React from "react";
import { green } from "@mui/material/colors";
import { MAIN_COLOR, VERIFY_FORGET_PASSWORD_PAGE } from "../../config/Constant";
import API from "../../config/API";
import useAxios from "../../utils/useAxios";
import axios, { Axios } from "axios";
import HttpStatus from "../../config/HttpStatus";
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
export default function ForgetPasswordPage() {
  const [emailInput, setEmailInput] = React.useState();
  const [emailError, setEmailError] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState({
    status: false,
    message: "",
  });
  const [errorMessage, setErrorMessage] = React.useState({
    status: false,
    message: "",
  });
  const [successSignUp, setSuccessSignUp] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formValid, setFormValid] = React.useState();
  const [flag, setFlag] = React.useState(false);

  const api = useAxios();
  const timer = React.useRef(undefined);
  const buttonSx = {
    ...(successSignUp && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };
  const handleEmail = () => {
    // console.log(isEmail(emailInput));
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage({ status: false, message: "" });
    // console.log(emailInput);

    if (emailError || !emailInput) {
      setFormValid("Email không hợp lệ!");
      return;
    }

    if (!loading) {
      setSuccessSignUp(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccessSignUp(true);
        setLoading(false);
        sendEmailRequestCheck();
      }, 2000);
    }
  };

  const sendEmailRequestCheck = async () => {
    // console.log(emailInput);
    
    setLoading(true);
    try {
      const response = await axios.post(
        API.GATEWAY + API.User.CHECK_EMAIL,
        "",
        {
          params: { email: emailInput },
        }
      );

      if (response.data.httpStatus === HttpStatus.OK) {
        console.log(response.data);
        localStorage.setItem("emailPassword",emailInput)
        setFlag(true);
        setSuccessMessage({
          status: true,
          message: "Mã xác thực đang được gửi qua email!",
        });
        setErrorMessage({
          status: false,
          message: ""
        })
      } else {
        setSuccessMessage({
          status: false,
          message: ""
        })
        setErrorMessage({
          status: true,
          message: "Email chưa được đăng ký",
        });
      }
    } catch (error) {
      console.error(error);
      setErrorMessage({
        status: true,
        message: "Đã xảy ra lỗi, vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#f2f2f2",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ minWidth: 500, marginTop: "2%", borderRadius: 3 }}>
        <Typography variant="h3" className="text-center mt-5">
          Quên mật khẩu
        </Typography>
        <FormGroup sx={{ margin: 5, minWidth: 450 }}>
          <FormControl sx={{ marginBottom: 3 }}>
            <TextField
              name="email_input_filed"
              label={"Nhập Email đăng ký tài khoản"}
              id="margin-none-2"
              fullWidth
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              error={emailError}
              onBlur={handleEmail}
              sx={{ mt: 1 }}
            />
          </FormControl>
          <FormControl sx={{ marginBottom: 3 }}>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              variant="contained"
              startIcon={<LoginIcon />}
              fullWidth
              sx={{ mt: 1, ...buttonSx, backgroundColor: MAIN_COLOR }}
            >
              Gửi mã xác nhận
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </FormControl>
          {formValid && (
            <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
              <Alert severity="error" size="small">
                {formValid}
              </Alert>
            </Stack>
          )}
          {successMessage.message && (
            <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
              <Alert severity="success" size="small">
                {successMessage.message}
                <div>
                  {/* Mã xác thực đã được gửi qua emial.{" "} */}
                  <a href={VERIFY_FORGET_PASSWORD_PAGE}>Xác thực</a>
                </div>
              </Alert>
            </Stack>
          )}
          {errorMessage.message && (
            <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
              <Alert severity="error" size="small">
                {errorMessage.message}
              </Alert>
            </Stack>
          )}
        </FormGroup>
      </Card>
    </div>
  );
}
