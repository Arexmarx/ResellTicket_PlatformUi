import { Button } from "@mui/material"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import SideBar from "../../components/SideBar"
import { SidebarOption } from "../../config/Constant"

/*
    Author: Nguyen Tien Thuan
*/
export default function MyShopPage() {

    const user = {
        is_seller: false
    }

    return (
        <div>
            <div className="row">
                <Header />
            </div>

            <div className='container-fluid mb-5'>
                <div className='row' style={{ marginTop: '7%' }}>

                    <div className='col-md-2' >
                        <SideBar sideBarOption={SidebarOption.MY_SHOP} />
                    </div>
                    {/* <div className='col-md-1' ></div> */}
                    <div className='col-md-10'>
                        <div className='row'>
                            {
                                !user.is_seller ?
                                    <div>
                                        <div className="alert alert-danger" role="alert">
                                            Bạn chưa đăng ký bán vé! Hãy đăng ký nhé!
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center" >

                                            <Button sx={{ width: '50%', height: '10%' }} variant="contained" color="success">
                                                Đăng ký bán vé
                                            </Button>
                                        </div>
                                    </div>

                                    :
                                    null
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
