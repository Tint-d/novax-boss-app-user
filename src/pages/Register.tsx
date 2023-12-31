import { BiLogoMailchimp, BiLeftArrow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { useUserRegisterMutation } from "../redux/api/authApi";
import "../App.css";
import { ChangeAction, FormStateType } from "../typings/type";
import { useStateContext } from "../context/StateContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { defaultInputFormStyle } from "../constant/defaultStyle";
import { AiOutlineMail,AiFillLock } from "react-icons/ai";
import { useEffect, useState } from "react";
import { t } from "i18next";
import logo from "../assets/logo.png";

interface ApiResponse {
  data: {
    message: string;
    status: string;
    token: string;
  };
}

interface CustomError {
  status: number;
  data?: unknown;
  error?: string | undefined;
}


const initialState = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const Register = () => {
  const { state, dispatch } = useStateContext();
  const [userRegister, { isLoading }] = useUserRegisterMutation();
  const [valid, setValid] = useState<unknown>(undefined);

  const isCheckLogin = true as boolean;

  const navigate = useNavigate();

  useEffect(() => {
    if ((valid as ApiResponse)?.data?.message) {
      toast.error(t((valid as ApiResponse)?.data?.message), {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000,
      });
    }
  },[valid])

  const onSubmit = async (formData: FormStateType) => {
    const data = await userRegister(formData);
    if ("data" in data) {
      const apiResponse = data as ApiResponse;
      if (apiResponse.data.status === "success") {
        navigate("/login");
        toast.success(t('Successful registration!'), {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 2000,
        });
      }
    }else if ("error" in data) {
        const errorResponse = data as CustomError;
        if (errorResponse.data) {
          setValid(errorResponse.data);
        } else {
          setValid(errorResponse.error);
        }
      }
    }

  const { error, handleSubmit, inputChangeHandler, formState } = useForm(
    initialState,
    onSubmit,
    isCheckLogin
  );

  

  return (
    <div className=" h-[100vh] flex justify-center items-center bg-[rgb(14,18,23)] relative">
      <div className="flex flex-col gap-7 items-center">
        <img className="w-[150px]" src={logo} alt="" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full ">
          <div className="flex flex-col gap-2 border-b-2 py-1 text-gray-400 border-gray-400">
            {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
            <div className=" flex">
              <BiLogoMailchimp className=" text-xl" />
              <input
                autoComplete="nope"
                value={formState.name}
                name="name"
                onChange={inputChangeHandler}
                className={defaultInputFormStyle + " w-full"}
                placeholder={t("Name")}
                type="text"
              />
            </div>
          </div>

          <div className="flex  flex-col gap-2 border-b-2 py-1 text-gray-400 border-gray-400 w-full">
            {error.email && (
              <p className="text-red-500 text-sm">{error.email}</p>
            )}
            <div className="flex">
              <AiOutlineMail className=" text-xl" />
              <input
                autoComplete="nope"
                name="email"
                value={formState.email}
                onChange={inputChangeHandler}
                className={defaultInputFormStyle + "text-sm w-full ps-2"}
                placeholder={t("Email")}
                type="email"
              />
            </div>
          </div>

          <div className="flex  flex-col gap-2 border-b-2 py-1 text-gray-400 border-gray-400">
            {error.password && (
              <p className="text-red-500 text-sm">{error.password}</p>
            )}
            <div className="flex">
              <AiFillLock className=" text-2xl " />
              <div className=" flex justify-between w-full">
                <input
                  autoComplete="nope"
                  name="password"
                  value={formState.password}
                  onChange={inputChangeHandler}
                  className="bg-transparent outline-none px-2"
                  placeholder={t("Password")}
                  type={state.textToggle ? "text" : "password"}
                />
                <div
                  onClick={() => {
                    dispatch({ type: ChangeAction.TogglePassword });
                  }}
                  className=" cursor-pointer"
                >
                  {state.textToggle ? (
                    <FaEye className="h-6  cursor-pointer font-extralight" />
                  ) : (
                    <FaEyeSlash className="h-6 font-extralight" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex  flex-col gap-2 border-b-2 py-1 text-gray-400 border-gray-400">
            {error.password_confirmation && (
              <p className="text-red-500 text-sm">
                {error.password_confirmation}
              </p>
            )}
            <div className="flex">
              <AiFillLock className=" text-2xl" />
              <div className="flex w-full justify-between">
                <input
                  autoComplete="nope"
                  name="password_confirmation"
                  value={formState.password_confirmation}
                  onChange={inputChangeHandler}
                  className="bg-transparent outline-none px-2"
                  placeholder={t("Password Confirmation")}
                  type={state.textToggle2 ? "text" : "password"}
                />
                <div
                  className=" cursor-pointer"
                  onClick={() => {
                    dispatch({ type: ChangeAction.TogglePasswordConfirmation });
                  }}
                >
                  {state.textToggle2 ? (
                    <span className="cursor-pointer">
                      <FaEye className="h-6 cursor-pointer font-extralight" />
                    </span>
                  ) : (
                    <span className="cursor-pointer">
                      <FaEyeSlash className="h-6 font-extralight" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            disabled={isLoading && true}
            type="submit"
            className="bg-[rgb(55,65,81)]/30 py-2 px-10 rounded-lg text-gray-400 border-gray-400 border-2"
          >
            {isLoading ? <small className="loader"></small> : t('Register')}
          </button>

          <div className="flex items-center gap-5">
            <p className="text-gray-400">{t('Already have an account?')} </p>
            <Link
              to={"/login"}
              className="text-[rgb(255,205,41)] flex items-center"
            >
              <BiLeftArrow />
              <span className="capitalize">{t('login')} </span>
            </Link>
          </div>
        </form>
      </div>

      {/* decoration  */}
      {/* <img className="w-[35%] absolute top-0 left-0" src={decoration1} /> */}
      {/* <img className="w-[35%] absolute right-0 bottom-0" src={decoration2} /> */}
      <ToastContainer />
    </div>
  );
};

export default Register;
