import React, { useState } from 'react';
import { MDBCarousel, MDBCarouselItem, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon } from 'mdb-react-ui-kit';
import { MDBTypography } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import {EVENT_DETAIL_PAGE} from "../config/Constant";

export default function SlideShowHotEvent() {
  const items = [
    { id: 1, title: 'Concert A', image: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(18).jpg', description: 'Description for Concert A' },
    { id: 2, title: 'Concert B', image: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(19).jpg', description: 'Description for Concert B' },
    { id: 3, title: 'Concert C', image: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(20).jpg', description: 'Description for Concert C' },
    { id: 4, title: 'Concert D', image: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(21).jpg', description: 'Description for Concert D' },
    { id: 5, title: 'Concert E', image: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(22).jpg', description: 'Description for Concert E' },
    { id: 6, title: 'Concert F', image: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(23).jpg', description: 'Description for Concert F' },
  ];

  const [activeItem, setActiveItem] = useState(1);
  const itemsPerSlide = 6;

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
  const handleClick  = (item) => {
    navigate(EVENT_DETAIL_PAGE,{ state: { event: item } });
  }

  return (
    <MDBContainer className="my-5 position-relative">
      <MDBTypography variant='h4' className='mb-4' color='black'>Sự kiện đặc biệt</MDBTypography>
      <MDBCarousel showControls={false} showIndicators={false} fade>
        <MDBCarouselItem className="active">
          <MDBRow className="justify-content-center">
            {getVisibleItems().map((item) => (
              <MDBCol key={item.id} md="2" className="mb-2">
                <MDBCard className="h-100">
                  <div style={{ position: 'relative', paddingTop: '150%' }}>
                    <MDBCardImage 
                      src={item.image} 
                      alt={item.title} 
                      position='top' 
                      onClick={() => handleClick(item)}
                      style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                </MDBCard>
              </MDBCol>
            ))}
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
          left: '-40px',
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
          right: '-40px',
          padding: '10px',
          borderRadius: '50%',
        }}
        onClick={handleNext}
      />
    </MDBContainer>
  );
}