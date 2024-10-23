import { Divider } from "@mui/material";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import TicketInfoRowBox from "../../components/TicketInfoRowBox";
import { SidebarOption } from "../../config/Constant";
import { useEffect, useState } from "react";
import API from "../../config/API";
import HttpStatus from "../../config/HttpStatus";
import useAxios from "../../utils/useAxios";
import LoadEffect from "../../components/LoadEffect";
import BoughtTicketBox from "../../components/BoughtTicketBox";
import CanceledOrderTicketBox from "../../components/CanceledOrderTicketBox";
import RatedTicketBox from "../../components/RatedTicketBox";
import DeliveringTicketBox from "../../components/DeliveringTicketBox";

/*
    Author: Nguyen Tien Thuan
*/
export default function BoughtTicketManagementPage() {

  const [tickets, setTickets] = useState([])
  const [user, setUser] = useState({});
  const api = useAxios();
  const api2 = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(API.User.GET_USER_INFO)
      if (response.data.httpStatus === HttpStatus.OK) {
        //console.log(response.data.object)
        setUser(response.data.object)
      }
    }
    fetchData().catch(console.error)
  }, [])


  useEffect(() => {
    if (user.id) {
      const fetchData = async () => {
        const response = await api2.get(API.GenericTicket.GET_PROCESSING_ORDER_TICKET + user.id)
        //console.log("Response"+response);
        
        if (response.data.httpStatus === HttpStatus.OK) {
          //console.log(response.data.object)
          setTickets(response.data.object)
        }
        response.status
      }
      fetchData().catch(console.error)
    }
  }, [user])

  const tabs = [
    { id: '1', label: 'Đang xử lý' },
    // { id: '2', label: 'Đang chuẩn bị' },
    { id: '2', label: 'Đang giao hàng' },
    { id: '3', label: 'Hoàn thành' },
    { id: '4', label: 'Đã hủy' },
    { id: '5', label: 'Đánh giá' }
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const handleTabClick = (tab) => { setActiveTab(tab); };


  if (!user && !tickets) {
    return (
      <LoadEffect/>
    )
  }


  return (
    <div>
      <div className="row">
        <Header />
      </div>

      <div className="container-fluid mb-5">
        <div className="row" style={{ marginTop: "7%" }}>
          <div className="col-md-2">
            <SideBar user={user} sideBarOption={SidebarOption.BOUGHT_TICKET} />
          </div>
          {/* <div className='col-md-1' ></div> */}
          <div className="col-md-10">
            <div className="row">
              {/* <GroupTicketCommandButton /> */}
              <div className="tab-menu" style={{ width: '98%' }}>
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
            <Divider />
            <div className="container-fluid">
              {/* {
                tickets.map((ticket, index) => (
                  <TicketInfoRowBox key={index} ticket={ticket} />
                ))
              }
              {
                tickets.map((ticket, index) => (
                  <RatingInfoRowBox key={index} ticket={ticket} user={user} />
                ))
              } */}

              {
                activeTab.id === tabs[0].id && tickets.length > 0 ?
                (
                  tickets.map((item, index) => (
                    <TicketInfoRowBox key={index} item={item} user={user} />
                    
                  ))
                )
                : ''
              }

              {
                activeTab.id === tabs[1].id && <DeliveringTicketBox user={user}/>
              }

              {
                activeTab.id === tabs[2].id && <BoughtTicketBox user={user}/>
              }

              {
                activeTab.id === tabs[3].id && <CanceledOrderTicketBox user={user}/>
              }

              {
                activeTab.id == tabs[4].id && <RatedTicketBox user={user}/>
              }

            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <Footer />
      </div>
    </div>
  );
}
