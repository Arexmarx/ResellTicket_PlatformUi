import LoadEffect from "../../components/LoadEffect";
import { ToastContainer } from "react-toastify";
import useAxios from "../../utils/useAxios";
import { useEffect, useState } from "react";
import API from "../../config/API";
import HttpStatus from "../../config/HttpStatus";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import { SidebarOption } from "../../config/Constant";
import NotificationNewBox from "../../components/NotificationNewBox";
import NotificationReadBox from "../../components/NotificationReadBox";


export default function NotificationPage() {

    const api = useAxios();
    const [user, setUser] = useState();
    const [notifications, setNotifications] = useState([]);

    const tabs = [
        { id: '1', label: 'Thông báo mới' },
        { id: '2', label: 'Đã đọc' }
    ];
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const handleTabClick = (tab) => { setActiveTab(tab); };

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(API.User.GET_USER_INFO)
            if (response.data.httpStatus === HttpStatus.OK) {
                setUser(response.data.object)
            }
        }
        fetchData().catch(console.error)
    }, [])


    if (!user) {
        return (
            <LoadEffect />
        )
    }

    return (
        <div>
            <ToastContainer />
            <div className="row">
                <Header />
            </div>
            <div className='container-fluid mb-5'>
                <div className='row' style={{ marginTop: '7%' }}>
                    <div className='col-md-2' >
                        <SideBar sideBarOption={SidebarOption.NOTIFICATION} user={user} />
                    </div>
                    <div className="col-md-9">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2>Thông báo</h2>

                            <div className="tab-menu w-50" style={{ width: '70%' }}>
                                {
                                    tabs.map((tab) => (
                                        <a
                                            key={tab.id}
                                            className={activeTab.id === tab.id ? 'active' : ''}
                                            onClick={() => handleTabClick(tab)}
                                            style={{cursor: 'pointer'}}
                                        >
                                            {tab.label} {tab.count && <span>({tab.count})</span>}
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                        <hr />
                        <div className="mx-5">

                            {
                                activeTab.id === tabs[0].id && <NotificationNewBox user={user}/>
                            }

                            {
                                activeTab.id === tabs[1].id && <NotificationReadBox user={user}/>
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
