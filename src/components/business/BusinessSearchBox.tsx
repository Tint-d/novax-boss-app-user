import { useGetCountryQuery } from "../../redux/api/BusinessAddressApi";
import { inputDefaultStyle } from "../../constant/defaultStyle";
import { AiOutlineSearch } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { useCallback, useEffect, useState } from "react";
import {
  setSearchTerm,
} from "../../redux/services/businessSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { City } from "../../typings/type";
import { t } from "i18next";

interface BusinessSearchBoxProps {
    withCategory?: boolean;
    categoryId?: string | null;
}


const BusinessSearchBox = ({withCategory = false,categoryId = null} : BusinessSearchBoxProps) => {
  const [inputValue, setInputValue] = useState("");
  const [selected] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [tempInput, setTempInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { data: cityList } = useGetCountryQuery();

  const [town, setTown] = useState<boolean>(true);
  const cityListData = cityList?.cities?.data;

  const localstorageLanguage : string  = localStorage.getItem('language') || 'en';


  const dispatch = useDispatch();


  const handlSearchState = useCallback(()=>{
    setLoading(true);
    if(!loading){
      dispatch(setSearchTerm(tempInput));
    }
    setTimeout(()=>{
      setLoading(false);
    },1200)
  },[dispatch, loading, tempInput])

  const handleKeyDown =  useCallback(
    (e: { key: string; preventDefault: () => void; }) => {
      if (e.key === 'Enter') {
        console.log('ke')
        e.preventDefault(); // Prevent form submission or line break
        dispatch(setSearchTerm(tempInput));
      }
    },
    [dispatch, tempInput]
  )

  // Listen for the Enter key press
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const searchFilter = (inputText:any, searchTerm : string)=> {
    // Create a regular expression pattern with the 'u' flag for full Unicode support
    const pattern = new RegExp(searchTerm, 'u');
    const eng = new RegExp(searchTerm, 'iu');

    return pattern.test(inputText.city_mm_name) || eng.test(inputText.city_name);
  }

 

  return (
    <div className="w-full bg-[#0E1217] mb-3 p-2 lg:px-10 md:px-5">
      <div className=" mx-auto flex flex-wrap justify-around md:justify-between  items-center py-0 md:py-2 container">
        <div className="  flex flex-col  justify-between gap-y-2 items-center p-1">
          {/* <h2 className=" text-lg text-[20px] text-[#A8B3CF] mb-2">
            အလှအပနှင့် အလှကုန်
          </h2> */}
          <div className="flex justify-between items-center gap-5 ">
            <button
              onClick={() => setTown(true)}
              className={
                town
                  ? `text-black text-[14px] w-[130px] md:w-[150px]  bg-warining rounded py-2  md:p-3 `
                  : ` text-[#A8B3CF] text-[14px] w-[130px] md:w-[150px] bg-[#1C1F26] rounded py-2  md:p-3 `
              }
            >
              {t('Find with Name')}
            </button>
            <button
              onClick={() => setTown(false)}
              className={
                !town
                  ? `text-black text-[14px] w-[130px] md:w-[150px]  bg-warining rounded py-2  md:p-3 `
                  : ` text-[#A8B3CF] text-[14px] w-[130px] md:w-[150px] bg-[#1C1F26] rounded py-2  md:p-3 `
              }
            >
              {t('Find with City')}
            </button>
          </div>
        </div>
        {town ? (
          <div className="flex h-[130px] justify-center items-center">
            <div className="flex  p-2 bg-[#0E1217] border px-5 border-[#A8B3CF33] rounded-md justify-center items-center gap-x-1">
              <input
                value={tempInput}
                onChange={(e) => setTempInput(e.target.value)}
                type="text"
                placeholder={t('Type Business Name')}
                className={inputDefaultStyle + "text-sm outline-none placeholder:text-[.9em] w-[60vw] md:w-fit"}
              />
              <AiOutlineSearch
                    onClick={handlSearchState}
                    className=" text-[40px] p-1 px-2 text-white rounded  bg-[#a8b3cf1a] hover:bg-[#a8b3cf5a] cursor-pointer"
                  />
            </div>
          </div>
        ) : (
          <div className="min-h-[10vh] max-h-[40vh] flex flex-col justify-center items-center overflow-y-scroll no-scrollbar  font-medium text-[#A8B3CF]">
            <div
              onClick={() => setOpen(!open)}
              className={`bg-[#1C1F26] border  border-[#A8B3CF33] w-full p-2 flex items-center justify-between rounded ${
                !selected && "text-gray-700"
              }`}
            >
              {selected
                ? selected?.length > 25
                  ? selected?.substring(0, 25) + "..."
                  : selected
                : t('Select City')}
              <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
            </div>
            <ul
              className={`bg-[#1C1F26] mt-2 overflow-y-auto ${
                open ? "max-h-60" : "max-h-0"
              } `}
            >
              <div className="flex w-full items-center px-2 sticky top-0  bg-[#1C1F26]">
                <AiOutlineSearch size={18} className="text-gray-700" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                  placeholder={t('Enter city name')}
                  className="placeholder:text-gray-700 bg-[#1C1F26] p-2 outline-none "
                />
              </div>
              {cityListData?.map((item: City) => (
                withCategory ? <Link to={`/search_business/${categoryId}?cityId=${item?.id}`}>
                  <li
                    key={item?.city_name}
                    className={`p-2 w-[250px] text-sm bg-[#1C1F26] hover:bg-black "
                      ${
                        item?.city_name.toLowerCase() ===
                          selected?.toLowerCase() && "bg-sky-600 text-white"
                      }
                      ${
                        searchFilter(item, inputValue)
                          ? "block"
                          : "hidden"
                      }`}
                    onClick={() => {
                      if (
                        item?.city_name?.toLowerCase() !==
                        selected.toLowerCase()
                      ) {
                        // seletedAndLink(item?.id, item?.city_name);
                        dispatch(setSearchTerm(""));
                        setOpen(false);
                      }
                    }}
                  >
                    <p>{localstorageLanguage == "en" ? item?.city_name : item?.city_mm_name}</p>
                  </li>
                </Link> :
                <Link to={`/search_city/${item.id}`}>
                <li
                  key={item?.city_name}
                  className={`p-2 w-[250px] text-sm bg-[#1C1F26] hover:bg-black "
                    ${
                      item?.city_name.toLowerCase() ===
                        selected?.toLowerCase() && "bg-sky-600 text-white"
                    }
                    ${
                      searchFilter(item, inputValue)
                      ? "block"
                      : "hidden"
                    }`}
                  onClick={() => {
                    if (
                      item?.city_name?.toLowerCase() !==
                      selected.toLowerCase()
                    ) {
                      // seletedAndLink(item?.id, item?.city_name);
                      dispatch(setSearchTerm(""));
                      setOpen(false);
                    }
                  }}
                >
                  <p>{localstorageLanguage == "en" ? item?.city_name : item?.city_mm_name}</p>
                </li>
              </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessSearchBox;
