import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { AuthProps } from "./types";


const Authenticated = ({ children } : AuthProps) => {
  const token = Cookies.get("token");
  if (token) {
    return <Navigate to="/" />;
  }
  return children;
};

export default Authenticated;