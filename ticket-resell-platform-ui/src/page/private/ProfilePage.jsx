import Footer from '../../components/Footer'
import Header from '../../components/Header'
import SideBar from '../../components/SideBar'
import { SidebarOption} from '../../config/Constant'
import ProfileInfoBox from '../../components/ProfileInfoBox'
import React from 'react'
import HttpStatus from '../../config/HttpStatus'
import LoadEffect from '../../components/LoadEffect'
import useAxios from '../../utils/useAxios'
import API from '../../config/API'

/*
    Author: Nguyen Tien Thuan
*/
export default function ProfilePage() {

    const [user, setUser] = React.useState();
    const api = useAxios();


    React.useEffect(() => {
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
