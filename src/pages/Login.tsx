import { BiRightArrow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { useUserLoginMutation } from "../redux/api/authApi";
import FacebookLogin from "../components/auth/FacebookLogin";
import "../App.css";
import { ChangeAction, FormStateType } from "../typings/type";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useStateContext } from "../context/StateContext";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defaultInputFormStyle } from "../constant/defaultStyle";
import { t } from "i18next";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/services/authSlice";
import { AiOutlineMail,AiFillLock } from "react-icons/ai";
import logo from "../assets/logo.png";
interface ApiResponse {
  data: {
    message: string;
    status: string;
  };
  status: number;
}

interface CustomError {
  status: number;
  data?: unknown;
  error?: string | undefined;
}

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const { state, dispatch } = useStateContext();
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const [valid, setValid] = useState<unknown>(undefined);
  const isCheckLogin = false;

  const dispatchAction = useDispatch();

  const navigate = useNavigate();

  const onSubmit = async (formData: FormStateType) => {

    try {
      const result = await userLogin(formData);

      if ("data" in result) {
        const apiResponse = result as ApiResponse;
        if (apiResponse.data.message) {
          toast.success(t('Successfull login!'), {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 2000,
          });
          setTimeout(() => {
            navigate("/");
          },1000)
          dispatchAction(addUser(apiResponse));
        }
      } else if ("error" in result) {
        const errorResponse = result as CustomError;
        if (errorResponse.data) {
          setValid(errorResponse.data);
        } else {
          setValid(errorResponse.error);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    if ((valid as ApiResponse)?.data?.message) {
      toast.error(t('Invalid Credentials!'), {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000,
      });
    }
  },[valid])

  const { error, handleSubmit, inputChangeHandler, formState } = useForm(
    initialState,
    onSubmit,
    isCheckLogin
  );

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-[rgb(14,18,23)] ">
      <div className="flex flex-col gap-10 items-center px-10">
        <img src={logo} className="w-[150px]" alt="" />
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col  gap-10">
            <div className="flex flex-col gap-5 border-b-2 py-1 text-gray-400 outline-none border-gray-400 w-full">
              {error.email && <p className="text-red-500">{error.email}</p>}

              <div className="flex bg-transparent">
                <AiOutlineMail className=" text-2xl" />
                <input
                  autoComplete="nope"
                  name="email"
                  value={formState.email}
                  onChange={inputChangeHandler}
                  className={defaultInputFormStyle + "bg-transparent ps-2"}
                  placeholder={t("Email")}
                  type="email"
                />
              </div>
            </div>
            <div className="flex flex-col gap-5 border-b-2 py-1 text-gray-400 border-gray-400">
              {error.password && (
                <p className="text-red-500">{error.password}</p>
              )}
              <div className="flex">
                <AiFillLock className=" text-2xl" />
                <div className=" flex w-full justify-between">
                  <input
                    autoComplete="nope"
                    name="password"
                    value={formState.password}
                    onChange={inputChangeHandler}
                    className={defaultInputFormStyle}
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
                      <FaEye className="h-6 cursor-pointer font-extralight" />
                    ) : (
                      <FaEyeSlash className="h-6 font-extralight" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-10 my-3 items-center">
            <Link to={"/forget_password"} className="text-[rgb(255,205,41)] text-[.8em]">
              {t("Forget password?")}
            </Link>
            <button
              disabled={isLoading && true}
              type="submit"
              className="bg-[rgb(55,65,81)]/30 py-2 px-10 rounded-lg text-gray-400 border-gray-400 border-2"
            >
              {isLoading ? <small className="loader"></small> : <p className="text-[.8em] whitespace-nowrap">{t("login")}</p>}
            </button>
          </div>
        </form>

        <FacebookLogin />
        <div className="flex items-center gap-5">
          <p className="text-gray-400">{ t("Don't have an account?") } </p>
          <Link
            to={"/register"}
            className="text-[rgb(255,205,41)] flex items-center"
          >
            <span>{t("Create account")} </span>
            <BiRightArrow />
          </Link>
        </div>
      </div>
      {/* <img className="w-[35%] absolute top-0 left-0" src={decoration1} alt="" /> */}
      {/* <img className="w-[35%] absolute right-0 bottom-0" src={decoration2} /> */}
      <ToastContainer />
    </div>
  );
};

export default Login;
