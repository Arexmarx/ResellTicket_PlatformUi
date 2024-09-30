import { useRef } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx";
import SlideShowMain from "../../components/SlideShowMain.jsx";
import SlideShowHotEvent from "../../components/SlideShowHotEvent.jsx";
import SlideShowDetail from "../../components/SlideShowDetail.jsx";
import { Event, FONT_MAIN } from "../../config/Constant.js";

/**
 * Author: Phan Nguyễn Mạnh Cường
 */
export default function HomePage() {

  const musicRef = useRef(null);
  const exhibitionRef = useRef(null);
  const eventRef = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop - 100,
      behavior: "smooth",
    });
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <MDBRow style={{marginTop: '4%', marginLeft: '15%'}}>
          <MDBCol>
            <MDBBtn
              color="tertiary"
              size="lg"
              onClick={() => scrollToSection(musicRef)}
              style={{borderColor: 'white', color:'black'}}
            >
              Âm Nhạc
            </MDBBtn>
            <MDBBtn
              color="tertiary"
              size="lg"
              style={{ marginLeft: "30px" }}
              onClick={() => scrollToSection(eventRef)}
              style={{borderColor: 'white', marginLeft: '2%', color:'black'}}
            >
              Sự Kiện
            </MDBBtn>
            <MDBBtn
              color="tertiary"
              size="lg"
              style={{ marginLeft: "30px" }}
              onClick={() => scrollToSection(exhibitionRef)}
              style={{borderColor: 'white', marginLeft: '2%',color:'black'}}
            >
              Triển Lãm
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      <MDBContainer style={{ marginTop: "3%" }}>
      </MDBContainer>
      <SlideShowMain />
      <SlideShowHotEvent />
      <div ref={musicRef}>
        <SlideShowDetail Event={Event.MUSIC} />
      </div>
      <div ref={exhibitionRef}>
        <SlideShowDetail Event={Event.EXHIBITION} />
      </div>
      <div ref={eventRef}>
        <SlideShowDetail Event={Event.EVENT} />
      </div>
      <Footer />
    </div>
  );
}
