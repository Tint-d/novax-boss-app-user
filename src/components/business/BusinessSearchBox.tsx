import { useGetCountryQuery } from "../../redux/api/BusinessAddressApi";
import { inputDefaultStyle } from "../../constant/defaultStyle";
import { AiOutlineSearch } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  InitialBusinessStateType,
  setSearchTerm,
} from "../../redux/services/businessSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { City } from "../../typings/type";

const BusinessSearchBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [selected] = useState("");
  const [open, setOpen] = useState<boolean>(false);

  const { data: cityList } = useGetCountryQuery();

  const [town, setTown] = useState<boolean>(true);
  const cityListData = cityList?.cities?.data;

  const searchTerm = useSelector(
    (state: InitialBusinessStateType) => state.business.searchTerm
  );

  const serachBossName = useSelector(
    (state: InitialBusinessStateType) => state.business.items
  );

  console.log(serachBossName, "searchboss");
  console.log(searchTerm, "search");

  const dispatch = useDispatch();

  return (
    <div className="w-full bg-[#0E1217] mb-3 p-2 h-full">
      <div className=" mx-auto flex flex-wrap justify-around items-center py-0 md:py-2 container">
        <div className="  flex flex-col  justify-between gap-y-2 items-center p-1">
          {/* <h2 className=" text-lg text-[20px] text-[#A8B3CF]">
            အလှအပနှင့် အလှကုန်
          </h2> */}
          <div className="flex justify-between items-center gap-5">
            <button
              onClick={() => setTown(true)}
              className={
                town
                  ? `text-black py-1 text-[14px] w-[120px]  bg-warining rounded`
                  : ` text-[#A8B3CF] text-[14px] py-1 w-[120px] bg-[#1C1F26] rounded`
              }
            >
              Find with Name
            </button>
            <button
              onClick={() => setTown(false)}
              className={
                !town
                  ? `text-black py-1 text-[14px] w-[120px] bg-warining rounded`
                  : ` text-[#A8B3CF] py-1 text-[14px] w-[120px] bg-[#1C1F26] rounded`
              }
            >
              Find with Town
            </button>
          </div>
        </div>
        {town ? (
          <div className="flex h-[130px] justify-center items-center">
            <div className="flex  p-2 bg-[#0E1217] border px-5 border-[#A8B3CF33] rounded-md justify-center items-center gap-x-1">
              <input
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                type="text"
                placeholder="လုပ်ငန်းအမျိးအစား ရှာဖွေရန်..."
                className={inputDefaultStyle + "text-sm"}
              />
              <AiOutlineSearch
                // onClick={(e: any) => console.log(e)}
                className=" text-[30px] p-1 text-white rounded bg-[#A8B3CF]"
              />
            </div>
          </div>
        ) : (
          <div className=" h-[130px] flex flex-col justify-center items-center overflow-y-scroll no-scrollbar  font-medium text-[#A8B3CF]">
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
                : "Select City"}
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
                  placeholder="Enter country name"
                  className="placeholder:text-gray-700 bg-[#1C1F26] p-2 outline-none "
                />
              </div>
              {cityListData?.map((item: City) => (
                <Link to={`/search_city/${item.id}`}>
                  <li
                    key={item?.city_name}
                    className={`p-2 w-[250px] text-sm bg-[#1C1F26] hover:bg-black "
                      ${
                        item?.city_name.toLowerCase() ===
                          selected?.toLowerCase() && "bg-sky-600 text-white"
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
                        // seletedAndLink(item?.id, item?.city_name);
                        setOpen(false);
                        setInputValue("");
                      }
                    }}
                  >
                    <p>{item?.city_name}</p>
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
