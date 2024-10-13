import { useState } from "react";
import Footer from "../../components/Footer";
import UserAPI from "../../service/api/UserAPI";
import HttpStatus from "../../config/HttpStatus";
import { useNavigate } from "react-router-dom";
import { LOGIN_PAGE, RETURN_PASSWORD_PAGE } from "../../config/Constant";
import useAxios from "../../utils/useAxios";
import { Alert, Stack } from "@mui/material";
import axios from "axios";
import API from "../../config/API";
export default function VerifyForgetPasswordPage() {
  // Simple inline styles
  const styles = {
    otpContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "20px",
    },
    inputContainer: {
      display: "flex",
      justifyContent: "space-between",
      width: "200px",
    },
    inputBox: {
      width: "50px",
      height: "70px",
      textAlign: "center",
      fontSize: "20px",
      margin: "5px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    submitButton: {
      marginTop: "20px",
      padding: "10px 20px",
      backgroundColor: "#007BFF",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  const navigator = useNavigate();

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [message, setMessage] = useState({ status: false, message: "" });

  const handleChange = (element, index) => {
    // Validate only number inputs
    if (!isNaN(element.value)) {
      let newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);

      // Move to the next input field after typing
      if (element.nextSibling && element.value !== "") {
        element.nextSibling.focus();
      }
    }
  };
  const handleKeyDown = (e, index) => {
    // Move to the previous input field if backspace is pressed and input is empty
    if (e.key === "Backspace" && otp[index] === "") {
      if (e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");

    if (finalOtp.length === 6) {
      const fetchData = async () => {
        const response = await axios.post(API.GATEWAY + API.User.SEND_PASSWORD_OTP,"",{params:{verificationCode: finalOtp}});
        if (response.data.httpStatus === HttpStatus.OK) {
          setMessage({
            status: true,
            message: "Mã xác nhận thành công",
          });
        } else {
          setMessage({
            status: false,
            message: "Mã xác nhận thất bại",
          });
        }
      };
      fetchData().catch(console.error);
    } else {
      alert("Yêu cầu nhập đủ 6 số của OTP");
    }
  };

  return (
    <div>
      <h1 className="text-center mb-4" style={{ paddingTop: "200px" }}>
        Nhập mã xác thực
      </h1>
      <div className="text-center mt-3 mb-3 text-danger">
        Chú ý: Mã xác thực có hiệu lực trong vòng 5 phút!
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <form className="" onSubmit={handleSubmit}>
          <div>
            {otp.map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                style={styles.inputBox}
                value={otp[index]}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          <button
            onClick={handleSubmit}
            style={{
              marginLeft: "30%",
              marginTop: "10%",
            }}
            type="submit"
            className="btn btn-success"
          >
            Xác nhận
          </button>
          {message.message && message.status && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="success">
                {message.message}. <a href={RETURN_PASSWORD_PAGE}>Đổi mật khẩu</a>
              </Alert>
            </Stack>
          )}

          {message.message && !message.status && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error">{message.message}</Alert>
            </Stack>
          )}
          <div style={{ marginBottom: "300px" }}></div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
