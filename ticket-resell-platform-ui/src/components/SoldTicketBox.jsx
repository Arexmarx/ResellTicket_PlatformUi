/* eslint-disable react/prop-types */
import { Avatar, Box } from "@mui/material";
import LoadEffect from "./LoadEffect";
import useAxios from "../utils/useAxios";
import { useEffect, useState } from "react";
import API from "../config/API";
import HttpStatus from "../config/HttpStatus";
import { formatToVND, getFirstFiveChars } from "../service/StringService";
import { formatDateTime } from "../service/DateService";
import { TicketProcess } from "../config/Constant";
import { MDBBtn, MDBCardText, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle } from "mdb-react-ui-kit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const titleCss = {
    fontSize: "70%",
    marginBottom: "5px",
};

export default function SoldTicketBox({ user }) {

    const api = useAxios();
    const [boughtTickets, setBoughtTickets] = useState(null);
    const [confirmDeliveredModalOpen, setConfirmDeliveredModalopen]= useState(null)
    const successNotification = (str) => toast.success(str)
    const errorNotification = (str) => toast.error(str)


    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                const reponse = await api.get(API.Ticket.GET_ALL_BOUGHT_TICKET + user.id)
                if (reponse.data.httpStatus === HttpStatus.OK) {
                    //console.log(reponse.data.object)
                    setBoughtTickets(reponse.data.object)
                }
            }
            fetchData().catch(console.error)
        }
    }, [user])


    const handleConfirmDelivered = async (ticketId) => {
        console.log("ticket id" ,ticketId);
        const response = await api.put(API.Ticket.MAKR_DELIVERED_PAPER_TICKET + ticketId) 
        if (response.data.httpStatus === HttpStatus.OK) {
            successNotification(response.data.message)
        }
        else {
            errorNotification(response.data.message)
        }
    }


    if (!Array.isArray(boughtTickets)) {
        return (
            <LoadEffect />
        )
    }

    return (
        <Box>
            <ToastContainer/>
            {
                boughtTickets && boughtTickets.length > 0 &&
                (
                    boughtTickets.map(
                        (item, index) =>
                        (<div key={index} className="row shadow-sm p-3 mb-5 bg-body rounded mx-2">
                            <div className="row d-flex align-content-center">
                                <div className="col-md-1 d-flex justify-content-center align-items-center">
                                    {
                                        item.buyer && <Avatar src={item.buyer.avatar ? "data:image/png;base64, " + item.buyer.avatar : "broken-image.jpg"} />
                                    }

                                </div>
                                <div className="col-md-2">
                                    <div style={titleCss} className="row">
                                        Người mua
                                    </div>
                                    {
                                        item.buyer ? <div className="row">{item.buyer.firstname + " " + item.buyer.lastname}</div> : "(Đánh đấu đã mua)"
                                    }

                                </div>
                                <div className="col-md-2">
                                    <div style={titleCss} className="row">
                                        Tên vé
                                    </div>
                                    <div className="row">
                                        {item.genericTicketObject.ticketName}
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div style={titleCss} className="row">
                                        Mã serial
                                    </div>
                                    <div className="row">
                                        {getFirstFiveChars(item.ticketSerial)}****
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div style={titleCss} className="row">
                                        Giá vé
                                    </div>
                                    <div className="row">
                                        {
                                            formatToVND(item.genericTicketObject.price - (item.genericTicketObject.price * item.genericTicketObject.salePercent / 100))
                                        }
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div style={titleCss} className="row">
                                        Loại vé
                                    </div>
                                    <div className="row">
                                        {item.genericTicketObject.isPaper ? 'Giấy' : 'Online'}
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div style={titleCss} className="row">
                                        Ngày hết hạn
                                    </div>
                                    <div className="row">
                                        {formatDateTime(item.genericTicketObject.expiredDateTime)}
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div style={titleCss} className="row">
                                        Tình trạng
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5">
                                            {item.process === TicketProcess.DELIVERING ? "Đang giao" : "Đã giao"}
                                        </div>
                                        {
                                            item.genericTicketObject.isPaper && item.process === TicketProcess.DELIVERING &&
                                            <div className="col-md-7">
                                                <button onClick={() => setConfirmDeliveredModalopen(item.ticketId)} 
                                                        className="btn btn-success"
                                                >
                                                    Xác nhận đã giao
                                                </button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <MDBModal open={confirmDeliveredModalOpen === item.ticketId} 
                                    onClose={() => setConfirmDeliveredModalopen(null)} tabIndex='-1'
                            >
                                <MDBModalDialog centered={true} size="lg">
                                    <MDBModalContent>

                                        <MDBModalHeader>
                                            <MDBModalTitle className="text-success">Xác nhận đã giao</MDBModalTitle>
                                            <MDBBtn onClick={() => setConfirmDeliveredModalopen(null)} className='btn-close' color='none'></MDBBtn>
                                        </MDBModalHeader>

                                        <MDBModalBody>
                                            <MDBCardText>Tên vé: <strong>{item.genericTicketObject.ticketName}</strong></MDBCardText>
                                            <MDBCardText>Mã serial: <strong>{item.ticketSerial}</strong></MDBCardText>
                                            <MDBCardText></MDBCardText>
                                        </MDBModalBody>

                                        <MDBModalFooter>
                                            <button onClick={() => handleConfirmDelivered(item.ticketId)} className="btn btn-success">Xác nhận</button>
                                        </MDBModalFooter>

                                    </MDBModalContent>
                                </MDBModalDialog>
                            </MDBModal>


                        </div>

                        )
                    )
                )
            }

        </Box>
    )
}
