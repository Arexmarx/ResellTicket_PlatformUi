import axios from "axios";
import API from "../../config/API";

// const USER_REST_API_BASE = "http://localhost:8081/TicketResellPlatform"
// const GET_USER_INFO_API = USER_REST_API_BASE + "/api/users/get/info/"
// const UPDATE_USER_INFO_API = USER_REST_API_BASE + "/api/users/update/"
// const UPDATE_USER_AVATAR_API = USER_REST_API_BASE + "/api/users/profile/update/avatar/"
// const UPDATE_USER_ISSELLER_API = USER_REST_API_BASE + "/api/users/update/seller/agree/"

// const GET_USER_INFO_API = "/api/users/get/info"
// const UPDATE_USER_INFO_API = BASE_GETWAY_API+ "/api/users/update/"
// const UPDATE_USER_AVATAR_API = "/api/users/profile/update/avatar/"  // BASE_GETWAY_API + 
// const UPDATE_USER_ISSELLER_API = BASE_GETWAY_API + "/api/users/update/seller/agree/"
// const VERIFY_ACCPUNT_BY_OPT_API = BASE_GETWAY_API + "/api/users/register/verify-email"

const UserAPI = {
    /*
    getUserInfo() {
        return axios.get(GET_USER_INFO_API);
    },

    updateInfo(id, updateInfoRequest) {
        return axios.put(UPDATE_USER_INFO_API + id, updateInfoRequest);
    },

    updateAvatar(id, data) {
        return AxiosInstance.post(UPDATE_USER_AVATAR_API+id, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*"
            }
        });
    },

    updateIsSeller(id) {
        return AxiosInstance.put(UPDATE_USER_ISSELLER_API+id);
    },
    */ 
    
    verifyEmail(otpCode) {
        return axios.put(API.GATEWAY + API.User.VERIFY_ACCOUNT_BY_OPT, {}, {
            params: {
                verificationCode: otpCode
            }
        })
    }
    
}

export default UserAPI;