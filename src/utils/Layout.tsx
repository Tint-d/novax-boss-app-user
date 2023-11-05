import { ToastContainer } from "react-toastify";
import { ChildrenType } from "../typings/type";
import Navbar from "./Navbar";

const Layout = ({ children }: ChildrenType) => {
  return (
    <div className=" bg-[#0E1217] w-full">
      <Navbar />
      {children}

      <ToastContainer />
    </div>
  );
};

export default Layout;
