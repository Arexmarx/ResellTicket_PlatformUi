import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCardImage,
  MDBBtn,
  MDBCardHeader
} from "mdb-react-ui-kit";
import { FONT_MAIN, MAIN_COLOR, USER_ID_KEY } from "../../config/Constant.js";
import { SidebarOption } from "../../config/Constant";
import SideBar from "../../components/SideBar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { formatToVND} from'../../service/StringService.js'
import UserAPI from "../../service/api/UserAPI.js";
/**
 * Author: Phan Nguyễn Mạnh Cường
 */
export default function ManageBuyerMoney() {

  const [user, setUser] = useState({});

    useEffect(() => {
        let userId = localStorage.getItem(USER_ID_KEY);
        if (userId) {
            const fetchData = async () => {
                const response = await UserAPI.getUserInfo(userId);
                setUser(response.data.object)
            }
            fetchData().catch(console.error);
        }
    }, [])

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
                Tiền của bạn: {formatToVND(user.balance)}
              </MDBCardHeader>
              <hr />
            </MDBRow>
            <MDBRow>
              <Alert severity="info" style={{ fontFamily: FONT_MAIN, fontSize: 16 }}>
                <AlertTitle style={{ fontFamily: FONT_MAIN }}><strong style={{fontSize:'20px'}}>Thông báo</strong></AlertTitle>
                <p>Nạp vào số điện thoại sẽ không được xử lí, vui lòng chọn các phương thức nạp bên dưới và làm theo hướng dẫn</p>
                <p style={{color:'red'}}>* Quan trọng! Chỉ chấp nhận giao dịch từ 10,000đ, những giao dịch thấp hơn sẽ không được cộng tiền.</p>
                <p style={{color:'red'}}>* Quan trọng! Chuyển khoản Ngân hàng sẽ bị chậm vì hệ thống ngân hàng có thay đổi, hệ thống sẽ tự cập nhật sau khi nhận được tiền, vui lòng bình tĩnh đừng hối~</p>
              </Alert>
            </MDBRow>
            <MDBRow style={{marginTop:'2%',marginBottom:'2%'}}>
                <MDBCol>
                    <p>Ngân hàng:<strong>Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam</strong></p>
                    <p>Số tài khoản:<strong>7621904570</strong></p>
                    <p>Tên người nhận:<strong>Phan Nguyễn Mạnh Cường</strong></p>
                    <p>Hoặc bạn có thể mở app ngân hàng, quét mã sau</p>
                    <MDBCardImage src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(4).jpg' alt={''} position='top'/>
                </MDBCol>
                <MDBCol>
                    <MDBCardHeader style={{fontSize:'20px'}}>Bảng tỉ lệ quy đổi</MDBCardHeader>
                    <MDBRow style={{marginTop:'2%'}}>
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
                            <p>1,00,000 đ</p>
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
                            <p>1,00,000 đ</p>
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
