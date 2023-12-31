import { SiFacebook, SiTiktok, SiYoutube } from "react-icons/si";
import { FormEvent, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsImageAlt } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import {
  //   useCreateBossAddressMutation,
  useGetCategoriesQuery,
  useGetCountryQuery,
} from "../../redux/api/BusinessAddressApi";
import { Select } from "@mantine/core";
import "./business.css";
import { CategoryType, City } from "../../typings/type";
// import Cookies from "js-cookie";
import useInput from "../../hooks/useInput";

interface DropType {
  path: string;
  preview: string;
  name: string;
  size: number;
  type: string;
}

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

const BusinessEdit = ({ className }: any) => {
  const [logoFiles, setLogoFiles] = useState<DropType[]>([]);
  const [profileFiles, setProfileFiles] = useState<DropType[]>([]);
  const [businessPhotoFiles, setBusinessPhotoFiles] = useState<DropType[]>([]);
  const [mainImage, setMainImage] = useState<number>(0);
  //   const token = Cookies.get("token");
  const { data: cityList } = useGetCountryQuery();
  const citiesList = cityList?.cities?.data;
  console.log(citiesList, "city");
  //   const [createBossAddress] = useCreateBossAddressMutation();

  const { changeInputHandler, input } = useInput(initialState);
  const { data } = useGetCategoriesQuery();
  const categories: undefined | CategoryType[] = data?.categories;

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
  };

  return (
    <form
      onSubmit={businesSubmit}
      className="relative text-sm md:w-[700px] w-[355px]  sm:w-[400px] md:p-0  p-19  lg:w-[975px] mt-[20px] h-full my-auto bg-[#0E1217] flex flex-wrap justify-between items-center  mx-auto  rounded"
    >
      <div></div>
      <RxCross1 className=" absolute top-5 right-10 text-sm text-white" />
      <div className="md:w-7/12 w-12/12 px-3 py-2  h-screen overflow-y-scroll no-scrollbar">
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
                  value={input.business_logo}
                  onChange={changeInputHandler}
                  className=" bg-red-500 flex justify-center items-center "
                />
                {logoFiles.length === 0 ? (
                  <div className="flex flex-col justify-center items-center gap-y-3">
                    <BsImageAlt className="text-[60px] text-[#A8B3CF33]" />
                    <AiOutlineCloudUpload className="text-[50px] text-[#A8B3CF33]" />
                  </div>
                ) : (
                  <img src={logoFiles[0]?.preview} className="w-full" />
                )}
              </div>
            </div>
          </div>
          <div className=" w-full">
            <h2 className="  text-center text-[#A8B3CF] pb-3">
              Business Profile
            </h2>
            <div
              className={`
              ${profileFiles.length !== 0 ? " bg-transparent border-0" : ""}
              w-full  flex justify-center items-center h-[200px] bg-[#1C1F26] border border-[#A8B3CF33] rounded`}
            >
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
                    className=" w-full h-[200px] object-cover"
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
              value={input.main_product}
              onChange={changeInputHandler}
              placeholder="Main Product"
              className="bg-[#1C1F26] w-full text-white p-2 outline-none border rounded border-[#4e525a]"
              type="text"
            />
          </div>
          <div className="w-full">
            <h2 className=" text-[#A8B3CF] pb-2">Business Type ...</h2>

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
                  ? categories?.map((item: CategoryType) => item?.category_name)
                  : []
              }
              dropdownPosition="bottom"
              searchable
            />
          </div>
          <div className="w-full">
            <h2 className=" text-[#A8B3CF] pb-2">City</h2>
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
                  ? citiesList?.map((item: City) => item?.city_name)
                  : []
              }
              dropdownPosition="bottom"
              searchable
              autoComplete="nope"
            />
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
      <div className="md:w-4/12 w-[100%]  border-0 p-3  md:border-l-[3px]  border-[#A8B3CF33] flex flex-col justify-between gap-y-10 items-center">
        <div className="w-[100%]">
          <h2 className=" text-[#A8B3CF] pb-2 text-sm">FaceBook Url</h2>
          <div className=" w-[100%] ps-1 py-1 rounded flex justify-start items-center gap-x-2 border border-[#4e525a]">
            <SiFacebook className="text-blue-600  text-[26px]" />
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
          <div className=" w-[100%] ps-1 py-1 rounded flex justify-start items-center gap-x-2 border border-[#4e525a]">
            <SiYoutube className="text-red-600  text-[28px]" />
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
          <div className=" w-[100%] ps-1 py-1 rounded flex justify-start items-center gap-x-2 border border-[#4e525a]">
            <SiTiktok className="text-white/70  text-[26px]" />
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
            <h2 className="text-sm text-[#A8B3CF] pb-5">Business Photo</h2>
            <div className="w-[100%]  flex-col flex justify-center items-center h-[280px] bg-[#1C1F26] border border-[#A8B3CF33]">
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
                  // <div className=" h-56 flex flex-wrap  gap-3 justify-center items-center">
                  //   {businessPhotoFiles?.map((business, index) => (
                  //     <img
                  //       key={index}
                  //       src={business.preview}
                  //       className=" w-14 flex flex-wrap gap-3 h-14 justify-start object-cover"
                  //     />
                  //   ))}
                  // </div>
                  <div className="w-[100%] flex flex-col">
                    <div>
                      <img
                        src={businessPhotoFiles[mainImage]?.preview}
                        className="w-full object-contain h-[200px]"
                        alt=""
                      />
                    </div>
                  </div>
                )}
              </div>
              {businessPhotoFiles.length !== 0 && (
                <div className="flex gap-1 justify-center items-center">
                  {businessPhotoFiles.length > 0 && (
                    <img
                      onClick={() => setMainImage(0)}
                      src={businessPhotoFiles[0]?.preview}
                      className="w-[70px] h-[70px] object-contain border border-white/30"
                      alt=""
                    />
                  )}
                  {businessPhotoFiles.length > 1 && (
                    <img
                      onClick={() => setMainImage(1)}
                      src={businessPhotoFiles[1]?.preview}
                      className="w-[70px] h-[70px] object-contain border border-white/30"
                      alt=""
                    />
                  )}
                  {businessPhotoFiles.length > 2 && (
                    <img
                      onClick={() => setMainImage(2)}
                      src={businessPhotoFiles[2]?.preview}
                      className="w-[70px] h-[70px] object-contain border border-white/30"
                      alt=""
                    />
                  )}
                  {businessPhotoFiles.length > 3 && (
                    <img
                      onClick={() => setMainImage(3)}
                      src={businessPhotoFiles[3]?.preview}
                      className="w-[70px] h-[70px] object-contain border border-white/30"
                      alt=""
                    />
                  )}
                </div>
              )}
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

export default BusinessEdit;
