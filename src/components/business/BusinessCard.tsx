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
      <div
        key={item.id}
        className="w-[80vw] md:max-w-[330px] p-2  gap-y-2 rounded-md bg-[#262a31] flex flex-col justify-around items-center "
      >
        <div className="flex  justify-between w-full  items-center pt-2 px-1">
          <img
            className="w-[45px] object-cover h-[45px] rounded-full"
            src={item?.business_logo}
          />
          <TbClipboardCopy
          onClick={() => {
            alert('hi')}}
           className=" w-[45px] h-[45px] p-2  shadow-black/40 text-white bg-[#262a31] rounded-full" />
        </div>
        <Link to={`/business_card_detail/${item.id}`}>

        <h2 className=" w-full  text-[20px] text-warining truncate  px-2">
          {item?.business_name}
        </h2>
        <div className=" flex w-full justify-between items-center ">
          <h2 className=" md:text-[14px] text-[#A8B3CF] truncate w-[160px] py-1 px-2">
            {categoriesName}
          </h2>
          <h2 className=" md:text-[14px] text-[#A8B3CF] truncate w-[160px] text-end py-1 px-2">
            {cityName}
          </h2>
        </div>
        <p className=" h-[80px] w-full overflow-hidden leading-5 tracking-wider text-[14px] mb-3 md:mb-4 text-white py-2 px-2">
          {item?.business_description.slice(0, 120) + " ...."}
        </p>
        <img
          className=" w-full rounded-lg h-[180px] object-cover px-2"
          src={item?.cover_photo}
        />
      </Link>
      </div>

  );
};

export default BusinessCard;
