import { useAppSelector } from "@/redux/hook";
import { selectProfile } from "@/redux/services/businessSlice";
import { Profile } from "@/utils/Navbar";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

interface  HadBossAddressProps {
    children : React.ReactNode
}

const HadBossAddress = ({ children } : HadBossAddressProps) => {

  const token = Cookies.get("token");

  const user  = useAppSelector(selectProfile);

    if (token && (user as unknown as Profile)?.boss_address !== null) {
        return <Navigate to="/" />;
    }
    else  if(!token)
    {
        return <Navigate to="/login" />;
    }
    return children;

};

export default HadBossAddress;