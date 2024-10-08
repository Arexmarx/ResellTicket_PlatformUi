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
import { ITEMS } from "../test/DataTest.js";
/**
 * Author: Phan Nguyễn Mạnh Cường
 */
export default function SlideShowMain() {
  const items = ITEMS;

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

  return (
    <MDBContainer className="my-5 position-relative">
      <MDBCarousel showControls={false} showIndicators={false} fade>
        <MDBCarouselItem className="active">
          <MDBRow className="justify-content-center">
            {getVisibleItems().map((item) => (
              <MDBCol key={item.id} md="11" className="mb-6">
                <MDBCard onClick={() => handleClick(item)}>
                  <MDBCardImage
                    src={item.image}
                    alt={item.title}
                    position="top"
                    style={{
                      borderRadius: "15px", // Add rounded corners
                      border: "2px solid #ddd",
                      maxHeight: '70%'
                    }}
                  />
                  <MDBCardOverlay>
                    <MDBCardTitle>{item.title}</MDBCardTitle>
                    <MDBCardText>{item.description}</MDBCardText>
                    <MDBCardText>Ngày bắt đầu: {item.startDate}</MDBCardText>
                    <MDBCardText>Ngày kết thúc: {item.endDate}</MDBCardText>
                  </MDBCardOverlay>
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
