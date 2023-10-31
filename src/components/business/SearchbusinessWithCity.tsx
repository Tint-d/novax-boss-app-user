import { useParams } from "react-router-dom";
import { BossFilterType, useGetBusinessAddressFilterQuery } from "../../redux/api/BusinessAddressApi";
import { BossType } from "../../typings/type";
import { useEffect, useState } from "react";
import { RiArrowDropLeftFill, RiArrowDropRightFill } from "react-icons/ri";
import Skeleton from 'react-loading-skeleton'
import BusinessCard from "./BusinessCard";

const SearchbusinessWithCity = () => {
  const { id } = useParams() as { id: string };
  const [business, setBusiness] = useState<BossType[]>([]);

  const [activePage,setPage] = useState(1);
  const { data, isLoading ,isFetching } = useGetBusinessAddressFilterQuery({
    page: activePage,
    id: id,
    type : BossFilterType.CITY,
  });
  const bossData = data?.bossAddresses;


  useEffect(()=>{
    setBusiness(bossData?.data as BossType[]);
  },[id,bossData,activePage])

  const nextHandler = () => {
    if (bossData?.next_page_url) {
      setPage((prev) => prev + 1);
    }
  };

  const prevHandler = () => {
    if (bossData?.prev_page_url) {
      setPage((prev) => prev - 1);
    }
  };
  
  const inline = window.innerWidth > 768 ? true : false;

  const width = window.innerWidth > 768 ? "w-[270px]" : "w-[280px]";

  const height = window.innerWidth > 768 ? 320 : 300;
  if (isLoading) {
    return (
      // <p className=" text-white flex justify-center items-center">Loading...</p>
      <div className="flex justify-center items-center relative flex-wrap mt-12  w-full">
                <Skeleton height={height} baseColor='#96969613' className={`${width}`} highlightColor='#6f6e6e13' inline={inline} count={10} containerClassName="flex justify-center items-center gap-3 flex-wrap w-full h-full container mx-auto gap-y-8"/>
        </div>
    );
  }

  return (
    <div className=" mx-auto mt-12 pb-6  bg-[#0e1217] container">
      <div className="flex justify-center gap-x-3 gap-y-4 h-full  items-center flex-wrap">
        {/* <p className="text-white">City</p> */}

        {business?.map((item: BossType) => (
             <BusinessCard key={item.id} {...item} />
        ))}

      </div>
       {/* paginateion */}
       <div className=" flex items-center justify-center gap-3 mt-4">
          <button
            disabled={isFetching && true}
            onClick={prevHandler}
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
  );
};

export default SearchbusinessWithCity;
