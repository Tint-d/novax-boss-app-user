import logo from "../assets/logo.png";
import {
  BiLogoFacebookCircle,
  BiLogoMailchimp,
  BiRightArrow,
} from "react-icons/bi";
import decoration1 from "../assets/left-bg-image.png";
import decoration2 from "../assets/right-bg-image.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-[rgb(14,18,23)] relative">
      {/* login form */}
      <div className="flex flex-col gap-10 items-center">
        <img src={logo} className="w-[300px]" alt="" />
        {/* inputs  */}
        <div className="flex flex-col gap-10">
          {/* email input  */}
          <div className="flex gap-5 border-b-2 py-1 text-gray-400 border-gray-400">
            <BiLogoMailchimp className=" text-2xl" />
            <input
              className=" bg-transparent outline-none px-2"
              placeholder=" Email"
              type="text"
            />
          </div>
          {/* pass input  */}
          <div className="flex gap-5 border-b-2 py-1 text-gray-400 border-gray-400">
            <BiLogoMailchimp className=" text-2xl" />
            <input
              className=" bg-transparent outline-none px-2"
              placeholder=" Email"
              type="text"
            />
          </div>
        </div>
        {/* forgetpassword and login  */}
        <div className="flex gap-10 items-center">
          <Link to={"/forget_password"} className="text-[rgb(255,205,41)]">
            Forget your password?
          </Link>
          <button className="bg-[rgb(55,65,81)]/30 py-2 px-10 rounded-lg text-gray-400 border-gray-400 border-2">
            Login
          </button>
        </div>
        {/* login with facebook  */}
        <button className="flex justify-between text-gray-400 border px-5 py-2 rounded-lg border-gray-400 items-center text-xl bg-blue-500/20">
          <BiLogoFacebookCircle className="text-blue-500 text-4xl" />
          <p>Login with Facebook</p>
        </button>
        {/* for creating new acc  */}
        <div className="flex items-center gap-5">
          <p className="text-gray-400">Don't have an account? </p>
          <Link
            to={"/register"}
            className="text-[rgb(255,205,41)] flex items-center"
          >
            <a href="#">Create account </a>
            <BiRightArrow />
          </Link>
        </div>
      </div>
      {/* decoration  */}
      <img className=" absolute top-0 left-0" src={decoration1} alt="" />
      <img className=" absolute right-0 bottom-0" src={decoration2} alt="" />
    </div>
  );
};

export default Login;
