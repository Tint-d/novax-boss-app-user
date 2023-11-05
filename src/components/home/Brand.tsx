import { BiMessageRoundedDots } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import homeBg from "../../assets/homeBg.png";
import Logo from "../../assets/logo.png";
import Home from "../../assets/home2.png";
import { FaFacebookF } from "react-icons/fa";
import { Suspense, lazy, useState } from "react";
const QA = lazy(() => import("./QA"));
const Brand = () => {
  const [message, setMessage] = useState<boolean>(false);
  const lng = localStorage.getItem("language") || "en";
  return (
    <div
      style={{
        backgroundImage: `url(${homeBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className=" min-h-screen  mx-auto lg:px-10 md:px-6 px-4 relative pt-4 md:pt-9 md:flex md:justify-center md:items-center">
        <div className="container">
        <div className="">
        <h2 className=" text-[#DCA715] pt-5 flex justify-center">
          “ BE A PUPPET MASTER ”
        </h2>
      </div>
      <div className="flex justify-between flex-wrap h-full items-center px-4">
        <div className="md:w-7/12  w-12/12">
          <div className="flex justify-start items-center mb-3">
            <img src={Logo} className=" w-20 h-20" alt="" />
            <h4 className="text-[#DCA715] text-3xl md:text-5xl font-bold">
              <p>BOSS</p> NETWORKS
            </h4>
          </div>
          <p className=" text-white leading-8  ">
           {
            lng == "en" ? "The Boss Team is an organization that helps SMEs in Myanmar to operate systematically and expand their business to increase sales and expand their business at the lowest cost. You can choose the types of business you need and study freely." : 
            "Boss Teamသည်မြန်မာပြည်မှာရှိသောSME’sများအားစနစ်တကျလည်ပတ်နိုင်ရန် ရောင်းအားတက်ရန် လုပ်ငန်းတိုုးချဲ့နိုင်ရန်အတွက်စာရိတ်အနည်းဆုံး နှင့် တည်ဆောက်နိုင်ရေးအတွက် ကူညီပေးနေသည့် အဖွဲ့စည်းဖြစ်ပါသည်။ကျွန်တော်တို့Boss Teamမှအသင်းသူ အသင်းသားများ၏ လုပ်ငန်းများကို တစ်နေရာထဲမှာဝင်ရောက်လေ့လာနိုင်ရန်ဒီWebsiteလေးကိုတည်ထောင်ဖြစ်တာပါ။ မိမိအတွက်လိုအပ်သောလုပ်ငန်းအမျိုးအစားများကို ရွေးချယ်ပြီးလွပ်လပ်စွာဝင်ရောက်လေ့လာနိုင်ပါတယ်ခင်ဗျာ။"
           }
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
          <Suspense fallback={<div className="text-whtie">Loading...</div>}>
              <QA setMessage={setMessage}/>
          </Suspense>
        )}
        <button
          onClick={() => setMessage(!message)}
          className="w-[50px] absolute bottom-[-55px] right-[10px] h-[50px] rounded-full  bg-[#DCA715]"
        >
          <BiMessageRoundedDots className="text-3xl mx-auto text-black" />
        </button>
      </div>
        </div>
    </div>
  );
};

export default Brand;
