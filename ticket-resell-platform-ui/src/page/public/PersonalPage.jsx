import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Avatar, Rating } from '@mui/material';

export default function PersonalPage() {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />

            <div className="gradient-custom-2" style={{ backgroundColor: '#fbf9f9', marginTop: '4%' }}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol lg="9" xl="7">
                            <MDBCard>
                                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                                            alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                                    </div>
                                    <div className="ms-3" style={{ marginTop: '130px' }}>
                                        <MDBTypography tag="h5">Nguyễn Tiến Thuận</MDBTypography>
                                        <MDBCardText><i className="flag flag-vietnam"></i>Việt Nam</MDBCardText>
                                    </div>
                                </div>
                                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                    <div className="d-flex justify-content-end text-center py-1">
                                        <div className="px-3">
                                            <MDBCardText className="mb-1 h5">1026+</MDBCardText>
                                            <MDBCardText className="small text-muted mb-0">Lượt đánh giá</MDBCardText>
                                        </div>
                                        <div>
                                            <MDBCardText className="mb-1 h5">4.9</MDBCardText>
                                            <MDBCardText className="small text-muted mb-0">Số sao</MDBCardText>
                                        </div>
                                    </div>
                                </div>
                                <MDBCardBody className="text-black p-4">
                                    <p className="lead fw-normal mb-1">Đánh giá gần đây</p>

                                    <div className="mb-3">
                                        <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className='d-flex align-items-center'>
                                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                    <div>&nbsp;&nbsp;&nbsp;Cường Đô La</div>
                                                </div>
                                                <div>
                                                <Rating
                                                    name="simple-controlled"
                                                    value={4} 
                                                    readOnly
                                                />
                                                </div>
                                            </div>
                                            <div className='mt-3'>
                                                Hàng ngon! Vé thơm! Giá chất lượng!!! 10 đỉm
                                            </div>
                                        </div>
                                    </div>
                                    
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>

            <Footer />
        </div>

    );
}