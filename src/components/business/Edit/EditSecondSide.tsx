import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsImageAlt } from "react-icons/bs";
import { ImCross } from 'react-icons/im';
import { BaseSyntheticEvent, RefObject, useCallback, useRef, useState } from "react";
import { detailsType } from "../BusinessDetail";
import { Button } from "@mantine/core";

import { t } from "i18next";
import { toast } from "react-toastify";
import SocailUpdate from "./SocailUpdate";
interface ImageFile {
  id: number,
  file: File,
  preview: string
}

interface EditSecondSideProps { 
    bossAddress : detailsType
}


const EditSecondSide = ({bossAddress}  : EditSecondSideProps) => {

  const [businessPhotos, setBusinessPhotos] = useState<ImageFile[]>([]);
  
  const [currentBusinessPhoto, setCurrentBusinessPhoto] = useState<number>(0)
  const businessPhotoInput = useRef<HTMLInputElement>(null);

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
  

  return (
    <div className="md:w-4/12 w-[100%]  border-0 p-3  md:border-l-[3px]  border-[#A8B3CF33] flex flex-col justify-between gap-y-10 items-center">
        <SocailUpdate bossAddress={bossAddress}/>

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