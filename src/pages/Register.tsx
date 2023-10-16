import logo from "../assets/logo.png";
import { BiLogoMailchimp, BiLeftArrow } from "react-icons/bi";
import decoration1 from "../assets/left-bg-image.png";
import decoration2 from "../assets/right-bg-image.png";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-[rgb(14,18,23)] relative">
      {/* login form */}
      <div className="flex flex-col gap-10 items-center">
        <img className="w-[300px]" src={logo} alt="" />

        {/* input  */}
        <div className="flex flex-col gap-10">
          {/* username input  */}
          <div className="flex gap-5 border-b-2 py-1 text-gray-400 border-gray-400">
            <BiLogoMailchimp className=" text-2xl" />
            <input
              className=" bg-transparent outline-none px-2"
              placeholder=" Username"
              type="text"
            />
          </div>
          {/* email input  */}
          <div className="flex gap-5 border-b-2 py-1 text-gray-400 border-gray-400">
            <BiLogoMailchimp className=" text-2xl" />
            <input
              className=" bg-transparent outline-none px-2"
              placeholder=" Email"
              type="text"
            />
          </div>
          {/* pass and confirm pass  */}
          <div className="flex gap-5 border-b-2 py-1 text-gray-400 border-gray-400">
            <BiLogoMailchimp className=" text-2xl" />
            <input
              className=" bg-transparent outline-none px-2"
              placeholder=" Password"
              type="text"
            />
          </div>
          <div className="flex gap-5 border-b-2 py-1 text-gray-400 border-gray-400">
            <BiLogoMailchimp className=" text-2xl" />
            <input
              className=" bg-transparent outline-none px-2"
              placeholder=" Confirm Password"
              type="text"
            />
          </div>
        </div>
        {/* register  */}
        <button className="bg-[rgb(55,65,81)]/30 py-2 px-10 rounded-lg text-gray-400 border-gray-400 border-2">
          Register
        </button>

        {/* login */}
        {/* for creating new acc  */}
        <div className="flex items-center gap-5">
          <p className="text-gray-400">Already have an account? </p>
          <Link to={'/login'} className="text-[rgb(255,205,41)] flex items-center">
            <BiLeftArrow />
            <a href="#">Login </a>
          </Link>
        </div>
      </div>

      {/* decoration  */}
      <img className=" absolute top-0 left-0" src={decoration1} alt="" />
      <img className=" absolute right-0 bottom-0" src={decoration2} alt="" />
    </div>
  );
};

export default Register;
