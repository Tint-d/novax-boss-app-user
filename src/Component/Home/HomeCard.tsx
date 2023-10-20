import { TbClipboardCopy } from "react-icons/tb";
export interface Boss {
  id: number;
  boss_name: string;
  boss_no: string;
  business_address: string;
  business_description: string;
  business_category_id: string;
  business_city_id: string;
  business_logo: string;
  business_name: string;
  cover_photo: string;
  categories: {
    id: number;
    category_mm_name: string;
    category_name: string;
  };
  city: { id: number; city_name: string; city_mm_name: string };
}
const HomeCard = ({ ...item }): Boss => {
  console.log(item);
  return (
    <div className="w-[280px] md:w-[270px] p-2  gap-y-2 rounded-md bg-[#262a31] flex flex-col justify-around items-center ">
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
  );
};

export default HomeCard;
