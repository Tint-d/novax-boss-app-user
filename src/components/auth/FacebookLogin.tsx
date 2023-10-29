import { BiLogoFacebookCircle } from "react-icons/bi";
import React, { useEffect } from 'react';
import { useUserFacebookLoginMutation } from "../../redux/api/authApi";
interface ApiResponse {
  data: { redirectUrl: string };
  redirectUrl: string;
  success : boolean;
}

const FacebookLogin = () => {
  const [userFacebookLogin, { isLoading }] = useUserFacebookLoginMutation();
  const [redirectUrl, setRedirectUrl] = React.useState<string>("");

  useEffect(() => {
      async function fetchData() {
        const result = await userFacebookLogin('');

        const { redirectUrl } = (result as unknown as ApiResponse).data;
        console.log(redirectUrl);
        setRedirectUrl(redirectUrl);
      }

      fetchData();
  }, [userFacebookLogin])

  const handleSubmit  = async () => {
    try {
  
        window.location.href = redirectUrl ;

    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      { isLoading ? <p>loading</p> : 
      <button
      onClick={handleSubmit}
      type="button"
      className="flex justify-between w-full text-gray-400 border px-5 py-2 rounded-lg border-gray-400 items-center text-xl bg-blue-500/20"
    >
      <BiLogoFacebookCircle className="text-blue-500 text-2xl" />
      <p className=" text-base">Login with Facebook</p>
    </button>}
    </>
  );
};

export default FacebookLogin;
