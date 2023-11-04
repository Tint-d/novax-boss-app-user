import { TbClipboardCopy } from "react-icons/tb";
import { Link } from "react-router-dom";

const BusinessCard = ({ ...item }) => {

  const localstorageLanguage : string  = localStorage.getItem('language') || 'en';

  let categoriesName = item?.categories?.category_name;
  let cityName = item?.city?.city_name;

  if(localstorageLanguage === 'mm'){
    categoriesName = item?.categories?.category_mm_name;
    cityName = item?.city?.city_mm_name;
  }

  return (
    <Link to={`/business_card_detail/${item.id}`}>
      <div
        key={item.id}
        className="w-[280px] md:w-[270px] p-2  gap-y-2 rounded-md bg-[#262a31] flex flex-col justify-around items-center "
      >
        <div className="flex  justify-between w-full items-center">
          <img
            className="w-[30px] object-cover h-[30px] rounded-full"
            src={item?.business_logo}
          />
          <TbClipboardCopy className=" w-[40px] h-[40px] p-2  shadow-black/40 text-white bg-[#262a31] rounded-full" />
        </div>

        <h2 className=" w-full  text-[20px] text-warining truncate">
          {item?.business_name}
        </h2>
        <div className=" flex w-full justify-between items-center">
          <h2 className=" md:text-[14px] text-[#A8B3CF] truncate w-[100px]">
            {categoriesName}
          </h2>
          <h2 className=" md:text-[14px] text-[#A8B3CF] truncate w-[100px] text-end">
            {cityName}
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
    </Link>
  );
};

export default BusinessCard;
