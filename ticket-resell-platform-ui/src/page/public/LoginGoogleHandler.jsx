import { useContext, useEffect } from "react";
import LoadEffect from "../../components/LoadEffect";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { LOGIN_PAGE, SIGN_UP_PAGE } from "../../config/Constant";
import { useNavigate } from "react-router-dom";
import HttpStatus from "../../config/HttpStatus";


export default function LoginGoogleHandler() {

  const navigator = useNavigate()
  const { oauth2LoginUser } = useContext(AuthContext)

  // Fetch google account data
  // useEffect(() => {
  //   const fetchData = async () => {
  //     axios.get("http://localhost:8080/api/oauth2/user", { withCredentials: true })
  //       .then(
  //         response => {
  //           //console.log(response.data);
  //           oauth2LoginUser(response.data.email, response.data)
  //         }
  //       )
  //       .catch(error => console.log(error))
  //   }
  //   fetchData().catch(console.error)
  // }, [])

  useEffect(() => {
    axios.get("http://localhost:8080/api/oauth2/user", { withCredentials: true })
      .then(
        response => {
          if (response.data.httpStatus === HttpStatus.UNAUTHORIZED) {
            navigator(LOGIN_PAGE)
          } 
          // console.log(response.data);
          oauth2LoginUser(response.data.email).catch( error => {
            navigator(SIGN_UP_PAGE,  { state: { oauth2Data: response.data } })
          })
        }
      )
      .catch(error => console.log(error))
  }, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8080/api/oauth2/user", { withCredentials: true });
  //       try {
  //         await oauth2LoginUser(response.data.email);
  //       } catch (error) {
  //         navigator(SIGN_UP_PAGE, { state: { oauth2Data: response.data } });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div>
      <LoadEffect />
    </div>
  )
}
