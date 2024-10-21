import { useEffect, useState } from "react";
import { SidebarOption } from "../../config/Constant";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";
import useAxios from "../../utils/useAxios";
import HttpStatus from "../../config/HttpStatus";
import API from "../../config/API";
import LoadEffect from "../../components/LoadEffect";
import { toast, ToastContainer } from "react-toastify";


export default function ChangePasswordPage() {

    const api = useAxios();
    const [user, setUser] = useState();
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatNewPassword, setRepeatPassword] = useState('')

    const handleOldPasswordChange = (e) => setOldPassword(e.target.value)
    const handleNewPasswordChange = (e) => setNewPassword(e.target.value)
    const handleRepeatPasswordChange = (e) => setRepeatPassword(e.target.value)

    const successNotification = (str) => toast.success(str)
    const errorNotification = (str) => toast.error(str)

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(API.User.GET_USER_INFO)
            if (response.data.httpStatus === HttpStatus.OK) {
                setUser(response.data.object)
            }
        }
        fetchData().catch(console.error)
    }, [])

    const resetInput = () => {
        setNewPassword('')
        setOldPassword('')
        setRepeatPassword('')
    }

    const submit = async () => {
        if (newPassword === repeatNewPassword) {
            const response = await api.post(API.User.CHANGE_PASSWORD, {}, {
                params: {
                    id: user.id,
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }
            })
            if (response.data.httpStatus === HttpStatus.OK) {
                successNotification(response.data.message)
            }
            else {
                errorNotification(response.data.message)
            }
        }
        else {
            errorNotification('Mật khẩu nhập lại không hợp lệ!')
        }
        resetInput();
    }


    if (!user) {
        return (
            <LoadEffect />
        )
    }

    return (
        <div>
            <ToastContainer/>
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
                                    onChange={handleOldPasswordChange}
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-center">
                            <div className="mb-3 w-75">
                                <label className="form-label">Mật khẩu mới <span className="text-danger">*</span></label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Nhập mật khẩu mới..."
                                    onChange={handleNewPasswordChange}
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-center">
                            <div className="mb-3 w-75">
                                <label className="form-label">Nhập lại mật khẩu mới <span className="text-danger">*</span></label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Nhập lại mật khẩu mới..."
                                    onChange={handleRepeatPasswordChange}
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-center">
                            <button onClick={submit} className="btn btn-success">Lưu</button>
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
