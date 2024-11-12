import { MDBBadge, MDBRow } from "mdb-react-ui-kit";
import { formatDateTime } from "../service/DateService";
import useAxios from "../utils/useAxios";
import { toast } from 'react-toastify';
import HttpStatus from "../config/HttpStatus";
import API from "../config/API";
import { useEffect, useState } from "react";
import LoadEffect from "./LoadEffect";

export default function NotificationReadBox({ user }) {

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

    if (!Array.isArray(visibleNotifications)) {
        return(
            <LoadEffect/>
        )
    }

    return (
        visibleNotifications && visibleNotifications.length > 0 &&
        (
            visibleNotifications.map(item => (
                item.isRead && !item.isDeleted &&
                <MDBRow key={item.id} className="shadow-sm p-3 mb-4 bg-body rounded" center>

                    <div className="d-flex align-items-center justify-content-between">
                        <h5>{item.header}</h5>
                        <MDBBadge pill color='warning' light>
                            *Đã đọc
                        </MDBBadge>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <div className="w-75">
                            <strong style={{ wordWrap: "break-word", whiteSpace: "normal" }}>{item.content}</strong>
                            <div>{item.subHeader}</div>
                            <div>{formatDateTime(item.sentDate)}</div>
                        </div>
                        <div>
                            <button className="btn btn-danger" title="Xóa thông báo" onClick={() => markDeleted(item.id)}>Xóa vĩnh viễn</button>
                        </div>
                    </div>

                </MDBRow>
            ))
        )
    )
}
