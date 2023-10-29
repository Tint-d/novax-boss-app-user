import React from 'react'
import { useUserFacebookLoginCallbackQuery } from '../redux/api/authApi';
import { ToastContainer, toast } from "react-toastify";
import Cookies from 'js-cookie';

const FacebookLoginAuth =  () => {
  const params = new URLSearchParams(window.location.search);
  const accessCode = params.get('code');

  const data = useUserFacebookLoginCallbackQuery(accessCode !);

  // Move this conditional logic out of the hook call
  if (data.isSuccess) {
    const token = data.data?.access_token;
    console.log("token", data);
    Cookies.set("token", token, { expires: 30 });
    console.log("token", Cookies.get("token"));
    setTimeout(() => {
      window.location.href = "/"
    },1000);
  }

  if(data.isError){
      toast.error("Error!", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,
      });
      setTimeout(() => {
        window.location.href = "/login"
      },3000);
    // }
  }
    
  
  return (
    <div  className="w-[100vw]  h-[100vh] flex justify-center items-center">
      <p>Authenticating...</p>

      {/* <ToastContainer /> */}
    </div>
  )
}

export default FacebookLoginAuth