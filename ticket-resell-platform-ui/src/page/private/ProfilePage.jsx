import Footer from '../../components/Footer'
import Header from '../../components/Header'
import SideBar from '../../components/SideBar'
import { SidebarOption, USER_ID_KEY } from '../../config/Constant'
import ProfileInfoBox from '../../components/ProfileInfoBox'
import React from 'react'
import UserAPI from '../../service/api/UserAPI'

/*
    Author: Nguyen Tien Thuan
*/
export default function ProfilePage() {

    const [user, setUser] = React.useState({});

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

    return (
        <div>
            <div className="row">
                <Header />
            </div>
            <div className='container-fluid mb-5'>
                <div className='row' style={{ marginTop: '7%' }}>
                    <div className='col-md-2' >
                        <SideBar sideBarOption={SidebarOption.PROFILE} user={user} />
                    </div>

                    <ProfileInfoBox user={user} />

                </div>
            </div>

            <div className="row">
                <Footer />
            </div>
        </div>
    )
}
