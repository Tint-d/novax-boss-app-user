import { SiFacebook, SiTiktok, SiYoutube } from "react-icons/si";
import { FormEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsImageAlt } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import {
  useCreateBossAddressMutation,
  useCreateSocialLinkMutation,
  useGetCategoriesQuery,
  useGetCountryQuery,
} from "../../redux/api/BusinessAddressApi";
import { CategoryType, City, FormStateType } from "../../typings/type";
import Cookies from "js-cookie";
import useForm from "../../hooks/useForm";
import useInput from "../../hooks/useInput";
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPG", "PNG", "GIF"];

interface DropType {
  path: string;
  preview: string;
  name: string;
  size: number;
  type: string;
}
type FormStateType2 = {
  boss_no: string;
  boss_name: string;
  business_name: string;
  business_address: string;
  business_description: string;
  social_links: string[]; // Update the type here
  business_category_id: string;
  cover_photo: string;
  business_photos: string;
  business_logo: string;
  user_id: string;
  business_city_id: string;
  contact_numbers: string;
};

const initialState = {
  boss_no: "",
  boss_name: "",
  business_name: "",
  business_address: "",
  business_description: "",
  social_links: "",
  business_category_id: "",
  cover_photo: "",
  business_photos: [],
  business_logo: "",
  // user_id: "",
  business_city_id: "",
  contact_numbers: [""],
  suprise: "",
  vision: "",
  mission: "",
  main_product: "",
};

const BusinessForm = ({ className }: any) => {
  const [logoFiles, setLogoFiles] = useState<DropType[]>([]);
  const [profileFiles, setProfileFiles] = useState<DropType[]>([]);
  const [businessPhotoFiles, setBusinessPhotoFiles] = useState<DropType[]>([]);
  const [search] = useState("");

  const token = Cookies.get("token");
  const { data: cityList } = useGetCountryQuery();
  const citiesList = cityList?.cities.data;
  const [createBossAddress] = useCreateBossAddressMutation();

  const { changeInputHandler, input } = useInput(initialState);
  const { data } = useGetCategoriesQuery();
  const categories: undefined | CategoryType[] = data?.categories;
  const filteredCategories = categories?.filter((category) =>
    category.category_name.toLowerCase().includes(search)
  );

  // console.log(logoFiles[0]?.preview);
  console.log(businessPhotoFiles);

  const handleDrop = (
    acceptedFiles: File[],
    setFiles: React.Dispatch<React.SetStateAction<DropType[]>>
  ) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles: DropType[]) => [
        ...previousFiles,
        ...acceptedFiles.map((file: any) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  };

  const logoDropzone = useDropzone({
    onDrop: (acceptedFiles: File[]) => handleDrop(acceptedFiles, setLogoFiles),
  });

  const profileDropzone = useDropzone({
    onDrop: (acceptedFiles: File[]) =>
      handleDrop(acceptedFiles, setProfileFiles),
  });

  const businessPhotoDropzone = useDropzone({
    onDrop: (acceptedFiles: File[]) =>
      handleDrop(acceptedFiles, setBusinessPhotoFiles),
  });

  // const [createSocialLink] = useCreateSocialLinkMutation();

  const businesSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const contactNumbers = Array.isArray(input.contact_numbers)
      ? input.contact_numbers.map((item: any) => ({
          contact_no: item.contact_no,
        }))
      : [];
    const updatedInput = {
      ...input,
      boss_no: input.boss_no,
      boss_name: input.boss_name,
      business_name: input.business_name,
      business_address: input.business_address,
      business_description: input.business_description,
      social_links: input.social_links,
      business_logo: logoFiles[0]?.preview || input.business_logo,
      business_photos:
        businessPhotoFiles.map((photos) => photos.preview) ||
        input.business_photos,
      cover_photo: profileFiles[0]?.preview || input.cover_photo,
      business_city_id: input.business_city_id || (citiesList?.[0]?.id ?? ""),
      business_category_id:
        input.business_category_id || filteredCategories?.[0].id,
      contact_numbers: contactNumbers,
      main_product: mainproduct,
      mission: input.mission,
      vision: input.vision,
      suprise: input.suprise,
    };
    console.log(updatedInput);
    // console.log(input);

    const result = await createBossAddress({ data: updatedInput, token });
    console.log(result, "result");
  };

  const [mainproduct, setManiProduct] = useState("");

  return (
    // <div className=" h-full w- bg-[#] py-5 container">
    // </div>
    <form
      onSubmit={businesSubmit}
      className="relative text-sm  w-[60%] h-full my-auto bg-[#0E1217] flex flex-wrap justify-between items-center  mx-auto p-5 rounded"
    >
      <div>
        {/* {businessPhotoFiles?.map((photos: any) => (
            <img src={photos?.preview} alt="" />
          ))} */}
        {/* <img src={logoFiles[0].preview} alt="" /> */}
      </div>
      {/* onClick Function U can add to close form */}
      <RxCross1 className=" absolute top-5 right-10 text-sm text-white" />
      <div className="md:w-7/12 w-12/12  h-screen overflow-y-scroll no-scrollbar">
        <div className=" flex flex-col justify-around items-center gap-y-8 md:gap-y-5">
          <div className=" w-full">
            <h2 className="  text-center text-[#A8B3CF] pb-3">Business Logo</h2>

            <div className="w-[200px] mx-auto flex justify-center items-center h-[200px] bg-[#1C1F26] border border-[#A8B3CF33]">
              <div
                {...logoDropzone.getRootProps({ className: className })}
                className=" flex justify-center items-center flex-col"
              >
                <input
                  {...logoDropzone.getInputProps()}
                  name="business_logo"
                  value={input.business_logo} // Assuming `input.business_logo` stores the file name or URL
                  onChange={changeInputHandler} // Make sure this input is hidden or read-only
                  className=" bg-red-500 flex justify-center items-center "
                />
                {logoFiles.length === 0 ? (
                  <div className="flex flex-col justify-center items-center gap-y-3">
                    <BsImageAlt className="text-[60px] text-[#A8B3CF33]" />
                    <AiOutlineCloudUpload className="text-[50px] text-[#A8B3CF33]" />
                  </div>
                ) : (
                  <img src={logoFiles[0]?.preview} width={100} height={100} />
                )}
              </div>
            </div>
          </div>
          <div className=" w-full">
            <h2 className="  text-center text-[#A8B3CF] pb-3">
              Business Profile
            </h2>
            <div className="w-full  flex justify-center items-center h-[200px] bg-[#1C1F26] border border-[#A8B3CF33] rounded">
              <div {...profileDropzone.getRootProps({ className: className })}>
                <input
                  {...profileDropzone.getInputProps()}
                  name="cover_photo"
                  value={input.cover_photo}
                  onChange={changeInputHandler}
                />
                {profileFiles.length === 0 ? (
                  <div className="flex justify-center items-center gap-x-10">
                    <BsImageAlt className="text-[80px] text-[#A8B3CF33]" />
                    <AiOutlineCloudUpload className="text-[80px] text-[#A8B3CF33]" />
                  </div>
                ) : (
                  <img
                    src={profileFiles[0]?.preview}
                    className=" w-full h-[200px]"
                  />
                )}
              </div>
            </div>
          </div>
          {/* <div className=" mt-20"></div> */}
          <div className="md:w-full mt-5 w-full gap-y-8  flex flex-wrap justify-between items-center">
            <div className="md:w-4/12  w-[100%]">
              <h2 className=" text-[#A8B3CF] pb-2">Boss Number</h2>
              <input
                placeholder="Boss Number"
                className="bg-[#1C1F26] w-full p-2 outline-none border rounded text-white border-[#4e525a]"
                type="text"
                name="boss_no"
                value={input.boss_no}
                onChange={changeInputHandler}
              />
            </div>

            <div className="md:w-7/12 w-[100%]">
              <h2 className=" text-[#A8B3CF] pb-2">Boss Name</h2>
              <input
                placeholder="Boss Name"
                className="bg-[#1C1F26] w-full p-2 outline-none border rounded border-[#4e525a] text-white"
                type="text"
                name="boss_name"
                value={input.boss_name}
                onChange={changeInputHandler}
              />
            </div>
          </div>

          <div className="w-full">
            <h2 className=" text-[#A8B3CF] pb-2">Business Name</h2>
            <input
              name="business_name"
              value={input.business_name}
              onChange={changeInputHandler}
              placeholder="Business Name"
              className="bg-[#1C1F26] text-white w-full p-2 outline-none border rounded border-[#4e525a]"
              type="text"
            />
          </div>

          <div className="w-full">
            <h2 className=" text-[#A8B3CF] pb-2">Boss Address</h2>
            <input
              name="business_address"
              value={input.business_address}
              onChange={changeInputHandler}
              placeholder="Boss Address"
              className="bg-[#1C1F26] text-white w-full p-2 outline-none border rounded border-[#4e525a]"
              type="text"
            />
          </div>
          <div className="w-full">
            <h2 className=" text-[#A8B3CF] pb-2">Main Product</h2>
            <input
              name="main_product"
              value={mainproduct}
              onChange={(e) => setManiProduct(e.target.value)}
              placeholder="Main Product"
              className="bg-[#1C1F26] w-full text-white p-2 outline-none border rounded border-[#4e525a]"
              type="text"
            />
          </div>
          <div className="w-full">
            <h2 className=" text-[#A8B3CF] pb-2">Business Type ...</h2>
            <select
              name="business_category_id"
              value={input.business_category_id}
              onChange={changeInputHandler}
              placeholder="Business Type ..."
              className="py-3 px-5 block w-full border-[#4e525a] rounded-md  focus:border-white/50 focus:ring-black/50 bg-[#1C1F26]  text-gray-400"
            >
              {filteredCategories?.map((item: CategoryType) => {
                return (
                  <option
                    key={item?.id}
                    value={item?.category_name}
                    className=" overflow-y-auto h-full"
                  >
                    {item?.category_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-full">
            <h2 className=" text-[#A8B3CF] pb-2">City</h2>

            <select
              name="business_city_id"
              value={input.business_city_id}
              onChange={changeInputHandler}
              className="py-3 px-5 block w-full border-[#4e525a] rounded-md  focus:border-white/50 focus:ring-black/50 bg-[#1C1F26]  text-gray-400"
            >
              {citiesList?.map((city: City) => (
                <option key={city.id} value={city.id}>
                  {city.city_name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <h2 className=" text-[#A8B3CF] pb-2">Contact Number</h2>
            <input
              name="contact_numbers"
              value={input.contact_numbers[0].contact_no}
              onChange={changeInputHandler}
              placeholder="Contact Number"
              className="bg-[#1C1F26] text-white w-full p-2 outline-none border rounded border-[#4e525a]"
              type="text"
            />
          </div>
          <div className="w-full">
            <h2 className=" text-[#A8B3CF] pb-2">Business Address</h2>
            <textarea
              name="business_address"
              value={input.business_address}
              onChange={changeInputHandler}
              className="bg-[#1C1F26] text-white h-[150px] w-full p-2 outline-none border rounded border-[#4e525a]"
            />
          </div>
          <div className="w-full">
            <h2 className=" text-[#A8B3CF] pb-2">Business Description</h2>
            <textarea
              name="business_description"
              value={input.business_description}
              onChange={changeInputHandler}
              className="bg-[#1C1F26] text-white h-[150px] w-full p-2 outline-none border rounded border-[#4e525a]"
            />
          </div>
          <div className="w-full">
            <h2 className=" text-[#A8B3CF] pb-2">Vision</h2>
            <textarea
              name="vision"
              value={input.vision}
              onChange={changeInputHandler}
              className="bg-[#1C1F26] text-white h-[150px] w-full p-2 outline-none border rounded border-[#4e525a]"
            />
          </div>
          <div className="w-full">
            <h2 className=" text-[#A8B3CF] pb-2">Mission</h2>
            <textarea
              name="mission"
              value={input.mission}
              onChange={changeInputHandler}
              className="bg-[#1C1F26] text-white h-[150px] w-full p-2 outline-none border rounded border-[#4e525a]"
            />
          </div>
          <div className="w-full">
            <h2 className=" text-[#A8B3CF] pb-2">
              What boss teams surprise you?
            </h2>
            <textarea
              name="suprise"
              value={input.suprise}
              onChange={changeInputHandler}
              className="bg-[#1C1F26] text-white h-[150px] w-full p-2 outline-none border rounded border-[#4e525a]"
            />
          </div>
        </div>
      </div>
      <div className="md:w-4/12 w-[100%] border-0  md:border-l-[3px] ps-0 md:ps-5 border-[#A8B3CF33] flex flex-col justify-between gap-y-10 items-center">
        <div className="w-[100%]">
          <h2 className=" text-[#A8B3CF] pb-2 text-sm">FaceBook Url</h2>
          <div className="md:w-[70%] w-[100%] px-2 py-1 rounded flex justify-start items-center gap-x-2 border border-[#4e525a]">
            <SiFacebook className="text-blue-600  text-[24px]" />
            <input
              name="social_links[0]"
              value={input.social_links[0]}
              onChange={changeInputHandler}
              type="text"
              className="bg-transparent text-white border-l border-[#4e525a] p-1  outline-none"
            />
          </div>
        </div>

        <div className="w-[100%]">
          <h2 className="text-sm text-[#A8B3CF] pb-2">YouTube Url</h2>
          <div className="md:w-[70%] w-[100%] px-2 py-1 rounded flex justify-start items-center gap-x-2 border border-[#4e525a]">
            <SiYoutube className="text-red-600  text-[24px]" />
            <input
              name="social_links[1]"
              value={input.social_links[1]}
              onChange={changeInputHandler}
              type="text"
              className="bg-transparent text-white border-l border-[#4e525a] p-1  outline-none"
            />
          </div>
        </div>
        <div className="w-[100%]">
          <h2 className="text-sm text-[#A8B3CF] pb-2">Titok Url</h2>
          <div className="md:w-[70%] w-[100%] px-2 py-1 rounded flex justify-start items-center gap-x-2 border border-[#4e525a]">
            <SiTiktok className="text-white/70  text-[24px]" />
            <input
              name="social_links[2]"
              value={input.social_links[2]}
              onChange={changeInputHandler}
              type="text"
              className="bg-transparent text-white border-l border-[#4e525a] p-1  outline-none"
            />
          </div>
        </div>
        <div className="w-[100%]">
          <div className=" w-[100%]">
            <h2 className="text-sm text-[#A8B3CF] pb-2">Business Photo</h2>
            <div className="w-[100%]  flex justify-center items-center h-[200px] bg-[#1C1F26] border border-[#A8B3CF33]">
              <div
                {...businessPhotoDropzone.getRootProps({
                  className: className,
                })}
              >
                <input
                  {...businessPhotoDropzone.getInputProps()}
                  name="business_photos"
                  value={input.business_photos}
                  onChange={changeInputHandler}
                />
                {businessPhotoFiles.length === 0 ? (
                  <div className="flex justify-center items-center h-32">
                    <BsImageAlt className="text-[80px] text-[#A8B3CF33]" />
                    <AiOutlineCloudUpload className="text-[80px] text-[#A8B3CF33]" />
                  </div>
                ) : (
                  <div className=" h-56 flex flex-wrap  gap-3 justify-center items-center">
                    {businessPhotoFiles?.map((business, index) => (
                      <img
                        key={index}
                        src={business.preview}
                        className=" w-14 flex flex-wrap gap-3 h-14 justify-start object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* <div className="w-[100%] bg-[#1C1F26] mt-2 h-[100px] border border-[#A8B3CF33]">
                To Place image
              </div> */}
          </div>
        </div>
        <button
          type="submit"
          className=" text-white w-[200px] rounded text-[24px]  py-1 bg-[#00FF47]"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default BusinessForm;
