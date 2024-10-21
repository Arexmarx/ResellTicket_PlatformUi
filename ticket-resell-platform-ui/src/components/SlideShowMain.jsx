import { useState, useEffect } from "react";
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBIcon,
  MDBCardOverlay,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { EVENT_DETAIL_PAGE } from "../config/Constant";
import axios from "axios";
import API from "../config/API";
import LoadEffect from "./LoadEffect";
import '../assets/css/BoxDateTime.css'
import { getDay, getMonth, getYear } from "../service/DateService";

/**
 * Author: Phan Nguyễn Mạnh Cường
 */
export default function SlideShowMain() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      axios.get(API.GATEWAY + API.Event.GET_HAPPENING_EVENT_BY_HASHTAG_HOT).then(
        response => {
          // console.log(response.data.object)
          setItems(response.data.object)
        }
      );
    }
    fetchData().catch(console.error)
  }, [])


  const [activeItem, setActiveItem] = useState(1);
  const itemsPerSlide = 1;
  const intervalTime = 3000; // Time in milliseconds for auto-cycling (e.g., 3000ms = 3 seconds)

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
  };

  // Auto-cycle functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, intervalTime);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  if (!items) {
    return (
      <LoadEffect />
    )
  }


  return (
    items.length > 0 &&
    <MDBContainer style={{ cursor: 'pointer' }} className="my-5 position-relative">
      <MDBCarousel showControls={false} showIndicators={false} fade>
        <MDBCarouselItem className="active">
          <MDBRow className="justify-content-center">
            {getVisibleItems().map((item) => (
              <MDBCol key={item.id} md="11" className="mb-6">

                <MDBCard onClick={() => handleClick(item)}>
                  <div className="calendar-container">
                    <MDBCardImage
                      className="image"
                      src={"data:image/png;base64, " + item.image}
                      alt={item.title}
                      position="top"
                      style={{
                        borderRadius: "15px", // Add rounded corners
                        // border: "2px solid #ddd",  
                        maxHeight: '600px'
                      }}
                    />
                    <div className="calendar-box">
                      <div className="month">Tháng {getMonth(item.startDate)}</div>
                      <div className="day">{getDay(item.startDate)}</div>
                      <div className="year">{getYear(item.startDate)}</div>
                    </div>
                  </div>

                  {/* <MDBCardOverlay>
                    <MDBCardTitle>{item.name}</MDBCardTitle>
                    <MDBCardText>{item.description}</MDBCardText>
                    <MDBCardText>Ngày bắt đầu: {item.startDate}</MDBCardText>
                    <MDBCardText>Ngày kết thúc: {item.endDate}</MDBCardText>
                  </MDBCardOverlay> */}
                  {/* <div className="position-absolute bottom-0 text-light w-100"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',  
                      borderRadius: "0 0 15px 15px"
                    }} >
                    <div className="mx-3">
                      <MDBCardTitle>{item.name}</MDBCardTitle>  
                    </div>
                  </div> */}
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
          cursor: "pointer",
          color: "black",
          left: "-40px",
          padding: "10px",
          borderRadius: "50%",
        }}
        onClick={handlePrev}
      />
      <MDBIcon
        fas
        icon="chevron-right"
        size="2x"
        className="position-absolute top-50 translate-middle-y"
        style={{
          cursor: "pointer",
          color: "black",
          right: "-40px",
          padding: "10px",
          borderRadius: "50%",
        }}
        onClick={handleNext}
      />
    </MDBContainer>
  );
}
