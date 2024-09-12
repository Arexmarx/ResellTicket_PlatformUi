import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  DEFAULT_PAGE,
  HOME_PAGE,
  SIGN_UP_PAGE,
  LOGIN_PAGE,
  EVENT_DETAIL_PAGE,
} from "./config/Constant";
import HomePage from "./page/public/HomePage";
import SignUp from "./page/public/SignUpPage";
import Login from "./page/public/LoginPage";
import EventDetail from "./page/public/EventDetailPage";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={DEFAULT_PAGE} element={<SignUp />}></Route>

          <Route path={LOGIN_PAGE} element={<Login />}></Route>

          <Route path={HOME_PAGE} element={<HomePage />}></Route>
          <Route path={SIGN_UP_PAGE} element={<SignUp />}></Route>
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
