import { Divider } from '@mui/material';
import Footer from '../../components/Footer';
import GroupTicketCommandButton from '../../components/GroupTicketCommandButton';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import TicketInfoRowBox from '../../components/TicketInfoRowBox';
import { SidebarOption } from '../../config/Constant';
import { BOUGHT_TICKET_DATA } from '../../test/DataTest';

/*
    Author: Nguyen Tien Thuan
*/
export default function BoughtTicketManagementPage() {

    const tickets = BOUGHT_TICKET_DATA;

    return (
        <div>

            <div className="row">
                <Header />
            </div>

            <div className='container-fluid mb-5'>
                <div className='row' style={{ marginTop: '7%' }}>

                    <div className='col-md-2' >
                        <SideBar sideBarOption={SidebarOption.BOUGHT_TICKET} />
                    </div>
                    {/* <div className='col-md-1' ></div> */}
                    <div className='col-md-10'>
                        <div className='row'>
                            <GroupTicketCommandButton />
                        </div>
                        <Divider />
                        <div className='container-fluid'>
                            {
                                tickets.map((ticket, index) => (
                                    <TicketInfoRowBox key={index} ticket={ticket} />
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
    )
}
