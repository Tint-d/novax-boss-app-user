import React from 'react'
import { useUserFacebookLoginCallbackQuery } from '../redux/api/authApi';

const FacebookLoginAuth =  () => {

  const params = new URLSearchParams(window.location.search);
  const accessCode = params.get('code');

  const  data  =  useUserFacebookLoginCallbackQuery(accessCode !);
  
  console.log(data);
 
  
  return (
    <p>hi</p>
  )
}

export default FacebookLoginAuth