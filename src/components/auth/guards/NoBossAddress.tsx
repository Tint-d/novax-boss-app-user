import { Profile } from "@/utils/Navbar";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

interface  HadBossAddressProps {
    children : React.ReactNode
}

const NoBossAddress = ({ children } : HadBossAddressProps) => {

  const token = Cookies.get("token");

  const user  =  Cookies.get("user") as string 

  let userObj = {}
  if(user !== "undefined")
  {
     userObj = JSON.parse(user)
  }
    if (token && (userObj as unknown as Profile)?.boss_address == null) {
        return <Navigate to="/" />;
    }
    else  if(!token)
    {
        return <Navigate to="/login" />;
    }
    return children;

};

export default NoBossAddress;