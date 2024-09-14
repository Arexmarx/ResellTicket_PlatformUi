import { useState } from "react"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import SideBar from "../../components/SideBar"
import { SidebarOption } from "../../config/Constant"
import { USER_DATA } from "../../test/DataTest"
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBCheckbox,
} from 'mdb-react-ui-kit';

/*
    Author: Nguyen Tien Thuan
*/
export default function MyShopPage() {

    const [basicModal, setBasicModal] = useState(false);

    const [checkbox, setCheckBox] = useState(false);

    const toggleOpen = () => setBasicModal(!basicModal);

    const handleCheckBox = () => setCheckBox(!checkbox);

    const user = USER_DATA;

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
                                        <div className="d-flex justify-content-center">
                                            <MDBBtn color="success" onClick={toggleOpen}>Đăng ký bán vé </MDBBtn>
                                        </div>
                                        <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
                                            <MDBModalDialog centered={true} size="lg">
                                                <MDBModalContent>
                                                    <MDBModalHeader>
                                                        <MDBModalTitle>Chính sách bán hàng</MDBModalTitle>
                                                        <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                                                    </MDBModalHeader>
                                                    <MDBModalBody>

                                                        <p>1. Tính phí phần trăm khi bán được vé (5%)</p>
                                                        <p>2. Xử lý các trường hợp vi phạm quy định mua bán của nền tảng thì xử lý:</p>
                                                        <p> - Bên trung gian sẽ giữ tiền của người mua, sau khi sự kiện diễn ra xong, nếu không có báo cáo về gian lận, tiền vé sẽ đến tay người bán. </p>
                                                        <p> - Khi đăng bán 1 vé, chuyển 10% cho trung gian để đảm bảo tính uy tín. Nếu bán thành công, thì chiết khấu ra 5% và trả lại cùng với số tiền bán vé.</p>
                                                        <p>3. Người bán muốn rút vé bán sẽ hoàn lại 10% tiền cọc.</p>
                                                        <p>4. Vé hết hạn sẽ được hoàn trả 10% tiền cọc.</p>
                                                        <p>5. Vé sẽ được duyệt chậm nhất 2 ngày</p>
                                                        <p>6. Tính năng tích điểm cho người bán</p>

                                                    </MDBModalBody>

                                                    <MDBModalFooter>
                                                        <MDBCheckbox onChange={handleCheckBox} label="Tôi dồng ý với điều khoản"/>
                                                        <MDBBtn disabled={!checkbox} style={{marginLeft: 20}} color="success">Xác nhận</MDBBtn>
                                                    </MDBModalFooter>
                                                </MDBModalContent>
                                            </MDBModalDialog>
                                        </MDBModal>
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
