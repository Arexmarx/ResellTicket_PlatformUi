import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Avatar, Rating } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxios from '../../utils/useAxios';
import API from '../../config/API';
import HttpStatus from '../../config/HttpStatus';

export default function PersonalPage() {

    const api = useAxios();
    const location = useLocation();
    const { seller } = location.state || {};
    const [ratings, setRatings] = useState(null)

    // console.log(seller);

    useEffect(() => {
        if (seller) {
            const fetchData = async () => {
                const response = await api.get(API.Rating.GET_ALL_RATING_BY_SELLER + seller.id)
                if (response.data.httpStatus === HttpStatus.OK) {
                    console.log(response.data.object);
                    setRatings(response.data.object)
                }
            }
            fetchData().catch(console.error)
        }
    }, [seller])


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
                                        <MDBCardImage src={seller.avatar ? "data:image/png;base64, " + seller.avatar : "broken-image.jpg"}
                                            alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                                    </div>
                                    <div className="ms-3" style={{ marginTop: '130px' }}>
                                        <MDBTypography tag="h5">{seller.firstname + " " + seller.lastname}</MDBTypography>
                                        <MDBCardText><i className="flag flag-vietnam"></i>Việt Nam</MDBCardText>
                                    </div>
                                </div>
                                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                    <div className="d-flex justify-content-end text-center py-1">
                                        <div className="px-3">
                                            <MDBCardText className="mb-1 h5">{ratings? ratings.ratingList.length : 0    }</MDBCardText>
                                            <MDBCardText className="small text-muted mb-0">Lượt đánh giá</MDBCardText>
                                        </div>
                                        <div>
                                            <MDBCardText className="mb-1 h5">{ratings? ratings.avgStars : 0}</MDBCardText>
                                            <MDBCardText className="small text-muted mb-0">Số sao</MDBCardText>
                                        </div>
                                    </div>
                                </div>
                                <MDBCardBody className="text-black p-4">
                                    <p className="lead fw-normal mb-1">Đánh giá gần đây</p>

                                    <div className="mb-3">

                                        {
                                            ratings &&
                                            ratings.ratingList.map((item, index) => (
                                                <div key={index} className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <div className='d-flex align-items-center'>
                                                        <Avatar alt="Ảnh đại diện" src={item.buyer.avatar ? "data:image/png;base64, " + item.buyer.avatar : "broken-image.jpg"} />
                                                        <div>&nbsp;&nbsp;&nbsp;{item.buyer.firstname + " " + item.buyer.lastname}</div>
                                                    </div>
                                                    <div>
                                                        <Rating
                                                            name="simple-controlled"
                                                            value={item.stars}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className='mt-3'>
                                                    {item.comment}
                                                </div>
                                            </div>
                                            ))
                                        }

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