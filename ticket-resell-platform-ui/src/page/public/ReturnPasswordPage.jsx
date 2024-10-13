import {
  Button,
  Card,
  FormControl,
  FormGroup,
  InputLabel,
  Link,
  Typography,
  OutlinedInput,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import LoginIcon from "@mui/icons-material/Login";
import * as React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LOGIN_PAGE, MAIN_COLOR } from "../../config/Constant";
import { green } from "@mui/material/colors";
import axios from "axios";
import API from "../../config/API";
import HttpStatus from "../../config/HttpStatus";
export default function ReturnPasswordPage() {
  const emailPassword = localStorage.getItem("emailPassword");
  
  const [showPassword, setShowPassword] = React.useState(false);
  // Inputs
  const [passwordInput, setPasswordInput] = React.useState();
  const [rePasswordInput, setRePasswordInput] = React.useState();
  //Inputs Error
  const [passwordError, setPasswordError] = React.useState(false);
  const [rePasswordError, setRePasswordError] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState({
    status: false,
    message: "",
  });
  const [errorMessage, setErrorMessage] = React.useState({
    status: false,
    message: "",
  });
  const [successSignUp, setSuccessSignUp] = React.useState(false);
  // Overall Form Validity
  const [formValid, setFormValid] = React.useState();

  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  //Validation for on Blur Password
  const handlePassword = () => {
    if (
      !passwordInput ||
      passwordInput.length < 5 ||
      passwordInput.length > 50
    ) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage({ status: false, message: "" });
    if (passwordError || !passwordInput) {
      setFormValid("Mật khẩu phải từ 5 - 50 ký tự!");
      return;
    }
    if (
      rePasswordError ||
      !rePasswordInput ||
      rePasswordInput !== passwordInput
    ) {
      setFormValid("Mật khẩu nhập lại không hợp lệ!");
      return;
    }

    if (!loading) {
      setSuccessSignUp(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccessSignUp(true);
        setLoading(false);
        updatePassword();
      }, 5000);
    }
  };

  const updatePassword = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        API.GATEWAY + API.User.SET_NEW_PASSWORD,
        "",
        { params: { newPass: passwordInput, email: emailPassword } }
      );
      if(response.data.httpStatus === HttpStatus.OK){
        setSuccessMessage({
          status: true,
          message: "Đổi mật khẩu thành công",
        });
      } else{
        setErrorMessage({
          status: true,
          message: "Đã xảy ra lỗi, vui lòng thử lại.",
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
  //Validation for Blur Re-Password
  const handleRePassword = () => {
    if (!rePasswordInput || rePasswordInput !== passwordInput) {
      setRePasswordError(true);
    } else {
      setRePasswordError(false);
    }
    // setRePasswordError(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const timer = React.useRef(undefined);
  const buttonSx = {
    ...(successSignUp && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
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
          Đổi Mật Khẩu
        </Typography>
        <FormGroup sx={{ margin: 5, minWidth: 450 }}>
          <FormControl sx={{ marginBottom: 3 }}>
            <InputLabel
              error={passwordError}
              htmlFor="outlined-adornment-password"
            >
              Mật Khẩu mới
            </InputLabel>
            <OutlinedInput
              name="password_input_filed"
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              error={passwordError}
              onBlur={handlePassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Mật Khẩu"
            />
          </FormControl>
          <FormControl sx={{ marginBottom: 3 }}>
            <InputLabel
              error={rePasswordError}
              htmlFor="outlined-adornment-re-password"
            >
              Nhập lại mật khẩu mới
            </InputLabel>
            <OutlinedInput
              name="re_password_input_filed"
              id="outlined-adornment-re-password"
              type={showPassword ? "text" : "password"}
              value={rePasswordInput}
              onChange={(e) => setRePasswordInput(e.target.value)}
              error={rePasswordError}
              onBlur={handleRePassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Nhập lại mật khẩu"
            />
          </FormControl>
          <FormControl sx={{ marginBottom: 3 }}>
            <Button
              name="click_sign_up_button"
              onClick={handleSubmit}
              disabled={loading}
              variant="contained"
              startIcon={<LoginIcon />}
              fullWidth
              sx={{ mt: 1, ...buttonSx, backgroundColor: MAIN_COLOR }}
            >
              Đổi mật khẩu
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
                  <a href={LOGIN_PAGE}>Đăng nhập</a>
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
