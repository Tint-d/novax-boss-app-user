
import Skeleton from 'react-loading-skeleton'

import {  useState } from "react";
import BusinessPhotos from '../BusinessPhotos';
import BossAddressSectionOne from '../UserBossAddress/BossAddressSectionOne';
import BossAddressDetailSlider from '../UserBossAddress/BossAddressDetailSlider';
import DetailSocialMedia from '../DetailSocialMedia';
import CopyToClipBoard from '@/components/ui/CopyToClipboard/CopyToClipBoard';
import { useNavigate } from 'react-router-dom';
//import cross logo from react-icons
import { MdClose } from 'react-icons/md';
import { detailsType } from '../BusinessDetail';



interface BusinessPhoto {
  
  id: number,
  business_photo : string
  boss_address_id: string

}


type SideData = {
    title: string;
    content: string; 
  };
  
  type SidesData = SideData[][];

  interface BusinesssDetailProps {
    sideData: SidesData;
    bossAddress : detailsType
    isLoading : boolean
  }


const MobileDetail = ({sideData,bossAddress,isLoading} : BusinesssDetailProps) => {
  const [show, setShow] = useState<number>(0);

  const [activeSection,setActiveSection] = useState<number>(0);

  const loadingSkeleton = (
    <div className="flex justify-center items-center relative mt-12 pb-10 w-full">
      <Skeleton height={"100vh"} baseColor='#96969613' className={`w-[80vw]`} highlightColor='#6f6e6e13' count={1} />
    </div>)

  if (isLoading) {
    return (
      loadingSkeleton
    );
  }
  const navigate = useNavigate();

  return (
    <div className='w-full py-6'>
      <div className="container rounded-lg ">
        <div className="flex flex-col">

          <div className="flex justify-between items-center px-8">
            <CopyToClipBoard  url={'/business_card_detail/'+bossAddress?.id} />

            <button onClick={()=>navigate(-1)} className='text-3xl'>
             <MdClose/>
            </button>
          </div>
          
          <div className="h-full flex flex-col justify-between py-6  pb-40 ">
            <div className="flex flex-col h-[85%]  overflow-scroll no-scrollbar">
              <div className="img-container rounded-lg px-6">
                <label htmlFor="my_modal_8">
                  <img src={bossAddress?.cover_photo} alt="" className="w-[90vw] h-[200px] rounded-lg object-cover" />
                </label>

                <input type="checkbox" id="my_modal_8" className="modal-toggle" />
                <div className="modal">
                  <div className="modal-box flex justify-center">
                    <img src={bossAddress?.cover_photo} alt="" className="w-5/6 object-contain rounded-lg" />
                  </div>
                  <label className="modal-backdrop" htmlFor="my_modal_8">Close</label>
                </div>
              </div>

              <div className="profile flex gap-4 mt-4 items-center px-6">
                <div className="profile-image">
                  <img src={bossAddress?.business_logo} alt="" className="w-[40px] h-[40px] rounded-full object-cover" />
                </div>

                <p className='text-[#DCA715] text-md font-medium'>
                  {bossAddress?.business_name}
                </p>
              </div>

              {
                (
                  <>
                  <div className="flex justify-between h-[65px] items-center  bg-[#2e3036] my-3 mt-6 px-8 text-sm">
                      <button
                      onClick={() => setActiveSection(0)}
                      className={`${activeSection == 0 ? "bg-[#DCA715] border-none" : "bg-[#A8B3CF12]"} text-[#fff] px-3 whitespace-nowrap h-9 flex justify-center rounded-md items-center border-2 border-[#a8b3cf6a]`}>
                        Info
                      </button>

                      <button
                      onClick={() => setActiveSection(1)}
                      className={`${activeSection == 1 ?"bg-[#DCA715] border-none" : "bg-[#A8B3CF12]"} text-[#fff] px-3 whitespace-nowrap h-9 flex justify-center rounded-md items-center border-2 border-[#a8b3cf6a]`}>
                        Social Media
                      </button>

                      <button
                      onClick={() => setActiveSection(2)}
                      className={`${activeSection == 2 ? "bg-[#DCA715] border-none" : "bg-[#A8B3CF12]"} text-[#fff] px-3 whitespace-nowrap h-9 flex justify-center rounded-md items-center border-2 border-[#a8b3cf6a]`}>
                        Photos
                      </button>
                  </div>
                  </>
                )
              }
              {
                (activeSection == 0) && <div className='overflow-scroll no-scrollbar'>
                <BossAddressSectionOne show={show} sidesData={sideData} setShow={setShow} />
                </div>
              }
              
            </div>
            {
              (activeSection == 0) && (
                <div className="flex  flex-col fixed w-full bottom-0 z-[999]">
                  <div className="flex w-full justify-center items-center   bg-[#2c2f35fb] h-[50px] px-6 transition-all">
                   <BossAddressDetailSlider state={show} setState={setShow} max={2} />
                  </div>
                </div>
              )
            } 
            {
              (activeSection == 1) && (
                <div className="flex w-full justify-center items-start h-[80px] px-6 transition-all">
                <DetailSocialMedia social_links={bossAddress?.social_links} />
              </div>
              )
            }

{
              (activeSection == 2) && (
                <div className="flex w-full items-start h-full pb-5  transition-all">
                <BusinessPhotos photos={bossAddress?.images as BusinessPhoto[]} logo={bossAddress?.business_logo} cover={bossAddress?.cover_photo}/>
              </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDetail;
