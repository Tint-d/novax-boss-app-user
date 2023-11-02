import { useEffect, useState } from "react";
import { BossFilterType, useGetBusinessAddressFilterQuery } from "../../redux/api/BusinessAddressApi";
import { useDispatch, useSelector } from "react-redux";
import {
  InitialBusinessStateType,
  addBusiness,
} from "../../redux/services/businessSlice";
import { RiArrowDropLeftFill, RiArrowDropRightFill } from "react-icons/ri";
import "../../App.css";
import { BossType } from "../../typings/type";
import BusinessCard from "./BusinessCard";
import BusinessSearchBox from "./BusinessSearchBox";
import Skeleton from 'react-loading-skeleton'


const HomeBusiness = () => {
  const [activePage, setPage] = useState(1);


  const searchTerm = useSelector(
    (state: InitialBusinessStateType) => state.business.searchTerm
  );


  const { data, isLoading ,isFetching ,refetch } = useGetBusinessAddressFilterQuery({
    page: activePage,
    id: "0",
    type : BossFilterType.DEFAULT,
    search : searchTerm
  });

  useEffect(()=>{
    refetch();
  },[refetch, searchTerm])



  const dispatch = useDispatch();
  const bossData = data?.bossAddresses?.data;

  const serachBossName = useSelector(
    (state: InitialBusinessStateType) => state.business.items
  );

  useEffect(() => {
    dispatch(addBusiness(bossData));
  }, [data]);

  const nextHandler = () => {
    if (data?.bossAddresses?.next_page_url) {
      setPage((prev) => prev + 1);
    }
  };

  const prevHandler = () => {
    if (data?.bossAddresses?.prev_page_url) {
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

  // const shouldRenderPagination = serachBossName?.some(
  //   (boss: BossType) =>
  //     searchTerm === "" ||
  //     boss.business_name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className=" mx-auto flex flex-col  justify-start items-center  mt-5 bg-[#0e1217] container pb-10">
      <BusinessSearchBox />

      {isLoading ? loadingSkeleton : (
        <>
         <div className="flex w-full gap-y-5  justify-around py-5  lg:px-10 md:px-5 md:gap-5 lg:gap-8 items-center flex-wrap">
        {serachBossName?.map((item: BossType) => (
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

export default HomeBusiness;
