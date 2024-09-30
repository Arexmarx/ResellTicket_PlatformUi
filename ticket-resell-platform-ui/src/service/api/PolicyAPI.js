import axios from "axios";
import { BASE_GETWAY_API } from "../../config/Constant";

// const POLICY_BASE_REST_API = "http://localhost:8085/TicketResellPlatform"
// const GET_SELLING_POLICY_API = POLICY_BASE_REST_API + "/api/policy/get/selling";

const GET_SELLING_POLICY_API = BASE_GETWAY_API + "/api/policy/get/selling"

const PolicyAPI = {

    getSellingPolicy() {
        return axios.get(GET_SELLING_POLICY_API);
    }

}

export default PolicyAPI;