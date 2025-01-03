/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
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
} from "mdb-react-ui-kit";
import { MDBTypography } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { EVENT_DETAIL_PAGE, SEARCH_PAGE } from "../config/Constant";
import { formatDateTime } from "../service/DateService.js";
import '../assets/css/BoxDateTime.css'
import { getDay, getMonth, getYear } from "../service/DateService";

/**
 * Author: Phan Nguyễn Mạnh Cường
 */
export default function SlideShowDetail({ Category, Events }) {
  //console.log("event: ",Events);

  const items = Events;
  const [activeItem, setActiveItem] = useState(1);
  const itemsPerSlide = items.length > 4 ? 4 : items.length;
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
  const handleClick = (item) => {
    navigate(EVENT_DETAIL_PAGE, { state: { event: item } });
  };

  //Auto-cycle
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, intervalTime);
    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  // const handleSubmit = (cataName) => {
  //   navigate(SEARCH_PAGE,{state: {cataName: cataName}})
  // }
  return items ? (
    <MDBContainer className="my-5 position-relative">
      <MDBTypography variant="h4" className="mb-4" color="black">
        {Category}
      </MDBTypography>
      <MDBCarousel showControls={false} showIndicators={false} fade>
        <MDBCarouselItem className="active">
          <MDBRow className="justify-content-center">
            {getVisibleItems().map((item) => (
              <MDBCol
                style={{ cursor: "pointer" }}
                key={item.id}
                md="3"
                className="mb-3"
              >
                <MDBCard onClick={() => handleClick(item)}>
                  <div className="calendar-container">
                    <MDBCardImage
                      style={{ maxHeight: "206px", minHeight: "206px" }}
                      src={"data:image/png;base64, " + item.image}
                      alt={item.name}
                      position="top"
                    />
                    <div className="calendar-box-sm">
                      <div className="month-sm">Tháng {getMonth(item.startDate)}</div>
                      <div className="day-sm">{getDay(item.startDate)}</div>
                      <div className="year-sm">{getYear(item.startDate)}</div>
                    </div>
                  </div>

                  <MDBCardBody>
                    <MDBCardTitle
                      title={item.name}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.name}
                    </MDBCardTitle>
                    <MDBCardText>
                      Từ ngày: <strong>{formatDateTime(item.startDate)}</strong>
                    </MDBCardText>
                    <MDBCardText>
                      Đến ngày: <strong>{formatDateTime(item.endDate)}</strong>
                    </MDBCardText>
                  </MDBCardBody>
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
          left: "-40px", // Adjust this value to move the icon further left,
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
          right: "-40px", // Adjust this value to move the icon further right
          padding: "10px",
          borderRadius: "50%",
        }}
        onClick={handleNext}
      />
    </MDBContainer>
  ) : ''
    ;
}
