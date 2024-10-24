import { MDBBadge, MDBRow } from "mdb-react-ui-kit";
import { formatDateTime } from "../service/DateService";
import useAxios from "../utils/useAxios";
import API from "../config/API";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HttpStatus from "../config/HttpStatus";
import { useEffect, useState } from "react";
import LoadEffect from "./LoadEffect";

export default function NotificationNewBox({ user }) {

    const api = useAxios();
    const successNotification = (str) => toast.success(str)
    const errorNotification = (str) => toast.error(str)
    const [visibleNotifications, setVisibleNotifications] = useState(null);


    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                const response = await api.get(API.User.GET_ALL_RECEIVED_NOTIFICATION + user?.id)
                if (response.data.httpStatus === HttpStatus.OK) {
                    //console.log(response.data.object);
                    setVisibleNotifications(response.data.object)
                }
            }
            fetchData().catch(console.error)
        }
    }, [user])


    const markRead = async (id) => {
        setVisibleNotifications(prev => 
            prev.map(item => 
                item.id === id ? { ...item, isRead: true } : item 
            )
        ); 
        const response = await api.put(API.Notiication.MARK_READ + id);
        if (response.data.httpStatus === HttpStatus.OK) {
            successNotification(response.data.message)
        }
        else {
            errorNotification(response.data.message)
        }
    }

    if (!Array.isArray(visibleNotifications)) {
        return(
            <LoadEffect/>
        )
    }


    const markDeleted = async (id) => {
        setVisibleNotifications(prev => 
            prev.map(item => 
                item.id === id ? { ...item, isDeleted: true } : item 
            )
        ); 
        const response = await api.put(API.Notiication.MARK_DELETED + id)
        if (response.data.httpStatus === HttpStatus.OK) {
            successNotification(response.data.message)
        }
        else {
            errorNotification(response.data.message)
        }
    }

    return (
        visibleNotifications && visibleNotifications.length > 0 &&
        (
            visibleNotifications.map(item => (
                !item.isRead && !item.isDeleted &&
                <MDBRow key={item.id} className="shadow-sm p-3 mb-4 bg-body rounded" center>

                    <div className="d-flex align-items-center justify-content-between">
                        <h5>{item.header}</h5>
                        <MDBBadge pill color='success' light>
                            *Thông báo mới
                        </MDBBadge>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <div>
                            <strong>{item.content}</strong>
                            <div>{item.subHeader}</div>
                            <div>{formatDateTime(item.sentDate)}</div>
                        </div>
                        <div>
                            <button className="btn btn-info me-3" title="Đánh dấu đã đọc" onClick={() => markRead(item.id)}>Đã đọc</button>
                            <button className="btn btn-danger" title="Xóa thông báo" onClick={() => markDeleted(item.id)} >Xóa</button>
                        </div>
                    </div>

                </MDBRow>
            ))
        )
    )
}
