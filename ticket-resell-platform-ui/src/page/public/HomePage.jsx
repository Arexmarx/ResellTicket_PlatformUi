import React, { useRef } from "react";
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
import { Event } from "../../config/Constant.js";
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
      <MDBContainer style={{ marginTop: "5%" }}>
        <MDBRow>
          <MDBCol>
            <MDBBtn
              outline
              color="success"
              size="sm"
              onClick={() => scrollToSection(musicRef)}
            >
              Âm Nhạc
            </MDBBtn>
            <MDBBtn
              outline
              color="success"
              size="sm"
              style={{ marginLeft: "30px" }}
              onClick={() => scrollToSection(eventRef)}
            >
              Sự Kiện
            </MDBBtn>
            <MDBBtn
              outline
              color="success"
              size="sm"
              style={{ marginLeft: "30px" }}
              onClick={() => scrollToSection(exhibitionRef)}
            >
              Triển Lãm
            </MDBBtn>
          </MDBCol>
        </MDBRow>
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
