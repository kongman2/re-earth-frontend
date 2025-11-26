// re-earth-frontend/src/routes/AppRouter.jsx
import { Routes, Route } from "react-router-dom";

// Guards
import GuestOnly from "./guards/GuestOnly";
import UserOnly from "./guards/UserOnly";
import AdminOnly from "./guards/AdminOnly";

// Public / Guest pages
import LandingPage from "../pages/public/Landing/LandingPage";
import LoginPage from "../pages/user/Login/LoginPage";
import RegisterPage from "../pages/user/Register/RegisterPage";
import FAQPage from "../pages/user/Inquiry/FAQPage";
import FindingPage from "../pages/user/Finding/FindingPage";

// User pages
// 유저메인페이지
import MainPage from "../pages/user/main/MainPage";
// 기부
import DonationInfoPage from "../pages/user/Donate/DonationInfoPage";
import DonationFormPage from "../pages/user/Donate/DonationFormPage";
import DonationCompletePage from "../pages/user/Donate/DonationCompletePage";
// 인증/적립
import SavingInfoPage from "../pages/user/saving/SavingInfoPage";
import SavingMap from "../pages/user/saving/SavingMap";
import SavingBicycle from "../pages/user/saving/SavingBicycle";
import CalcPointPage from "../pages_extra/Point/CalcPointPage";

// 고객센터
import InquiryFormPage from "../pages/user/Inquiry/Create/InquiryFormPage";

// 마이페이지
import MyPage from "../pages/user/mypage/MyPage";
import ProfileEditPage from "../pages/user/mypage/Profile/ProfileEditPage";

// 마켓 페이지
import PointShopPage from "../pages/market/PointShopPage";
import ItemDetailPage from '../pages/market/ItemDetailPage'

// 관리자 페이지
import AdminPage from '../pages/Admin/AdminPage'

// 마켓 페이지
import ItemCreatePage from '../pages/market/ItemCreatePage'

// Extra
import LoadingPage from "../pages_extra/Unloaded/LoadingPage";
import ErrorPage from "../pages_extra/Unloaded/ErrorPage";
import UnderConstruction from "../pages_extra/Unloaded/UnderConstruction";
import MobileRequiredPage from "../pages_extra/Unloaded/MobileRequiredPage";

export default function AppRouter() {
  return (
    <Routes>
      {/* 손님 전용(로그인/회원가입/FAQ 등 공개 페이지) */}
      <Route element={<GuestOnly />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/finding" element={<FindingPage />} />
      </Route>

      {/* 로그인 유저 전용 */}
       <Route element={<UserOnly />}> 
        <Route path="/user" element={<MainPage />} />
        <Route path="/user/my" element={<MyPage />} />
        <Route path="/user/my/edit" element={<ProfileEditPage />} />

        {/* 포인트샵 - 공개 페이지 */}
        <Route path="/pointshop" element={<PointShopPage />} />
        <Route path="/pointshop/detail/:id" element={<ItemDetailPage/>} />

        {/* 기부페이지 */}
        <Route path="/donate/info" element={<DonationInfoPage />} />
        <Route path="/donate/complete/:id" element={<DonationCompletePage />} />
        <Route path="/donate" element={<DonationFormPage />} />

        {/* 고객센터 */}
        <Route path="/inquiry/new" element={<InquiryFormPage />} />
        <Route path="/inquiry/faq" element={<FAQPage />} />

        {/* 인증/적립 */}
        <Route path="/saving/info" element={<SavingInfoPage />} />
        <Route path="/saving/map" element={<SavingMap />} />
        <Route path="/saving/bicycle" element={<SavingBicycle />} />
        <Route path="/saving/point" element={<CalcPointPage />} />
       </Route> 

      {/* 관리자 전용 */}
       <Route element={<AdminOnly />}> 
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/items/create" element={<ItemCreatePage />} />
       </Route> 

      {/* 유틸 페이지 */}
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/mobile-required" element={<MobileRequiredPage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="readysoon" element={<UnderConstruction />} />
    </Routes>
  );
}
