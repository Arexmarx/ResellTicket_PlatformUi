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
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import LoginIcon from "@mui/icons-material/Login";
import * as React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FORGET_PASSWORD_PAGE, MAIN_COLOR } from "../../config/Constant"
import { SIGN_UP_PAGE } from "../../config/Constant"
import AuthContext from "../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handleLoginGoogle = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/google";
}

/**
 * Author: Phan Nguyễn Mạnh Cường
 */
export default function Login() {

  const errorNotification = (str) => toast.error(str)

  const navigate = useNavigate();
  const { loginUser } = React.useContext(AuthContext)

  const [showPassword, setShowPassword] = React.useState(false);
  // Inputs
  const [userNameInput, setUserNameInput] = React.useState();
  const [passwordInput, setPasswordInput] = React.useState();

  //Inputs Error
  const [userNameError, setUserNameError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  // Overall Form Validity
  const [formValid, setFormValid] = React.useState();
  const [success, setSuccess] = React.useState();
  const [loginErrorMessage, setLoginErrorMessage] = React.useState(null);

  //Validation for on Blur Username
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
  //Validation for on Blur Password
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
      setFormValid(
        "Tên đăng nhập không được để trống!"
      );
      errorNotification("Tên đăng nhập không được để trống!")
      return;
    }
    if (passwordError || !passwordInput) {
      setFormValid(
        "Mật khẩu không được để trống"
      );
      errorNotification("Mật khẩu không được để trống")
      return;
    }
    // sendLoginRequest().catch(console.error);
    handleLogin(e)
  };

  async function handleLogin(e) {
    e.preventDefault(); // Prevent default form submission
    try {
      await loginUser(e, userNameInput, passwordInput); // Await the promise
    }
    catch (error) {
      setLoginErrorMessage(error); // Set the error message
      errorNotification(error)
    }
  }


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleForget = () => {
    navigate(FORGET_PASSWORD_PAGE);
  }



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

      <ToastContainer />

      <Card sx={{ minWidth: 500, marginTop: "2%", borderRadius: 3 }}>
        <Typography variant="h3" className="text-center mt-5">
          Đăng Nhập
        </Typography>
        <FormGroup sx={{ margin: 5, minWidth: 450 }}>
          <FormControl sx={{ marginBottom: 3 }}>
            <TextField
              label={"Tên tài khoản"}
              id="margin-none-1"
              fullWidth
              value={userNameInput}
              onChange={(e) => setUserNameInput(e.target.value)}
              error={userNameError}
              onBlur={handleUsername}
              name="username-input"
            />
          </FormControl>
          <FormControl sx={{ marginBottom: 3 }}>
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
              label="Password"
              name="password-input"
            />
          </FormControl>
          {/* {
            loginErrorMessage && <div className="mt-2 mb-3 text-danger">{loginErrorMessage}</div>
          } */}
          <FormControl sx={{ marginBottom: 3 }}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              startIcon={<LoginIcon />}
              fullWidth
              sx={{ mt: 1, backgroundColor: MAIN_COLOR }}
              name="login-btn"
            >
              Đăng nhập
            </Button>
          </FormControl>
          {/* {formValid && (
            <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
              <Alert severity="error" size="small">
                {formValid}
              </Alert>
            </Stack>
          )} */}
          {/* {
            success && (
              <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                <Alert severity="success" size="small">
                  {success}
                </Alert>
              </Stack>
            )
          }*/}
          <FormControl sx={{ marginBottom: 0 }}>
            <div className="d-flex justify-content-between align-items-center">
              <FormControlLabel control={<Checkbox />} label="Ghi nhớ đăng nhập" />
              <div>
                Chưa có tài khoản ?{" "}
                <Link
                  component="button"
                  onClick={() => navigate(SIGN_UP_PAGE)}
                  sx={{ color: MAIN_COLOR }}
                >
                  Đăng ký
                </Link>
              </div>
            </div>
          </FormControl>
          <Link component="button" style={{ color: MAIN_COLOR, textAlign: 'right' }} onClick={handleForget}>Quên mật khẩu ?</Link>

        </FormGroup>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <hr style={{ flexGrow: 1, border: 'none', borderTop: '1px solid #000' }} />
          <span style={{ margin: '0 5px' }}>Hoặc</span>
          <hr style={{ flexGrow: 1, border: 'none', borderTop: '1px solid #000' }} />
        </div>
        <div className="d-flex justify-content-center mb-5 mx-5">

          <Button
            fullWidth={true}
            variant="outlined"
            startIcon={<SvgIcon component={GoogleIcon} />}
            sx={{ mt: 1, color: MAIN_COLOR, borderColor: MAIN_COLOR }}
            onClick={handleLoginGoogle}
          >
            Đăng nhập bằng Google
          </Button>

        </div>
      </Card>
    </div>
  );
}
