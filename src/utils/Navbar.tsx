import { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { BsChevronDown } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineSearch, AiFillEye } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import {
  useAppliedCodeMutation,
  useGetCategoriesQuery,
} from "../redux/api/BusinessAddressApi";
import { CategoryType } from "../typings/type";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { inputDefaultStyle } from "../constant/defaultStyle";
import "./nav.css";
import { paths } from "../routes/path";
import Cookies from "js-cookie";
import { BsPencilSquare } from "react-icons/bs";
import { useDisclosure } from "@mantine/hooks";
import { Menu, Modal } from "@mantine/core";
import { BsExclamationTriangle } from "react-icons/bs";
import { useUserLogoutMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/services/authSlice";
import { addProfile } from "../redux/services/businessSlice";
import { useSelector } from "react-redux";

interface Profile {
  boss_address: null | string; // Replace 'string' with the actual type of boss_address if it's not always null
  created_at: string;
  email: string;
  email_verified_at: null | string; // Replace 'string' with the actual type if it's not always null
  facebook_id: null | string; // Replace 'string' with the actual type if it's not always null
  facebook_profile_photo: null | string; // Replace 'string' with the actual type if it's not always null
  id: number;
  name: string;
  profile_photo: null | string; // Replace 'string' with the actual type if it's not always null
}

const Navbar = () => {
  const [applyCode, setApplyCode] = useState("");
  const [navhide, setNavHide] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [hide, setHide] = useState<boolean>(true);
  const [change, setChange] = useState<boolean>(false);
  const [lanbox, setLanbox] = useState<boolean>(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data } = useGetCategoriesQuery();
  const [profile, setProfile] = useState<Profile | null>(null);
  const categories: undefined | CategoryType[] = data?.categories;
  const filteredCategories = categories?.filter((category) =>
    category.category_name.toLowerCase().includes(search)
  );

  const token = Cookies.get("token");
  const [appliedCode] = useAppliedCodeMutation();

  const handleApplyCode = async () => {
    const result = await appliedCode({ token, data: applyCode });
    setApplyCode("");
    console.log(result);
  };

  const [userLogout] = useUserLogoutMutation();

  const dispatch = useDispatch();
  const logoutHandler = async () => {
    const data = await userLogout(token);
    close();
    dispatch(removeUser());
    console.log(data);
  };

  const fetchProfile = async () => {
    const token = Cookies.get("token"); // Replace with your actual authorization token
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const res = await fetch(
        "https://novax-mm.com/api/v1/user/profile/me?withAddress=true",
        {
          headers,
        }
      );

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      setProfile(data?.data);
      dispatch(addProfile(profile));
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  // fetchProfile();

  const san = useSelector((state: any) => state.business.profile);
  console.log(san);

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="bg-[#0e1217] container mx-auto border-b-[1px] border-[#A8B3CF22] w-full">
      <div className="flex md:gap-x-5  lg:gap-x-10 flex-wrap  gap-1 justify-between items-center px-2 md:px-5">
        <div className="md:hidden block">
          {!change ? (
            <AiOutlineMenu
              onClick={() => setChange(true)}
              className="text-2xl text-white"
            />
          ) : (
            <RxCross1
              onClick={() => setChange(false)}
              className="text-2xl text-white"
            />
          )}
        </div>
        <Link to={"/"}>
          <h2 className="lg:text-[15px] text-[15px]  text-white font-[800]">
            BOSSNETWORK
          </h2>
        </Link>
        <div className=" md:flex hidden justify-end w-4/12 md:gap-x-10 lg:gap-x-20 items-center">
          <NavLink to="/">
            <h2 className={`text-[15px] text-white`}>Home</h2>
          </NavLink>
          <NavLink to={"/business"}>
            <h2 className={`text-[15px] text-white`}>Business</h2>
          </NavLink>
          <div className="flex justify-between items-center gap-3">
            <div
              onClick={() => {
                setSearch("");
                setNavHide(!navhide);
              }}
              className=" flex gap-2 cursor-pointer"
            >
              <h2 className={`text-[15px] text-white`}>Business Type</h2>

              <MdKeyboardArrowDown
                className={`text-[24px] cursor-pointer ${
                  true ? "text-[#DCA715]" : "text-white"
                }  `}
              />
            </div>
          </div>
        </div>
        {navhide && (
          <div className="absolute top-20 w-screen">
            <div className=" bg-[#222222] px-[100px] flex justify-center items-center py-5  container mx-auto">
              <div className="w-4/12  px-5 border-r border-[#a8b3cf7c] flex flex-col justify-around gap-y-5 items-center">
                <div className=" ">
                  <img
                    className="h-[150px] mx-auto"
                    src="./search.png"
                    alt=""
                  />
                </div>
                <div className="flex w-full p-2 bg-[#0e1217] rounded-md justify-center items-center gap-x-1">
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="လုပ်ငန်းအမျိးအစား ရှာဖွေရန်..."
                    className={inputDefaultStyle}
                  />
                  <AiOutlineSearch
                    onClick={() => navigate("/search", { state: search })}
                    className=" text-[30px] p-1 text-white rounded bg-[#A8B3CF]"
                  />
                </div>
                <h2 className="text-center text-[15px] text-[#A8B3CF]">
                  လုပ်ငန်းရှင်များ အနေနဲ့ မိမိသိရှိလိုသော
                  လုပ်ငန်းအမျိုးအစားများကို ရွေးချယ်ရှာဖွေပြီး လုပ်ငန်း
                  တစ်ခုချင်းစီတိုင်းကို ဝင်ရောက်လေ့လာနိုင်ပါတယ်။
                </h2>
              </div>
              <div className="w-8/12 flex justify-center flex-wrap gap-10  items-center">
                {filteredCategories?.map((item: CategoryType) => {
                  return (
                    <div
                      key={item?.id}
                      className=" text-[#A8B3CF] hover:text-white w-[130px] truncate text-[15px] cursor-pointer"
                    >
                      {search.length > 0 ? (
                        <Link to={`/search_business/${item.id}`}>
                          <p>{item?.category_name}</p>
                        </Link>
                      ) : (
                        <p>{item?.category_name}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {true ? (
          <div className="flex justify-center items-center gap-x-5">
            {/* <div>
              <AiOutlineMessage className="md:block hidden text-[30px] text-white " />
            </div> */}
            <div className="flex  justify-between gap-x-4 items-center">
              <div className="relative flex bg-[#1c1f26] p-1 md:p-2 rounded justify-center items-center gap-x-2">
                <div>
                  <img
                    className="md:w-[35px] w-[15px] md:h-[25px] rounded"
                    src="https://cdn.britannica.com/34/4034-004-B478631E/Flag-Myanmar.jpg"
                    alt=""
                  />
                </div>
                <BsChevronDown
                  onClick={() => setLanbox(!lanbox)}
                  className=" text-lg md:text-2xl text-white cursor-pointer"
                />
                {lanbox && (
                  <div className=" absolute bg-[#1c1f26] rounded-lg w-[160px]   z-10 top-14 right-0 ">
                    <div className="flex py-3  justify-start items-center px-6 gap-x-3 hover:text-white text-[#A8B3CF] hover:bg-black duration-[0.5s]">
                      <img
                        className=" w-[30px] h-[20px]  rounded"
                        src="https://cdn.britannica.com/34/4034-004-B478631E/Flag-Myanmar.jpg"
                        alt=""
                      />
                      <h2 className="text-sm text-white">Myanmar</h2>
                    </div>
                    <div className="flex py-3  justify-start items-center px-6 gap-x-3 hover:text-white text-[#A8B3CF] hover:bg-black duration-[0.5s]">
                      <img
                        className="w-[30px] h-[20px] rounded"
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png"
                        alt=""
                      />
                      <h2 className="text-sm text-white">English</h2>
                    </div>
                  </div>
                )}
              </div>
              <div className=" h-[60px] p-[1px] bg-white/80"></div>
              {token ? (
                <div className="relative w-[80px] md:w-[150px] lg:w-[300px] flex gap-x-1 md:gap-x-3 justify-start items-center">
                  <img
                    className=" w-[35px]  h-[35px] rounded-full"
                    src={`
                    ${
                      profile?.profile_photo
                        ? profile?.profile_photo
                        : "https://i.pinimg.com/564x/48/6c/a0/486ca00640b169300b48e9ceacd8e401.jpg"
                    }  
                    `}
                  />
                  <div>
                    <div className="flex justify-between w-[50px] md:w-[100px] lg:w-[180px] items-center">
                      <div className="md:flex flex-col justify-between gap-y-1 hidden">
                        <h2 className="text-white">
                          {token ? profile?.name : ""}
                        </h2>
                        <div className="">
                          <h2 className="px-3  text-[16px] text-center rounded-xl text-[#484848] bg-warining">
                            User
                          </h2>
                        </div>
                      </div>
                      <div>
                        <BsChevronDown
                          onClick={() => setHide(!hide)}
                          className=" text-2xl text-white cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                  {!hide && (
                    <div className="flex absolute rounded-lg z-10   w-[270px] p-2  mt-[5px] top-14 left-[-200px] md:left-[-120px] lg:left-0 justify-between items-center bg-[#1c1f26] flex-col">
                      {true ? (
                        <div>
                          <Menu shadow="md" width={200}>
                            <Menu.Target>
                              <button className=" flex justify-start  px-3 gap-2 items-center py-3  w-full hover:text-white text-[#A8B3CF] hover:bg-black duration-[0.5s] rounded">
                                <BsPencilSquare className="text-[26px] p- border-dotted border border-[#A8B3CF] hover:border-white   hover:text-white" />
                                <h2 className="text-[16px]">
                                  Address Code Fill
                                </h2>
                              </button>
                            </Menu.Target>

                            <Menu.Dropdown className="bg-black w-full h-24 flex flex-col gap-3">
                              <div className=" flex flex-col gap-3 mt-1">
                                <input
                                  value={applyCode}
                                  onChange={(e) => setApplyCode(e.target.value)}
                                  placeholder="Fill Code.."
                                  type="text"
                                  className=" outline-none rounded bg-transparent border-2 border-[#A8B3CF] text-white text-sm py-1"
                                />
                                <button
                                  onClick={handleApplyCode}
                                  className=" w-28 py-1 rounded bg-[#00FF47] text-[##A8B3CF]"
                                >
                                  <span className="text-[#A8B3CF]">
                                    Contince
                                  </span>{" "}
                                </button>
                              </div>
                            </Menu.Dropdown>
                          </Menu>

                          <Link to={paths.business_information}>
                            <button className=" flex justify-start  px-3 gap-2 items-center py-3  w-full hover:text-white text-[#A8B3CF] hover:bg-black duration-[0.5s] rounded">
                              <AiOutlinePlus className="text-[26px] p- border-dotted border border-[#A8B3CF] hover:border-white   hover:text-white" />
                              <h2 className="text-[16px]">
                                Add business information
                              </h2>
                            </button>
                          </Link>
                        </div>
                      ) : (
                        <button className=" flex justify-start  px-3 gap-2 items-center py-3  w-full hover:text-white text-[#A8B3CF] hover:bg-black duration-[0.5s] rounded">
                          <FiEdit className="text-[24px]" />
                          <h2 className="text-[16px]">
                            Edit business information
                          </h2>
                        </button>
                      )}
                      <div>
                        <button className=" flex justify-start gap-2  px-3 items-center py-3 text-[#A8B3CF] hover:text-white hover:bg-black duration-[0.5s] rounded  w-full">
                          <AiFillEye className="text-[26px]  " />
                          <h2 className="text-[16px] pt-1">
                            See Business Information
                          </h2>
                        </button>
                        <Link to={"/profile"}>
                          <button className=" flex justify-start gap-2  px-3 items-center py-3 text-[#A8B3CF] hover:text-white hover:bg-black duration-[0.5s] rounded  w-full">
                            <CgProfile className="text-[26px]  " />
                            <h2 className="text-[16px] pt-1">Profile</h2>
                          </button>
                        </Link>
                        <Modal
                          opened={opened}
                          onClose={close}
                          centered
                          styles={{
                            header: {
                              background: "#1C1F26",
                              color: "white",
                            },
                            body: {
                              background: "#1C1F26",
                              height: "180px",
                            },
                            close: {
                              color: "white",
                              background: "transparent",
                              "&:hover": {
                                background: "transparent",
                              },
                            },
                          }}
                        >
                          <div className="flex flex-col gap-7 justify-center h-full items-center">
                            <p className="text-[#A8B3CF]">
                              Are you sure to logout?
                            </p>
                            <BsExclamationTriangle className="text-[#DCA715] text-6xl" />
                            <div className="flex gap-2">
                              <button
                                onClick={close}
                                className=" rounded bg-[#FF0000] w-24  text-[#A8B3CF]"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={logoutHandler}
                                className=" rounded bg-[#00FF47] w-24 h-10 text-[#A8B3CF]"
                              >
                                Confirm
                              </button>
                            </div>
                          </div>
                        </Modal>
                        <button
                          onClick={open}
                          className=" flex justify-start gap-2  px-3 items-center text-[#A8B3CF] hover:text-white hover:bg-black duration-[0.5s] rounded py-3  w-full"
                        >
                          <RiLogoutCircleLine className="text-[26px] " />
                          <h2 className="text-[16px] pt-1">Log out</h2>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to={"/login"} className=" text-white">
                  Login
                </Link>
              )}
            </div>
          </div>
        ) : (
          <button className="px-3 py-1">
            <h2 className="text-[20px] font-semibold text-white ">Login</h2>
          </button>
        )}
        {change && (
          <div className=" flex flex-col w-full gap-y-2 py-2  md:hidden bg-[#A8B3CF33] justify-between  items-center">
            <NavLink to="/">
              <h2
                className={`text-[20px] ${
                  false ? "shadow-xl" : ""
                } text-center w-[300px]    py-1 text-white hover:bg-[#495060] shadow-xl shadow-[#1CF26] `}
              >
                Home
              </h2>
            </NavLink>

            <NavLink to="/business">
              <h2
                className={`text-[20px] ${
                  true ? "shadow-xl" : ""
                } text-center w-[300px]    py-1 text-white hover:bg-[#495060] shadow-xl shadow-[#1CF26] 
`}
              >
                Business
              </h2>
            </NavLink>

            <div
              onClick={() => {
                setSearch("");
                setNavHide(!navhide);
              }}
              className="flex  w-[300px]  py-1     justify-center items-center gap-x-5"
            >
              <h2
                className={`text-[20px] text-center text-white 
`}
              >
                Business Type
              </h2>

              <MdKeyboardArrowDown
                className={`text-[26px] cursor-pointer  text-white`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
