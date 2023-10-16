import logo from "../assets/logo.png";
import { BiLogoMailchimp, BiRightArrow } from "react-icons/bi";
import decoration1 from "../assets/left-bg-image.png";
import decoration2 from "../assets/right-bg-image.png";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-[rgb(14,18,23)] relative">
      {/* login form */}
      <div className="flex flex-col gap-10 items-center object-cover">
        <img src={logo} className="w-[300px]" alt="" />

        {/* title  inputs and continue */}
        <div className="flex flex-col items-center gap-10">
          {/* title  */}
          <div className="text-gray-400">
            <h1 className="text-3xl">Forgot Password</h1>
            <p className="text-base flex flex-col">
              <span>
                Enter the email address associated with your account and
              </span>{" "}
              <span>we'll send you a link to reset your password.</span>
            </p>
          </div>
          {/* email input  */}
          <div className="flex w-full gap-5 border-b-2 py-1 text-gray-400 border-gray-400">
            <BiLogoMailchimp className=" text-2xl" />
            <input
              className=" bg-transparent outline-none px-2"
              placeholder=" Email"
              type="text"
            />
          </div>
          <button className="bg-[rgb(55,65,81)]/30 py-2 w-[80%] px-10 rounded-lg text-gray-400 border-gray-400 border-2">
            Continue
          </button>
        </div>

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

export default ForgetPassword;
