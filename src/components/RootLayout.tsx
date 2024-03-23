import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CarouselBanner from "./homePage/CarouselBanner";
import Menu from "./homePage/Menu";
import Cheffsays from "./homePage/Cheffsays";
function RootLayout() {
  return (
    <>
      <Header />
      <>
        <Outlet />
      </>
      <Footer />
      <ScrollRestoration />

    </>
  );
}

export default RootLayout;

export function HomePage() {
  return (
    <>
      <CarouselBanner />
      <Menu />
      <Cheffsays />
    </>
  );
}
