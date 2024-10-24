import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios"
import API from "../config/API";
import HttpStatus from "../config/HttpStatus";
import { Avatar, Box, Divider, Rating } from "@mui/material";
import { formatToVND } from "../service/StringService";
import { formatDateTime } from "../service/DateService";
import { MDBCollapse, MDBContainer, MDBRow } from "mdb-react-ui-kit";


const titleCss = {
  fontSize: "70%",
  marginBottom: "5px",
};

export default function RatedTicketBox({ user }) {

  const api = useAxios();
  const [ratedGenericTickets, setRatedGenericTickets] = useState([])

  const [basicModal, setBasicModal] = useState(null)
  const handleBasicModal = (id) => {
    setBasicModal(id === basicModal ? null : id)
  }

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const response = await api.get(API.GenericTicket.GET_RATED_GENERIC_TICKET_BY_BUYER + user.id)
        if (response.data.httpStatus === HttpStatus.OK) {
          console.log(response.data.object);
          setRatedGenericTickets(response.data.object)
        }
      }
      fetchData().catch(console.error)
    }
  }, [])

  return (
    ratedGenericTickets != null && ratedGenericTickets.length > 0 &&
    ratedGenericTickets.map((item, index) => (
      <Box key={index}>
        <div className="row mt-3 shadow-sm p-3 mb-5 bg-body rounded">
          <div className="row d-flex align-content-center ">
            <div className="col-md-1 d-flex justify-content-center align-items-center">
              <Avatar src={item.seller.avatar ? "data:image/png;base64, " + item.seller.avatar : "broken-image.jpg"} />
            </div>
            <div className="col-md-2">
              <div style={titleCss} className="row">
                Người bán
              </div>
              <div className="row">{item.seller.firstname + " " + item.seller.lastname}</div>
            </div>
            <div className="col-md-2">
              <div style={titleCss} className="row">
                Tên vé
              </div>
              <div className="row">{item.ticketName}</div>
            </div>
            <div className="col-md-1">
              <div style={titleCss} className="row">
                Giá bán
              </div>
              <div className="row">{formatToVND(item.price)}</div>
            </div>
            <div className="col-md-1">
              <div style={titleCss} className="row">
                Loại vé
              </div>
              <div className="row">{item.isPaper ? 'Giấy' : 'Online'}</div>
            </div>
            <div className="col-md-1">
              <div style={titleCss} className="row">
                Số lượng
              </div>
              <div className="row">x{item.tickets.length}</div>
            </div>
            <div className="col-md-2">
              <div style={{ ...titleCss, marginLeft: 5 }}  className="row">
                Số sao đánh giá
              </div>
              <div className="row">
                <Rating name="simple-controlled" value={item.stars} readOnly={true}/>
              </div>
            </div>

            {/* <div className="col-md-1">
            <div style={titleCss} className="row">
              Ngày mua
            </div>
            <div className="row">{item.boughtDate}</div>
          </div> */}
            <div className="col-md-1">
              <div style={titleCss} className="row">
                Tình trạng
              </div>
              <div className="row">
                Đã đánh giá
              </div>
            </div>
          </div>
          <div className="row mt-3 mb-3">
            <Divider />
          </div>
          <div className="d-flex justify-content-end">
            <div>
              <button onClick={() => handleBasicModal(item.id)} className="btn btn-link">Chi tiết</button>
            </div>
          </div>
        </div>
        <MDBCollapse open={basicModal === item.id} onClose={() => setBasicModal(null)} >
          <MDBContainer fluid>
            <MDBRow>
              {
                item.tickets ?
                  item.tickets.map((detail, index) => (
                    <div key={index}>
                      <p>Mã số vé: {detail.ticketSerial}</p>
                      <p>Ngày mua: {formatDateTime(detail.boughtDate)}</p>
                      {/* <img src={detail.image} alt="" /> */}
                    </div>
                  ))
                  : ''
              }
            </MDBRow>
          </MDBContainer>
        </MDBCollapse>

      </Box>
    ))

  )
}
