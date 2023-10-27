import { ChildrenType } from "../typings/type";
import Navbar from "./Navbar";

const Layout = ({ children }: ChildrenType) => {
  return (
    <div className=" bg-[#0E1217] w-full">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
