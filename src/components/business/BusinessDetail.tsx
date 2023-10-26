import { useParams } from "react-router-dom";
import { useGetBusinessAddressDetailQuery } from "../../redux/api/BusinessAddressApi";
import { TbClipboardCopy } from "react-icons/tb";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
// import "../../App.css";

const BusinessDetail = () => {
  const { id } = useParams() as { id: string };

  const { data: items, isLoading } = useGetBusinessAddressDetailQuery(id);
  console.log(items);

  if (!items) {
    return null;
  }

  if (isLoading) {
    return (
      <p className=" flex justify-center items-center h-screen">Loading...</p>
    );
  }
  const details = items?.address;

  return (
    <div className="flex flex-wrap gap-3 justify-center text-white items-center mt-5">
      {/* <img src={details.cover_photo} alt="" /> */}
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            className=" w-80"
            src="https://swiperjs.com/demos/images/nature-1.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className=" w-80"
            src="https://swiperjs.com/demos/images/nature-2.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className=" w-80"
            src="https://swiperjs.com/demos/images/nature-3.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BusinessDetail;
