import { useEffect, useRef, useState } from "react";
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
import { Event, SEARCH_PAGE } from "../../config/Constant.js";
import EventAPI from "../../service/api/EventAPI.js";
import CategoryAPI from "../../service/api/CategoryAPI.js";
import LoadEffect from "../../components/LoadEffect.jsx";
import ChatBubble from "../../components/ChatBubble.jsx";
import { Navigate, useNavigate } from "react-router-dom";


/**
 * Author: Phan Nguyễn Mạnh Cường
 */
export default function HomePage() {
  const navigate = useNavigate();
  const musicRef = useRef(null);
  const exhibitionRef = useRef(null);
  const eventRef = useRef(null);
  const otherRef = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop - 100,
      behavior: "smooth",
    });
  };

  // Select categories
  const [categories, setCategories] = useState([])
  const [musicEvents, setMusicEvents] = useState(null)
  const [eventEvents, setEventEvents] = useState(null)
  const [exhibitionEvents, setExhibitionEvents] = useState(null)
  const [otherEvents, setOtherEvents] = useState(null)
  const [allEvents, setAllEvents] = useState(null)

  useEffect(() => {

    const fetchData = async () => {
      const cateReponse = await CategoryAPI.getUsingCategories()
      //console.log(cateReponse.data.object);
      setCategories(cateReponse.data.object)
    };

    fetchData().catch(console.error);
  }, []);


  useEffect(()  => {
    
    const fetchData = async () => {
      const musicEventResponse = await EventAPI.getHappeningEventByCateName('Âm nhạc')
      //console.log(musicEventResponse.data.object);
      setMusicEvents(musicEventResponse.data.object)
    }

    fetchData().catch(console.log)
  }, [])

  useEffect(()  => {

    const fetchData = async () => { 
      const exhibitionEventResponse = await EventAPI.getHappeningEventByCateName('Triển lãm')
      setExhibitionEvents(exhibitionEventResponse.data.object)
    }    

    fetchData().catch(console.log)
  }, [])


  useEffect(() => {

    const fetchData = async () => {
      const eventEventResponse = await EventAPI.getHappeningEventByCateName('Sự kiện')
      //console.log(eventEventResponse.data.object);
      setEventEvents(eventEventResponse.data.object)
    }

    fetchData().catch(console.log)

  }, [])


  useEffect(() => {

    const fetchData = async () => {
      const otherEventResponse = await EventAPI.getHappeningEventByCateName('Khác');
      //console.log(otherEventResponse.data.object);
      setOtherEvents(otherEventResponse.data.object)
    };

    fetchData().catch(console.error);
  }, []);

  
  useEffect(() => {

    const fetchData = async () => {
      const allEventResponse = await EventAPI.getHappeningEvents();
      setAllEvents(allEventResponse.data.object)
    }

    fetchData().catch(console.error);
  }, [])

  

  useEffect(() => {
    
  }, [])

  if (!categories || !musicEvents || !eventEvents || !exhibitionEvents || !otherEvents || !allEvents) {
    return (
      <LoadEffect/>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <MDBRow style={{marginTop: '6%', marginLeft: '15%'}}>
          <MDBCol>

            {
              (categories) ?
              categories.map(cate => (
                <MDBBtn key={cate.id}
                  outline
                  color="tertiary"
                  size="lg"
                  style={{borderColor: '#fbf9f9',fontWeight:'bold', fontSize:'medium' }}
                  onClick={() => scrollToSection(
                    (cate.name == 'Âm nhạc') ? musicRef :
                      (cate.name == 'Sự kiện') ? eventRef :
                        (cate.name == 'Triển lãm') ? exhibitionRef : otherRef
                  )}
                >
                  {cate.name}
                </MDBBtn>
              ))
              : ''
            }
            {/* <MDBBtn
              outline
              color="success"
              size="sm"
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
            </MDBBtn> */}
          </MDBCol>

        </MDBRow>
      <MDBContainer>
      </MDBContainer>

      <SlideShowMain />

      <SlideShowHotEvent />

      {
        musicEvents && musicEvents.length > 0 && (
          <div ref={musicRef} >
            <SlideShowDetail Category={Event.MUSIC} Events={musicEvents} />
          </div>
        )
      }

      {
        exhibitionEvents && exhibitionEvents.length > 0 && (
          <div ref={exhibitionRef}>
            <SlideShowDetail Category={Event.EXHIBITION} Events={exhibitionEvents} />
          </div>
        )
      }

      {
        eventEvents && eventEvents.length > 0 && (
          <div ref={eventRef}>
            <SlideShowDetail Category={Event.EVENT} Events={eventEvents} />
          </div>
        )
      }

      {
        otherEvents && otherEvents.length && (
          <div ref={otherRef}>
            <SlideShowDetail Category={Event.OTHER} Events={otherEvents} />
          </div>
        )
      }

      {
        allEvents && allEvents.length > 0 && (
          <div>
            <SlideShowDetail Category={'Tất Cả'} Events={allEvents} />
          </div>
        )
      }

      <ChatBubble/>
      <Footer />
    </div>
  );
}
