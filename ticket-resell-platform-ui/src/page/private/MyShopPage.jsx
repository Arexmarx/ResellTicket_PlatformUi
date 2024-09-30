import Footer from "../../components/Footer"
import Header from "../../components/Header"
import SideBar from "../../components/SideBar"
import { ADD_TICKET_PAGE, SidebarOption, USER_ID_KEY } from "../../config/Constant"
import PolicyCheckBox from "../../components/PolicyCheckBox"
import React, { useEffect, useState } from "react"
import UserAPI from "../../service/api/UserAPI"
import '../../assets/css/GroupTicketCommandutton.css'

/*
    Author: Nguyen Tien Thuan
*/
export default function MyShopPage() {

    const [user, setUser] = useState({});

    React.useEffect(() => {
        let userId = localStorage.getItem(USER_ID_KEY);
        if (userId) {
            const fetchData = async () => {
                const response = await UserAPI.getUserInfo(userId);
                setUser(response.data.object)
            }
            fetchData().catch(console.error);
        }
    }, [])

    const [ticketsOfSeller, setTicketsOfSeller] = useState(null);

    // useEffect(() => {
        
    //     const fetchData = async () => {
    //         const response = await 
    //     }

    // }, [])


    const tabs = [
        { id: '1', label: 'Vé đang bán' },
        { id: '2', label: 'Đơn mua' },
        { id: '3', label: 'Vé đã bán' },
        { id: '4', label: 'Doanh thu' },
        { id: '5', label: 'Vé bị hủy' },
        { id: '6', label: 'Đánh giá' }
    ];

    const [activeTab, setActiveTab] = useState(tabs[0]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

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
                            {
                                !user.isSeller ? <PolicyCheckBox /> :
                                    (
                                        <div>
                                            <div className="tab-menu" style={{ width: '98%' }}>
                                                {tabs.map((tab) => (
                                                    <a
                                                        key={tab.id}
                                                        href="#"
                                                        className={activeTab.id === tab.id ? 'active' : ''}
                                                        onClick={() => handleTabClick(tab)}
                                                    >
                                                        {tab.label} {tab.count && <span>({tab.count})</span>}
                                                    </a>
                                                ))}
                                            </div>
                                            <div className="row mt-3 mb-3">
                                                <div className="col-md-2">
                                                    <a href={ADD_TICKET_PAGE} className="btn btn-warning">Thêm vé mới</a>
                                                </div>
                                            </div>
                                            <hr />
                                            
                                        </div>

                                    )
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
