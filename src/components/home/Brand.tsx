import { useState } from "react";
import { BiMessageRoundedDots } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import homeBg from "../../assets/homeBg.png";
import Logo from "../../assets/logo.png";
import Home from "../../assets/home2.png";
import { FaFacebookF } from "react-icons/fa";

const Brand = () => {
  const [message, setMessage] = useState<boolean>(false);
  return (
    <div
      style={{
        backgroundImage: `url(${homeBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className=" min-h-screen container mx-auto lg:px-10 md:px-6 px-4 "
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
    </div>
  );
};

export default Brand;
