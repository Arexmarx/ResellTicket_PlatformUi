/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import HttpStatus from "../config/HttpStatus";
import API from "../config/API";
import LoadEffect from "./LoadEffect";
import {
  MDBBadge,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import { formatDateTime } from "../service/DateService";
import {  getFirstFiveChars } from "../service/StringService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TicketProcess } from "../config/Constant";
const titleCss = {
  marginBottom: "5px",
  fontSize: "70%",
};


export default function DeliveringTicketBox({ user }) {

  const api = useAxios();
  const [boughtTickets, setBoughtTickets] = useState([]);


  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const response = await api.get(
          API.Ticket.GET_ALL_BOUGHT_TICKET_BY_BUYER + user?.id
        );
        if (response.data.httpStatus === HttpStatus.OK) {
          console.log(response.data.object);
          setBoughtTickets(response.data.object);
        }
      };
      fetchData().catch(console.error);
    }
  }, [user]);


  if (!boughtTickets) {
    return <LoadEffect />;
  }


  if (!boughtTickets) {
    return (
      <LoadEffect/>
    )
  }


  return (
    <div>
      <MDBContainer fluid>
        <ToastContainer/>
        <MDBCol>
          <MDBRow style={{ marginLeft: "1%", marginRight: "1%" }}>
            {boughtTickets &&
              boughtTickets.map(
                (x, index) =>
                  x.process === TicketProcess.DELIVERING && !x.isRated && (
                    <MDBRow
                      className="shadow-sm mt-3 p-3 bg-body rounded"
                      key={index}
                      center
                    >
                      <MDBCol md="1">
                        <MDBRow style={titleCss}>Số Seri</MDBRow>
                        <MDBRow>
                          {getFirstFiveChars(x.ticketSerial)}*****
                        </MDBRow>
                      </MDBCol>
                      <MDBCol md="2" style={{ marginRight: "2%" }}>
                        <MDBRow style={titleCss}>Tên vé</MDBRow>
                        <MDBRow>{x.genericTicketObject.ticketName}</MDBRow>
                      </MDBCol>
                      {/* <MDBCol md="2">
                  <MDBRow style={titleCss}>Ghi chú</MDBRow>
                  <MDBRow>{x.note}</MDBRow>
                </MDBCol> */}
                      <MDBCol md="2">
                        <MDBRow style={titleCss}>Ngày hết hạn</MDBRow>
                        <MDBRow>
                          {formatDateTime(
                            x.genericTicketObject.expiredDateTime
                          )}
                        </MDBRow>
                      </MDBCol>
                      <MDBCol md="1">
                        <MDBRow style={titleCss}>Thể loại vé</MDBRow>
                        <MDBRow>
                          {x.genericTicketObject.isPaper ? "Giấy" : "Online"}
                        </MDBRow>
                      </MDBCol>
                      <MDBCol md="1">
                        <MDBRow style={titleCss}>Trạng thái</MDBRow>
                        <MDBRow>
                          {x.process === TicketProcess.DELIVERING ? (
                            <MDBBadge
                              style={{ width: "auto" }}
                              color="success"
                              light
                            >
                              Đang giao hàng
                            </MDBBadge>
                          ) : (
                            "Không xác định"
                          )}
                        </MDBRow>
                      </MDBCol>
                      <MDBCol md="1">

                      </MDBCol>
                      <MDBCol md="2">
                        <MDBRow>
                            <button className="btn btn-success" style={{ width:'auto' }}>Xác nhận đã giao</button>
                        </MDBRow>
                      </MDBCol>
                      <MDBCol md="1">

                      </MDBCol>
                    </MDBRow>


                  )
              )}
          </MDBRow>
        </MDBCol>
      </MDBContainer>
    </div>
  );
}
