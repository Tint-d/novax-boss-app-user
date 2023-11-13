import { SiFacebook, SiTiktok, SiYoutube } from 'react-icons/si';

interface Social {
  href: string;
  type: string;
}

interface DetailSocialMediaProps {
  social_links: Social[];
}

const DetailSocialMedia = ({ social_links }: DetailSocialMediaProps) => {
  return (
    <div className='flex flex-col items-center'>
      {
        social_links?.length == 0 && "No social media"
      }

      {social_links?.length > 0 && <p className='text-[#DCA715] text-md mt-4 mb-8'>{'Follow On Social Media'}</p>}


      <div className="flex gap-8 text-2xl ">
        {
          social_links?.length > 0 &&
          (
            <>
              <a href={social_links[0]?.href} target='_blank' className="bg-blue-700  rounded-lg px-3 py-2">
                <SiFacebook className="" />

              </a>
              <a href={social_links[1]?.href} target='_blank' className="bg-red-700 rounded-lg px-3 py-2">
                <SiYoutube className="" />
              </a>
              <a href={social_links[3]?.href} target='_blank' className="bg-zinc-900 rounded-lg px-3 py-2 text-white">
                <SiTiktok className="" />
              </a></>
          )
        }
      </div>
    </div>
  )
}

export default DetailSocialMedia