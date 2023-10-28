import { useEffect, useState } from "react";
import { useGetBusinessAddressQuery } from "../../redux/api/BusinessAddressApi";
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

const HomeBusiness = () => {
  const [activePage, setPage] = useState(1);
  const { data, isLoading, isFetching } = useGetBusinessAddressQuery({
    page: activePage,
  });

  const searchTerm = useSelector(
    (state: InitialBusinessStateType) => state.business.searchTerm
  );

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

  if (isLoading) {
    return (
      <p className=" text-white flex justify-center items-center">Loading...</p>
    );
  }

  const shouldRenderPagination = serachBossName?.some(
    (boss: BossType) =>
      searchTerm === "" ||
      boss.business_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" mx-auto  justify-center items-center  mt-5 bg-[#0e1217] container">
      <BusinessSearchBox />
      <div className="flex w-full gap-y-5  justify-around py-5  lg:px-10 md:px-5 md:gap-5 lg:gap-8 items-center flex-wrap">
        {serachBossName
          ?.filter((boss: BossType) => {
            if (searchTerm === "") {
              return boss;
            } else if (
              boss.business_name
                .toLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
            ) {
              return boss;
            }
          })
          ?.map((item: BossType) => (
            <BusinessCard key={item.id} {...item} />
          ))}
      </div>

      {shouldRenderPagination && (
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
      )}
      {/* {bossData} */}
    </div>
  );
};

export default HomeBusiness;
