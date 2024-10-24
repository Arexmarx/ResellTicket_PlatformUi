/* eslint-disable react/prop-types */
import { Alert, Avatar, Box } from "@mui/material";
import useAxios from "../utils/useAxios";
import { useEffect, useState } from "react";
import API from "../config/API";
import LoadEffect from "./LoadEffect";
import HttpStatus from "../config/HttpStatus";
import { formatToVND } from "../service/StringService";
import { formatDateTime } from "../service/DateService";
import { MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle } from "mdb-react-ui-kit";

const titleCss = {
    fontSize: "70%",
    marginBottom: "5px",
};

export default function OrderTicketInfo({ user }) {

    const api = useAxios();
    const [requestOrders, setRequestOrders] = useState(null)


    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(API.GenericTicket.GET_REQUEST_ORDER_TICKET + user?.id)
            if (response.data.httpStatus === HttpStatus.OK) {
                console.log(response.data.object)
                setRequestOrders(response.data.object)
            }
        }
        fetchData().catch(console.error)
    }, [])


    const [basicModal, setBasicModal] = useState(false);
    const [denyModal, setDenyModal] = useState(false);
    const [openOrderRequestModal, setOpenOrderRequestModal] = useState()
    const [denyOrderRequestModal, setDenyOrderRequestModal] = useState()

    const toggleOpen = (id) => {
        setOpenOrderRequestModal(openOrderRequestModal == id ? null : id)
    };
    const denyToggleOpen = (id) => {
        setDenyOrderRequestModal(denyOrderRequestModal == id ? null : id)
    }

    const [acceptResponseMessage, setAcceptResponseMessage] = useState({ status: false, message:'' })
    const [denyResponseMessage, setDenyResponseMessage] = useState({ status: false, message:'' })
    

    // Accept to sell ticket api
    const acceptSellingRequest = async (item) => {
        const acceptOrDenySellingRequest = {
            orderNo: item.orderNo,  
            buyerId: item.buyer.id,
            sellerId: user.id ,
            genericTicketId: item.genericTicket.id,
            quantity: item.quantity,
            totalPrice: item.totalPrice,
            isAccepted: true,
            note: '',
            isPaper: item.genericTicket.isPaper
        }
        // console.log(acceptOrDenySellingRequest);
        const response = await api.post(API.Ticket.ACCEPT_SELLING_TICKET_REQUEST, acceptOrDenySellingRequest)
        if (response.data.httpStatus === HttpStatus.OK) {
            console.log(response.data)
            setAcceptResponseMessage({ status: true, message: response.data.message })
        }
        else {
            console.log(response.data)
            setAcceptResponseMessage({ status: false, message: response.data.message })
        }
    }

    // Deny selling request api
    const [denyNote, setDenyNote] = useState('')
    const handleDenyNoteChange = (e) => {
        setDenyNote(e.target.value);
    }
    const [denyNoteMessage, setDenyNoteMessage] = useState({ status: false, message:'' })

    const denySellingRequest = async (item) => {
        console.log("Item: ",item );
        if (denyNote) {
            const acceptOrDenySellingRequest = {
                orderNo: item.orderNo,  
                buyerId: item.buyer.id,
                sellerId: user.id,
                genericTicketId: item.genericTicket.id,
                quantity: item.quantity,
                totalPrice: item.totalPrice,
                isAccepted: false,
                note: denyNote
            }
            console.log(acceptOrDenySellingRequest);
            const response = await api.post(API.Ticket.DENY_SELLING_TICKET_REQUEST, acceptOrDenySellingRequest)
            if (response.data.httpStatus === HttpStatus.OK) {
                setDenyNoteMessage({ status: true, message: '' })
                console.log(response.data.message)
                setDenyResponseMessage({ status: true, message: response.data.message })
            }
            else {
                console.log(response.data.message);
                
                setDenyResponseMessage({ status: false, message: response.data.message })
            }
        }
        else {
            setDenyNoteMessage({ status: false, message: 'Lý do từ chối không được để trống!' })
        }
    }


    if (!Array.isArray(requestOrders)) {
        return (
            <LoadEffect />
        )
    }


    return (
        <Box>
            {
                requestOrders && requestOrders.length > 0 &&
                (
                    requestOrders.map(
                        (item, index) =>
                        ( item.isAccepted === false &&  item.note =='' &&  <div key={index} className="row shadow-sm p-3 mb-5 bg-body rounded mx-2">
                            <div className="row d-flex align-content-center">
                                <div className="col-md-1 d-flex justify-content-center align-items-center">
                                    <Avatar src={item.buyer.avatar ? "data:image/png;base64, " + item.buyer.avatar : "broken-image.jpg"} />
                                </div>
                                <div className="col-md-2">
                                    <div style={titleCss} className="row">
                                        Người mua
                                    </div>
                                    <div className="row">{item.buyer.firstname + " " + item.buyer.lastname}</div>
                                </div>
                                <div className="col-md-2">
                                    <div style={titleCss} className="row">
                                        Tên vé
                                    </div>
                                    <div className="row">
                                        {item.genericTicket.ticketName}
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div style={titleCss} className="row">
                                        Số lượng
                                    </div>
                                    <div className="row">
                                        <span style={{ width: 'auto' }} className="badge rounded-pill badge-success">x{item.quantity}</span>
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div style={titleCss} className="row">
                                        Tổng tiền
                                    </div>
                                    <div className="row">
                                        {formatToVND(item.totalPrice)}
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div style={titleCss} className="row">
                                        Loại vé
                                    </div>
                                    <div className="row">
                                        {item.genericTicket.isPaper ? 'Giấy' : 'Online'}
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div style={titleCss} className="row">
                                        Ngày hết hạn
                                    </div>
                                    <div className="row">
                                        {formatDateTime(item.genericTicket.expiredDateTime)}
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div style={titleCss} className="row">
                                        Vé còn lại
                                    </div>
                                    <div className="row">
                                        <span style={{ width: 'auto' }} className="badge rounded-pill badge-primary">
                                            x{item.ticketList.length}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div style={titleCss} className="row">
                                        Xác nhận
                                    </div>
                                    <div className="row">
                                        <div style={{ marginLeft: '-10%' }} className="col-md-4">
                                            <button disabled={item.ticketList.length < item.quantity} 
                                                    onClick={() => toggleOpen(index)}
                                                className="btn btn-success btn-sm">
                                                    Bán
                                            </button>
                                        </div>
                                        <div className="col-md-2"></div>
                                        <div className="col-md-4">
                                            <button onClick={() => denyToggleOpen(index)} 
                                                    className="btn btn-danger btn-sm">
                                                Hủy
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <MDBModal open={index === openOrderRequestModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
                                    <MDBModalDialog centered={true} size="lg">
                                        <MDBModalContent>

                                            <MDBModalHeader>
                                                <MDBModalTitle className="text-success">Xác nhận đơn hàng</MDBModalTitle>
                                                <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                                            </MDBModalHeader>

                                            <MDBModalBody>
                                                <div className="mt-3">Xác nhận đơn hàng cúa:&nbsp;
                                                    <strong>{item.buyer.firstname + " " + item.buyer.lastname}</strong>
                                                </div>
                                                <div className="mt-3">Số lượng: <span style={{ width: 'auto' }} className="badge rounded-pill badge-success">x{item.quantity}</span></div>
                                                <div className="mt-3 mb-3">Tổng tiền: <strong>{formatToVND(item.totalPrice)}</strong></div>
                                                <div>
                                                    {
                                                        acceptResponseMessage.message &&
                                                        acceptResponseMessage.status &&
                                                        <Alert severity="success">{acceptResponseMessage.message}</Alert>
                                                    }
                                                    {
                                                        acceptResponseMessage.message &&
                                                        !acceptResponseMessage.status &&
                                                        <Alert severity="success">{acceptResponseMessage.message}</Alert>
                                                    }
                                                    {/* {
                                                        acceptResponseMessage.message?
                                                        (
                                                            acceptResponseMessage.status && <Alert severity="success">{acceptResponseMessage.message}</Alert>
                                                        )
                                                        :
                                                        (
                                                            !acceptResponseMessage.status ? <Alert severity="error">{acceptResponseMessage.message}</Alert> : null
                                                        )
                                                    } */}
                                                </div>
                                            </MDBModalBody>

                                            <MDBModalFooter>
                                                <button onClick={() => acceptSellingRequest(item)} className="btn btn-success">Xác nhận</button>
                                            </MDBModalFooter>

                                        </MDBModalContent>
                                    </MDBModalDialog>
                                </MDBModal>

                                <MDBModal open={index == denyOrderRequestModal} onClose={() => denyToggleOpen(false)} tabIndex='-1'>
                                    <MDBModalDialog centered={true} size="lg">
                                        <MDBModalContent>

                                            <MDBModalHeader>
                                                <MDBModalTitle className="text-danger">Hủy đơn hàng</MDBModalTitle>
                                                <MDBBtn className='btn-close' color='none' onClick={denyToggleOpen}></MDBBtn>
                                            </MDBModalHeader>

                                            <MDBModalBody>
                                                <div className="mt-3">Hủy đơn hàng cúa:&nbsp;
                                                    <strong>{item.buyer.firstname + " " + item.buyer.lastname}</strong>
                                                </div>
                                                <div className="mt-3">Số lượng: <span style={{ width: 'auto' }} className="badge rounded-pill badge-success">x{item.quantity}</span></div>
                                                <div className="mt-3">Tổng tiền: <strong>{formatToVND(item.totalPrice)}</strong></div>
                                                <div className="mt-3">
                                                    <div className="mb-2">Lý do từ chối <span className="text-danger">*</span></div>
                                                    <input onChange={handleDenyNoteChange} type="text" className="form-control" />
                                                </div>
                                                {
                                                    denyNoteMessage.message && 
                                                    <div className="text-danger mt-1 mb-3">
                                                        <Alert severity="error">{denyNoteMessage.message}</Alert>
                                                    </div>
                                                }
                                                <div>
                                                    {
                                                        denyResponseMessage.message &&
                                                        denyResponseMessage.status &&
                                                        <Alert severity="success">{denyResponseMessage.message}</Alert>
                                                    }
                                                    {
                                                        denyResponseMessage.message &&
                                                        !denyResponseMessage.status &&
                                                        <Alert severity="success">{denyResponseMessage.message}</Alert>
                                                    }
                                                    {/* {
                                                        acceptResponseMessage.message?
                                                        (
                                                            acceptResponseMessage.status && <Alert severity="success">{acceptResponseMessage.message}</Alert>
                                                        )
                                                        :
                                                        (
                                                            !acceptResponseMessage.status && <Alert severity="error">{acceptResponseMessage.message}</Alert>
                                                        )
                                                    } */}
                                                </div>
                                            </MDBModalBody>

                                            <MDBModalFooter>
                                                <button onClick={() => denySellingRequest(item)} className="btn btn-danger">
                                                    Xác nhận hủy đơn
                                                </button>
                                            </MDBModalFooter>

                                        </MDBModalContent>
                                    </MDBModalDialog>
                                </MDBModal>

                            </div>
                        </div>

                        )
                    )
                )
            }

        </Box>
    )
}
