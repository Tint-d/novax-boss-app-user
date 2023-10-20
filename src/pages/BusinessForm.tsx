import { AiOutlinePlus } from "react-icons/ai";
import { SiFacebook, SiTiktok, SiYoutube } from "react-icons/si";
const BusinessForm = () => {
  return (
    <div className=" min-h-screen bg-[#171717]">
      <div className=" container flex flex-col  justify-center items-center px-20 mx-auto">
        <div className=" py-2">
          <h2 className="text-[20px] text-white py-2">Business Logo</h2>
          <div className="w-[230px] flex h-[230px] bg-[#171717] justify-center border rounded  border-warining items-center">
            <AiOutlinePlus className="text-[40px] border-dashed p-2 border border-white/50 text-white/50" />
          </div>
        </div>
        <div className="w-[100%] py-2">
          <h2 className="text-[20px] text-white py-2">Business Profile</h2>
          <div className=" w-[100%]  justify-center items-center h-[350px] border-warining border rounded flex">
            <AiOutlinePlus className="text-[50px] border-dashed p-2 border border-white/50 text-white/50" />
          </div>
        </div>
        <div className="py-2 flex w-full justify-between gap-10 items-center">
          <div className="w-6/12">
            <h2 className="text-[20px] text-white py-2">Boss Code Number</h2>
            <input
              className="w-full bg-[#171717] p-3 text-white border border-warining rounded"
              type="text"
            />
          </div>
          <div className="w-6/12">
            <h2 className="text-[20px] text-white py-2">Boss Name</h2>
            <input
              className="w-full bg-[#171717] p-3 text-white border border-warining rounded"
              type="text"
            />
          </div>
        </div>
        <div className="py-2 flex w-full justify-between gap-10 items-center">
          <div className="w-6/12">
            <h2 className="text-[20px] text-white py-2">Business Name</h2>
            <input
              className="w-full bg-[#171717] p-3 text-white border border-warining rounded"
              type="text"
            />
          </div>
          <div className="w-6/12">
            <h2 className="text-[20px] text-white py-2">Business Type</h2>
            <input
              placeholder="Choose Business Type...."
              className="w-full bg-[#171717] p-3 text-white border border-warining rounded"
              type="text"
            />
          </div>
        </div>
        <div className="py-2 flex w-full justify-between gap-10 items-center">
          <div className="w-6/12">
            <h2 className="text-[20px] text-white py-2">City</h2>
            <input
              placeholder="Choose City...."
              className="w-full bg-[#171717] p-3 text-white border border-warining rounded"
              type="text"
            />
          </div>
          <div className="w-6/12">
            <h2 className="text-[20px] text-white py-2">
              Position or Title of Boss
            </h2>
            <input
              className="w-full bg-[#171717] p-3 text-white border border-warining rounded"
              type="text"
            />
          </div>
        </div>
        <div className="py-2 flex w-full justify-between gap-10 items-center">
          <div className="w-6/12">
            <h2 className="text-[20px] text-white py-2">Main Product</h2>
            <input
              className="w-full bg-[#171717] p-3 text-white border border-warining rounded"
              type="text"
            />
          </div>
          <div className="w-6/12">
            <h2 className="text-[20px] text-white py-2">Contact Number</h2>
            <input
              className="w-full bg-[#171717] p-3 text-white border border-warining rounded"
              type="text"
            />
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-[20px] text-white py-2">Business Address</h2>
          <textarea className=" border-warining text-white p-2 bg-[#171717] border rounded w-full h-[180px]"></textarea>
        </div>
        <div className="w-full">
          <h2 className="text-[20px] text-white py-2">Vision</h2>
          <textarea className=" border-warining text-white p-2 bg-[#171717] border rounded w-full h-[180px]"></textarea>
        </div>
        <div className="w-full">
          <h2 className="text-[20px] text-white py-2">Core Value</h2>
          <textarea className=" border-warining text-white p-2 bg-[#171717] border rounded w-full h-[180px]"></textarea>
        </div>
        <div className="w-full">
          <h2 className="text-[20px] text-white py-2">
            What Boss team surprises you?
          </h2>
          <textarea className=" border-warining text-white p-2 bg-[#171717] border rounded w-full h-[180px]"></textarea>
        </div>
        <div className="w-full">
          <h2 className="text-[20px] text-white py-2">Business Photo</h2>
          <div className="flex justify-between  gap-y-10 items-center flex-wrap">
            <div className="w-5/12 mx-1 h-[200px] flex justify-center items-center border border-warining rounded">
              <AiOutlinePlus className="text-[40px] border-dashed p-2 border border-white/50 text-white/50" />
            </div>
            <div className="w-5/12 mx-1 h-[200px] flex justify-center items-center border border-warining rounded">
              <AiOutlinePlus className="text-[40px] border-dashed p-2 border border-white/50 text-white/50" />
            </div>
            <div className="w-5/12 mx-1 h-[200px] flex justify-center items-center border border-warining rounded">
              <AiOutlinePlus className="text-[40px] border-dashed p-2 border border-white/50 text-white/50" />
            </div>
            <div className="w-5/12 mx-1 h-[200px] flex justify-center items-center border border-warining rounded">
              <AiOutlinePlus className="text-[40px] border-dashed p-2 border border-white/50 text-white/50" />
            </div>
          </div>
        </div>
        <div className="py-2 flex w-full justify-between gap-10 items-center">
          <div className="w-6/12 relative">
            <div className="absolute text-4xl bottom-2 left-1 text-[#362FD9]">
              <SiFacebook clasName=" " />
            </div>
            <h2 className="text-[20px] text-white py-2">FaceBook Link</h2>
            <input
              className="w-full bg-[#171717] ps-12 p-3 text-white border border-warining rounded"
              type="text"
            />
          </div>
          <div className="w-6/12 relative">
            <div className="absolute text-3xl bottom-1 left-1 text-white bg-black p-1 rounded-full">
              <SiTiktok clasName="" />
            </div>
            <h2 className="text-[20px] text-white py-2">Tiktok Link</h2>
            <input
              className="w-full bg-[#171717] ps-12 p-3 text-white border border-warining rounded"
              type="text"
            />
          </div>
        </div>
        <div className="py-2 flex w-full justify-between gap-10 items-center">
          <div className="w-6/12 relative">
            <div className="absolute text-4xl bottom-2 left-1 text-red-600">
              <SiYoutube clasName="" />
            </div>
            <h2 className="text-[20px] text-white py-2">YouTube Link</h2>
            <input
              className="w-full bg-[#171717] ps-12 p-3 text-white border border-warining rounded"
              type="text"
            />
          </div>
          <div className="w-6/12 relative">
            <h2 className="text-[20px]  text-white py-2">
              Another Social Link
            </h2>
            <input
              className="w-full bg-[#171717] p-3 text-white border border-warining rounded"
              type="text"
            />
          </div>
        </div>
        <button className="w-3/12 py-2  my-2  bg-[#00FF47] rounded border border-warining">
          <h2 className="text-[25px] font-semibold text-white">Save</h2>
        </button>
      </div>
    </div>
  );
};

export default BusinessForm;
