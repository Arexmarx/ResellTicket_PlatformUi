import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  InputLabel,
  Link,
  SvgIcon,
  Typography,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import LoginIcon from "@mui/icons-material/Login";
import * as React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {HOME_PAGE,SIGN_UP_PAGE} from "../../config/Constant"
/**
 * Author: Phan Nguyễn Mạnh Cường
 */
export default function Login() {
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
  //Validation for on Blur Password
  const handlePassword = () => {
    if (
      !passwordInput ||
      passwordInput.length < 5 ||
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
        "Username is set btw 5 - 15 characters long. Please Re-Enter"
      );
      return;
    }
    if (passwordError || !passwordInput) {
      setFormValid(
        "Password is set btw 5 - 20 characters long. Please Re-Enter"
      );
      return;
    }
    setFormValid(null);
    setSuccess("Form Submitted Successfully");
    navigate(HOME_PAGE);
  };

  const sendLoginRequest = () => {
    
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
          Log in
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
            <Button
              onClick={handleSubmit}
              variant="contained"
              startIcon={<LoginIcon />}
              fullWidth
              sx={{ mt: 1, backgroundColor: "#2dc275" }}
            >
              Log in
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
              <FormControlLabel control={<Checkbox />} label="Remember me" />
              <div>
                Not have account?{" "}
                <Link
                  component="button"
                  onClick={() => navigate(SIGN_UP_PAGE)}
                  sx={{ color: "#2dc275" }}
                >
                  Register
                </Link>
              </div>
            </div>
          </FormControl>
        </FormGroup>
        <hr />
        <div className="d-flex justify-content-center mb-5 mx-5">
          <Button
            fullWidth={true}
            variant="outlined"
            startIcon={<SvgIcon component={GoogleIcon} />}
            sx={{ mt: 1, color: "#2dc275" }}
          >
            Login with Google
          </Button>
        </div>
      </Card>
    </div>
  );
}
