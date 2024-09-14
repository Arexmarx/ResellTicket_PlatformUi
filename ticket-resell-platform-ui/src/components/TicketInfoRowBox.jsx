/* eslint-disable react/prop-types */
import { Avatar, Box, Button, Divider } from "@mui/material";
import { formatToVND, stringAvatar } from "../service/StringService";

const titleCss = {
    fontSize: '70%',
    marginBottom: '5px'
}
/*
* Author: Nguyen Tien Thuan
*/
export default function TicketInfoRowBox({ticket}) {
    return (
        <Box>
            <div className="row mt-3 shadow-sm p-3 mb-5 bg-body rounded">
                <div className="row d-flex align-content-center ">
                    <div className="col-md-1 d-flex justify-content-center align-items-center">
                        <Avatar {...stringAvatar(ticket.seller.name)} />
                    </div>
                    <div className="col-md-2">
                        <div style={titleCss} className="row">Người bán</div>
                        <div className="row">{ticket.seller.name}</div>
                    </div>
                    <div className="col-md-2">
                        <div style={titleCss} className="row">Tên vé</div>
                        <div className="row">{ticket.ticketName}</div>
                    </div>
                    <div className="col-md-1">
                        <div style={titleCss} className="row">Giá bán</div>
                        <div className="row">{formatToVND(ticket.price)}</div>
                    </div>
                    <div className="col-md-1">
                        <div style={titleCss} className="row">Loại vé</div>
                        <div className="row">{ticket.ticketType.name}</div>
                    </div>
                    <div className="col-md-2">
                        <div style={titleCss} className="row">Ngày bắt đầu - kết thúc sự kiện</div>
                        <div className="row">{ticket.event.startDate} - {ticket.event.endDate}</div>
                    </div>
                    <div className="col-md-1">
                        <div style={titleCss} className="row">Số lượng</div>
                        <div className="row">x{ticket.quantity}</div>
                    </div>
                    <div className="col-md-1">
                        <div style={titleCss} className="row">Ngày mua</div>
                        <div className="row">{ticket.boughtDate}</div>
                    </div>
                    <div className="col-md-1">
                        <div style={titleCss} className="row">Tình trạng</div>
                        <div className="row">{ticket.process.name}</div>
                    </div>
                </div>
                <div className="row mt-3 mb-3"><Divider/></div>
                <div className="d-flex justify-content-end">   
                    <div>
                        <Button sx={{ marginRight: 2 }} variant="contained" color="info">Đánh giá</Button>
                        <Button sx={{ marginRight: 2 }} variant="contained" color="success">Xem chi tiết</Button>
                        <Button sx={{ marginRight: 2 }} variant="contained" color="error">Hủy đơn hàng</Button>
                    </div>
                </div>

            </div>
        </Box>

    )
}
