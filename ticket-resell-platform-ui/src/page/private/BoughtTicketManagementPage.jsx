import { Divider } from "@mui/material";
import Footer from "../../components/Footer";
import GroupTicketCommandButton from "../../components/GroupTicketCommandButton";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import TicketInfoRowBox from "../../components/TicketInfoRowBox";
import { SidebarOption, USER_ID_KEY } from "../../config/Constant";
import { BOUGHT_TICKET_DATA } from "../../test/DataTest";
import RatingInfoRowBox from "../../components/RatingInfoRowBox";
import { useEffect, useState } from "react";
import UserAPI from "../../service/api/UserAPI";

/*
    Author: Nguyen Tien Thuan
*/
export default function BoughtTicketManagementPage() {
  const tickets = BOUGHT_TICKET_DATA;

  const [user, setUser] = useState({});

  useEffect(() => {
    let userId = localStorage.getItem(USER_ID_KEY);
    if (userId) {
      const fetchData = async () => {
        const response = await UserAPI.getUserInfo(userId);
        setUser(response.data.object)
      }
      fetchData().catch(console.error);
    }
  }, [])

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
              <GroupTicketCommandButton />
            </div>
            <Divider />
            <div className="container-fluid">
              {
                tickets.map((ticket, index) => (
                  <TicketInfoRowBox key={index} ticket={ticket} />
                ))
              }
              {
                tickets.map((ticket, index) => (
                  <RatingInfoRowBox key={index} ticket={ticket} user={user} />
                ))
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
