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
import LoadEffect from "../../components/LoadEffect";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const TransactionType = [
  { id: 1, name: "Nạp tiền" },
  { id: 2, name: "Rút tiền" },
  { id: 3, name: "Bán vé" },
  { id: 4, name: "Mua vé" },
  { id: 5, name: "Tất cả" }
]

export default function ViewHistoryDeposited() {
  const [user, setUser] = React.useState({});
  const [historyTransactions, setHistoryTransactions] = useState(null);
  const api = useAxios();
  const [selectedTransactionType, setSelectedTransactionType] = useState(0); 

  

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
        const response = await api.get(API.Payment.GET_ALL_TRANSACTION_OF_USER + user.id);
        if (response.data.httpStatus === HttpStatus.OK) {
          console.log(response.data.object);
          setHistoryTransactions(response.data.object);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user.id]);


  if (!Array.isArray(historyTransactions)) {
    return (
      <LoadEffect />
    )
  }

  const handleTransactionTypeChange = (event) => {
    setSelectedTransactionType(event.target.value); // Update state on selection change
  };

  const filteredTransactions = historyTransactions.filter(transaction => 
    transaction.type === selectedTransactionType.name // Filter based on selected type
  );

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
              Lịch sử giao dịch   
            </MDBBtn>
            {/* <MDBBtn style={{ backgroundColor: MAIN_COLOR }}>
              Lịch sử rút tiền
            </MDBBtn> */}
            <MDBRow>
              <MDBCardHeader
                style={{ textAlign: "center", fontSize: "30px", color: "red" }}
              >
                Lịch sử giao dịch
              </MDBCardHeader>
              <hr />

              <MDBRow className="mb-3 mt-2">
                <MDBCol md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Loại giao dịch</InputLabel>
                    <Select
                      value={selectedTransactionType} // Use state value
                      label="Loại giao dịch"
                      onChange={handleTransactionTypeChange} // Handle change
                    >
                      <MenuItem selected={true} value={TransactionType[0]}>{TransactionType[0].name}</MenuItem>
                      <MenuItem value={TransactionType[1]}>{TransactionType[1].name}</MenuItem>
                      <MenuItem value={TransactionType[2]}>{TransactionType[2].name}</MenuItem>
                      <MenuItem value={TransactionType[3]}>{TransactionType[3].name}</MenuItem>
                    </Select>
                  </FormControl>
                </MDBCol>

              </MDBRow>

            </MDBRow>
            <MDBRow>
              <MDBTable>
                <MDBTableHead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Mã giao dịch</th>
                    <th scope="col">Số tiền</th>
                    <th scope="col">Loại giao dịch</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Ngày giao dịch</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {
                    filteredTransactions && filteredTransactions.map((historyDeposited, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{historyDeposited.transactionNo}</td>
                        <td>{formatToVND(historyDeposited.amount)}</td>
                        <td>{historyDeposited.type}</td>
                        <td>{historyDeposited.isDone ? "Thành công" : "Thất bại"}</td>
                        <td>{formatDateTime(historyDeposited.transDate)}</td>
                      </tr>
                    ))
                  }
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
