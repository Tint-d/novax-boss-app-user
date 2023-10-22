import { useEffect, useState } from "react";
import { useGetBusinessAddressQuery } from "../../redux/api/BusinessAddressApi";
import { useDispatch } from "react-redux";
import { addBusiness } from "../../redux/services/businessSlice";
import { TbClipboardCopy } from "react-icons/tb";
import { RiArrowDropLeftFill, RiArrowDropRightFill } from "react-icons/ri";
import "../../App.css";
import { BossType } from "../../typings/type";

const HomeBusiness = () => {
  const [activePage, setPage] = useState(1);
  const { data, isLoading, isFetching } = useGetBusinessAddressQuery({
    page: activePage,
  });
  const dispatch = useDispatch();
  const bossData = data?.bossAddresses?.data;
  console.log(data, "bossData");

  useEffect(() => {
    dispatch(addBusiness(bossData));
  }, [data]);

  const nextHandler = () => {
    if (data?.bossAddresses?.next_page_url) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className=" mx-auto mt-5 bg-[#0e1217] container">
      <div className="flex justify- lg:px-10 md:px-5 md:gap-5 lg:gap-8 items-center flex-wrap">
        {bossData?.map((item: BossType) => (
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
        <div className=" flex items-center justify-center gap-3">
          <button
            disabled={isFetching && true}
            className=" bg-white h-6 w-6 flex justify-center rounded items-center"
          >
            <RiArrowDropLeftFill className=" text-xl" />
          </button>
          <button className=" bg-white text-black h-6 w-6 rounded-full">
            {isFetching ? <small className="loader"></small> : activePage}
          </button>
          <button
            disabled={isLoading && true}
            onClick={nextHandler}
            className=" bg-white h-6 w-6 rounded flex justify-center items-center"
          >
            <RiArrowDropRightFill className=" text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeBusiness;
