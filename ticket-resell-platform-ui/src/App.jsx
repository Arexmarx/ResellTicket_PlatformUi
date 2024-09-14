import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  DEFAULT_PAGE,
  HOME_PAGE,
  SIGN_UP_PAGE,
  LOGIN_PAGE,
<<<<<<< HEAD
  EVENT_DETAIL_PAGE,
  BOUGHT_TICKET_MANEMENT_PAGE,
  PROFILE_PAGE,
  MY_SHOP_PAGE,
=======
  BOUGHT_TICKET_MANEMENT_PAGE,
  PROFILE_PAGE,
  MY_SHOP_PAGE,
  EVENT_DETAIL_PAGE,
} from "./config/Constant";
import HomePage from "./page/public/HomePage";
import SignUp from "./page/public/SignUpPage";
import Login from "./page/public/LoginPage";
import BoughtTicketManagementPage from './page/private/BoughtTicketManagementPage';
import ProfilePage from "./page/private/ProfilePage";
import MyShopPage from "./page/private/MyShopPage";



import EventDetail from "./page/public/EventDetailPage";
>>>>>>> 8105fcc46583f36d8b42bc8c927ce066fdce2582
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>


          <Route path={DEFAULT_PAGE} element={<HomePage />}></Route>

          <Route path={LOGIN_PAGE} element={<Login />}></Route>

          <Route path={HOME_PAGE} element={<HomePage />}></Route>

          <Route path={SIGN_UP_PAGE} element={<SignUp />}></Route>

          <Route path={BOUGHT_TICKET_MANEMENT_PAGE} element={<BoughtTicketManagementPage/>}></Route>

          <Route path={PROFILE_PAGE} element={<ProfilePage/>}></Route>

          <Route path={MY_SHOP_PAGE} element={ <MyShopPage/> }></Route>

<<<<<<< HEAD
          <Route path={EVENT_DETAIL_PAGE} element={ <EventDetail/> }></Route>

=======
          <Route path={EVENT_DETAIL_PAGE} element={<EventDetail />}></Route>
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