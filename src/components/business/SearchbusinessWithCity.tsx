import { useParams } from "react-router-dom";
import { BossFilterType, useGetBusinessAddressFilterQuery } from "../../redux/api/BusinessAddressApi";
import { BossType } from "../../typings/type";
import { useEffect, useState } from "react";
import { RiArrowDropLeftFill, RiArrowDropRightFill } from "react-icons/ri";
import Skeleton from 'react-loading-skeleton'
import BusinessCard from "./BusinessCard";
import BusinessSearchBox from "./BusinessSearchBox";
import { useSelector } from "react-redux";
import { InitialBusinessStateType } from "@/redux/services/businessSlice";

const SearchbusinessWithCity = () => {
  const { id } = useParams() as { id: string };
  const [business, setBusiness] = useState<BossType[]>([]);

  const [activePage,setPage] = useState(1);

  const searchTerm = useSelector(
    (state: InitialBusinessStateType) => state.business.searchTerm
  );

  const { data, isLoading ,isFetching ,refetch } = useGetBusinessAddressFilterQuery({
    page: activePage,
    id: id,
    type : BossFilterType.CITY,
    search : searchTerm
  });
  const bossData = data?.bossAddresses;

  useEffect(()=>{
    refetch();
  },[refetch, searchTerm])

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
  const loadingSkeleton = (
    <div className="flex justify-center items-center relative flex-wrap mt-12  w-full">
    <Skeleton height={height} baseColor='#96969613' className={`${width}`} highlightColor='#6f6e6e13' inline={inline} count={20} containerClassName="flex justify-center sm:justify-around items-center gap-3 lg:gap-8 flex-wrap w-full h-full container mx-auto gap-y-8  py-5  lg:px-10  md:gap-5 "/>
</div>
  )

  return (
    <div className=" mx-auto  justify-center items-center  mt-5 bg-[#0e1217] container pb-10">
    <BusinessSearchBox />

    {isLoading ? loadingSkeleton : (
      <>
       <div className="flex w-full gap-y-5  justify-around py-5  lg:px-10 md:px-5 md:gap-5 lg:gap-8 items-center flex-wrap">
      {business?.map((item: BossType) => (
          <BusinessCard key={item.id} {...item} />
        ))}
    </div>
      <div className=" flex items-center justify-center gap-3">
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
      </>
   
      )}
    
    {/* {bossData} */}
  </div>
  );
};

export default SearchbusinessWithCity;
