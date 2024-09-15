import "./App.css";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import {
  DEFAULT_PAGE,
  HOME_PAGE,
  SIGN_UP_PAGE,
  LOGIN_PAGE,
  EVENT_DETAIL_PAGE,
  BOUGHT_TICKET_MANEMENT_PAGE,
  PROFILE_PAGE,
  MY_SHOP_PAGE,
  BUY_TICKET_PAGE,
  CHECK_OUT_PAGE,
  MANAGE_BUYER_PAGE,
} from "./config/Constant";
import HomePage from "./page/public/HomePage";
import SignUp from "./page/public/SignUpPage";
import Login from "./page/public/LoginPage";
import BoughtTicketManagementPage from './page/private/BoughtTicketManagementPage';
import ProfilePage from "./page/private/ProfilePage";
import MyShopPage from "./page/private/MyShopPage";
import EventDetail from "./page/public/EventDetailPage";
import BuyTicketPage from "./page/private/BuyTicketPage";
import CheckOutPage from "./page/private/CheckOutPage";
import ScrollToTop from "./components/ScrollToTop";
import ManageBuyerPage from"./page/private/ManageBuyerMoney";
function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop/>
        <Routes>

          <Route path={DEFAULT_PAGE} element={<HomePage />}></Route>

          <Route path={LOGIN_PAGE} element={<Login />}></Route>

          <Route path={HOME_PAGE} element={<HomePage />}></Route>

          <Route path={SIGN_UP_PAGE} element={<SignUp />}></Route>

          <Route path={BOUGHT_TICKET_MANEMENT_PAGE} element={<BoughtTicketManagementPage/>}></Route>

          <Route path={PROFILE_PAGE} element={<ProfilePage/>}></Route>

          <Route path={MY_SHOP_PAGE} element={ <MyShopPage/> }></Route>

          <Route path={EVENT_DETAIL_PAGE} element={ <EventDetail/> }></Route>

          <Route path={BUY_TICKET_PAGE} element={<BuyTicketPage/>}></Route>

          <Route path={CHECK_OUT_PAGE} element={<CheckOutPage/>}></Route>

          <Route path={MANAGE_BUYER_PAGE} element={<ManageBuyerPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

/*
Component:
 Footer
 Header
 
Folder page:
 ... + Page
 SellerDashboardPage  

Api folder
 ... + API

 */