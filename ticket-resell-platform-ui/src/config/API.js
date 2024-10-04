
const API =  {

    GATEWAY: "http://localhost:8090",

    Authentication: {
        REGISTER_USER: "/api/users/register",
        AUTHENTICATION_USER: "/api/users/authenticate"
    },

    User: {
        GET_USER_INFO: "/api/users/get/info",
        UPDATE_USER_INFO: "/api/users/update/",
        UPDATE_USER_AVATAR: "/api/users/profile/update/avatar/",
        UPDATE_USER_ISSELLER: "/api/users/update/seller/agree/",
        VERIFY_ACCOUNT_BY_OPT: "/api/users/register/verify-email"
    },

    Ticket: {
        GET_TOTAL_TICKETS_IN_GENERIC_TICKET: "/api/tickets/generic/get-total-ticket/",
        CREATE_TICKET: "/api/tickets/create",
        GET_ALL_TICKET_OF_SELLER: "/api/tickets/get-tickets-of-seller/"
    },

    GenericTicket: {
        CREATE_GENERIC_TICKET: "/api/tickets/generic/create",
        UPDATE_ALL_FIELDS_GENERIC_TICKET: "/api/tickets/generic/update-all/",
        GET_GENERIC_TICKET_BY_EVENT: "/api/tickets/generic/get-by-event/",
        
    },
    
    Policy: {
        GET_SELLING_POLICY: "/api/policy/get/selling"
    },

    Event: {
        GET_HEAPPENING_EVENT: "/api/events/get-happening-events",
        GET_HEAPPENING_EVENT_BY_CATE_NAME: "/api/events/get-happening-events/"
    },

    Category: {
        GET_USING_CATEGORIES_API: "/api/categories/get-using-cate"
    }

}

export default API