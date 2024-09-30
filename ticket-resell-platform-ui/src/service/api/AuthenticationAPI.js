import axios from "axios"
import { BASE_GETWAY_API } from "../../config/Constant"

// const REST_API_BASE = "http://localhost:8081/TicketResellPlatform"
// const REGISTER_USER_API = REST_API_BASE + "/api/users/register"
// const AUTHENTICATION_API = REST_API_BASE + "/api/users/authenticate"

const REGISTER_USER_API = BASE_GETWAY_API + "/api/users/register"
const AUTHENTICATION_API = BASE_GETWAY_API + "/api/users/authenticate"

const AuthenticationAPI = {

    register(registerRequest) {
        return axios.post(REGISTER_USER_API, registerRequest)
    },

    login(authenticationRequest) {
        return axios.post(AUTHENTICATION_API, authenticationRequest)
    }

}

export default AuthenticationAPI;