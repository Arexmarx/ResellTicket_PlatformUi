import axios from "axios";
import { BASE_GETWAY_API } from "../../config/Constant";

// Generic tickets api
const CREATE_GENERIC_TICKET_API = BASE_GETWAY_API + "/api/tickets/generic/create"
const UPDATE_ALL_FIELDS_GENERIC_TICKET_API = BASE_GETWAY_API + "/api/tickets/generic/update-all/"
const GET_GENERIC_TICKET_BY_EVENT_API = BASE_GETWAY_API + "/api/tickets/generic/get-by-event/"
const GET_TOTAL_TICKETS_IN_GENERIC_TICKET_API = BASE_GETWAY_API + "/api/tickets/generic/get-total-ticket/"

// Tickets api
const CREATE_TICKET_API = BASE_GETWAY_API + "/api/tickets/create"
const GET_ALL_TICKET_OF_SELLER_API = BASE_GETWAY_API + "/api/tickets/get-tickets-of-seller/"



const TicketAPI = {

    createGenericTicket(genericTicketRequest) {
        return axios.post(CREATE_GENERIC_TICKET_API, genericTicketRequest)
    },

    updateGenericTicket(id, genericTicketRequest) {
        return axios.put(UPDATE_ALL_FIELDS_GENERIC_TICKET_API + id, genericTicketRequest)
    },

    getGenericTicketByEvent(eventId) {
        return axios.get(GET_GENERIC_TICKET_BY_EVENT_API + eventId)
    },

    getTotalTicketsInGenericTicket(genericTicketId) {
        return axios.get(GET_TOTAL_TICKETS_IN_GENERIC_TICKET_API + genericTicketId)
    },

    createTicket(formData) {
        return axios.post(CREATE_TICKET_API, formData, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
    },

    getAllTicketOfSeller(sellerId) {
        return axios.get(GET_ALL_TICKET_OF_SELLER_API + sellerId)
    }

}

export default TicketAPI;