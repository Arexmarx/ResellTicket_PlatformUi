import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  MDBContainer,
  MDBTypography,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import axios from "axios";
import API from "../../config/API";
import HttpStatus from "../../config/HttpStatus";
import { useLocation } from "react-router-dom";

export default function PolicyDetailPage() {
  const location = useLocation();
  const { typeOfPolicy } = location.state || {}; // Get the type of policy from the router state

  const [policy, setPolicy] = useState({ content: [], typePolicy: {} });


  useEffect(() => {
    console.log(policy);
    
    if (!typeOfPolicy) return; // Don't run the effect until typeOfPolicy is set

    const fetchPolicy = async () => {
      try {
        let endpoint = "";

        // Set the endpoint based on the type of policy
        switch (typeOfPolicy) {
          case "buyerPolicy":
            endpoint = API.GATEWAY + API.Policy.GET_BUYING_POLICY;
            break;
          case "generalPolicy":
            endpoint = API.GATEWAY + API.Policy.GET_GENERAL_POLICY;
            break;
          case "sellerPolicy":
            endpoint = API.GATEWAY + API.Policy.GET_SELLING_POLICY;
            break;
          default:
            endpoint = API.GATEWAY + API.Policy.GET_GENERAL_POLICY;
        }

        const response = await axios.get(endpoint);

        if (response.data.httpStatus === HttpStatus.OK) {
          setPolicy(response.data.object);
        }
      } catch (error) {
        console.error("Error fetching policy:", error);
      }
    };

    fetchPolicy();
  }, [typeOfPolicy]); // Add typeOfPolicy as a dependency

  return (
    <div>
      <Header />

      <MDBContainer className="my-5 position-relative">
        <MDBCard style={{ marginTop: "10%", paddingBottom:"9%" }}>
          <MDBCardBody>
            <MDBTypography tag="h1" className="text-center mb-4">
                {policy.typePolicy.name && 
                policy.typePolicy.name}
            </MDBTypography>

            <div className="policy-text">
              {policy.content && Array.isArray(policy.content) ? (
                policy.content.map((value, index) => <p key={index}>{value}</p>)
              ) : (
                <p>Chưa có chính sách.</p>
              )}
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
      <Footer />
    </div>
  );
}
