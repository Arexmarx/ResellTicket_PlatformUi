import axios from "axios";
import { BASE_GETWAY_API } from "../../config/Constant";

// const USER_REST_API_BASE = "http://localhost:8081/TicketResellPlatform"
// const GET_USER_INFO_API = USER_REST_API_BASE + "/api/users/get/info/"
// const UPDATE_USER_INFO_API = USER_REST_API_BASE + "/api/users/update/"
// const UPDATE_USER_AVATAR_API = USER_REST_API_BASE + "/api/users/profile/update/avatar/"
// const UPDATE_USER_ISSELLER_API = USER_REST_API_BASE + "/api/users/update/seller/agree/"

const GET_USER_INFO_API = BASE_GETWAY_API + "/api/users/get/info/"
const UPDATE_USER_INFO_API = BASE_GETWAY_API+ "/api/users/update/"
const UPDATE_USER_AVATAR_API = BASE_GETWAY_API + "/api/users/profile/update/avatar/"
const UPDATE_USER_ISSELLER_API = BASE_GETWAY_API + "/api/users/update/seller/agree/"

const UserAPI = {

    getUserInfo(id) {
        return axios.get(GET_USER_INFO_API + id);
    },

    updateInfo(id, updateInfoRequest) {
        return axios.put(UPDATE_USER_INFO_API + id, updateInfoRequest);
    },

    updateAvatar(id, data) {
        return axios.post(UPDATE_USER_AVATAR_API+id, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*"
            }
        });
    },

    updateIsSeller(id) {
        return axios.put(UPDATE_USER_ISSELLER_API+id);
    }   

}

export default UserAPI;