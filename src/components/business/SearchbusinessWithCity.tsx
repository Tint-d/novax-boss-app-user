import { useParams } from "react-router-dom";
import { useGetBusinessAddressQuery } from "../../redux/api/BusinessAddressApi";
import { useState } from "react";
import { TbClipboardCopy } from "react-icons/tb";

const SearchbusinessWithCity = () => {
  const { id } = useParams();
  const [activePage] = useState(1);
  const { data, isLoading } = useGetBusinessAddressQuery({
    page: activePage,
  });
  const serachCityName = data?.bossAddresses.data;

  const matchCityId = serachCityName?.filter(
    (item) => item.business_city_id === id
  );

  if (isLoading) {
    return (
      <p className=" flex justify-center items-center text-white h-full">
        Loading...
      </p>
    );
  }

  return (
    <div className="  bg-[#0e1217] h-screen">
      <div className=" flex flex-wrap justify-center items-center gap-3 pt-5">
        {matchCityId?.map((item) => (
          <div
            key={item.id}
            className="w-[280px] md:w-[270px] p-2  gap-y-2 rounded-md bg-[#262a31] flex flex-col justify-around items-center "
          >
            <div className="flex  justify-between w-full items-center">
              <img
                className="w-[30px] object-cover h-[30px] rounded-full"
                src={item?.business_logo}
              />
              <TbClipboardCopy className=" w-[40px] h-[40px] p-2 shadow-xl shadow-black/40 text-white bg-[#262a31] rounded-full" />
            </div>

            <h2 className=" w-full  text-[20px] text-warining truncate">
              {item?.business_name}
            </h2>
            <div className=" flex w-full justify-between items-center">
              <h2 className=" px-2 md:text-[14px] rounded-md text-[#A8B3CF] shadow-lg shadow-black/20 truncate w-[100px]">
                {item?.categories?.category_name}
              </h2>
              <h2 className=" px-2 md:text-[14px] rounded-md text-[#A8B3CF] shadow-lg shadow-black/20 truncate w-[100px]">
                {item?.city?.city_name}
              </h2>
            </div>
            <p className=" h-[80px] w-full overflow-hidden leading-5 tracking-wider text-[14px] text-white">
              {item?.business_description.slice(0, 120) + " ...."}
            </p>
            <img
              className=" w-full rounded-md h-[120px] object-cover"
              src={item?.cover_photo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchbusinessWithCity;
