import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  MDBBtn,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import useAxios from "../../utils/useAxios";
import HttpStatus from "../../config/HttpStatus";
import API from "../../config/API";
import { MAIN_COLOR, SidebarOption } from "../../config/Constant";
import { formatToVND } from "../../service/StringService";
import { formatDateTime } from "../../service/DateService";

export default function ViewHistoryDeposited() {
  const [user, setUser] = React.useState({});
  const [depositedHistoryList, setDepositedHistoryList] = useState([]);
  const api = useAxios();
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(API.User.GET_USER_INFO);
      if (response.data.httpStatus === HttpStatus.OK) {
        console.log(response.data.object);
        setUser(response.data.object);
      }
    };
    fetchData().catch(console.error);
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(API.Payment.VIEW_DEPOSITED_HISTORY_API + user.id);
        if (response.data.httpStatus === HttpStatus.OK) {
          console.log(response.data.object);
          setDepositedHistoryList(response.data.object);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [user.id]); // add user.id to dependency array
  

  return (
    <div>
      <Header />
      <MDBContainer fluid>
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
                Lịch sử giao dịch
              </MDBCardHeader>
              <hr />
            </MDBRow>
            <MDBRow>
              <MDBTable>
                <MDBTableHead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Mã giao dịch</th>
                    <th scope="col">Số tiền</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Ngày giao dịch</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {depositedHistoryList.map((historyDeposited, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{historyDeposited.transactionNo}</td>
                      <td>{formatToVND(historyDeposited.amount)}</td>
                      <td>{historyDeposited.isDone ? "Thành công" : "Thất bại"}</td>
                      <td>{formatDateTime(historyDeposited.transDate)}</td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer />
    </div>
  );
}
