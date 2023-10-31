import { useParams } from "react-router-dom";
import { useGetBusinessAddressDetailQuery } from "../../redux/api/BusinessAddressApi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "../../App.css";
import { FaFacebookSquare, FaTiktok, FaYoutube } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton'


export interface detailsType {
  boss_name: string;
  business_name: string;
  categories: {
    category_name: string;
  };
  main_product: string;
  business_address: string;
  contact_numbers: string[];
  city: {
    city_name: string;
  };
  business_description: string;
  vision: string;
  mission: string;
  cover_photo: string;
  business_logo: string;
  social_links: Social[];
}

interface Social {
  href: string;
  type : string;  
}

interface response {
    address: detailsType;
}


const BusinessDetail = () => {
  const { id } = useParams() as { id: string };

  const { data: items, isLoading } = useGetBusinessAddressDetailQuery(id);
  console.log(items);


  const details = (items as response)?.address;

  const loadingSkeleton = (
    <div className="flex justify-center items-center relative mt-12 pb-10 w-full">
    <Skeleton height={"100vh"} baseColor='#96969613' className={`w-[80vw]`} highlightColor='#6f6e6e13'  count={1}/>
  </div>)

if (isLoading) {
  return (
    loadingSkeleton
  );
}
  return (
    <div className="bg-[#0E1217] pb-10">
      <div className="lg:h-[50vh] lg:p-2 md:p-3  p-5 md:min-h-screen  lg:w-[975px] flex-wrap md:w-[700px] w-[355px] mt-10 bg-[#1C1F26] my mx-auto max-w-screen  flex justify-around rounded-2xl ">
        <div className=" lg:w-7/12 md:w-6/12  w-12/12 md:pb-2 pb-5 h-[80vh] overflow-y-scroll no-scrollbar scroll-smooth rounded-2xl ">
          <img
            src={details?.cover_photo}
            className="w-[392px] h-[204px] object-cover rounded-2xl mt-5"
            alt=""
          />
          <div className=" flex gap-3 items-center mt-5">
            <img
              src={details?.business_logo}
              className=" object-cover w-[48px] h-[48px] rounded-full"
              alt=""
            />
            <h2 className="text-[#DCA715] font-semibold">
              Creative Marketing Agency
            </h2>
          </div>
          <div className=" mt-5 flex flex-col gap-5">
            <div>
              <h2 className=" underline text-[#A8B3CF] font-bold mb-2">
                Boss Name
              </h2>
              <p className="text-white ms-3 text-sm">{details?.boss_name}</p>
            </div>
            <div>
              <h2 className=" underline text-[#A8B3CF] font-bold mb-2">
                Business Name
              </h2>
              <p className="text-white ms-3 text-sm">
                {details?.business_name}
              </p>
            </div>
            <div>
              <h2 className=" underline text-[#A8B3CF] font-bold mb-2">
                Business Type
              </h2>
              <p className="text-white ms-3 text-sm">
                {details?.categories.category_name}
              </p>
            </div>
            <div>
              <h2 className=" underline text-[#A8B3CF] font-bold mb-2">
                Main Product
              </h2>
              <p className="text-white ms-3 text-sm">
                {details?.main_product}
              </p>
            </div>

            <div>
              <h2 className=" underline text-[#A8B3CF] font-bold mb-2">
                Business Address
              </h2>
              <p className="text-white ms-3 text-sm">
                {details?.business_address}
              </p>
            </div>
            <div>
              <h2 className=" underline text-[#A8B3CF] font-bold mb-2">
                Contact Number
              </h2>
              <p className="text-white ms-3 text-sm">
                {details?.contact_numbers.map((num: string) => num)}
              </p>
            </div>
            <div>
              <h2 className=" underline text-[#A8B3CF] font-bold mb-2">City</h2>
              <p className="text-white ms-3 text-sm">
                {details?.city.city_name}
              </p>
            </div>
            <div>
              <h2 className=" underline text-[#A8B3CF] font-bold mb-2">
                Business Description
              </h2>
              <p className="text-white ms-3 text-sm">
                {details?.business_description}
              </p>
            </div>
            <div>
              <h2 className=" underline text-[#A8B3CF] font-bold mb-2">
                Vision
              </h2>
              <p className="text-white ms-3 text-sm">{details?.vision}</p>
            </div>
            <div>
              <h2 className=" underline text-[#A8B3CF] font-bold mb-2">
                Mission
              </h2>
              <p className="text-white ms-3 text-sm">{details?.mission}</p>
            </div>
          </div>
        </div>

        {/* right side */}

        <div className="lg:w-4/12 pt-3 md:w-5/12 w-12/12 w-[367px] border-0  md:border-l-[3px] ps-0 md:ps-5 border-[#A8B3CF33] flex flex-col justify-center gap-y-10 items-center">
          <div className=" w-[303px] h-[170px] ">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              <>
                <SwiperSlide>
                  <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                </SwiperSlide>
              </>
            </Swiper>
          </div>
          <div className=" flex justify-center gap-5 select-none">
            {details?.social_links.length !== 0 ? (
              <div>
                {details?.social_links.map((social: Social) => (
                  <div>
                    <a
                      href={social.href}
                      className=" flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <FaFacebookSquare className=" text-[#295396] text-3xl" />
                      <p className="cus text-[#A8B3CF] text-sm">Facebook</p>
                    </a>
                    <a
                      href={social.href}
                      className=" flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <FaYoutube className=" text-[#E62117] text-3xl" />
                      <p className=" text-[#A8B3CF] text-sm">Youtube</p>
                    </a>
                    <a
                      href={social.href}
                      className=" flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <FaTiktok className=" text-white p-1 rounded bg-[#230319] text-3xl" />
                      <p className=" text-[#A8B3CF] text-sm">Tiktok</p>
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              // <div className=" flex gap-5 items-center select-none">
              //   <div className=" flex flex-col items-center gap-2 ">
              //     <FaFacebookSquare className=" text-[#295396] text-3xl" />
              //     <p className="cus text-[#A8B3CF] text-sm">Facebook</p>
              //   </div>
              //   <div className=" flex flex-col items-center gap-2 ">
              //     <FaYoutube className=" text-[#E62117] text-3xl" />
              //     <p className=" text-[#A8B3CF] text-sm">Youtube</p>
              //   </div>
              //   <div className=" flex flex-col items-center gap-2 ">
              //     <FaTiktok className=" text-white p-1 rounded bg-[#230319] text-3xl" />
              //     <p className=" text-[#A8B3CF] text-sm">Tiktok</p>
              //   </div>
              // </div>
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;
