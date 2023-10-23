// import { AiOutlinePlus } from "react-icons/ai";
import { SiFacebook, SiTiktok, SiYoutube } from "react-icons/si";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsImageAlt } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
const BusinessForm = ({ className }) => {
  const [files, setFiles] = useState();
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      return setFiles((previousFiles): any => [
        previousFiles,
        ...acceptedFiles?.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  console.log(files);

  return (
    <div className="relative w-[95%] bg-[#0E1217] flex flex-wrap justify-between items-center  mx-auto p-5">
      {/* onClick Function U can add to close form */}
      <RxCross1 className=" absolute top-5 right-10 text-2xl text-white" />
      <div className="md:w-7/12 w-12/12  h-screen overflow-y-scroll no-scrollbar">
        <div className=" flex flex-col justify-around items-center gap-y-8 md:gap-y-5">
          <div className=" w-full">
            <h2 className=" text-lg text-center text-[#A8B3CF] pb-3">
              Business Logo
            </h2>
            <div className="w-[200px] mx-auto flex justify-center items-center h-[200px] bg-[#1C1F26] border border-[#A8B3CF33]">
              <div {...getRootProps({ className: className })}>
                <input {...getInputProps()} />
                {!isDragActive ? (
                  <div className="flex flex-col justify-center items-center gap-y-3">
                    <BsImageAlt className="text-[60px] text-[#A8B3CF33]" />
                    <AiOutlineCloudUpload className="text-[50px] text-[#A8B3CF33]" />
                  </div>
                ) : (
                  <img src={files?.preview} width={100} height={100} />
                )}
              </div>
              {/* <ul>
              {files?.map((file, index) => (
                <li key={index}>
                  <img src={file?.preview} width={100} height={100} />
                </li>
              ))}
            </ul> */}
            </div>
          </div>
          <div className=" w-full">
            <h2 className=" text-lg text-center text-[#A8B3CF] pb-3">
              Business Profile
            </h2>
            <div className="w-[100%]  flex justify-center items-center h-[200px] bg-[#1C1F26] border border-[#A8B3CF33]">
              <div {...getRootProps({ className: className })}>
                <input {...getInputProps()} />
                {!isDragActive ? (
                  <div className="flex  justify-center items-center gap-x-10">
                    <BsImageAlt className="text-[80px] text-[#A8B3CF33]" />
                    <AiOutlineCloudUpload className="text-[80px] text-[#A8B3CF33]" />
                  </div>
                ) : (
                  <img src={files?.preview} width={"100%"} height={200} />
                )}
              </div>
            </div>
          </div>
          <div className="md:w-full w-full gap-y-8  flex flex-wrap justify-between items-center">
            <div className="md:w-4/12  w-[100%]">
              <h2 className="text-lg text-[#A8B3CF] pb-2">Boss Number</h2>
              <input
                placeholder="Boss Number"
                className="bg-[#1C1F26] w-full p-2 outline-none border rounded border-[#4e525a]"
                type="text"
              />
            </div>
            <div className="md:w-7/12 w-[100%]">
              <h2 className="text-lg text-[#A8B3CF] pb-2">Boss Name</h2>
              <input
                placeholder="Boss Name"
                className="bg-[#1C1F26] w-full p-2 outline-none border rounded border-[#4e525a]"
                type="text"
              />
            </div>
          </div>
          <div className="w-full">
            <h2 className="text-lg text-[#A8B3CF] pb-2">Boss Address</h2>
            <input
              placeholder="Boss Address"
              className="bg-[#1C1F26] w-full p-2 outline-none border rounded border-[#4e525a]"
              type="text"
            />
          </div>
          <div className="w-full">
            <h2 className="text-lg text-[#A8B3CF] pb-2">Main Product</h2>
            <input
              placeholder="Main Product"
              className="bg-[#1C1F26] w-full p-2 outline-none border rounded border-[#4e525a]"
              type="text"
            />
          </div>
          <div className="w-full">
            <h2 className="text-lg text-[#A8B3CF] pb-2">Business Type ...</h2>

            <select className="py-3 px-5 block w-full border-[#4e525a] rounded-md  focus:border-white/50 focus:ring-black/50 bg-[#1C1F26]  text-gray-400">
              <option className="text-[16px] py-3 text-[#A8BCF]" selected>
                Business Type
              </option>
              <option className="text-[16px] py-3 text-[#A8BCF]"> 1</option>
              <option className="text-[16px] py-3 text-[#A8BCF]">2</option>
              <option className="text-[16px] py-3 text-[#A8BCF]">3</option>
            </select>
          </div>
          <div className="w-full">
            <h2 className="text-lg text-[#A8B3CF] pb-2">City</h2>

            <select className="py-3 px-5 block w-full border-[#4e525a] rounded-md  focus:border-white/50 focus:ring-black/50 bg-[#1C1F26]  text-gray-400">
              <option className="text-[16px] py-3 text-[#A8BCF]" selected>
                Choose City...
              </option>
              <option className="text-[16px] py-3 text-[#A8BCF]"> 1</option>
              <option className="text-[16px] py-3 text-[#A8BCF]">2</option>
              <option className="text-[16px] py-3 text-[#A8BCF]">3</option>
            </select>
          </div>
          <div className="w-full">
            <h2 className="text-lg text-[#A8B3CF] pb-2">Contact Number</h2>
            <input
              placeholder="Contact Number"
              className="bg-[#1C1F26] w-full p-2 outline-none border rounded border-[#4e525a]"
              type="text"
            />
          </div>
          <div className="w-full">
            <h2 className="text-lg text-[#A8B3CF] pb-2">Business Address</h2>
            <textarea className="bg-[#1C1F26] h-[150px] w-full p-2 outline-none border rounded border-[#4e525a]" />
          </div>
          <div className="w-full">
            <h2 className="text-lg text-[#A8B3CF] pb-2">
              Business Description
            </h2>
            <textarea className="bg-[#1C1F26] h-[150px] w-full p-2 outline-none border rounded border-[#4e525a]" />
          </div>
          <div className="w-full">
            <h2 className="text-lg text-[#A8B3CF] pb-2">Vision</h2>
            <textarea className="bg-[#1C1F26] h-[150px] w-full p-2 outline-none border rounded border-[#4e525a]" />
          </div>
          <div className="w-full">
            <h2 className="text-lg text-[#A8B3CF] pb-2">Mission</h2>
            <textarea className="bg-[#1C1F26] h-[150px] w-full p-2 outline-none border rounded border-[#4e525a]" />
          </div>
          <div className="w-full">
            <h2 className="text-lg text-[#A8B3CF] pb-2">
              What boss teams surprise you?
            </h2>
            <textarea className="bg-[#1C1F26] h-[150px] w-full p-2 outline-none border rounded border-[#4e525a]" />
          </div>
        </div>
      </div>
      <div className="md:w-4/12 w-[100%] border-0  md:border-l-[3px] ps-0 md:ps-5 border-[#A8B3CF33] flex flex-col justify-between gap-y-10 items-center">
        <div className="w-[100%]">
          <h2 className="text-lg text-[#A8B3CF] pb-2">FaceBook Url</h2>
          <div className="md:w-[70%] w-[100%] px-2 py-1 rounded flex justify-start items-center gap-x-2 border border-[#4e525a]">
            <SiFacebook className="text-blue-600  text-[24px]" />
            <input
              type="text"
              className="bg-transparent text-white border-l border-[#4e525a] p-1  outline-none"
            />
          </div>
        </div>

        <div className="w-[100%]">
          <h2 className="text-lg text-[#A8B3CF] pb-2">YouTube Url</h2>
          <div className="md:w-[70%] w-[100%] px-2 py-1 rounded flex justify-start items-center gap-x-2 border border-[#4e525a]">
            <SiYoutube className="text-red-600  text-[24px]" />
            <input
              type="text"
              className="bg-transparent text-white border-l border-[#4e525a] p-1  outline-none"
            />
          </div>
        </div>
        <div className="w-[100%]">
          <h2 className="text-lg text-[#A8B3CF] pb-2">Titok Url</h2>
          <div className="md:w-[70%] w-[100%] px-2 py-1 rounded flex justify-start items-center gap-x-2 border border-[#4e525a]">
            <SiTiktok className="text-white/70  text-[24px]" />
            <input
              type="text"
              className="bg-transparent text-white border-l border-[#4e525a] p-1  outline-none"
            />
          </div>
        </div>
        <div className="w-[100%]">
          <div className=" w-[100%]">
            <h2 className="text-lg text-[#A8B3CF] pb-2">Business Photo</h2>
            <div className="w-[100%]  flex justify-center items-center h-[200px] bg-[#1C1F26] border border-[#A8B3CF33]">
              <div {...getRootProps({ className: className })}>
                <input {...getInputProps()} />
                <div className="flex  justify-center items-center gap-x-10">
                  <BsImageAlt className="text-[80px] text-[#A8B3CF33]" />
                  <AiOutlineCloudUpload className="text-[80px] text-[#A8B3CF33]" />
                </div>
              </div>
            </div>
            <div className="w-[100%] bg-[#1C1F26] mt-2 h-[100px] border border-[#A8B3CF33]">
              {/* To Place image */}
            </div>
          </div>
        </div>
        <button className=" text-white w-[200px] rounded text-[24px]  py-1 bg-[#00FF47]">
          Save
        </button>
      </div>
    </div>
  );
};

export default BusinessForm;
