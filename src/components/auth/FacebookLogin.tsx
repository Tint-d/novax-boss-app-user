import { BiLogoFacebookCircle } from "react-icons/bi";
import { useUserFacebookLoginQuery } from "../../redux/api/facebookApi";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FacebookLogin = () => {
  const [data, setData] = useState();

  const fetchLogin = async () => {
    const res = await fetch("abc");
    const data = await res.json();
    setData(data);
    console.log(data);
  };

  useEffect(() => {
    fetchLogin();
  }, []);
  return (
    <>
      <button
        // onClick={RedirectExample}
        type="button"
        className="flex justify-between w-full text-gray-400 border px-5 py-2 rounded-lg border-gray-400 items-center text-xl bg-blue-500/20"
      >
        <BiLogoFacebookCircle className="text-blue-500 text-2xl" />
        <p className=" text-base">Login with Facebook</p>
      </button>
    </>
  );
};

export default FacebookLogin;
