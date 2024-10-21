import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import EventAPI from "../../service/api/EventAPI";
import { formatDateTime } from "../../service/DateService";
import { EVENT_DETAIL_PAGE } from "../../config/Constant";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import '../../assets/css/BoxDateTime.css'
import { getDay, getMonth, getYear } from "../../service/DateService";

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventName } = location.state || {};

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventResponse = await EventAPI.getHappeningEvents();
        setEvents(eventResponse.data.object);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // console.log("Component mounted or updated");
    // console.log("Event name:", eventName);
    // console.log("Events:", events);

    if (events.length > 0) {
      if (eventName) {
        setFilteredEvents(
          events.filter(
            (eventItem) =>
              eventItem.name &&
              eventItem.name.toLowerCase().includes(eventName.toLowerCase())
          )
        );
      } else {
        setFilteredEvents(events);
      }
    } else {
      console.log("No events to filter.");
    }
  }, [events, eventName]);

  const handleClick = (item) => {
    navigate(EVENT_DETAIL_PAGE, { state: { event: item } });
  };

  const handleSearchDate = (findDate) => {
    if (events.length > 0) {
      const selectedDate = dayjs(findDate).format("YYYY-MM-DD");

      setFilteredEvents(
        events.filter((eventItem) => {
          const eventDate = dayjs(eventItem.startDate).format("YYYY-MM-DD");
          return eventDate === selectedDate;
        })
      );
    } else {
      console.log("No events to filter.");
    }
  };

  return (
    <div>
      <Header />
      <MDBContainer className="my-5 position-relative">
        <MDBTypography style={{ paddingTop: "3%" }}>
          Kết quả tìm kiếm của: {eventName}
        </MDBTypography>
        <MDBRow>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Chọn ngày bắt đầu sự kiện"
                onChange={(date) => handleSearchDate(date)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </MDBRow>
        <MDBRow style={{ marginTop: "3%" }}>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((eventItem, index) => (
              <MDBCol key={index} md="3" style={{ marginTop: "4%" }}>
                <MDBCard>
                  <div className="calendar-container">
                    <MDBCardImage
                      onClick={() => handleClick(eventItem)}
                      style={{ maxHeight: "206px", minHeight: "206px" }}
                      src={"data:image/png;base64, " + eventItem.image}
                      position="top"
                    />
                    <div className="calendar-box-sm">
                      <div className="month-sm">Tháng {getMonth(eventItem.startDate)}</div>
                      <div className="day-sm">{getDay(eventItem.startDate)}</div>
                      <div className="year-sm">{getYear(eventItem.startDate)}</div>
                    </div>
                  </div>

                  <MDBCardBody>
                    <MDBCardTitle
                      title={eventItem.name}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {eventItem.name}
                    </MDBCardTitle>
                    <MDBCardText
                      style={{
                        marginTop: eventItem.name.length > 22 ? "8%" : "8%",
                      }}
                    >
                      Từ ngày: <strong>{formatDateTime(eventItem.startDate)}</strong>
                    </MDBCardText>
                    <MDBCardText>
                      Đến ngày: <strong>{formatDateTime(eventItem.endDate)}</strong>
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))
          ) : (
            <div>No event data available</div>
          )}
        </MDBRow>
      </MDBContainer>
      <Footer />
    </div>
  );
}
