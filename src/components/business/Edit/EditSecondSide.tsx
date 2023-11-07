import { SiFacebook, SiTiktok, SiYoutube } from "react-icons/si";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsImageAlt } from "react-icons/bs";
import { ImCross } from 'react-icons/im';
import { Button } from "@mantine/core";
import { BaseSyntheticEvent, RefObject, useCallback, useRef, useState } from "react";
import { detailsType } from "../BusinessDetail";
import InputError from "@/components/ui/Errors/InputError";
import useForm from "@/hooks/useForm";
import { t } from "i18next";
import { useUpdateSocialLinkMutation } from "@/redux/api/BusinessAddressApi";
import { toast } from "react-toastify";
interface ImageFile {
  id: number,
  file: File,
  preview: string
}

interface EditSecondSideProps { 
    bossAddress : detailsType
}

type SocialLinkType = {
    id : string;
    href: string;
    type: string;
}


const EditSecondSide = ({bossAddress}  : EditSecondSideProps) => {

  const [businessPhotos, setBusinessPhotos] = useState<ImageFile[]>([]);
  const facebookRef = useRef<HTMLInputElement>(null);
  const youtubeRef = useRef<HTMLInputElement>(null);
  const tiktokRef = useRef<HTMLInputElement>(null);
  const [currentBusinessPhoto, setCurrentBusinessPhoto] = useState<number>(0)
  const businessPhotoInput = useRef<HTMLInputElement>(null);
  const [updateSocialLink,{isLoading}] = useUpdateSocialLinkMutation();

  const imageChange = useCallback((event: BaseSyntheticEvent) => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files) as File[];
      const filesArrayWithId = filesArray.map((file: File) => {
        return {
          id: Math.random() * 1000,
          file,
          preview: URL.createObjectURL(file)
        } as ImageFile
      })
      setBusinessPhotos([...filesArrayWithId]);
    }
  }, []);

  const handleFileClick = (ref: RefObject<HTMLInputElement>) => {
    ref.current?.click()
  }

  const removeImage = useCallback((id: number) => {
    setBusinessPhotos((prevImages) => prevImages.filter((image) => image.id !== id));
  }, []);
  const bossId = bossAddress?.id;

  const socialUpdate = async (id:string,type:string,ref:  RefObject<HTMLInputElement>) => {
    const data = {
            href:ref.current?.value,
            type:type
    }
    console.log(bossId);
   const response = await updateSocialLink({data,id: bossId,socialId :id}) as any;
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
    <div className="md:w-4/12 w-[100%]  border-0 p-3  md:border-l-[3px]  border-[#A8B3CF33] flex flex-col justify-between gap-y-10 items-center">
        <div className="w-[100%]">
          <h2 className=" text-[#A8B3CF] pb-2 text-sm">{t('Facebook link')}</h2>

          <div className="flex">
          <div className=" w-[100%] px-2 py-1 rounded flex justify-start items-center gap-x-2 border border-[#4e525a]">
            <SiFacebook className="text-blue-600  text-[26px]" />
            <input
              ref={facebookRef}
              type="text"
              defaultValue={bossAddress?.social_links[0].href}
              className="bg-transparent text-white border-l border-[#4e525a] p-1 w-full outline-none"
            />
             <button
            type="button"
            onClick={() => socialUpdate(bossAddress?.social_links[0].id as string,"facebook",facebookRef)}
            className="px-2 py-2 rounded-lg bg-green-800 hover:bg-green-700 disabled:bg-green-900 text-white" disabled={isLoading}
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
              defaultValue={bossAddress?.social_links[1].href}
              className="bg-transparent text-white border-l border-[#4e525a] p-1 w-full  outline-none"
            />
            <button
            type="button"
            onClick={() => socialUpdate(bossAddress?.social_links[1].id as string,"youtube",youtubeRef)}
            className="px-2 py-2 rounded-lg bg-green-800 hover:bg-green-700 disabled:bg-green-900 text-white"  disabled={isLoading}
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
              defaultValue={bossAddress?.social_links[2].href}
              className="bg-transparent text-white border-l border-[#4e525a] p-1 w-full outline-none"
            />
            <button
            type="button"
            onClick={() => socialUpdate(bossAddress?.social_links[2].id as string,"tiktok",tiktokRef)}
            className="px-2 py-2 rounded-lg bg-green-800 hover:bg-green-700 disabled:bg-green-900 text-white"  disabled={isLoading}
            >
                <AiOutlineCloudUpload />
            </button>
          </div>
        </div>
        <div className="w-[100%]">
          <div className=" w-[100%]">
            <h2 className="text-sm text-[#A8B3CF] pb-5">{t('Business Photo')}</h2>
            {/* <InputError errors={errors.business_photos} /> */}
            <div onClick={() => handleFileClick(businessPhotoInput)} className="w-[100%] mx-auto flex justify-center items-center h-[200px] bg-[#1C1F26] border border-[#A8B3CF33] rounded-lg">
              <div className=" flex justify-center items-center flex-col">
                <input
                  ref={businessPhotoInput}
                  type="file"
                  name="business_photos[]"
                  onChange={imageChange}
                  accept="image/*"
                  className="hidden"
                  multiple
                  max={4}
                />
                {businessPhotos.length == 0 ? (
                  <div onClick={() => console.log('hi')} className="flex flex-col justify-center items-center gap-y-3" >
                    <BsImageAlt className="text-[60px] text-[#A8B3CF33]" />
                    <AiOutlineCloudUpload className="text-[50px] text-[#A8B3CF33]" />
                  </div>
                ) : (
                  <img src={(businessPhotos[currentBusinessPhoto].preview)} className="w-[100vw] h-[300px] object-cover rounded-lg " />
                )}
              </div>
            </div>
            {/*  */}
            <div className="flex gap-5 w-full overflow-x-scroll  mt-4 px-5 pb-3" >
              {
                businessPhotos.map((item, index) => (
                  <div key={item.id} className="min-w-[130px] h-[130px] rounded-lg overflow-hidden relative" >
                    <img src={item.preview} onClick={() => setCurrentBusinessPhoto(index)} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(item.id)} className="bg-red-600 absolute bottom-0 right-0 px-4 py-2 text-gray-100 rounded-md text-[.9em]">
                      <ImCross />
                    </button>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
  )
}

export default EditSecondSide