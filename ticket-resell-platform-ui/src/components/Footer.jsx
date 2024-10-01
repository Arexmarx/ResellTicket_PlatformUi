import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";


/**
 * Author: Phan Nguyễn Mạnh Cường
 */
export default function Footer() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <div style={{backgroundColor: 'rgb(57, 63, 78)', color:'rgb(206 206 206)'}}>
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Hãy liên hệ với chúng tôi qua mạng xã hội:</span>
          </div>

          <div>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="facebook-f" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="twitter" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="google" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="instagram" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="linkedin" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="github" />
            </a>
          </div>
        </section>

        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  {/* <MDBIcon icon="ticket-alt" className="me-3" /> */}
                  <img src="src\assets\logo\LogoTab-Photoroom.png" style={{maxHeight: '20px'}}/>
                  Resell Ticket
                </h6>
                <p>
                  Nền tảng bán lại vé chưa dùng uy tín, an toàn, chất lượng đầu
                  hàng Việt Nam.
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  Chính sách của chúng tôi
                </h6>
                <p>
                  <a href="#!" className="text-reset">
                    Pricing
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Settings
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Orders
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Help
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <MDBIcon icon="home" className="me-2" />
                  New York, NY 10012, US
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-3" />
                  info@example.com
                </p>
                <p>
                  <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
                </p>
                <p>
                  <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </div>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgb(29, 29, 29)" }}
      >
        © 2024 Copyright:
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          Ticket Resell
        </a>
      </div>
    </MDBFooter>
  );
}
