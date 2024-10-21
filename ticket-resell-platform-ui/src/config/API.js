
const API =  {

    GATEWAY: "http://localhost:8090",

    Authentication: {
        REGISTER_USER: "/api/users/register",
        AUTHENTICATION_USER: "/api/users/authenticate",
        OAUTH2_AUTHENTICATION_USER: "/api/users/oauth2/authenticate"
    },

    User: {
        GET_USER_INFO: "/api/users/get/info",
        UPDATE_USER_INFO: "/api/users/update/",
        UPDATE_USER_AVATAR: "/api/users/profile/update/avatar/",
        UPDATE_USER_ISSELLER: "/api/users/update/seller/agree/",
        VERIFY_ACCOUNT_BY_OPT: "/api/users/register/verify-email",
        CHECK_EMAIL: "/api/users/reset-password",
        SEND_PASSWORD_OTP: "/api/users/reset-password/verify-reset-otp",
        SET_NEW_PASSWORD: "/api/users/reset-password/new-pass",
        CHANGE_PASSWORD: "/api/users/change-pass",
        GET_ALL_RECEIVED_NOTIFICATION: "/api/users/get/notifications/all/"
    },

    Ticket: {
        GET_TOTAL_TICKETS_IN_GENERIC_TICKET: "/api/tickets/generic/get-total-ticket/",
        CREATE_TICKET: "/api/tickets/create",
        GET_ALL_TICKET_OF_SELLER: "/api/tickets/get-tickets-of-seller/",
        ACCEPT_SELLING_TICKET_REQUEST: "/api/tickets/accept/selling-request",
        DENY_SELLING_TICKET_REQUEST: "/api/tickets/deny/selling-request",
        GET_ALL_BOUGHT_TICKET: "/api/tickets/get-all-bought-tickets/",
        GET_ALL_BOUGHT_TICKET_BY_BUYER: "/api/tickets/get-all-bought-tickets-of-buyer/",
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
        GET_SELLING_POLICY: "/api/policy/get/selling",
        GET_BUYING_POLICY: "/api/policy/get/buying",
        GET_GENERAL_POLICY: "/api/policy/get/general"
    },

    Event: {
        GET_HEAPPENING_EVENT: "/api/events/get-happening-events",
        GET_HEAPPENING_EVENT_BY_CATE_NAME: "/api/events/get-happening-events/",
        GET_HAPPENING_EVENT_BY_HASHTAG_HOT: "/api/events/get-happening-events/hot-event",
        GET_HAPPENING_EVENT_BY_HASHTAG_SEPECIAL: "/api/events/get-happening-events/special-event"
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
    },

    Report:{
        CREATE_REPORT_API: "/api/reports/create"
    },

    ReportType : {
        GET_ALL_REPORT_TYPE: "/api/report-type/get-all"
    },

    Notiication: {
        MARK_READ: "/api/notifications/mark-read/",
        MARK_DELETED: "/api/notifications/mark-deleted/",
        DELETE_FOREVER:  "/api/notifications/delete-forever/",
    },
}

export default API