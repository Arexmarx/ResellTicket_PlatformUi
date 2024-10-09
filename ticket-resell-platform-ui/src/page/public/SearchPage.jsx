import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { ITEMS } from "../../test/DataTest";
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

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventName } = location.state || {};

  const [event, setEvent] = useState(null);
  //   if (!event) {
  //     return <div>No event data available</div>;
  //   }

  useEffect(() => {
    const fetchData = async () => {
      const eventResponse = await EventAPI.getHappeningEvents();
      console.log(eventResponse.data.object);
      setEvent(eventResponse.data.object);
    };
    fetchData().catch(console.log);
  }, []);

  const handleClick  = (item) => {
    navigate(EVENT_DETAIL_PAGE,{ state: { event: item } });
  }
  return (
    <div>
      <Header />
      <MDBContainer className="my-5 position-relative">
        <MDBTypography style={{ paddingTop: "3%" }}>
          Kết quả tìm kiếm của : {eventName}
        </MDBTypography>
        <MDBRow style={{ marginTop: "5%" }}>
          
          {event &&
            event.length > 0 &&
            event.map((eventItem, index) => (
              <MDBCol key={index} md="3" style={{ marginTop: "4%" }}>
                <MDBCard>
                  <MDBCardImage
                    onClick={() => handleClick(eventItem)}
                    style={{ maxHeight: "206px", minHeight: "206px" }}
                    src={"data:image/png;base64, " + eventItem.image}
                    position="top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>{eventItem.title}</MDBCardTitle>
                    <MDBCardText>
                      Ngày bắt đầu: {formatDateTime(eventItem.startDate)}
                    </MDBCardText>
                    <MDBCardText>
                      Ngày kết thúc: {formatDateTime(eventItem.endDate)}
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
        </MDBRow>
      </MDBContainer>
      <Footer />
    </div>
  );
}
