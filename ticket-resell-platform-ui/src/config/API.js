
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
        GET_ALL_TICKET_OF_SELLER: "/api/tickets/get-tickets-of-seller/",
        ACCEPT_SELLING_TICKET_REQUEST: "/api/tickets/accept/selling-request"
    },

    GenericTicket: {
        CREATE_GENERIC_TICKET: "/api/tickets/generic/create",
        UPDATE_ALL_FIELDS_GENERIC_TICKET: "/api/tickets/generic/update-all/",
        GET_GENERIC_TICKET_BY_EVENT: "/api/tickets/generic/get-by-event/",
        ORDER_GENERIC_TICKET: "/api/tickets/generic/order",
        GET_PROCESSING_ORDER_TICKET: "/api/tickets/generic/get-processing-order-ticket/",
        GET_REQUEST_ORDER_TICKET: "/api/tickets/generic/get-all-request-order-ticket/"
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
    },

    PaymentMethod: {
        GET_NOT_DELETED_PAYMENT_METHOD: "/api/tickets/get/not-deleted-payment-method"
    },

    Payment: {
        DEPOSITED_USER_API: "/api/payments/request",
        PAGE_BACK_DEPOSITED_API: "/api/payments/vn-pay-callback",
        VIEW_DEPOSITED_HISTORY_API:"/api/transactions/get-trans-deposit/"
    }
}

export default API