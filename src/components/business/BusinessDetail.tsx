import { useParams } from "react-router-dom";
import { useGetBusinessAddressDetailQuery } from "../../redux/api/BusinessAddressApi";
import "swiper/css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../App.css";
import Skeleton from 'react-loading-skeleton'
import BossAddressSectionOne from "./UserBossAddress/BossAddressSectionOne";
import BossAddressDetailSlider from "./UserBossAddress/BossAddressDetailSlider";
import BossAddressDetailSectionTwo from "./UserBossAddress/BossAddressDetailSectionTwo";
import { useState } from "react";
import { t } from "i18next";


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
  type: string;
}


const BusinessDetail = () => {
  const { id } = useParams() as { id: string };
  const [show, setShow] = useState<number>(0);

  const { data: items, isLoading } = useGetBusinessAddressDetailQuery(id);
  console.log(items);


  const bossAddress = (items as any)?.address;
  console.log(bossAddress)

  const loadingSkeleton = (
    <div className="flex justify-center items-center relative mt-12 pb-10 w-full">
      <Skeleton height={"100vh"} baseColor='#96969613' className={`w-[80vw]`} highlightColor='#6f6e6e13' count={1} />
    </div>)

  if (isLoading) {
    return (
      loadingSkeleton
    );
  }


  const sidesData = [
    [
      {
        title: t("Boss Name"),
        content: bossAddress?.boss_name
      },
      {
        title: t("Business Type"),
        content: bossAddress?.categories?.category_name

      },
      {
        title: t("Business Address"),
        content: bossAddress?.business_address
      },
    ],
    [
      {
        title: t("Business City"),
        content: bossAddress?.city?.city_name
      },
      {
        title: t("Business Description"),
        content: bossAddress?.business_description
      },
      {
        title: t("Business Goal"),
        content: bossAddress?.business_goal
      },
      {
        title: t("Business Vision"),
        content: bossAddress?.business_vision
      }
    ],
    [
      {
        title: t("Business Mission"),
        content: bossAddress?.business_mission
      },
      {
        title: t("Business Value"),
        content: bossAddress?.business_value
      },
      {
        title: t("Business Suprise"),
        content: bossAddress?.business_suprise
      }
    ]
  ];
  


  return (
    <div className='w-full py-10 flex justify-center items-center'>
      <div className="container bg-[#1C1F26] rounded-lg  w-[80vw] xl:w-[60vw] ">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/4 lg:w-3/5 md:h-[80vh] h-[60vh] md:border-r-2 border-zinc-900 pt-8">
            <div className="flex flex-col h-[90%] p-6 overflow-scroll no-scrollbar">
              <div className="img-container rounded-lg">
                <label htmlFor="my_modal_8">
                  <img src={bossAddress?.cover_photo} alt="" className="w-[300px] md:w-[400px] h-[200px] rounded-lg object-cover" />
                </label>

                <input type="checkbox" id="my_modal_8" className="modal-toggle" />
                <div className="modal">
                  <div className="modal-box flex justify-center">
                    <img src={bossAddress?.cover_photo} alt="" className="w-4/6 object-contain rounded-lg" />
                  </div>
                  <label className="modal-backdrop" htmlFor="my_modal_8">Close</label>
                </div>
              </div>

              <div className="profile flex gap-4 mt-3 items-center">
                <div className="profile-image">
                  <img src={bossAddress?.business_logo} alt="" className="w-[40px] h-[40px] rounded-full object-cover" />
                </div>

                <p className='text-[#DCA715] text-md font-medium'>
                  Creative Marketing Agency
                </p>
              </div>

              <BossAddressSectionOne show={show} sidesData={sidesData} setShow={setShow} />
            </div>
            <div className="flex w-full justify-center items-center  bg-[#A8B3CF12] h-[10%]">
              <BossAddressDetailSlider state={show} setState={setShow} max={2} />
            </div>
          </div>

          <div className="w-auto md:2/4 lg:w-2/5 md:h-[80vh] h-[40vh] pt-8" >
            <BossAddressDetailSectionTwo bossAddress={bossAddress} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;
