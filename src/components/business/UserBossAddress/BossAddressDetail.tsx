import React, { useState } from 'react'
import BossAddressSectionOne from './BossAddressSectionOne';
import BossAddressDetailSlider from './BossAddressDetailSlider';
import BossAddressDetailSectionTwo from './BossAddressDetailSectionTwo';
import { useGetProfileQuery } from '@/redux/api/BusinessAddressApi';
import Skeleton from 'react-loading-skeleton';
import { t } from 'i18next';
import DetailSocialMedia from '../DetailSocialMedia';
import BusinessPhotos from '../BusinessPhotos';


interface BusinessPhoto {
  
  id: number,
  business_photo : string
  boss_address_id: string

}


const BossAddressDetail = () => {

    const [show, setShow] = React.useState<number>(0);

    const { data, isLoading } = useGetProfileQuery({});
   const [activeSection,setActiveSection] = useState<number>(1);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center relative mt-12 pb-10 w-full">
                <Skeleton height={"100vh"} baseColor='#96969613' className={`w-[80vw]`} highlightColor='#6f6e6e13' count={1} />
            </div>)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bossAddress = (data as any)?.data?.boss_address;

    console.log(bossAddress)

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

  const beyondMobile = window.innerWidth > 768;



    return (
    <div className='w-full py-10 flex justify-center items-center'>
      <div className="container bg-[#1C1F26] rounded-lg  w-[80vw] xl:w-[60vw] ">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/4 lg:w-3/5 md:h-[80vh] h-full flex flex-col justify-between md:border-r-2 border-zinc-900 pt-8">
            <div className="flex flex-col  h-[85%] py-6 overflow-scroll no-scrollbar">
              <div className="img-container rounded-lg px-6">
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

              <div className="profile flex gap-4 mt-3 items-center px-6">
                <div className="profile-image">
                  <img src={bossAddress?.business_logo} alt="" className="w-[40px] h-[40px] rounded-full object-cover" />
                </div>

                <p className='text-[#DCA715] text-md font-medium'>
                  {bossAddress?.business_name}
                </p>
              </div>

              {
                !beyondMobile && (
                  <>
                  <div className="flex justify-between h-[50px] items-center  bg-[#2e3036] my-3 px-8 text-sm">
                      <button
                      onClick={() => setActiveSection(0)}
                      className={`${activeSection == 0 ? "bg-[#DCA715]" : "bg-[#A8B3CF12]"} text-[#fff] px-3 whitespace-nowrap h-7 flex justify-center rounded-md items-center`}>
                        Info
                      </button>

                      <button
                      onClick={() => setActiveSection(1)}
                      className={`${activeSection == 1 ?"bg-[#DCA715]" : "bg-[#A8B3CF12]"} text-[#fff] px-3 whitespace-nowrap h-7 flex justify-center rounded-md items-center`}>
                        Social Media
                      </button>

                      <button
                      onClick={() => setActiveSection(2)}
                      className={`${activeSection == 2 ? "bg-[#DCA715]" : "bg-[#A8B3CF12]"} text-[#fff] px-3 whitespace-nowrap h-7 flex justify-center rounded-md items-center`}>
                        Photos
                      </button>
                  </div>
                  </>
                )
              }
              {
                (!beyondMobile && activeSection == 0) && <BossAddressSectionOne show={show} sidesData={sidesData} setShow={setShow} />
              }
              {
                (beyondMobile) && <BossAddressSectionOne show={show} sidesData={sidesData} setShow={setShow} />
              }
            </div>
            {
              (!beyondMobile && activeSection == 0) && (
                <div className="flex w-full justify-center items-center  bg-[#A8B3CF12] h-[50px] px-6">
                <BossAddressDetailSlider state={show} setState={setShow} max={2} />
              </div>
              )
            } 

{
            (beyondMobile) && (
                <div className="flex w-full justify-center items-center  bg-[#A8B3CF12] h-[50px] px-6">
                <BossAddressDetailSlider state={show} setState={setShow} max={2} />
              </div>
              )
            } 
            
            {
              (!beyondMobile && activeSection == 1) && (
                <div className="flex w-full justify-center items-start h-[80px] px-6">
                <DetailSocialMedia social_links={bossAddress?.social_links} />
              </div>
              )
            }

{
              (!beyondMobile && activeSection == 2) && (
                <div className="flex w-full justify-center items-start h-full pb-5 ">
                <BusinessPhotos photos={bossAddress?.images as BusinessPhoto[]} logo={bossAddress?.business_logo} cover={bossAddress?.cover_photo}/>
              </div>
              )
            }
          </div>

          <div className="w-auto md:2/4 lg:w-2/5 md:h-[80vh] h-[40vh] pt-8 hidden md:block px-6" >
            {
              beyondMobile && <BossAddressDetailSectionTwo bossAddress={bossAddress} />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default BossAddressDetail
