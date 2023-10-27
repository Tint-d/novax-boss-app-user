import { ChildrenType } from "../typings/type";
import Navbar from "./Navbar";

const Layout = ({ children }: ChildrenType) => {
  return (
    <div className="bg-[#1C1F26] w-full">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
