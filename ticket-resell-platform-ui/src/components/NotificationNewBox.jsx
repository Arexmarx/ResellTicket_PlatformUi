import { MDBBadge, MDBRow } from "mdb-react-ui-kit";
import { formatDateTime } from "../service/DateService";


export default function NotificationNewBox({ notifications }) {

    return (
        notifications && notifications.length > 0 &&
        (
            notifications.map(item => (
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
                            <button className="btn btn-info me-3" title="Đánh dấu đã đọc">Đã đọc</button>
                            <button className="btn btn-danger" title="Xóa thông báo" >Xóa</button>
                        </div>
                    </div>

                </MDBRow>
            ))
        )
    )
}
