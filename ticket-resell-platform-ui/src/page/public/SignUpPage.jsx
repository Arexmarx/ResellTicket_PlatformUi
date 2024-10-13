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
import TextField from "@mui/material/TextField";
import LoginIcon from "@mui/icons-material/Login";
import * as React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LOGIN_PAGE } from "../../config/Constant";
import AuthenticationAPI from "../../service/api/AuthenticationAPI";
import { MAIN_COLOR } from "../../config/Constant";
import { green } from '@mui/material/colors';
import { EMAIL_VERIFY_PAGE} from "../../config/Constant"
import HttpStatus from "../../config/HttpStatus";
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
/**
 * Author: Phan Nguyễn Mạnh Cường
 */
export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  // Inputs
  const [userNameInput, setUserNameInput] = React.useState();
  const [firstNameInput, setFirstNameInput] = React.useState();
  const [lastNameInput, setLastNameInput] = React.useState();
  const [passwordInput, setPasswordInput] = React.useState();
  const [rePasswordInput, setRePasswordInput] = React.useState();
  const [emailInput, setEmailInput] = React.useState();

  //Inputs Error
  const [userNameError, setUserNameError] = React.useState(false);
  const [firstNameError, setFirstNameError] = React.useState();
  const [lastNameError, setLastNameError] = React.useState();
  const [passwordError, setPasswordError] = React.useState(false);
  const [rePasswordError, setRePasswordError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState({ status: false, message: '' }); 
  const [errorMessage, setErrorMessage] = React.useState({ status: false, message: '' })

  // Overall Form Validity
  const [formValid, setFormValid] = React.useState();

  const navigate = useNavigate();

  //loading
  const [loading, setLoading] = React.useState(false);
  const [successSignUp, setSuccessSignUp] = React.useState(false);
  const timer = React.useRef(undefined);
  const buttonSx = {
    ...(successSignUp && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  //Validation for on Blur Username
  const handleUsername = () => {
    if (
      !userNameInput ||
      userNameInput.length < 5 ||
      userNameInput.length > 20
    ) {
      setUserNameError(true);
      return;
    }
    setUserNameError(false);
  };
  //Validation for Blur FirstName
  const handleFirstName = () => {
    if (
      !firstNameInput ||
      firstNameInput.length < 2 ||
      firstNameInput.length > 50
    ) {
      setFirstNameError(true);
      return;
    }
    setFirstNameError(false);
  };
  //Validation for Blur FirstName
  const handleLastName = () => {
    if (
      !lastNameInput ||
      lastNameInput.length < 2 ||
      lastNameInput.length > 50
    ) {
      setLastNameError(true);
      return;
    }
    setLastNameError(false);
  };
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
  //Validation for Blur Re-Password
  const handleRePassword = () => {
    if (!rePasswordInput || rePasswordInput !== passwordInput) {
      setRePasswordError(true);
    } else {
      setRePasswordError(false);
    }
    // setRePasswordError(false);
  };
  //Validation for on Blur Email
  const handleEmail = () => {
    console.log(isEmail(emailInput));
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage({ status: false, message: '' });
    if (userNameError || !userNameInput) {
      setFormValid(
        "Tên đăng nhập phải từ 5 - 15 ký tự!"
      );
      return;
    }
    if (firstNameError || !firstNameInput) {
      setFormValid(
        "Họ và tên từ 2 - 50 ký tự!"
      );
      return;
    }
    if (lastNameError || !lastNameInput) {
      setFormValid(
        "Họ và tên phải từ 2 - 50 ký tự!"
      );
      return;
    }
    if (passwordError || !passwordInput) {
      setFormValid(
        "Mật khẩu phải từ 5 - 50 ký tự!"
      );
      return;
    }
    if (rePasswordError || !rePasswordInput || rePasswordInput !== passwordInput) {
      setFormValid("Mật khẩu nhập lại không hợp lệ!");
      return;
    }

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
        sendRegisterRequest();
      }, 5000);
    }

  };


  const sendRegisterRequest = () => {
    let registerRequest = {
      username: userNameInput,
      password: passwordInput,
      email: emailInput,
      firstname: firstNameInput,
      lastname: lastNameInput
    }

    const fetchData = async () => {
      const response = await AuthenticationAPI.register(registerRequest);
      if (response.data.httpStatus === HttpStatus.CREATED) {
        console.log(response.data);
        
        setSuccessMessage({ status: true, message: response.data.message })
        setErrorMessage({ status: false, message: '' })
      }
      else {
        setErrorMessage({ status: true, message: response.data.message })
        setSuccessMessage({ status: false, message: '' })
      }
    }

    fetchData().catch(console.error)
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
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
          Đăng Ký
        </Typography>
        <FormGroup sx={{ margin: 5, minWidth: 450 }}>
          <FormControl sx={{ marginBottom: 3 }}>
            <TextField
              name="username_input_filed"
              label={"Tên người dùng"}
              id="margin-none-1"
              fullWidth
              value={userNameInput}
              onChange={(e) => setUserNameInput(e.target.value)}
              error={userNameError}
              onBlur={handleUsername}
            />
          </FormControl>
          <FormControl sx={{ marginBottom: 3 }}>
            <TextField
             name="lastname_input_filed"
              label={"Tên"}
              id="margin-none-1"
              fullWidth
              value={lastNameInput}
              onChange={(e) => setLastNameInput(e.target.value)}
              error={lastNameError}
              onBlur={handleLastName}
            />
          </FormControl>
          <FormControl sx={{ marginBottom: 3 }}>
            <TextField
              name="firstname_input_filed"
              label={"Họ"}
              id="margin-none-1"
              fullWidth
              value={firstNameInput}
              onChange={(e) => setFirstNameInput(e.target.value)}
              error={firstNameError}
              onBlur={handleFirstName}
            />
          </FormControl>
          <FormControl sx={{ marginBottom: 3 }}>
            <TextField
             name="email_input_filed"
              label={"Email"}
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
            <InputLabel
              error={passwordError}
              htmlFor="outlined-adornment-password"
            >
              Mật Khẩu
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
              Nhập lại mật khẩu
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
              sx={{ mt: 1, ...buttonSx, backgroundColor: MAIN_COLOR}}
            >
              Đăng Ký
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
          {
            successMessage.message && (
              <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                <Alert severity="success" size="small">
                  {successMessage.message}
                  <div>Mã xác thực đã được gửi qua emial. <a href={EMAIL_VERIFY_PAGE}>Xác thực</a></div>
                </Alert>
              </Stack>
            )
          }
          {
            errorMessage.message && (
              <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                <Alert severity="error" size="small">
                  {errorMessage.message}
                </Alert>
              </Stack>
            )
          }
          <FormControl sx={{ marginBottom: 0 }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                Đã có tài khoản ?{" "}
                <Link
                  name="click_sign_in_button"
                  component="button"
                  onClick={() => navigate(LOGIN_PAGE)}
                  sx={{ color: "#28a745" }}
                >
                  Đăng nhập
                </Link>
              </div>
            </div>
          </FormControl>
        </FormGroup>
      </Card>
    </div>
  );
}
