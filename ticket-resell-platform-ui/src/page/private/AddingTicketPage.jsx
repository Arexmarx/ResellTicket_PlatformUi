import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import { MY_SHOP_PAGE, TicketTypes, USER_ID_KEY } from "../../config/Constant";
import UserAPI from "../../service/api/UserAPI";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import PolicyAPI from "../../service/api/PolicyAPI";
import HttpStatus from "../../config/HttpStatus";
import CategoryAPI from "../../service/api/CategoryAPI";
import EventAPI from "../../service/api/EventAPI";
import TicketAPI from "../../service/api/TicketAPI";
import useAxios from "../../utils/useAxios";
import API from "../../config/API";
import LoadEffect from "../../components/LoadEffect";

export const SidebarOption = {
    PROFILE: 'profile',
    BOUGHT_TICKET: 'boughtTicket',
    MY_SHOP: 'myShop',
    BALANCE: 'balance',
    INFORM: 'inform'
}

export default function AddingTicketPage() {

    const api = useAxios()
    const GENERIC_TICKET_TEMP_KEY = 'generic_ticket_temp';

    const [user, setUser] = useState({});
    const [policy, setPolicy] = useState({});
    const [categories, setCategories] = useState([]);
    const [events, setEvents] = useState([]);

    const [showDetailForm, setShowDetailForm] = useState(false); // New state for form visibility
    const [ticketDetails, setTicketDetails] = useState([]); // Array to hold ticket details
    const [currentTicket, setCurrentTicket] = useState({ // Object to hold current ticket data
        serial: '',
        image: null,
        description: ''
    });

    const [genericName, setGenericName] = useState('');
    const [genericPrice, setGenericPrice] = useState('')
    const [genericDiscount, setGenericDiscount] = useState('0')
    const [genericArea, setGenericArea] = useState('')
    const [genericExpiredDate, setGenericExpiredDate] = useState('')
    const [genericLink, setGenericLink] = useState('')
    const [genericCate, setGenericCate] = useState()
    const [genericType, setGenericType] = useState(TicketTypes[0].value)
    const [genericEvent, setGenericEvent] = useState(-1)
    const [genericDes, setGenericDes] = useState('')
    const [creationGenericTicketMessage, setCreationGenericTicketMessage] = useState({ status: false, message: '' })
    const [saveAllTicketMessage, setSaveAllMessageTicket] = useState({ status: false, message: '' })
    const [updateGenericTicketMessage, setUpdateGenericTicketMessage] = useState({ status: false, message: '' })
    const [showUpdateButton, setShowUpdateButton] = useState(false);

    // Select user
    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(API.User.GET_USER_INFO)
            setUser(response.data.object)
        }
        fetchData().catch(console.error);
    }, [])

    // Select policy 
    useEffect(() => {
        const fetchData = async () => {
            const response = await PolicyAPI.getSellingPolicy();
            if (response.data.httpStatus === HttpStatus.OK) {
                // console.log(response.data);
                setPolicy(response.data.object)
            }
        }
        fetchData().catch(console.error);
    }, [])


    // Select list category
    useEffect(() => {
        const fetchData = async () => {
            const response = await CategoryAPI.getUsingCategories();
            if (response.data.httpStatus === HttpStatus.OK) {
                // console.log(response.data.object);
                setCategories(response.data.object)
                setGenericCate(response.data.object[0].id)
            }
        }
        fetchData().catch(console.error);
    }, [])

    // Select list event
    useEffect(() => {
        const fetchData = async () => {
            const response = await EventAPI.getHappeningEvents()
            if (response.data.httpStatus === HttpStatus.OK) {
                setEvents(response.data.object)
            }
        }
        fetchData().catch(console.error)
    }, [])

    const handleNameChange = (e) => setGenericName(e.target.value)

    const handlePriceChange = (e) => setGenericPrice(e.target.value)

    const handleDiscountChange = (e) => setGenericDiscount(e.target.value)

    const handleAreaChange = (e) => setGenericArea(e.target.value)

    const handleExpiredDateChange = (e) => setGenericExpiredDate(e.target.value)

    const handleLinkChange = (e) => setGenericLink(e.target.value)

    const handleCateChange = (e) => setGenericCate(e.target.value)

    const handleTicketTypeChange = (e) => setGenericType(e.target.value)

    const handleEventChange = (e) => setGenericEvent(e.target.value)

    const handleDescriptionChange = (e) => setGenericDes(e.target.value)

    // Handle create genric ticket and ticket

    // Creation flag to mark a generic ticket have at least one flag 
    // const [creationFlag, setCreationFlag] = useState(false);
    const handleSaveAllTickets = async () => {
        let flag = true;
        for (let i = 0; i < ticketDetails.length; i++) {

            const ticketRequest = {
                ticketSerial: ticketDetails[i].serial,
                note: ticketDetails[i].description,
                genericTicketId: localStorage.getItem(GENERIC_TICKET_TEMP_KEY)
            }

            const file = await fetch(ticketDetails[i].image).then(res => res.blob());
            const formData = new FormData();
            formData.append("ticketRequest", new Blob([JSON.stringify(ticketRequest)], { type: 'application/json' }))
            formData.append('file', file)

            api.post(API.Ticket.CREATE_TICKET, formData).then(
                response => console.log(response.data)
            )
            .catch(
                error => {
                    console.log(error); 
                    flag = false;
                }
            )

        }

        if (flag){
            setSaveAllMessageTicket({ 
                status: flag, 
                message: 'Đã lưu '+ticketDetails.length+ 'vé thành công! Vui lòng chờ hệ thống kiểm duyệt vé!'
            })
        }
        else {
            setSaveAllMessageTicket({ 
                status: flag, 
                message: 'Lưu vé không thành công! Có sự cố gì đó ở đây!'
            })
        }
        localStorage.removeItem(GENERIC_TICKET_TEMP_KEY)
    }

    const handleAddTicket = (e) => {
        e.preventDefault();
        setTicketDetails([...ticketDetails, currentTicket]);
        setCurrentTicket({ serial: '', image: null, description: '' }); // reset form
    };

    const handleShowDetailForm = (e) => {
        e.preventDefault();
        let genericTicketRequest = {
            genericTicketName: genericName,
            price: genericPrice,
            salePercent: genericDiscount ? genericDiscount : '0',
            area: genericArea,
            expiredDateTime: genericExpiredDate,
            description: genericDes,
            linkEvent: genericLink,
            isPaper: genericType,
            policyId: policy.id,
            categoryId: genericCate,
            eventId: genericEvent,
            sellerId: user.id
        }

        //console.log(genericTicketRequest);

        if (genericName && genericPrice && genericExpiredDate) {
            const fetchData = async () => {
                const response = await api.post(API.GenericTicket.CREATE_GENERIC_TICKET, genericTicketRequest)
                //console.log(response.data.httpStatus)
                if (response.data.httpStatus === HttpStatus.CREATED) {
                    setShowDetailForm(true);
                    setShowUpdateButton(true);
                    localStorage.setItem(GENERIC_TICKET_TEMP_KEY, response.data.object.id)
                    setCreationGenericTicketMessage({
                        status: true,
                        message: "Tạo vé thành công!"
                    })
                    setUpdateGenericTicketMessage({
                        status: false,
                        message: ''
                    })
                }
            }

            fetchData().catch(console.error)
        }
        else {
            setCreationGenericTicketMessage({
                status: false,
                message: "Bạn chưa điền hết các ô yêu cầu!"
            })
        }
    };

    const handleUpdateGenericTicket = (e) => {
        e.preventDefault();
        let genericTicketRequest = {
            genericTicketName: genericName,
            price: genericPrice,
            salePercent: genericDiscount ? genericDiscount : '0',
            area: genericArea,
            expiredDateTime: genericExpiredDate,
            description: genericDes,
            linkEvent: genericLink,
            isPaper: genericType,
            policyId: policy.id,
            categoryId: genericCate,
            eventId: genericEvent,
            sellerId: user.id
        }
        //console.log(genericTicketRequest);

        if (genericName && genericPrice && genericExpiredDate) {
            const fetchData = async () => {
                const response = await api.put(API.GenericTicket.UPDATE_ALL_FIELDS_GENERIC_TICKET, genericTicketRequest)
                if (response.data.httpStatus === HttpStatus.OK) {
                    setUpdateGenericTicketMessage({
                        status: true,
                        message: response.data.message
                    })
                    setCreationGenericTicketMessage({ status: false, message:'' })
                }
                
            }

            fetchData().catch(console.error)
        }
        else {
            setUpdateGenericTicketMessage({
                status: false,
                message: 'Cập nhật không thành công, vui lòng kiểm tra lại thông tin!'
            })
        }
    }

        // if (!user || !events || !categories) {
        //     return (
        //         <LoadEffect/>
        //     )
        // }

    return (
        <div>
            <div className="row">
                <Header />
            </div>

            <div className='container-fluid mb-5'>
                <div className='row' style={{ marginTop: '7%' }}>

                    <div className='col-md-2' >
                        <SideBar user={user} sideBarOption={SidebarOption.MY_SHOP} />
                    </div>
                    {/* <div className='col-md-1' ></div> */}
                    <div className='col-md-10'>
                        <div className='row'>
                            <h3><a href={MY_SHOP_PAGE}><KeyboardReturnIcon /></a>&nbsp;Thêm vé mới</h3>
                        </div>
                        <hr />
                        <div className="row">

                            <form id="generic-ticket-form" style={{ paddingLeft: '5%', paddingRight: '5%' }}>

                                <h5 className="mb-4">Mô tả vé</h5>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Tên vé <span className="text-danger">*</span></label>
                                            <input onChange={handleNameChange} type="text" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Giá bán<span className="text-danger">*</span></label>
                                            <input onChange={handlePriceChange} type="text" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Giảm giá (%)</label>
                                            <input onChange={handleDiscountChange} type="text" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Khu vực ngồi</label>
                                            <input onChange={handleAreaChange} type="text" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Thời gian hết hạn<span className="text-danger">*</span></label>
                                            <input onChange={handleExpiredDateChange} type="datetime-local" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Link sự kiện</label>
                                            <input onChange={handleLinkChange} type="text" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Thể loại vé<span className="text-danger">*</span></label>
                                            <select onChange={handleCateChange} className="form-select">
                                                {
                                                    categories ?
                                                        categories.map(
                                                            cate => (
                                                                <option key={cate.id} value={cate.id}>{cate.name}</option>
                                                            )
                                                        )
                                                        : ''
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <div className="form-label">Loại vé<span className="text-danger">*</span></div>
                                            <div className="form-check">
                                                <input value={TicketTypes[0].value}
                                                    onChange={handleTicketTypeChange}
                                                    className="form-check-input" id="online-ticket"
                                                    type="radio" name="type-ticket"
                                                    checked={genericType == TicketTypes[0].value} // Update checked condition
                                                />
                                                <label className="form-check-label" htmlFor="online-ticket">
                                                    Online
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input value={TicketTypes[1].value}
                                                    onChange={handleTicketTypeChange}
                                                    className="form-check-input"
                                                    type="radio" name="type-ticket" id="offline-ticket"
                                                    checked={genericType == TicketTypes[1].value} // Update checked condition
                                                />
                                                <label className="form-check-label" htmlFor="offline-ticket">
                                                    Giấy
                                                </label>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Sự kiện (Chọn &apos;Khác&apos; nếu không có sự kiện của vé)
                                                <span className="text-danger">*</span>
                                            </label>
                                            <select onChange={handleEventChange} className="form-select" aria-label="Default select example">
                                                {
                                                    events ?
                                                        events.map(
                                                            event => (
                                                                <option key={event.id} value={event.id}>{event.name}</option>
                                                            )
                                                        )
                                                        : ''
                                                }
                                                <option value={"-1"}>Khác...</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <div className="form-label">Mô tả</div>
                                            <textarea onChange={handleDescriptionChange} className="form-control"></textarea>
                                        </div>
                                    </div>
                                </div>
                                {
                                    creationGenericTicketMessage.message
                                    &&
                                    <div className={creationGenericTicketMessage.status ? "text-success mt-3 mb-3" : "text-danger mt-3 mb-3"}>
                                        {creationGenericTicketMessage.message}
                                    </div>
                                }
                                {
                                    updateGenericTicketMessage.message &&
                                    <div className={updateGenericTicketMessage.status ? "text-success mt-3 mb-3" : "text-danger mt-3 mb-3"}>
                                    {updateGenericTicketMessage .message}
                                </div>
                                }
                                {/* <button
                                    type="button"
                                    className="btn btn-success"
                                    form="generic-ticket-form"
                                    onClick={handleShowDetailForm}
                                >
                                    Tạo vé
                                </button> */}
                                {
                                    !showUpdateButton ? ( // Conditional rendering for "Tạo vé"
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            form="generic-ticket-form"
                                            onClick={handleShowDetailForm}
                                        >
                                            Tạo vé
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn btn-warning"
                                            onClick={handleUpdateGenericTicket}
                                        >
                                            Cập nhật lại vé
                                        </button>
                                    )
                                }

                            </form>

                        </div>


                        {
                            showDetailForm && (
                                <div className="row mt-5">
                                    <form style={{ paddingLeft: '5%', paddingRight: '5%' }} onSubmit={handleAddTicket}>
                                        <h5>Chi tiết vé</h5>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Mã serial <span className="text-danger">*</span></label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        required
                                                        value={currentTicket.serial}
                                                        onChange={(e) => setCurrentTicket({ ...currentTicket, serial: e.target.value })}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Hình ảnh vé<span className="text-danger">*</span></label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        required
                                                        onChange={(e) => setCurrentTicket({ ...currentTicket, image: e.target.files[0] })}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Mô tả</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={currentTicket.description}
                                                        onChange={(e) => setCurrentTicket({ ...currentTicket, description: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-success">Thêm vé</button>
                                    </form>
                                </div>
                            )
                        }

                        {/* Render added ticket details */}
                        <div style={{ paddingLeft: '4%', paddingRight: '5%', display: 'flex', flexDirection: 'column' }}>
                            {
                                ticketDetails.map((ticket, index) => (
                                    <div key={index} className="mt-5 shadow-sm p-3 mb-5 bg-body rounded"
                                        style={{ display: 'flex', alignItems: 'center' }}
                                    >
                                        <p style={{ marginRight: '5%' }}>Ticket {index + 1}</p>
                                        <p style={{ marginRight: '5%' }}>Mã serial: {ticket.serial}</p>
                                        <p style={{ marginRight: '5%' }}>Hình ảnh: {ticket.image ? ticket.image.name : 'No image uploaded'}</p>
                                        <p style={{ marginRight: '5%' }}>Mô tả: {ticket.description}</p>
                                        <button className="btn btn-danger"
                                            onClick={() => {
                                                setTicketDetails(ticketDetails.filter((_, i) => i !== index)); // Remove ticket by index
                                            }}
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                ))
                            }

                            {
                                saveAllTicketMessage.message && 
                                <div className={saveAllTicketMessage.status? "mt-2 mb-2 text-success" : "mt-2 mb-2 text-danger"}>
                                    {saveAllTicketMessage.message}
                                </div>
                            }

                            {
                                ticketDetails.length > 0 && <button onClick={handleSaveAllTickets} className="btn btn-success w-25">Lưu tất cả</button>
                            }
                        </div>


                    </div>
                </div>
            </div>

            <div className="row">
                <Footer />
            </div>

        </div>
    )
}
