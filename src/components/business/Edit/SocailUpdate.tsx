import { AiOutlineCloudUpload } from "react-icons/ai";
import { RefObject, useRef } from "react";
import { SiFacebook, SiTiktok, SiYoutube } from "react-icons/si";
import { useUpdateSocialLinkMutation } from "@/redux/api/BusinessAddressApi";
import { toast } from "react-toastify";
import { t } from "i18next";
import { detailsType } from "../BusinessDetail";

const SocailUpdate = ({bossAddress} : {bossAddress : detailsType}) => {
  const [updateSocialLink, { isLoading }] = useUpdateSocialLinkMutation();

  const facebookRef = useRef<HTMLInputElement>(null);
  const youtubeRef = useRef<HTMLInputElement>(null);
  const tiktokRef = useRef<HTMLInputElement>(null);

  const bossId = bossAddress?.id;

  const socialUpdate = async (id: string, type: string, ref: RefObject<HTMLInputElement>) => {
    const data = {
      href: ref.current?.value,
      type: type
    }
    console.log(bossId);
    const response = await updateSocialLink({ data, id: bossId, socialId: id }) as any;
    if (response.error) {
      toast.error(response.error.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }

    if (response.data.success) {
      toast.success("social link updated", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      // navigate('/')
    }
  }
  return (
    <>
      <div className="w-[100%]">
        <h2 className=" text-[#A8B3CF] pb-2 text-sm">{t('Facebook link')}</h2>

        <div className="flex">
          <div className=" w-[100%] px-1 py-1 rounded flex justify-start items-center gap-x-2 border border-[#4e525a]">
            <SiFacebook className="text-blue-600  text-[26px]" />
            <input
              ref={facebookRef}
              type="text"
              defaultValue={bossAddress?.social_links[0]?.href}
              className="bg-transparent text-white border-l border-[#4e525a] p-1 w-full outline-none"
            />
            <button
              type="button"
              onClick={() => socialUpdate(bossAddress?.social_links[0]?.id as string, "facebook", facebookRef)}
              className="px-2 py-2 rounded-lg bg-green-700 hover:bg-green-900 disabled:bg-green-800 text-white" disabled={isLoading}
            >
              <AiOutlineCloudUpload />
            </button>
          </div>

        </div>

      </div>

      <div className="w-[100%]">
        <h2 className="text-sm text-[#A8B3CF] pb-2">{t('Youtube link')}</h2>
        <div className=" w-[100%] px-1 py-1 rounded flex justify-start items-center gap-x-2 border border-[#4e525a]">
          <SiYoutube className="text-red-600  text-[28px]" />
          <input
            ref={youtubeRef}
            type="text"
            defaultValue={bossAddress?.social_links[1]?.href}
            className="bg-transparent text-white border-l border-[#4e525a] p-1 w-full  outline-none"
          />
          <button
            type="button"
            onClick={() => socialUpdate(bossAddress?.social_links[1]?.id as string, "youtube", youtubeRef)}
            className="px-2 py-2 rounded-lg bg-green-700 hover:bg-green-900 disabled:bg-green-800 text-white" disabled={isLoading}
          >
            <AiOutlineCloudUpload />
          </button>
        </div>
      </div>
      <div className="w-[100%]">
        <h2 className="text-sm text-[#A8B3CF] pb-2">{t('Tiktok link')}</h2>
        <div className=" w-[100%] px-1 py-1 rounded flex justify-start items-center gap-x-2 border border-[#4e525a]">
          <SiTiktok className="text-white/70  text-[26px]" />
          <input
            ref={tiktokRef}
            type="text"
            defaultValue={bossAddress?.social_links[2]?.href}
            className="bg-transparent text-white border-l border-[#4e525a] p-1 w-full outline-none"
          />
          <button
            type="button"
            onClick={() => socialUpdate(bossAddress?.social_links[2]?.id as string, "tiktok", tiktokRef)}
            className="px-2 py-2 rounded-lg bg-green-700 hover:bg-green-900 disabled:bg-green-800 text-white" disabled={isLoading}
          >
            <AiOutlineCloudUpload />
          </button>
        </div>
      </div>
    </>
  )
}

export default SocailUpdate