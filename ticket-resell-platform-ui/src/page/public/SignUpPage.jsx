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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import LoginIcon from "@mui/icons-material/Login";
import * as React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {LOGIN_PAGE} from "../../config/Constant"
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
/**
 * Author: Phan Nguyễn Mạnh Cường
 */
export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  // Inputs
  const [userNameInput, setUserNameInput] = React.useState();
  const[firstNameInput, setFirstNameInput] = React.useState();
  const[lastNameInput, setLastNameInput] = React.useState();
  const [passwordInput, setPasswordInput] = React.useState();
  const [rePasswordInput, setRePasswordInput] = React.useState();
  const [emailInput, setEmailInput] = React.useState();

  //Inputs Error
  const [userNameError, setUserNameError] = React.useState(false);
  const[firstNameError, setFirstNameError] = React.useState();
  const[lastNameError, setLastNameError] = React.useState();
  const [passwordError, setPasswordError] = React.useState(false);
  const [rePasswordError, setRePasswordError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);

  // Overall Form Validity
  const [formValid, setFormValid] = React.useState();
  const [success, setSuccess] = React.useState();

  const navigate = useNavigate();
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
  const handleFirstName =() => {
    if(!firstNameInput || firstNameInput.length < 5 || firstNameInput.length > 50){
      setFirstNameError(true);
      return;
    }
    setFirstNameError(false);
  }
    //Validation for Blur FirstName
    const handleLastName =() => {
      if(!lastNameInput || lastNameInput.length < 5 || lastNameInput.length > 50){
        setLastNameError(true);
        return;
      }
      setLastNameError(false);
    }
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
  const handleRePassword = () => {
    if (!rePasswordInput && rePasswordInput !== passwordInput ) {
      setRePasswordError(true);
      return;
    }
    setRePasswordError(false);
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
    setSuccess(null);
    if (userNameError || !userNameInput) {
      setFormValid(
        "Username is set btw 5 - 15 characters long. Please Re-Enter"
      );
      return;
    }
    if (firstNameError || !firstNameInput) {
      setFormValid(
        "First Name is set btw 5 - 50 characters long. Please Re-Enter"
      );
      return;
    }
    if (lastNameError || !lastNameInput) {
      setFormValid(
        "Last Name is set btw 5 - 50 characters long. Please Re-Enter"
      );
      return;
    }
    if (passwordError || !passwordInput) {
      setFormValid(
        "Password is set btw 5 - 20 characters long. Please Re-Enter"
      );
      return;
    }
    if (rePasswordError || !rePasswordInput || rePasswordInput !== passwordInput) {
      setFormValid("Re-Password is not the same as Password. Please Re-Enter");
      return;
    }
    
    if (emailError || !emailInput) {
      setFormValid("Email is Invalid. Please Re-Enter");
      return;
    }
    setFormValid(null);
    setSuccess("Form Submitted Successfully");
  };

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
          Sign Up
        </Typography>
        <FormGroup sx={{ margin: 5, minWidth: 450 }}>
          <FormControl sx={{ marginBottom: 3 }}>
            <TextField
              label={"User Name"}
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
              label={"First Name"}
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
              label={"Last Name"}
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
              Password
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
            />
          </FormControl>
          <FormControl sx={{ marginBottom: 3 }}>
            <InputLabel
              error={rePasswordError}
              htmlFor="outlined-adornment-password"
            >
              Re-Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
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
              label="Password"
            />
          </FormControl>
          <FormControl sx={{ marginBottom: 3 }}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              startIcon={<LoginIcon />}
              fullWidth
              sx={{ mt: 1, backgroundColor: "#28a745" }}
            >
              Sign Up
            </Button>
          </FormControl>
          {formValid && (
            <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
              <Alert severity="error" size="small">
                {formValid}
              </Alert>
            </Stack>
          )}
          {success && (
            <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
              <Alert severity="success" size="small">
                {success}
              </Alert>
            </Stack>
          )}
          <FormControl sx={{ marginBottom: 0 }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                Already Have Account ?{" "}
                <Link
                  component="button"
                  onClick={() => navigate(LOGIN_PAGE)}
                  sx={{ color: "#28a745" }}
                >
                  Login
                </Link>
              </div>
            </div>
          </FormControl>
        </FormGroup>
      </Card>
    </div>
  );
}
