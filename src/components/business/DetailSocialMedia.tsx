import { SiFacebook, SiTiktok, SiYoutube } from 'react-icons/si';

interface Social {
    href: string;
    type: string;
  }

interface DetailSocialMediaProps {
    social_links: Social[];
}

const DetailSocialMedia = ({social_links} : DetailSocialMediaProps) => {
  return (
    <div>
        {
            social_links.length == 0 && "No social media"
        }

            <div className="flex gap-8 text-2xl">
             {
              social_links.length > 0 &&
              (
                <>
                 <a href={social_links[0]?.href} className="bg-blue-700  rounded-lg px-3 py-2">
                  <SiFacebook clasName="" />

              </a>
              <a href={social_links[1]?.href} className="bg-red-700 rounded-lg px-3 py-2">
                 <SiYoutube clasName="" />
              </a>
              <a href={social_links[3]?.href} className="bg-zinc-900 rounded-lg px-3 py-2 text-white">
                <SiTiktok clasName="" />
              </a></>
              )
             }
             </div>
    </div>
  )
}

export default DetailSocialMedia