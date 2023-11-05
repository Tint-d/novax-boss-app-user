import React from 'react'
import BossAddressDetailSlider from './BossAddressDetailSlider';
import { SiFacebook, SiTiktok, SiYoutube } from 'react-icons/si';

interface Bossaddress {
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
  images : BusinessPhoto[];
}
interface BusinessPhoto {
  
  id: number,
  business_photo : string
  boss_address_id: string

}

interface Social {
  href: string;
  type : string;  
}
const BossAddressDetailSectionTwo = ({bossAddress} : { bossAddress : Bossaddress}) => {

  const [currentImage, setCurrentImage] = React.useState<number>(0);

  let images : BusinessPhoto[] = bossAddress?.images;

  if(images && images.length == 0 )
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
    <div className='h-full flex justify-center items-start md:items-center'>
        <div className="flex flex-col justify-center items-center gap-7">
            <div className="">
              {
                images.length >0 && (
                 <>
                  <label htmlFor="my_modal_7">
                    <img src={images[currentImage].business_photo} alt="" className="min-w-[150px] md:min-w-[250px] md:max-w-[280px] h-[20vh] object-contain rounded-lg"/>
                  </label>
                  <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                  <div className="modal">
                    <div className="modal-box flex justify-center">
                    <img src={images[currentImage].business_photo} alt="" className="w-4/6 object-contain rounded-lg"/>
                    </div>
                    <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                  </div></>
                )
              }
            </div>
            <div className="w-full">
              {
                images.length >0 && <BossAddressDetailSlider setState={setCurrentImage} state={currentImage}/>
              }

            </div>

            <div className="flex gap-8 text-2xl">
             {
              socialLinks.length > 0 &&
              (
                <>
                 <a href={socialLinks[0]?.href} className="bg-blue-700  rounded-lg px-3 py-2">
                  <SiFacebook className="" />

              </a>
              <a href={socialLinks[1]?.href} className="bg-red-700 rounded-lg px-3 py-2">
                 <SiYoutube className="" />
              </a>
              <a href={socialLinks[3]?.href} className="bg-zinc-900 rounded-lg px-3 py-2 text-white">
                <SiTiktok className="" />
              </a></>
              )
             }
      </div>
        </div>

      
    </div>
  )
}

export default BossAddressDetailSectionTwo