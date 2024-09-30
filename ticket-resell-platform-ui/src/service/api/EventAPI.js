import axios from "axios";
import { BASE_GETWAY_API } from "../../config/Constant";

// const EVENT_BASE_REST_API = "http://localhost:8082/TicketResellPlatform"
// const GET_HEAPPENING_API = EVENT_BASE_REST_API + "/api/events/get-happening-events"

const GET_HEAPPENING_EVENT_API = BASE_GETWAY_API + "/api/events/get-happening-events"
const GET_HEAPPENING_EVENT_BY_CATE_NAME_API = BASE_GETWAY_API + "/api/events/get-happening-events/"

const EventAPI = {

    getHappeningEvents(){
        return axios.get(GET_HEAPPENING_EVENT_API)
    },

    getHappeningEventByCateName(categoryName) {
        return axios.get(GET_HEAPPENING_EVENT_BY_CATE_NAME_API + categoryName)
    }

}

export default EventAPI;