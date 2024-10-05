import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { ITEMS } from "../../test/DataTest"
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import Footer from "../../components/Footer";

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const {event} = location.state || {};

//   if (!event) {
//     return <div>No event data available</div>;
//   }
  return (
    <div>
        <Header/>
        <MDBContainer className="my-5 position-relative">
            <MDBRow style={{marginTop: '5%'}}>
            {ITEMS.map((x, index) =>(
                <MDBCol key={index} md="3" style={{marginTop: "4%"}}>
                    <MDBCard>
                        <MDBCardImage style={{ maxHeight: '206px', minHeight: '206px' }} src={x.image} position='top' />
                        <MDBCardBody>
                            <MDBCardTitle>{x.title}</MDBCardTitle>
                            <MDBCardText>Ngày bắt đầu: {x.startDate}</MDBCardText>
                            <MDBCardText>Ngày kết thúc: {x.endDate}</MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            ))}
            </MDBRow>
        </MDBContainer>
        <Footer/>
    </div>
  )
}
