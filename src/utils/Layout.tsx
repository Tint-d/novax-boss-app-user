import { ChildrenType } from "../typings/type";
import Navbar from "./Navbar";

const Layout = ({ children }: ChildrenType) => {
  return (
    <div className=" w-[100vw]">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
