/* eslint-disable react/prop-types */
import { useState } from 'react';
import { MDBCarousel, MDBCarouselItem, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon } from 'mdb-react-ui-kit';
import { MDBTypography } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import { EVENT_DETAIL_PAGE } from "../config/Constant";
import { ITEMS } from '../test/DataTest.js'
import { formatDateTime } from '../service/DateService.js';
/**
 * Author: Phan Nguyễn Mạnh Cường
 */
export default function SlideShowDetail({ Category, Events }) {
  // console.log("event: ",Events);
  
  const items = Events;
  const [activeItem, setActiveItem] = useState(1);
  const itemsPerSlide = items.length > 4 ? 4 : items.length;

  const handlePrev = () => {
    setActiveItem((prevItem) => (prevItem === 1 ? items.length : prevItem - 1));
  };

  const handleNext = () => {
    setActiveItem((prevItem) => (prevItem === items.length ? 1 : prevItem + 1));
  };

  const getVisibleItems = () => {
    const startIndex = activeItem - 1;
    const visibleItems = [];

    for (let i = 0; i < itemsPerSlide; i++) {
      const index = (startIndex + i) % items.length;
      visibleItems.push(items[index]);
      
    }

    return visibleItems;
  };

  const navigate = useNavigate();
  const handleClick = (item) => {
    navigate(EVENT_DETAIL_PAGE, { state: { event: item } });
  }

  return (
    items ? 
    <MDBContainer className="my-5 position-relative">
      <MDBTypography variant='h4' className='mb-4' color='black'>{Category}</MDBTypography>
      <MDBCarousel showControls={false} showIndicators={false} fade>
        <MDBCarouselItem className="active">
          <MDBRow className="justify-content-center">
<<<<<<< HEAD
            {getVisibleItems().map((item) => (
              <MDBCol key={item.id} md="3" className="mb-3">
                <MDBCard onClick={() => handleClick(item)}>
                  <MDBCardImage src={item.image} alt={item.title} position='top' style={{maxHeight: '206px'}}/>
                  <MDBCardBody>
                    <MDBCardTitle>{item.title}</MDBCardTitle>
                    <MDBCardText>Ngày bắt đầu: {item.startDate}</MDBCardText>
                    <MDBCardText>Ngày kết thúc: {item.endDate}</MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
=======
            {
              getVisibleItems().map((item) => (
                <MDBCol style={{ cursor: 'pointer' }} key={item.id} md="3" className="mb-3">
                  <MDBCard onClick={() => handleClick(item)}>
                    <MDBCardImage style={{ maxHeight: '206px', minHeight: '206px' }} src={"data:image/png;base64, " + item.image} alt={item.name} position='top' />
                    <MDBCardBody>
                      <MDBCardTitle>{item.title}</MDBCardTitle>
                      <MDBCardText>Ngày bắt đầu: {formatDateTime(item.startDate)}</MDBCardText> 
                      <MDBCardText>Ngày kết thúc: {formatDateTime(item.endDate)}</MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))
            }
>>>>>>> 1f18c0767ddc67352c377887f4aa68cb0ef44dff
          </MDBRow>
        </MDBCarouselItem>
      </MDBCarousel>
      <MDBIcon
        fas
        icon="chevron-left"
        size="2x"
        className="position-absolute top-50 translate-middle-y"
        style={{
          cursor: 'pointer',
          color: 'black',
          left: '-40px', // Adjust this value to move the icon further left,
          padding: '10px',
          borderRadius: '50%',
        }}
        onClick={handlePrev}
      />
      <MDBIcon
        fas
        icon="chevron-right"
        size="2x"
        className="position-absolute top-50 translate-middle-y"
        style={{
          cursor: 'pointer',
          color: 'black',
          right: '-40px', // Adjust this value to move the icon further right
          padding: '10px',
          borderRadius: '50%',
        }}
        onClick={handleNext}
      />
    </MDBContainer>
    : 
    ''
  );
}