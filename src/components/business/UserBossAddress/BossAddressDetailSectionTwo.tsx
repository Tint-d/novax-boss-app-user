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

  const images : BusinessPhoto[] = bossAddress?.images;

  const socialLinks = bossAddress?.social_links;

  return (
    <div className='h-full flex justify-center items-start md:items-center'>
        <div className="flex flex-col justify-center items-center gap-7">
            <div className="">
              <img src={images[currentImage].business_photo} alt="" className=" md:min-w-[250px] md:max-w-[280px] h-[20vh] object-cover rounded-lg"/>
            </div>
            <div className="w-full">
            <BossAddressDetailSlider setState={setCurrentImage} state={currentImage}/>

            </div>

            <div className="flex gap-8 text-2xl">
              <a href={socialLinks[0]?.href} className="bg-blue-700  rounded-lg px-3 py-2">
                  <SiFacebook clasName="" />

              </a>
              <a href={socialLinks[1]?.href} className="bg-red-700 rounded-lg px-3 py-2">
                 <SiYoutube clasName="" />
              </a>
              <a href={socialLinks[3]?.href} className="bg-zinc-900 rounded-lg px-3 py-2 text-white">
                <SiTiktok clasName="" />
              </a>
      </div>
        </div>

      
    </div>
  )
}

export default BossAddressDetailSectionTwo