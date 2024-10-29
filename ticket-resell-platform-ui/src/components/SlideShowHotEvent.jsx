import { useEffect, useState } from 'react';
import { MDBCarousel, MDBCarouselItem, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon } from 'mdb-react-ui-kit';
import { MDBTypography } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import {EVENT_DETAIL_PAGE} from "../config/Constant";
import API from '../config/API.js';
import axios from 'axios';
import LoadEffect from './LoadEffect.jsx';
import '../assets/css/BoxDateTime.css'

/**
 * Author: Phan Nguyễn Mạnh Cường
 */
export default function SlideShowHotEvent() {
  
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      axios.get(API.GATEWAY + API.Event.GET_HAPPENING_EVENT_BY_HASHTAG_SEPECIAL).then(
        response => {
          // console.log(response.data.object)
          setItems(response.data.object)
        }
      );
    }
    fetchData().catch(console.error)
  }, [])

  const [activeItem, setActiveItem] = useState(1);
  const itemsPerSlide = items.length < 6 ? items.length : 6;
  const intervalTime = 5000;

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

  //Auto-cyle
  useEffect(() =>{
    const interval = setInterval(() =>{
      handleNext();
    },intervalTime)

    return () => clearInterval(interval); // Clean up interval on unmount
  },[]);

  if (!items) {
    return (
      <LoadEffect />
    )
  }

  return (
    items.length > 0 && 
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
                      src={"data:image/png;base64, " + item.image}
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
                        borderRadius: '15px', // Add rounded corners
                        border: '2px solid #ddd', // Add a border
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