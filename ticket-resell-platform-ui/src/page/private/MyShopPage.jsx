import Footer from "../../components/Footer"
import Header from "../../components/Header"
import SideBar from "../../components/SideBar"
import { SidebarOption } from "../../config/Constant"
import PolicyCheckBox from "../../components/PolicyCheckBox"
import React, { useState } from "react"
import '../../assets/css/GroupTicketCommandutton.css'
import DetailSellingTicket from "../../components/DetailSellingTicket"
import useAxios from "../../utils/useAxios"
import HttpStatus from "../../config/HttpStatus"
import API from "../../config/API"
import LoadEffect from "../../components/LoadEffect"
import OrderTicketInfo from "../../components/OrderTicketInfo"
import CanceledTicketBox from "../../components/CanceledTicketBox"
import SoldTicketBox from "../../components/SoldTicketBox"

/*
    Author: Nguyen Tien Thuan
*/
export default function MyShopPage() {

    const api = useAxios();
    const [user, setUser] = useState({});


    React.useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(API.User.GET_USER_INFO)
            if (response.data.httpStatus === HttpStatus.OK) {
                setUser(response.data.object)
            }
        }
        fetchData().catch(console.error)
    }, [])

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

    if (!user) {
        return (
            <LoadEffect />
        )
    }

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
                                !user.isSeller ? <PolicyCheckBox user={user}/> :
                                    (
                                        <div>
                                            <div className="tab-menu" style={{ width: '98%' }}>
                                                {tabs.map((tab) => (
                                                    <a
                                                        key={tab.id}
                                                        className={activeTab.id === tab.id ? 'active' : ''}
                                                        onClick={() => handleTabClick(tab)}
                                                    >
                                                        {tab.label} {tab.count && <span>({tab.count})</span>}
                                                    </a>
                                                ))}
                                            </div>

                                            <div style={{ marginTop: '1%', padding: '0' }}>
                                                {
                                                    activeTab.id === tabs[0].id && <DetailSellingTicket user={user} />
                                                }
                                                {
                                                    activeTab.id === tabs[1].id && <OrderTicketInfo user={user}/>
                                                }
                                                {
                                                    activeTab.id === tabs[2].id && <SoldTicketBox user={user}/>
                                                }
                                                {
                                                    activeTab.id === tabs[4].id && <CanceledTicketBox user={user}/>
                                                }
                                            </div>

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
