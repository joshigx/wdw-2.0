import { Outlet } from "react-router";
import Footer from "../components/general/footer.tsx";
import Header from "../components/general/header.tsx";

export default function HeaderFooter() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
