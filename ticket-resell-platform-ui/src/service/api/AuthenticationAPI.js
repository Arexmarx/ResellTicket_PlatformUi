import axios from "axios"

const REST_API_BASE = "http://localhost:8081/TicketResellPlatform"
const REGISTER_USER_API = REST_API_BASE + "/api/users/register"
const AUTHENTICATION_API = ""

const AuthenticationAPI = {

    register(registerRequest) {
        return axios.post(REGISTER_USER_API, registerRequest)
    },

    login(authenticationRequest) {
        return axios.post("")
    }

}

export default AuthenticationAPI;