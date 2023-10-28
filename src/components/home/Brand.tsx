import { BiMessageRoundedDots } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import homeBg from "../../assets/homeBg.png";
import Logo from "../../assets/logo.png";
import Home from "../../assets/home2.png";
import { FaFacebookF } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

const Brand = () => {
  const [message, setMessage] = useState<boolean>(false);
  return (
    <div
      style={{
        backgroundImage: `url(${homeBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className=" min-h-screen container mx-auto lg:px-10 md:px-6 px-4 relative "
    >
      <div className="">
        <h2 className=" text-[#DCA715] pt-5 flex justify-center">
          “ BE A PUPPET MASTER ”
        </h2>
      </div>
      <div className="flex justify-between flex-wrap h-full items-center">
        <div className="md:w-7/12  w-12/12">
          <div className="flex justify-start items-center mb-3">
            <img src={Logo} className=" w-32 h-32" alt="" />
            <h4 className="text-[#DCA715] text-3xl md:text-5xl font-bold">
              <p>BOSS</p> NETWORKS
            </h4>
          </div>
          <p className=" text-white leading-8  ">
            Boss Teamသည်မြန်မာပြည်မှာရှိသောSME’sများအားစနစ်တကျလည်ပတ်နိုင်ရန်
            ရောင်းအားတက်ရန် လုပ်ငန်းတိုုးချဲ့နိုင်ရန်အတွက်စာရိတ်အနည်းဆုံး နှင့်
            တည်ဆောက်နိုင်ရေးအတွက် ကူညီပေးနေသည့် အဖွဲ့စည်းဖြစ်ပါသည်။ကျွန်တော်တို့
            Boss Teamမှအသင်းသူ အသင်းသားများ၏ လုပ်ငန်းများကို တစ်နေရာထဲမှာ
            ဝင်ရောက်လေ့လာနိုင်ရန်ဒီWebsiteလေးကိုတည်ထောင်ဖြစ်တာပါ။ မိမိအတွက်
            လိုအပ်သောလုပ်ငန်းအမျိုးအစားများကို ရွေးချယ်ပြီး
            လွပ်လပ်စွာဝင်ရောက်လေ့လာနိုင်ပါတယ်ခင်ဗျာ။
          </p>
          <div className=" flex gap-3 items-center mt-5">
            <button className=" flex items-center gap-2 justify-center bg-[#CB0000B2] rounded text-white w-32 py-2">
              <AiFillYoutube className=" text-xl" />
              YouTube
            </button>
            <button className=" flex items-center gap-2 justify-center bg-[#295396] rounded text-white w-32 py-2">
              <FaFacebookF className=" text-xl" />
              Facebook
            </button>
          </div>
        </div>
        <img
          src={Home}
          alt=""
          className="md:w-5/12 w-12/12 h-full object-cover"
        />
      </div>

      <div className="fixed bottom-[10%] md:right-20 right-5">
        {message && (
          <div className="md:w-[440px] w-[340px] h-auto rounded-md absolute right-0 bottom-[25%]  p-2 flex flex-col gap-y-4 justify-center items-center bg-[#262a31]">
            <RxCross2
              onClick={() => setMessage(false)}
              className="text-xl absolute cursor-pointer top-5 right-3 text-[#A8B3CF]"
            />
            <img
              width={70}
              height={70}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRyurWsC_LPj6-Xp9-4885OYTNNSDjDvSFIQ&usqp=CAU"
            />
            <h2 className="text-[16px] py-2 w-[300px] text-center text-[#A8B3CF]">
              သင်မေးလိုသောမေးခွန်းများကို နှိပ်၍ အဖြေများကို ရယူနိုင်ပါသည်။
            </h2>
            <div className="flex justify-around gap-3 flex-wrap items-center">
              <button className="text-[14px] h-[50px] leading-5 text-white w-[200px]  bg-[#383d47] px-3  rounded-[30px]">
                သင်တန်းအကြောင်းပိုမိုသိရှိလိုပါသလား။
              </button>
              <button className="text-[14px] h-[50px] leading-5 text-white w-[200px]  bg-[#383d47] px-3  rounded-[30px]">
                SIR သင်တန်းဖွင့်သေးပါသလား?
              </button>
              <button className="text-[14px] h-[50px] leading-5 text-white w-[200px]  bg-[#383d47] px-3  rounded-[30px]">
                Unloacker 3 သင်တန်းဖွင့်သေးပါသလား?
              </button>
            </div>
            <div className="h-[200px] w-full overflow-y-scroll no-scrollbar"></div>
          </div>
        )}
        <button
          onClick={() => setMessage(true)}
          className="w-[50px] absolute bottom-[-55px] right-[10px] h-[50px] rounded-full  bg-[#DCA715]"
        >
          <BiMessageRoundedDots className="text-3xl mx-auto text-black" />
        </button>
      </div>
    </div>
  );
};

export default Brand;
