import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import {
  MDBBadge,
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
import { TextField } from "@mui/material";

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventName } = location.state || {};

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //console.log(events);
  

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
    if (events.length > 0) {
      const filteredByName = events.filter((eventItem) =>
        eventItem.name && eventItem.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredEvents(filteredByName);
    } else {
      console.log("No events to filter.");
    }
  }, [events, searchTerm]);

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <Header />
      <MDBContainer className="my-5 position-relative">
        <MDBTypography style={{ paddingTop: "3%" }}>
          Kết quả tìm kiếm của: {eventName}
        </MDBTypography>

        <MDBRow style={{ marginTop: '2%' }}>
          <div className="col-md-5 d-flex align-items-center">
            <div style={{ width: '100%' }}>
              <div>Tìm kiếm tên sự kiện</div>
              <TextField type="text"
                style={{ width: '100%' }}
                value={searchTerm} onChange={handleSearchChange}
                label="Tìm kiếm sự kiện theo tên"
              />
            </div>
            {/* <input
              type="text"
              placeholder="Tìm kiếm sự kiện theo tên"
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-control"
            /> */}
          </div>
          <div className="col-md-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>Tìm kiếm tên sự kiện</div>
              <DemoContainer components={["DatePicker"]}>
                
                <DatePicker
                  label="Chọn ngày bắt đầu sự kiện"
                  onChange={(date) => handleSearchDate(date)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </MDBRow>
        <MDBRow style={{ marginTop: "2%" }}>
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
                  {/* {
                    <MDBBadge className='mx-2 mt-2' color='danger' light>
                        Đã kết thúc
                    </MDBBadge>
                  } */}
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

                    {/* {
                      eventItem.hashtags &&
                      eventItem.hashtags.map((hashtag, index) => (
                        <span key={index}>{hashtag.name}</span>
                      ))
                    } */}

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
