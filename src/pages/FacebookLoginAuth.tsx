import React from 'react'
import { useUserFacebookLoginCallbackQuery } from '../redux/api/authApi';
import { ToastContainer, toast } from "react-toastify";

const FacebookLoginAuth =  () => {

  const params = new URLSearchParams(window.location.search);
  const accessCode = params.get('code');

  const  data  =  useUserFacebookLoginCallbackQuery(accessCode !);
  
  if(data.isSuccess){
  //   if(data.data.success){
  //     window.location.href = "/"
  } 
  else {
    toast.error("Error!", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000,
    });
    setTimeout(() => {
      window.location.href = "/login"
    },6000);
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