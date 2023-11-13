import { BiLogoMailchimp, BiRightArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
import useInput from "../hooks/useInput";
import { useUserFotgetPasswordQuery, useUserResetPasswordMutation } from "../redux/api/authApi";
import { defaultInputFormStyle } from "../constant/defaultStyle";
import React, { useCallback, useRef } from "react";
import { t } from "i18next";
import logo from "../assets/logo.png";
import { toast } from "react-toastify";


const initialState = {
  email: "",
};

const ForgetPassword = () => {
  const [email, setEmail] = React.useState("");
  const [sentMail, setSentMail] = React.useState(false);
  const { changeInputHandler, input } = useInput(initialState);
  const { data, refetch, } = useUserFotgetPasswordQuery(email);
  const [userFotgetPassword,{isLoading}] = useUserResetPasswordMutation();
  const ResetCodeRef = useRef<HTMLInputElement>(null);
  const ResetPasswordRef = useRef<HTMLInputElement>(null);

  const fetchData = useCallback(async () => {
    setEmail(input.email);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await refetch() as any;
    if (result.data && result.data.message) {
      toast.success(t('forget password was sent!'), {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000,
      });
      setSentMail(true);
    }

    if (result.error.data) {
      toast.error(result.error.data?.message, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000,
      });
    }

  }, [input.email, refetch])

  const resetPassword = useCallback(async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('password', ResetPasswordRef.current?.value as string);
    formData.append('code', ResetCodeRef.current?.value || '');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await userFotgetPassword(formData) as any;
    console.log(result);
    if (result.data) {
      toast.success(t('password reset successfully'), {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000,
      });
      setSentMail(false);
    }
    if (result.error) {
      toast.error(result.error.data?.message, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000,
      });
    }
  },[userFotgetPassword]);

  return (
    <div className=" h-[100vh] flex justify-center items-center bg-[rgb(14,18,23)] relative">

      <input type="checkbox" id="my_modal_6" checked={sentMail} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{t('Reset Your Password')}</h3>

          <div className="modal-body mt-4">
            <form onSubmit={resetPassword} className="flex flex-col gap-y-8">
              <div className="form-control gap-3">
                <label>{t('Password Reset Code')}</label>
                <input ref={ResetCodeRef} className="bg-[#1C1F26] w-full p-2 outline-none border rounded text-white border-[#4e525a]" type="text" />
              </div>

              <div className="form-control gap-3">
                <label>{t('Reset Your Password')}</label>
                <input ref={ResetPasswordRef} className="bg-[#1C1F26] w-full p-2 outline-none border rounded text-white border-[#4e525a]" type="text" />
              </div>

              <div className="flex w-full justify-between items-centers ">
                <div className="">
                  <button type="button" onClick={()=>setSentMail(false)} className="btn btn-md text-[.8em]  px-6 py-2s">{t('Close!')}</button>
                </div>
                <button type="submit"  className="btn btn-md text-[.8em] py-2  px-6">
                  {t('Reset')}
                </button>
              </div>
            </form>
          </div>


        </div>
      </div>


      <div className="flex flex-col gap-10 items-center object-cover px-10 sm:px-5 container">
        <img src={logo} className="w-[150px]" alt="" />

        <div className="flex flex-col items-center gap-10">
          <div className="text-gray-400 w-full  md:w-4/6">
            <h1 className="text-xl pb-5">{t('Forgot Password')}</h1>
            <p className="text-sm flex flex-col line">
              <span className="min-w-[300px] ">
                {t('Enter the email address associated with your account and we\'ll send you a link to reset your password.')}</span>
            </p>
          </div>
          <div className="flex w-full md:w-4/6 gap-5 border-b-2 py-1 text-gray-400 border-gray-400">
            <BiLogoMailchimp className=" text-2xl" />
            <input
              name="email"
              value={input.email}
              onChange={changeInputHandler}
              className={defaultInputFormStyle + "text-sm "}
              placeholder={t("Email")}
              type="email"
            />
          </div>
          <button
            onClick={fetchData}
            type="submit"
            disabled={isLoading}
            className="bg-[rgb(55,65,81)]/30 py-2 w-[80%] md:w-4/6 px-10 rounded-lg text-gray-400 border-gray-400 border-2"
          >
            {t('Send')}
          </button>
        </div>

        <div className="flex items-center gap-5">
          <p className="text-gray-400">{t("Don't have an account?")}</p>
          <Link
            to={"/register"}
            className="text-[rgb(255,205,41)] flex items-center"
          >
            <span>{t("Create account")}  </span>
            <BiRightArrow />
          </Link>
        </div>
      </div>
      {/* decoration  */}
      {/* <img className=" absolute top-0 left-0 w-[35%]" src={decoration1} /> */}
      {/* <img className=" absolute right-0 bottom-0 w-[35%]" src={decoration2} /> */}
    </div>
  );
};

export default ForgetPassword;
