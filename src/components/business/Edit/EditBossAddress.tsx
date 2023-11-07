import { SiFacebook, SiTiktok, SiYoutube } from "react-icons/si";
import { BaseSyntheticEvent, ChangeEvent, RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsImageAlt } from "react-icons/bs";
import {
  useGetCategoriesQuery,
  useGetCountryQuery,
  useUpdateBossAddressMainMutation,
} from "../../../redux/api/BusinessAddressApi";
import { ImCross } from 'react-icons/im';
import { Button, Select } from "@mantine/core";
import { BossAddressValidationSchema } from '../validations/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from "../InputField";
import { useForm } from "react-hook-form";
import InputError from "../../ui/Errors/InputError";
import { toast } from "react-toastify";
import { t } from "i18next";
import { useAppSelector } from "@/redux/hook";
import { selectProfile } from "@/redux/services/businessSlice";
import { detailsType } from "../BusinessDetail";

interface socialLink {
  type: string, 
  href: string
}

export interface BossEditMainData {
  boss_no: string,
  boss_name: string,
  business_name: string,
  main_product: string,
  business_address: string,
  contact_numbers: string[],
  business_description: string,
  vision: string,
  mission: string,
  business_suprise: string,
  social_links: socialLink[],
  business_logo: File,
  cover_photo: File,
  business_photos: File[],
  business_type: number,
  city: number,
  business_category_id: number,
  business_city_id: number,
  business_goal : string,
  core_value : string,
}

interface ImageFile {
  id: number,
  file: File,
  preview: string
}


const EditBossAddress = () => {
  const [updateBossAddressMain, { isLoading }] = useUpdateBossAddressMainMutation();

  const user = useAppSelector(selectProfile);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bossAddress = user?.boss_address as detailsType;

  const [logoPreviewImage, setLogoPreviewImage] = useState<string[]>([]);
  const [profilePreviewImage, setProfilePreviewImage] = useState<string[]>([]);
  const [businessPhotos, setBusinessPhotos] = useState<ImageFile[]>([]);

  const [currentBusinessPhoto, setCurrentBusinessPhoto] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>(1);
  const [cityId, setCityId] = useState<number>(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
  } = useForm<BossEditMainData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(BossAddressValidationSchema) as any,
    defaultValues : { 
      boss_name : bossAddress?.boss_name,
    }
  });



  const logoInput = useRef<HTMLInputElement>(null);
  const profileInput = useRef<HTMLInputElement>(null);
  const businessPhotoInput = useRef<HTMLInputElement>(null);

  const cities = useGetCountryQuery();
  const citiesList = useMemo(() => cities.data?.cities?.data, [cities.data])
  const cata = useGetCategoriesQuery();
  const categories = useMemo(() => cata.data?.categories, [cata.data]);

  useEffect(() => {
    setCityId(bossAddress?.city?.id as number)
    setCategoryId(bossAddress?.categories?.id as number)
    setValue('boss_no', bossAddress?.boss_no)
  }, [bossAddress, setValue])

  const fileChanged = (e: ChangeEvent<HTMLInputElement>, setFiles: React.Dispatch<React.SetStateAction<string[]>>, state: string[]) => {
    const files = Array.from(e.target.files || []);
    console.log('state', state.length)
    if (files.length + state.length < 5) {
      files.forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
          setFiles((prevFiles) => [...prevFiles, URL.createObjectURL(file) as string]);
        };
        reader.readAsDataURL(file);
      });
    }
    else {
      alert('Maximum 4 photos are allowed')
    }
  };

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

  const onSubmit = async (data: BossEditMainData) => {
    const formData = new FormData();

    if (logoPreviewImage.length > 0) {
    data['business_logo'] = logoInput.current?.files?.[0] as File;
    formData.append('business_logo', data.business_logo);
      
    }
    if (profilePreviewImage.length > 0) {
    data['cover_photo'] = profileInput.current?.files?.[0] as File;
    formData.append('cover_photo', data.cover_photo);
      
    }

    data['business_category_id'] = categoryId;
    data['business_city_id'] = cityId;
    // wrap wiht fromdata
    if(data.boss_no !== bossAddress?.boss_no){
    formData.append('boss_no', data.boss_no);
    }
    formData.append('boss_name', data.boss_name);
    formData.append('business_name', data.business_name);
    formData.append('main_product', data.main_product);
    formData.append('business_address', data.business_address);
    formData.append('boss_address_id', bossAddress?.id.toString());
    // const contact_numbers = data.contact_numbers;
    // contact_numbers.forEach((number, index) => {
    //   formData.append(`social_links[${index}][contact_no]`, number);

    // });
    formData.append('business_description', data.business_description);
    formData.append('business_goal', data.business_goal);
    formData.append('core_value', data.core_value);
    formData.append('vision', data.vision);
    formData.append('mission', data.mission);
    formData.append('business_suprise', data.business_suprise);
    formData.append('business_category_id', categoryId.toString());
    formData.append('business_city_id', cityId.toString());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await updateBossAddressMain({data :  formData,id : bossAddress?.id}) as any;
    if (response.error) {
      toast.error(response.error.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }

    if (response.data.success) {
      toast.success("Boss Address Updated", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      // navigate('/')
    }

  }

  const localstorageLanguage: string = localStorage.getItem('language') || 'en';


  return (
    bossAddress && (
      <form
      onSubmit={handleSubmit(onSubmit)}
      className=" text-sm md:w-[700px] w-[355px] pb-10  sm:w-[400px] md:p-0  p-19  lg:w-[975px] mt-[20px] h-full my-auto bg-[#0E1217] flex flex-wrap justify-between items-center  mx-auto  rounded"
    >
      <div></div>
      <div className="md:w-7/12 w-12/12 px-3 py-2  h-screen overflow-y-scroll no-scrollbar">
        <div className=" flex flex-col justify-around items-center gap-y-8 md:gap-y-5">
          <div className=" w-full">
            <h2 className="  text-center text-[#A8B3CF] pb-3">{t('Business Logo')}</h2>
            <div onClick={() => handleFileClick(logoInput)} className="w-[200px] mx-auto flex justify-center items-center h-[200px] bg-[#1C1F26] border border-[#A8B3CF33] rounded-lg">
              <div

                className=" flex justify-center items-center flex-col"
              >
                <input
                  ref={logoInput}
                  type="file"
                  name="business_logo"
                  onChange={(e) => fileChanged(e, setLogoPreviewImage, logoPreviewImage)}
                  accept="image/*"
                  className="hidden"
                />
                {logoPreviewImage.length == 0 ? (
                  <img src={bossAddress?.business_logo} className="w-[200px] h-[200px] object-cover rounded-lg" />
                ) : (
                  <img src={logoPreviewImage[logoPreviewImage.length - 1]} className="w-[200px] h-[200px] object-cover rounded-lg" />
                )}
              </div>

            </div>
            <InputError errors={errors.business_logo} />

          </div>

          <div className=" w-full">
            <h2 className="  text-center text-[#A8B3CF] pb-3">
              {t('Business Cover Photo')} <span className="text-[.9em] text-gray-600">( Recommand 1280px x 540px )</span>
            </h2>

            <div onClick={() => handleFileClick(profileInput)} className="w-[100%] mx-auto flex justify-center items-center h-[300px] bg-[#1C1F26] border border-[#A8B3CF33] rounded-lg">
              <div
                className=" flex justify-center items-center flex-col"
              >
                <input
                  ref={profileInput}
                  type="file"
                  name="cover_photo"
                  onChange={(e) => fileChanged(e, setProfilePreviewImage, profilePreviewImage)}
                  accept="image/*"
                  className="hidden"
                />
                {profilePreviewImage.length == 0 ? (
                  <img src={bossAddress?.cover_photo} className="w-[100vw] h-[300px] object-cover rounded-lg" />

                ) : (
                  <img src={profilePreviewImage[profilePreviewImage.length - 1]} className="w-[100vw] h-[300px] object-fill rounded-lg " />
                )}
              </div>
            </div>
            <InputError errors={errors.cover_photo} />

          </div>
          {/* <div className=" mt-20"></div> */}
          <div className="md:w-full mt-5 w-full gap-y-8  flex flex-wrap justify-between items-center">
            <div className="md:w-4/12  w-[100%]">
              <InputField type="text" label="Boss Number" register={register} errors={errors.boss_no}
                placeholder="Boss Number" register_name="boss_no" initialValue={bossAddress?.boss_no} />
            </div>

            <div className="md:w-7/12 w-[100%]">
              <InputField type="text" label="Boss Name" register={register} errors={errors.boss_name}
                placeholder="Boss Name" register_name="boss_name" initialValue={bossAddress?.boss_name} />
            </div>
          </div>

          <div className="w-full">
            <InputField type="text" label="Business Name" register={register} errors={errors.business_name}
              placeholder="Business Name" register_name="business_name" initialValue={bossAddress?.business_name} />
          </div>
          <div className="w-full">
            <InputField type="text" label="Main Product" register={register} errors={errors.main_product}
              placeholder="Main Product" register_name="main_product" initialValue={bossAddress?.main_product} />
          </div>
          {
           ( !isLoading && bossAddress?.categories?.id )&& 
            <div className="w-full">
            <h2 className=" text-[#A8B3CF] pb-2">{t('Business Type')} ...</h2>
            <Select
              styles={{
                dropdown: {
                  backgroundColor: "#1C1F26",
                  color: "#fff",
                },
                label: {
                  color: "white",
                },
                input: {
                  borderColor: "#A8B3CF33",
                  backgroundColor: "#0E1217",
                  color: "#fff",
                },
                item: {
                  color: "white",
                  "&[data-selected]": {
                    "&, &:hover": {
                      backgroundColor: "#0E121722",
                      color: "#A8B3CF",
                    },
                  },
                  "&[data-hovered]": {
                    backgroundColor: "#0E121766",
                    color: "#A8B3CF",
                  },
                },
              }}
              placeholder="Choose Business Type"
              data={
                categories
                  ? categories?.map((item: any) => {
                    return {
                      value: item?.id,
                      label: localstorageLanguage == "en" ? item?.category_name : item?.category_mm_name,
                    };
                  })
                  : []
              }
              defaultValue={bossAddress?.categories?.id as unknown as string}
              onChange={(e) => setCategoryId(e as unknown as number)}
              dropdownPosition="bottom"
              searchable
            />
          </div>
          }
          {
            (!isLoading && bossAddress?.city?.id) &&     <div className="w-full">
            <h2 className=" text-[#A8B3CF] pb-2">{t('City')}</h2>
            <Select
              styles={{
                dropdown: {
                  backgroundColor: "#1C1F26",
                  color: "#fff",
                },
                label: {
                  color: "white",
                },
                input: {
                  borderColor: "#A8B3CF33",
                  backgroundColor: "#0E1217",
                  color: "#fff",
                },
                item: {
                  color: "white",
                  "&[data-selected]": {
                    "&, &:hover": {
                      backgroundColor: "#0E121722",
                      color: "#A8B3CF",
                    },
                  },
                  "&[data-hovered]": {
                    backgroundColor: "#0E121766",
                    color: "#A8B3CF",
                  },
                },
              }}
              placeholder="Choose City"
              data={
                citiesList
                  ? citiesList?.map((item: any) => {
                    return {
                      value: item?.id,
                      label: localstorageLanguage == "en" ? item?.city_name : item?.city_mm_name,
                      selected: item?.id == bossAddress?.city?.id
                    };
                  })
                  : []
              }
              dropdownPosition="bottom"
              onChange={(e) => setCityId(e as unknown as number)}
              searchable
              defaultValue={bossAddress?.city?.id as unknown as string}
            />
          </div>
          }
         
      
          <div className="w-full">
            <InputField type="text" label="Contact Number" register={register} errors={errors.contact_numbers} initialValue={bossAddress?.business_address}
              placeholder="Contact Number" register_name="contact_numbers[0]" />
          </div>
          <div className="w-full">
            <h2 className=" text-[#A8B3CF] pb-2">{t('Business Address')}</h2>
            <textarea
              {...register("business_address")}
              className="bg-[#1C1F26] text-white h-[150px] w-full p-2 outline-none border rounded border-[#4e525a]" defaultValue={bossAddress?.business_address}
            />
            <InputError errors={errors.business_address} />
          </div>
          <div className="w-full">
            <h2 className=" text-[#A8B3CF] pb-2">{t('Business Description')}</h2>
            <textarea
              {...register("business_description")}
              className="bg-[#1C1F26] text-white h-[150px] w-full p-2 outline-none border rounded border-[#4e525a]" defaultValue={bossAddress?.business_address}
            />
            <InputError errors={errors.business_address} />

          </div>

          <div className="w-full">
            <h2 className=" text-[#A8B3CF] pb-2">{t('Business Goal')}</h2>
            <textarea
              {...register("business_goal")}
              className="bg-[#1C1F26] text-white h-[150px] w-full p-2 outline-none border rounded border-[#4e525a]"
              defaultValue={bossAddress?.business_goal}

            />
          </div>

          <div className="w-full">
            <h2 className=" text-[#A8B3CF] pb-2">{t('Core Value')}</h2>
            <textarea
              {...register("core_value")}
              className="bg-[#1C1F26] text-white h-[150px] w-full p-2 outline-none border rounded border-[#4e525a]"
              defaultValue={bossAddress?.core_value}
            />
          </div>


          <div className="w-full">
            <h2 className=" text-[#A8B3CF] pb-2">{t('Vision')}</h2>
            <textarea
              {...register("vision")}
              className="bg-[#1C1F26] text-white h-[150px] w-full p-2 outline-none border rounded border-[#4e525a]" defaultValue={bossAddress?.vision}
            />
          </div>
          <div className="w-full">
            <h2 className=" text-[#A8B3CF] pb-2">{t('Mission')}</h2>
            <textarea
              {...register("mission")}
              className="bg-[#1C1F26] text-white h-[150px] w-full p-2 outline-none border rounded border-[#4e525a]" defaultValue={bossAddress?.mission}
            />
          </div>
          <div className="w-full">
            <h2 className=" text-[#A8B3CF] pb-2">
              {t('What boss teams surprise you?')}
            </h2>
            <textarea
              {...register("business_suprise")}
              className="bg-[#1C1F26] text-white h-[150px] w-full p-2 outline-none border rounded border-[#4e525a]" defaultValue={bossAddress?.business_suprise}
            />
          </div>
        </div>
      </div>
      <div className="md:w-4/12 w-[100%]  border-0 p-3  md:border-l-[3px]  border-[#A8B3CF33] flex flex-col justify-between gap-y-10 items-center">
        <div className="w-[100%]">
          <h2 className=" text-[#A8B3CF] pb-2 text-sm">{t('Facebook link')}</h2>
          <div className=" w-[100%] ps-1 py-1 rounded flex justify-start items-center gap-x-2 border border-[#4e525a]">
            <SiFacebook className="text-blue-600  text-[26px]" />
            <input
              {...register("social_links.0")}
              type="text"
              value={bossAddress?.social_links[0].href}
              className="bg-transparent text-white border-l border-[#4e525a] p-1 w-full outline-none"
            />
          </div>
        </div>

        <div className="w-[100%]">
          <h2 className="text-sm text-[#A8B3CF] pb-2">{t('Youtube link')}</h2>
          <div className=" w-[100%] ps-1 py-1 rounded flex justify-start items-center gap-x-2 border border-[#4e525a]">
            <SiYoutube className="text-red-600  text-[28px]" />
            <input
              {...register("social_links.1")}
              type="text"
              value={bossAddress?.social_links[1].href}
              className="bg-transparent text-white border-l border-[#4e525a] p-1 w-full  outline-none"
            />
          </div>
        </div>
        <div className="w-[100%]">
          <h2 className="text-sm text-[#A8B3CF] pb-2">{t('Tiktok link')}</h2>
          <div className=" w-[100%] ps-1 py-1 rounded flex justify-start items-center gap-x-2 border border-[#4e525a]">
            <SiTiktok className="text-white/70  text-[26px]" />
            <input
              {...register("social_links.2")}
              type="text"
              value={bossAddress?.social_links[2].href}
              className="bg-transparent text-white border-l border-[#4e525a] p-1 w-full outline-none"
            />
          </div>
        </div>
        <div className="w-[100%]">
          <div className=" w-[100%]">
            <h2 className="text-sm text-[#A8B3CF] pb-5">{t('Business Photo')}</h2>
            <InputError errors={errors.business_photos} />
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

        <div className="flex justify-center w-full mt-0">
          <Button
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "10px 80px",
            }}
            size="lg"
            loading={isLoading}
            type="submit"
            variant="filled" color="green">{t('Save')}</Button>
        </div>
      </div>
    </form>
    )
    
  );
};

export default EditBossAddress;
