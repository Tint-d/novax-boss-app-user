import React from 'react'
import BossAddressDetailSlider from './BossAddressDetailSlider';
import { SiFacebook, SiTiktok, SiYoutube } from 'react-icons/si';
import { detailsType } from '../BusinessDetail';
import CopyToClipBoard from '@/components/ui/CopyToClipboard/CopyToClipBoard';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';

interface BusinessPhoto {
  
  id: number,
  business_photo : string
  boss_address_id: string

}

const BossAddressDetailSectionTwo = ({bossAddress} : { bossAddress : detailsType}) => {

  const [currentImage, setCurrentImage] = React.useState<number>(0);
  const navigate = useNavigate();
  let images : BusinessPhoto[] = bossAddress?.images;

  if(images && images?.length == 0 )
  {
    images = [
      { id: 0, business_photo: bossAddress?.business_logo, boss_address_id: '' },
      { id: 1, business_photo: bossAddress?.cover_photo, boss_address_id: '' },
      { id: 2, business_photo: bossAddress?.business_logo, boss_address_id: '' },
      { id: 3, business_photo: bossAddress?.cover_photo, boss_address_id: '' },
    ];

  }

  const socialLinks = bossAddress?.social_links;

  return (
    <div className='h-full flex flex-col justify-start items-start md:items-center'>
        <div className="w-full flex justify-between items-center ">
            <CopyToClipBoard  url={'/business_card_detail/'+bossAddress?.id} />

            <button onClick={()=>navigate(-1)} className='text-3xl'>
             <MdClose/>
            </button>
          </div>
        <div className="flex my-auto flex-col justify-center  gap-10">

          <div className="flex flex-col gap-9 mb-10 ">
          <p className='text-[#DCA715] text-lg'>{t('Follow On Social Media')}</p>

          <div className="flex justify-between  items-center ">
             {
              socialLinks?.length > 0 &&
              (
                <>
                <div className="flex flex-col gap-5 items-center text-[.8em]" >
                <a href={socialLinks[0]?.href} className="bg-blue-700  flex  rounded-lg w-[55px] h-[55px] text-[1.2em] justify-center items-center gap-4">
                  <SiFacebook className="" />
                  </a>
                  <p>Facebook</p>
                </div>
                <div className="flex flex-col gap-5 items-center text-[.8em]" >
                <a href={socialLinks[1]?.href} className="bg-red-700  flex rounded-lg w-[55px] h-[55px] text-[1.2em] justify-center items-center">
                 <SiYoutube className="" />
              </a>
              <p>Youtube</p>

                </div>
                <div className="flex flex-col gap-5 items-center text-[.8em]">
                <a href={socialLinks[3]?.href} className="bg-zinc-900 flex  rounded-lg w-[55px] h-[55px] text-[1.2em] justify-center items-center text-white">
                <SiTiktok className="" />
              </a>
              <p>Tiktok</p>

                </div>
              
              </>
              )
             }
          </div>
          </div>
          <p className='text-[#DCA715]'>{t('Photos')}</p>
            <div className="flex justify-center w-full">
              {
                images?.length >0 && (
                 <>
                  <label htmlFor="my_modal_7">
                    <img src={images[currentImage].business_photo} alt="" className="min-w-[250px] md:min-w-[350px] md:max-w-[420px] h-[20vh] object-cover rounded-lg !cursor-pointer"/>
                  </label>
                  <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                  <div className="modal">
                    <div className="modal-box flex justify-center">
                    <img src={images[currentImage].business_photo} alt="" className="w-5/6 object-contain rounded-lg"/>
                    </div>
                    <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                  </div></>
                )
              }
            </div>
            <div className="w-full">
              {
                images?.length >0 && <BossAddressDetailSlider setState={setCurrentImage} state={currentImage}/>
              }

            </div>

          
        </div>


    </div>
  )
}

export default BossAddressDetailSectionTwo