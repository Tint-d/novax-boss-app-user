import { useGetBusinessAddressQuery } from "../../redux/api/BusinessAddress";
import HomeCard, { Boss } from "./HomeCard";
const HomeBusiness = () => {
  const { data } = useGetBusinessAddressQuery();
  const bossData = data?.bossAddresses?.data;
  return (
    <div className=" mx-auto mt-5 bg-[#0e1217] container">
      <div className="flex justify-around lg:px-10 md:px-5 md:gap-5 lg:gap-8 items-center flex-wrap">
        {bossData?.map((item): Boss => {
          return <HomeCard key={item?.id} {...item} />;
        })}
      </div>
    </div>
  );
};

export default HomeBusiness;
