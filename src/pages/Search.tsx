import { useLocation } from "react-router-dom";
import {
  useGetCountryQuery,
  useSearchCategoriesQuery,
} from "../redux/api/BusinessAddress";
import HomeCard, { Boss } from "../Component/Home/HomeCard";
import { inputDefaultStyle } from "../constant/defaultStyle";
import { AiOutlineSearch } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { useState } from "react";

const Search = () => {
  const location = useLocation();
  const search = location.state;
  const [countries, setCountries] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState<boolean>(false);

  const { data: searchData }: any = useSearchCategoriesQuery(search);
  const { data: countryList }: any = useGetCountryQuery();
  const bossAddresses: any = searchData?.bossAddresses?.data;
  const [town, setTown] = useState<boolean>(true);
  const countryListData: any = countryList?.cities?.data;
  console.log(countryListData);
  return (
    <div className="w-full  min-h-screen bg-[#0e1217]">
      <div className=" mx-auto flex flex-col justify-center items-center py-2 container">
        <div className="bg-[#060606] w-[30%] flex flex-col justify-between gap-y-2 items-center">
          <h2 className=" text-lg text-[20px] text-[#A8B3CF]">
            အလှအပနှင့် အလှကုန်
          </h2>
          <div className="flex justify-between items-center gap-5">
            <button
              onClick={() => setTown(true)}
              className={
                town
                  ? `text-black py-1 text-[14px] w-[120px] bg-warining rounded`
                  : ` text-[#A8B3CF] text-[14px] py-1 w-[120px] bg-[#0E1217] rounded`
              }
            >
              Find with Name
            </button>
            <button
              onClick={() => setTown(false)}
              className={
                !town
                  ? `text-black py-1 text-[14px] w-[120px] bg-warining rounded`
                  : ` text-[#A8B3CF] py-1 text-[14px] w-[120px] bg-[#0E1217] rounded`
              }
            >
              Find with Town
            </button>
          </div>
          {town ? (
            <div className="flex w-[80%] p-2 bg-[#0e1217] rounded-md justify-center items-center gap-x-1">
              <input
                onChange={(e) => console.log(e)}
                type="text"
                placeholder="လုပ်ငန်းအမျိးအစား ရှာဖွေရန်..."
                className={inputDefaultStyle}
              />
              <AiOutlineSearch
                onClick={(e) => console.log(e)}
                className=" text-[30px] p-1 text-white rounded bg-[#A8B3CF]"
              />
            </div>
          ) : (
            <div className="w-72 font-medium">
              <div
                onClick={() => setOpen(!open)}
                className={`bg-[#0e1217] w-full p-2 flex items-center justify-between rounded ${
                  !selected && "text-gray-700"
                }`}
              >
                {selected
                  ? selected?.length > 25
                    ? selected?.substring(0, 25) + "..."
                    : selected
                  : "Select Country"}
                <BiChevronDown
                  size={20}
                  className={`${open && "rotate-180"}`}
                />
              </div>
              <ul
                className={`bg-[#0e1217] mt-2 overflow-y-auto ${
                  open ? "max-h-60" : "max-h-0"
                } `}
              >
                <div className="flex items-center px-2 sticky top-0  bg-[#0e1217]">
                  <AiOutlineSearch size={18} className="text-gray-700" />
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) =>
                      setInputValue(e.target.value.toLowerCase())
                    }
                    placeholder="Enter country name"
                    className="placeholder:text-gray-700 bg-[#0e1217] p-2 outline-none"
                  />
                </div>
                {countryListData?.map((item): any => (
                  <li
                    key={item?.city_name}
                    className={`p-2 text-sm bg-[#0e1217] hover:bg-black text-white "
            ${
              item?.city_name.toLowerCase() === selected?.toLowerCase() &&
              "bg-sky-600 text-white"
            }
            ${
              item?.city_name?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
                    onClick={() => {
                      if (
                        item?.city_name?.toLowerCase() !==
                        selected.toLowerCase()
                      ) {
                        setSelected(item?.city_name);
                        setOpen(false);
                        setInputValue("");
                      }
                    }}
                  >
                    {item?.city_name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex justify-around lg:px-10 md:px-5 md:gap-5 lg:gap-8 items-center flex-wrap">
          {bossAddresses?.map((item: any) => {
            return <HomeCard key={item?.id} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
