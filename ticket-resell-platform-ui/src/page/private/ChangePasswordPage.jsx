import { useEffect, useState } from "react";
import { SidebarOption, USER_ID_KEY } from "../../config/Constant";
import UserAPI from "../../service/api/UserAPI";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";


export default function ChangePasswordPage() {

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
            <div className='container-fluid mb-5'>
                <div className='row' style={{ marginTop: '7%' }}>
                    <div className='col-md-2' >
                        <SideBar sideBarOption={SidebarOption.CHANGE_PASS} user={user} />
                    </div>

                    <div className="col-md-1"></div>

                    <div className="col-md-8">
                        <h3 className="text-center">Đổi mật khẩu</h3>
                        <hr />

                        <div className="d-flex justify-content-center">
                            <div className="mb-3 w-75">
                                <label className="form-label">Mật khẩu cũ <span className="text-danger">*</span></label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Nhập mật khẩu cũ..."
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-center">
                            <div className="mb-3 w-75">
                                <label className="form-label">Mật khẩu mới <span className="text-danger">*</span></label>
                                <input
                                    type="password"
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-center">
                            <div className="mb-3 w-75">
                                <label className="form-label">Nhập lại mật khẩu mới <span className="text-danger">*</span></label>
                                <input
                                    type="password"
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-center">
                            <button className="btn btn-success">Lưu</button>
                        </div>

                    </div>

                    <div className="col-md-1"></div>

                </div>
            </div>

            <div className="row">
                <Footer />
            </div>
        </div>
    )
}
