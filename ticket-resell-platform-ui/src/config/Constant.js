// UI URL
export const DEFAULT_PAGE = "/"
export const SIGN_UP_PAGE = "/signUp"
export const LOGIN_PAGE = "/login"
export const HOME_PAGE = "/home"
export const BOUGHT_TICKET_MANEMENT_PAGE = "/users/dashboard"
export const PROFILE_PAGE = "/users/profile"
export const MY_SHOP_PAGE = "/users/myshop";
export const BUY_TICKET_PAGE ="/users/buyTicket"
export const CHECK_OUT_PAGE = "/users/checkOut"
export const MANAGE_BUYER_PAGE ="/users/manageMoney"
export const ADD_TICKET_PAGE = "/users/myshop/add-ticket"
export const CHANGE_PASSWORD_PAGE = "/users/password"
export const SEARCH_PAGE = "/users/search"
export const EMAIL_VERIFY_PAGE = "/signUp/verify"
export const EVENT_DETAIL_PAGE = "/eventDetail"
export const UNAUTHORIZED_PAGE = "/unauthorized"
export const HANDEL_PAYMENT_PAGE = "/payments/loading"
export const VIEW_HISTORY_DEPOSITED_PAGE = "/users/history-deposited"
export const FORGET_PASSWORD_PAGE = "/forget-password"
export const VERIFY_FORGET_PASSWORD_PAGE ="/verify-forget-password"
export const RETURN_PASSWORD_PAGE ="/return-password"
// Color
export const MAIN_COLOR = '#2dc275';

// Side bar options
export const SidebarOption = {
    PROFILE: 'profile',
    BOUGHT_TICKET: 'boughtTicket',
    MY_SHOP: 'myShop',
    BALANCE: 'balance',
    INFORM: 'inform',
    CHANGE_PASS: 'changePassword'
}

// Fixed supported categories
export const Event = {
    MUSIC: "Âm Nhạc",
    EXHIBITION: "Triển Lãm",
    EVENT: "Sự Kiện",
    OTHER: "Khác"
}

// Local storage key
export const USER_ID_KEY = "user_id"
export const AUTH_TOKENS_KEY = 'authTokens'

// Ticket type
export const TicketTypes = [
    { value: false , name: 'Online' },
    { value: true , name: 'Giấy' }
]

// Font main
export const FONT_MAIN = "Quicksand"

// Http Gateway Base Api
export const BASE_GETWAY_API = "http://localhost:8090"
