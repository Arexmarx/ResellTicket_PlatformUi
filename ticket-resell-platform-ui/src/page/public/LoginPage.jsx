import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Link,
  SvgIcon,
  Typography,
  OutlinedInput,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import {
  MDBCard,
  MDBCardImage,
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBCardFooter,
  MDBIcon,
} from "mdb-react-ui-kit";
import GoogleIcon from "@mui/icons-material/Google";
import LoginIcon from "@mui/icons-material/Login";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../context/AuthContext";
import {
  FORGET_PASSWORD_PAGE,
  SIGN_UP_PAGE,
  MAIN_COLOR,
  HOME_PAGE,
} from "../../config/Constant";

const handleLoginGoogle = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/google";
};

export default function Login() {
  const errorNotification = (str) => toast.error(str);
  const navigate = useNavigate();
  const { loginUser } = React.useContext(AuthContext);

  const [showPassword, setShowPassword] = React.useState(false);
  const [userNameInput, setUserNameInput] = React.useState();
  const [passwordInput, setPasswordInput] = React.useState();
  const [userNameError, setUserNameError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [formValid, setFormValid] = React.useState();
  const [success, setSuccess] = React.useState();
  const [loginErrorMessage, setLoginErrorMessage] = React.useState(null);

  const handleUsername = () => {
    if (
      !userNameInput ||
      userNameInput.length <= 0 ||
      userNameInput.length > 20
    ) {
      setUserNameError(true);
      return;
    }
    setUserNameError(false);
  };

  const handlePassword = () => {
    if (
      !passwordInput ||
      passwordInput.length <= 0 ||
      passwordInput.length > 20
    ) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(null);
    if (userNameError || !userNameInput) {
      setFormValid("Tên đăng nhập không được để trống!");
      errorNotification("Tên đăng nhập không được để trống!");
      return;
    }
    if (passwordError || !passwordInput) {
      setFormValid("Mật khẩu không được để trống");
      errorNotification("Mật khẩu không được để trống");
      return;
    }
    handleLogin(e);
  };

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await loginUser(e, userNameInput, passwordInput);
    } catch (error) {
      setLoginErrorMessage(error);
      errorNotification(error);
    }
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleForget = () => navigate(FORGET_PASSWORD_PAGE);
  const handleHomepage = () => navigate(HOME_PAGE);
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        background: "#f2f2f2",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <ToastContainer />
      <Card
        sx={{
          width: 900,
          maxHeight: "90vh",
          overflowY: "auto",
          padding: 2,
          boxShadow: 5,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <MDBRow>
          <MDBCol md="6" style={{ position: "relative" }}>
            <MDBCard
              className="text-white d-flex justify-content-center align-items-center"
              style={{ height: "100%", textAlign: "center" }}
            >
              <MDBCardImage
                src="/src/assets/logo/LogoHeader-Photoroom.png"
                alt="Logo"
                style={{ width: "80%", objectFit: "contain" }}
              />
            </MDBCard>
            <Link
              component="button"
              onClick={handleHomepage}
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                margin: "10px",
                color: "black", // Default color
                "&:hover": {
                  color: MAIN_COLOR, // Hover color
                },
              }}
            >
              <MDBIcon fas icon="home" /> Về trang chủ
            </Link>
          </MDBCol>
          <MDBCol md="6">
            <Typography
              variant="h5"
              className="text-center mt-4"
              sx={{ color: MAIN_COLOR, fontWeight: "bold" }}
            >
              Đăng Nhập
            </Typography>
            <FormGroup sx={{ margin: 3, minWidth: 350 }}>
              <FormControl sx={{ marginBottom: 2 }}>
                <TextField
                  label="Tên tài khoản"
                  fullWidth
                  value={userNameInput}
                  onChange={(e) => setUserNameInput(e.target.value)}
                  error={userNameError}
                  onBlur={handleUsername}
                  name="username-input"
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </FormControl>
              <FormControl sx={{ marginBottom: 2 }}>
                <InputLabel
                  error={passwordError}
                  htmlFor="outlined-adornment-password"
                >
                  Mật khẩu
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  error={passwordError}
                  onBlur={handlePassword}
                  label="Mật khẩu"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  name="password-input"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </FormControl>
              <FormControl sx={{ marginBottom: 2 }}>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  startIcon={<LoginIcon />}
                  fullWidth
                  sx={{ backgroundColor: MAIN_COLOR }}
                  name="login-btn"
                >
                  Đăng nhập
                </Button>
              </FormControl>
              <FormControl sx={{ marginBottom: 0 }}>
                <div className="d-flex justify-content-between align-items-center">
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Ghi nhớ đăng nhập"
                  />
                  <Link
                    component="button"
                    onClick={() => navigate(SIGN_UP_PAGE)}
                    sx={{ color: MAIN_COLOR }}
                  >
                    Đăng ký
                  </Link>
                </div>
              </FormControl>
              <Link
                component="button"
                sx={{
                  color: MAIN_COLOR,
                  display: "block",
                  textAlign: "right",
                  mt: 1,
                }}
                onClick={handleForget}
              >
                Quên mật khẩu ?
              </Link>
            </FormGroup>
            <div className="d-flex align-items-center my-3">
              <hr style={{ flexGrow: 1, borderTop: "1px solid #ccc" }} />
              <span style={{ margin: "0 10px" }}>Hoặc</span>
              <hr style={{ flexGrow: 1, borderTop: "1px solid #ccc" }} />
            </div>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<SvgIcon component={GoogleIcon} />}
              sx={{
                color: MAIN_COLOR,
                borderColor: MAIN_COLOR,
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" },
              }}
              onClick={handleLoginGoogle}
            >
              Đăng nhập bằng Google
            </Button>
          </MDBCol>
        </MDBRow>
      </Card>
    </div>
  );
}
