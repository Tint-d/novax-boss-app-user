import { useState, useEffect, useCallback, lazy } from "react";
import { AiOutlinePlus, AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { BsChevronDown } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineSearch, AiFillEye } from "react-icons/ai";
import {
  useGetCategoriesQuery,
} from "../redux/api/BusinessAddressApi";
import { CategoryType } from "../typings/type";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { inputDefaultStyle } from "../constant/defaultStyle";
import "./nav.css";
import { paths } from "../routes/path";
import Cookies from "js-cookie";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { BsExclamationTriangle } from "react-icons/bs";
import { useUserLogoutMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import {  removeUser } from "../redux/services/authSlice";
import { addProfile, selectProfile } from "../redux/services/businessSlice";
import { useSelector } from "react-redux";
import SearchPhoto from "../assets/Search.png";
import { changeLanguage } from "@/redux/services/settinSlice";
import { t } from "i18next";
import { RootState } from "@/redux/store";
import ProfileNav from "@/components/nav/ProfileNav";
import ActionCodeApply from "@/components/nav/ApplyActionCode";
import Logout from "@/components/nav/Logout";
import { useAppSelector } from "@/redux/hook";
import defaultProfile from '@/assets/default_profile.jpeg';

export interface Profile {
  boss_address: unknown // Replace 'string' with the actual type of boss_address if it's not always null
  created_at: string;
  email: string;
  email_verified_at: null | string; // Replace 'string' with the actual type if it's not always null
  facebook_id: null | string; // Replace 'string' with the actual type if it's not always null
  facebook_profile_photo: null | string; // Replace 'string' with the actual type if it's not always null
  id: number;
  name: string;
  profile_photo: null | string; // Replace 'string' with the actual type if it's not always null
  action_codes : null | string[]
}

const Navbar = () => {
  const [navhide, setNavHide] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [hide, setHide] = useState<boolean>(true);
  const [change, setChange] = useState<boolean>(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data } = useGetCategoriesQuery();
  const [profile, setProfile] = useState<Profile | null>(null);
  const categories: undefined | CategoryType[] = data?.categories;
  const filteredCategories = categories?.filter((category) =>
   {
   return category.category_name.toLowerCase().includes(search)
   || category.category_mm_name.toLowerCase().includes(search)
   }
  );
  const token = Cookies.get("token");

  const [userLogout] = useUserLogoutMutation();

  const localstorageLanguage : string  = localStorage.getItem('language') || 'en';


  const dispatch = useDispatch();
  const logoutHandler = async () => {
    const data = await userLogout(token);
    close();
    dispatch(removeUser());
    console.log(data);
  };

  const fetchProfile = async () => {
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };
    const url = window.getUrl('/v1/user/profile/me?withAddress=true');
    try {
      const res = await fetch(
        url,
        {
          headers,
        }
      );

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      dispatch(addProfile(data?.data));
      setProfile(data?.data);
      Cookies.set("user", JSON.stringify(data?.data));
   
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const pf = useAppSelector(selectProfile);


  const currentLanguate = useSelector((state: RootState) => state.setting.language);
   let lg ;
  if(currentLanguate == 'mm'){
    lg = (
      <img className="w-[35px] h-[25px] rounded" src="https://cdn.britannica.com/34/4034-004-B478631E/Flag-Myanmar.jpg" alt="" />
    )
  }else{
    lg = (
      <img className="w-[30px] h-[20px] rounded" src="https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg" alt="" />
    )
  }
 
  useEffect(() => {
    fetchProfile();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const searchFilter = (inputText:any, searchTerm : string)=> {
    // Create a regular expression pattern with the 'u' flag for full Unicode support
    const pattern = new RegExp(searchTerm, 'u');
    const eng = new RegExp(searchTerm, 'iu');

    return pattern.test(inputText.city_mm_name) || eng.test(inputText.city_name);
  }

  const wid = window.location.pathname;

  //change localization
  const swithLanuage = useCallback((value:string)=>{
    dispatch(changeLanguage(value))
     localStorage.setItem('language', value);
     window.location.reload();
  },[dispatch])
  let profilePhoto;
  if(pf?.profile_photo == null && pf?.facebook_profile_photo != null){
    profilePhoto = pf?.facebook_profile_photo;
  }
  else if(pf?.profile_photo == null && pf?.facebook_profile_photo == null){
    profilePhoto = defaultProfile;
  }
  else{
    profilePhoto = pf?.profile_photo;
  }

  return (
    <div className="bg-[#0e1217]  border-b-[1px] border-[#A8B3CF22] w-full px-5">
      <div className="flex md:gap-x-5 container mx-auto py-2 lg:gap-x-10 flex-wrap  gap-1 justify-between items-center px-2 md:px-5 md:ps-10">
        <div className="md:hidden block">
          {!change ? (
            <AiOutlineMenu
              onClick={() => setChange(true)}
              className="text-2xl text-white"
            />
          ) : (
            <RxCross1
              onClick={() => {
                setNavHide(false);
                setChange(false);
              }}
              className="text-2xl text-white"
            />
          )}
        </div>
        <Link to={"/"}>
          <h2 className="lg:text-[15px] text-[15px]  text-white font-[800]">
            BOSSNETWORK
          </h2>
        </Link>
        <div className=" md:flex hidden justify-end min-w-4/12 md:gap-x-8 items-center">
          <NavLink
            to="/"
            className={`${
              wid === "/" ? "text-[#dca715] text-[15px]" : "text-white"
            } text-[15px]  whitespace-nowrap`}
          >
            {t('Home')}
          </NavLink>

          <NavLink
            to={"/business"}
            className={`${
              wid === "/business" ? "text-[#dca715] text-[15px]" : "text-white"
            } text-[15px]  whitespace-nowrap`}
          >
            {t('Business')}
          </NavLink>
          <div className="flex justify-between items-center gap-3">
            <div
              onClick={() => {
                setSearch("");
                setNavHide(!navhide);
              }}
              className=" flex gap-2 cursor-pointer"
            >
              <h2 className={`text-[15px] text-white  whitespace-nowrap`}>{t('Business Type')}</h2>

              <MdKeyboardArrowDown
                className={`text-[24px] cursor-pointer text-white `}
              />
            </div>
          </div>
        </div>
        {navhide && (
          <div className="absolute left-[-1px] top-[22vh] md:top-20 w-screen z-30">
            <div className=" bg-[#222222] px-5 md:px-[100px] flex flex-wrap justify-center items-center py-5  container mx-auto">
              <div className="md:w-4/12 pb-5 w-12/12 px-5 border-r-0 md:border-r border-[#a8b3cf7c] flex flex-col justify-around gap-y-5 items-center">
                <div className=" ">
                  <img className="h-[150px] mx-auto" src={SearchPhoto} alt="" />
                </div>
                <div className="flex  w-full p-2 bg-[#0e1217] rounded-md justify-between items-center gap-x-1">
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder={t('Type business category name')}
                    className={inputDefaultStyle + ' w-5/6 outline-none'}
                  />
                  <AiOutlineSearch
                    onClick={() => navigate("/search", { state: search })}
                    className=" text-[30px] p-1 w-1/6 text-[#A8B3CF]  rounded bg-[#a8b3cf1a] hover:bg-[#a8b3cf5a] cursor-pointer"
                  />
                </div>
                <h2 className="text-center text-[15px] text-[#A8B3CF]">
                  {t("Entrepreneurs want to know Select business types and search for business Each one can be accessed and studied.")}
                </h2>
              </div>
              <div className="md:w-8/12 w-12/12  flex md:h-auto h-[300px] no-scrollbar  overflow-y-scroll justify-around md:justify-center flex-wrap gap-5  md:gap-10  items-center">
                {filteredCategories?.map((item: CategoryType) => {
                  return (
                    <div
                      key={item?.id}
                      className=" text-[#A8B3CF] gap-10 hover:text-white w-[100px] md:w-[130px] truncate text-[15px] cursor-pointer"
                    >
                     <Link
                     onClick={()=>{
                      setChange(false)
                      setNavHide(false)}}
                     to={`/search_business/${item.id}`}>
                          <p>{
                            localstorageLanguage == 'en' ? item.category_name : item.category_mm_name
                            }</p>
                        </Link>
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
             
              <div className="dropdown">
              <label 
              tabIndex={0}
              className="relative flex bg-[#1c1f26] p-1 md:p-2 rounded justify-center items-center gap-x-2">
                <div>
                  {lg}
                </div>
                <BsChevronDown
                 
                  className=" text-lg md:text-2xl text-white cursor-pointer"
                />
              </label>
                  <div tabIndex={0} className="dropdown-content bg-[#1c1f26] rounded-lg w-[160px]  z-[1000000] top-[60px] right-0 ">
                    <div onClick={()=>swithLanuage('mm')} className="flex py-3  justify-start items-center px-6 gap-x-3 hover:text-white text-[#A8B3CF] hover:bg-black duration-[0.5s]">
                    <img
                        className="w-[30px] h-[20px] rounded"
                        src="https://cdn.britannica.com/34/4034-004-B478631E/Flag-Myanmar.jpg"
                        alt=""
                      />
                      <h2 className="text-sm text-white">{t('Myanmar')}</h2>
                    </div>
                    <div onClick={()=>swithLanuage('en')} className="flex py-3  justify-start items-center px-6 gap-x-3 hover:text-white text-[#A8B3CF] hover:bg-black duration-[0.5s]">
                      <img
                        className="w-[30px] h-[20px] rounded"
                        src="https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg"
                        alt=""
                      />
                      <h2 className="text-sm text-white">{t('English')}</h2>
                    </div>
                  </div>
              </div>

              <div className=" h-[60px] p-[1px] "></div>
              {token ? (
               <div className="dropdown">
                 <label tabIndex={1} className="relative w-[80px] md:w-[150px] lg:w-[250px] flex gap-x-1 md:gap-x-3 justify-start items-center">
                  <img
                    className=" min-w-[35px] max-w-[36px] h-[35px] rounded-full object-cover"
                    src={profilePhoto !}
                  />
                  <div>
                    <div className="flex justify-between w-[50px] md:w-[100px] lg:w-[180px] items-center">
                      <div className="md:flex flex-col justify-between gap-y-1 hidden">
                        <h2 className="text-white">
                          {token ? pf?.name : ""}
                        </h2>
                        <div className="">
                          <h2 className="w-[50px] text-[12px] text-center rounded-xl text-[#484848] bg-warining">
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
                </label>
                    <div 
                    tabIndex={1} 
                    className="
                    dropdown-content
                    flex rounded-lg z-10   w-[270px] p-2  mt-[5px] top-14 left-[-200px] md:left-[-120px] lg:left-0 justify-between items-center bg-[#1c1f26] flex-col">
                      {pf?.boss_address == null ? (
                        <div>
                          {pf?.action_codes !== null ? (
                            <div>
                                <NavLink to={paths.business_information}>
                                  <button className=" flex justify-start  px-3 gap-2 items-center py-3  w-full hover:text-white text-[#A8B3CF] hover:bg-black duration-[0.5s] rounded">
                                    <AiOutlinePlus className="text-[26px] p- border-dotted border border-[#A8B3CF] hover:border-white   hover:text-white" />
                                    <h2 className="text-[16px]">
                                      {t('Add business information')}
                                    </h2>
                                  </button>
                                </NavLink>
                             <ProfileNav profile={pf} />
                             <Logout open={open} />

                            </div>
                          ) : (
                        <div >
                            <ActionCodeApply profile={pf}/>
                            <ProfileNav profile={pf}/>
                           <Logout open={open} />
                            </div>
                          )}
                          {/*  */}
                        </div>
                      ) : (
                        <div>
                          {/* <button className=" flex justify-start   px-3 gap-2 items-center py-3  w-full hover:text-white text-[#A8B3CF] hover:bg-black duration-[0.5s] rounded">
                            <FiEdit className="text-[24px]" />
                            <h2 className="text-[16px]">
                              {t('Edit business information')}
                            </h2>
                          </button> */}
                          <NavLink to ={paths.business_address}>
                          <button className=" flex justify-start   px-3 gap-2 items-center py-3  w-full whitespace-nowrap overflow-hidden hover:text-white text-[#A8B3CF] hover:bg-black duration-[0.5s] rounded">
                          <AiFillEye className="text-[26px]" />
                            <h2 className="text-[16px]">
                            {t('Check business information')}
                            </h2>
                          </button>
                          </NavLink>
                          
                          <ProfileNav profile={pf} />
                           <Logout open={open} />
                        </div>
                      )}
                      <div>
                        {/* <button className=" flex justify-start gap-2  px-3 items-center py-3 text-[#A8B3CF] hover:text-white hover:bg-black duration-[0.5s] rounded  w-full">
                          <AiFillEye className="text-[26px]  " />
                          <h2 className="text-[16px] pt-1">
                            See Business Information
                          </h2>
                        </button> */}

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
                              height: "200px",
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
                          <div className="flex flex-col gap-7 justify-center h-full items-center pb-5">
                            <p className="text-white mt-2">
                              {t('Are you sure to logout?')}
                            </p>
                            <span className="text-[#DCA715] text-[35px]">
                            <BsExclamationTriangle  />
                            </span>
                            <div className="flex gap-24">
                              <button
                                onClick={close}
                                className=" rounded bg-[#cf0303] w-28  text-white font-bold"
                              >
                                {t('Cancel')}
                              </button>
                              <button
                                onClick={logoutHandler}
                                className=" rounded bg-[#06c53c] w-28 h-10 text-white font-bold"
                              >
                                {t('Confirm')}
                              </button>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    </div>
               </div>
              ) : (
                <Link to={"/login"} className=" text-white text-[.8em] sm:text-sm capitalize">
                  {t('login')}
                </Link>
              )}
            </div>
          </div>
        ) : (
          <button className="px-3 py-1">
            <h2 className="text-[20px] font-semibold text-white">{t('login')}</h2>
          </button>
        )}
        {change && (
          <div className=" flex flex-col w-full gap-y-3 py-2  md:hidden  justify-between  items-center">
            <NavLink
              to="/"
              className={`${
                wid === "/" ? "text-[#dca715] text-[15px]" : "text-white"
              } text-[15px]`}
              onClick={() => setChange(false)}
            >
              {t('Home')}

            </NavLink>

            <NavLink
              to={"/business"}
              className={`${
                wid === "/business"
                  ? "text-[#dca715] text-[15px]"
                  : "text-white"
              } text-[15px] `}
              onClick={() => setChange(false)}
            >
              {t('Business')}
            </NavLink>

            <div
              onClick={() => {
                setSearch("");
                setNavHide(!navhide);
                // setChange(false)
              }}
              className="flex  w-[300px]  py-1     justify-center items-center gap-x-5"
            >
              {wid === "/" ? (
                ""
              ) : (
                <span className=" flex items-center ms-1 ">
                  <h2
                    className={`text-[15px] text-center text-white 
                  `}
                  >
              {t('Business Type')}
                  </h2>
                  <MdKeyboardArrowDown
                    className={`text-[26px] cursor-pointer  text-white`}
                  />
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
