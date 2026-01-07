import { Outlet } from "react-router";
import Footer from "../components/footer.tsx";
import Header from "../components/header.tsx";

export default function HeaderFooter() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
