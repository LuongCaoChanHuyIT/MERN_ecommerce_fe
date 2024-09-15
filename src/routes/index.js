import AdminPage from "../pages/AdminPage/AdminPage";
import HomePage from "../pages/HomePage/HomePage";
import MyOrderPage from "../pages/MyOrderPage/MyOrderPage";
import NotFound from "../pages/NotFound/NotFound";
import OrderPage from "../pages/OrderPage/OrderPage";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/product",
    page: ProductPage,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/product/:type",
    page: TypeProductPage,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    isShowHeader: false,
    isPrivate: false,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    isShowHeader: false,
    isPrivate: false,
  },
  {
    path: "/product-detail/:id",
    page: ProductDetailPage,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/profile-user",
    page: ProfilePage,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/system/admin",
    page: AdminPage,
    isShowHeader: false,
    isPrivate: true,
  },
  {
    path: "/payment",
    page: PaymentPage,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/order-success",
    page: OrderSuccess,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/my-order",
    page: MyOrderPage,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "*",
    page: NotFound,
  },
];
