import { Profile } from "@/utils/Navbar";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { selectProfile } from "@/redux/services/businessSlice";
import { useAppSelector } from "@/redux/hook";
interface  HadBossAddressProps {
    children : React.ReactNode
}

const NoBossAddress = ({ children } : HadBossAddressProps) => {

  const token = Cookies.get("token");
  const user  = useAppSelector(selectProfile);

    if (token && (user as unknown as Profile)?.boss_address == null) {
        return <Navigate to="/" />;
    }
    else  if(!token)
    {
        return <Navigate to="/login" />;
    }
    return children;

};

export default NoBossAddress;