import { Avatar, Box } from "@mui/material";
import useAxios from "../utils/useAxios";
import { useEffect, useState } from "react";
import LoadEffect from "./LoadEffect";
import API from "../config/API";
import HttpStatus from "../config/HttpStatus";
import { formatToVND } from "../service/StringService";
import { formatDateTime } from "../service/DateService";
import { MDBBadge } from "mdb-react-ui-kit";

const titleCss = {
    fontSize: "70%",
    marginBottom: "5px",
};

export default function CanceledOrderTicketBox({ user }) {

    const api = useAxios();
    const [canceledOrderTicket, setCanceledOrderTicket] = useState([]);

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                const response = await api.get(API.GenericTicket.GET_CANCELED_ORDER_TICKET + user.id)
                if (response.data.httpStatus == HttpStatus.OK) {
                    // console.log(response.data.object)
                    setCanceledOrderTicket(response.data.object)
                }
                else {
                    console.log(response)
                }
            }
            fetchData().catch(console.error)
        }
    }, [])


    if (!canceledOrderTicket) {
        return (
            <LoadEffect />
        )
    }

    return (
        canceledOrderTicket != null && canceledOrderTicket.length > 0 &&
        canceledOrderTicket.map((item, index) => (
            <Box key={index}>
                <div className="row mt-3 shadow-sm p-3 mb-5 bg-body rounded">
                    <div className="row d-flex align-content-center ">
                        <div className="col-md-1 d-flex justify-content-center align-items-center">
                            <Avatar src={item.genericTicket.seller.avatar ? "data:image/png;base64, " + item.genericTicket.seller.avatar : "broken-image.jpg"} />
                        </div>
                        <div className="col-md-2">
                            <div style={titleCss} className="row">
                                Người bán
                            </div>
                            <div className="row">{item.genericTicket.seller.firstname + " " + item.genericTicket.seller.lastname}</div>
                        </div>
                        <div className="col-md-2">
                            <div style={titleCss} className="row">
                                Tên vé
                            </div>
                            <div className="row">{item.genericTicket.ticketName}</div>
                        </div>
                        <div className="col-md-1">
                            <div style={titleCss} className="row">
                                Giá bán
                            </div>
                            <div className="row">{formatToVND(item.totalPrice)}</div>
                        </div>
                        <div className="col-md-1">
                            <div style={titleCss} className="row">
                                Loại vé
                            </div>
                            <div className="row">{item.genericTicket.isPaper ? 'Giấy' : 'Online'}</div>
                        </div>
                        <div className="col-md-2">
                            <div style={titleCss} className="row">
                                Ngày bắt đầu - kết thúc sự kiện
                            </div>
                            <div className="row">
                                {formatDateTime(item.genericTicket.event.startDate)} - {formatDateTime(item.genericTicket.event.endDate)}
                            </div>
                        </div>
                        <div className="col-md-1">
                            <div style={titleCss} className="row">
                                Số lượng
                            </div>
                            <div className="row">x{item.quantity}</div>
                        </div>
                        <div className="col-md-1">
                            <div style={titleCss} className="row">
                                Tình trạng
                            </div>
                            <div className="row">
                                <MDBBadge style={{ width: 'auto' }} color='danger' light>
                                    Đã hủy
                                </MDBBadge>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        ))

    );
}
