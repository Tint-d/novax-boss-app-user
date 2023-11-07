import { BiMessageRoundedDots } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import homeBg from "../../assets/homeBg.png";
import wave from "../../assets/wave.png";
import Logo from "../../assets/logo.png";
import Home from "../../assets/home2.png";
import Vision from "../../assets/vision.png";
import Eyes from "../../assets/eyes.png";
import { FaFacebookF } from "react-icons/fa";
import { Suspense, lazy, useEffect, useState } from "react";
import BodyHero from "./BodyHero";
import { MdKeyboardArrowUp } from 'react-icons/md'


import { t } from "i18next";
const QA = lazy(() => import("./QA"));
const Brand = () => {
  const [message, setMessage] = useState<boolean>(false);
  const lng = localStorage.getItem("language") || "en";
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);


  const body = {
    boss_network: {
      title: 'BOSS NETWORKS',
      content: `Boss Team to SMEs in Myanmar
      (1) To operate properly
      (2) To increase sales
      (3) To expand business
      It is an organization that is helping to build at the lowest cost for them. We have established this website so that members of the BossTeam can access and study the activities of their members in one place.`,
      mmContent: `
      Boss Teamသည် မြန်မာပြည်မှာရှိသော SME’s များအား 
      (၁) စနစ်တကျလည်ပတ်နိုင်ရန် 
      (၂) ရောင်းအားတက်ရန် 
      (၃) လုပ်ငန်းတိုးချဲ့နိုင်ရန် 
  တို့အတွက်စာရိတ်အနည်းဆုံးနှင့်တည်ဆောက်နိုင်ရေးအတွက်ကူညီပေးနေသည့်အဖွဲ့စည်းဖြစ်ပါသည်။ကျွန်တော်တို့ BossTeamမှအသင်းသူ အသင်းသားများ၏လုပ်ငန်းများကိုတစ်နေရာထဲမှာဝင်ရောက်လေ့လာနိုင်ရန်ဒီWebsiteလေးကိတည်ထောင်ဖြစ်တာပါမိမိအတွက်လိုအပ်သောလုပ်ငန်းအမျိုးအစားများကိုရွေးချယ်ပြီးလွပ်လပ်စွာဝင်ရောက်လေ့လာနိုင်ပါတယ်။
      `
    },
    vision: {
      title: 'VISION',
      content: "Tesla's vision is ambitious and forward-looking. It aims to position the company as a leader in the automotive industry by not just making cars, but becoming the most attractive and influential car maker of the 21st century. The vision is focused on driving the global transition to electric vehicles and indicates Tesla's commitment to sustainability and innovation.",
      mmContent: 'Tesla ၏ မျှော်မှန်းချက်သည် ရည်မှန်းချက်ကြီးပြီး ရှေ့သို့မျှော်နေသည်။ ၎င်းသည် ကားထုတ်လုပ်ရုံသာမက 21 ရာစု၏ ဆွဲဆောင်မှုအရှိဆုံးနှင့် သြဇာအရှိဆုံး ကားထုတ်လုပ်သူဖြစ်လာခြင်းဖြင့် ကုမ္ပဏီအား မော်တော်ကားလုပ်ငန်းတွင် ဦးဆောင်သူအဖြစ် ရပ်တည်နိုင်ရန် ရည်ရွယ်ထားသည်။ အဆိုပါ မျှော်မှန်းချက်သည် ကမ္ဘာလုံးဆိုင်ရာ လျှပ်စစ်ကားများဆီသို့ အကူးအပြောင်းကို မောင်းနှင်ရန် အာရုံစိုက်ထားပြီး Tesla ၏ ရေရှည်တည်တံ့မှုနှင့် ဆန်းသစ်တီထွင်မှုဆိုင်ရာ ကတိကဝတ်ကို ညွှန်ပြသည်။'
    },
    mission: {
      title: "MISSION",
      content: "Tesla's vision is ambitious and forward-looking. It aims to position the company as a leader in the automotive industry by not just making cars, but becoming the most attractive and influential car maker of the 21st century. The vision is focused on driving the global transition to electric vehicles and indicates Tesla's commitment to sustainability and innovation.",
      mmContent: "Tesla ၏ မျှော်မှန်းချက်သည် ရည်မှန်းချက်ကြီးပြီး ရှေ့သို့မျှော်နေသည်။ ၎င်းသည် ကားထုတ်လုပ်ရုံသာမက 21 ရာစု၏ ဆွဲဆောင်မှုအရှိဆုံးနှင့် သြဇာအရှိဆုံး ကားထုတ်လုပ်သူဖြစ်လာခြင်းဖြင့် ကုမ္ပဏီအား မော်တော်ကားလုပ်ငန်းတွင် ဦးဆောင်သူအဖြစ် ရပ်တည်နိုင်ရန် ရည်ရွယ်ထားသည်။ အဆိုပါ မျှော်မှန်းချက်သည် ကမ္ဘာလုံးဆိုင်ရာ လျှပ်စစ်ကားများဆီသို့ အကူးအပြောင်းကို မောင်းနှင်ရန် အာရုံစိုက်ထားပြီး Tesla ၏ ရေရှည်တည်တံ့မှုနှင့် ဆန်းသစ်တီထွင်မှုဆိုင်ရာ ကတိကဝတ်ကို ညွှန်ပြသည်။"
    }
  };


  return (
    <>
      <div
        style={{
          backgroundImage: `url(${homeBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className=" min-h-screen  mx-auto md:px-24  gap-9 px-4 relative pt-20  md:pt-12">

        <div className=" w-full">
        {isVisible && (
        <button
          className="bg-[#DCA715] hover:bg-[#DCA715] text-[2em] text-[#000] font-semibold py-2 px-2 rounded-full fixed bottom-20 left-1/2 transition-all"
          onClick={scrollToTop}
        >
          <MdKeyboardArrowUp />
        </button>
      )}
          <div className="">
            <div className="w-full flex justify-center  mb-1">
              <img src={Logo} className=" w-28 h-28" alt="" />

            </div>
            <h2 className=" text-[#DCA715] pt-1 flex justify-center">
              “ BE A PUPPET MASTER ”
            </h2>

          </div>
         <div className="flex flex-col gap-y-20 md:gap-y-32 mt-10">
         <BodyHero title={body['boss_network'].title} content={body['boss_network'].content} mmContent={body['boss_network'].mmContent} image={Home}
            lng={lng} reverse={true} imageContainerClass="justify-center" imageClass="mx-auto w-12/12 md:w-[400px]" formatList={true}
          />


          <BodyHero title={body['vision'].title} content={body['vision'].content} mmContent={body['vision'].mmContent} image={Vision}
            lng={lng} reverse={true} imageClass="mx-auto w-8/12 md:w-[250px]" flexRowReverse={true} imageContainerClass="justify-center"
          />

          <BodyHero title={body['mission'].title} content={body['mission'].content} mmContent={body['mission'].mmContent} image={Eyes}
            lng={lng} reverse={true} imageClass="mx-auto w-8/12 md:w-[250px]" imageContainerClass="justify-center"
          />
         </div>


          <div className="fixed bottom-[10%] md:right-20 right-5">
            {message && (
              <Suspense fallback={<div className="text-whtie">Loading...</div>}>
                <QA setMessage={setMessage} />
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
      <div
        style={{
          backgroundImage: `url(${wave})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className=" flex gap-3 mb-6 h-[400px] md:px-24 md:mt-20">
        <div className="w-full flex items-center justify-between ">
          <div className=""></div>
          <div className="flex flex-col gap-y-8 px-10 md:px-0 text-[.8em] md:text-[1em]">
            <h4 className="text-2xl text-[#DCA715]">{t('Social Medias')}</h4>

            <div className="flex gap-3 items-center">
              <button className=" flex items-center gap-2 justify-center bg-[#295396] rounded text-white min-w-[120px] py-2">
                <FaFacebookF className=" text-xl" />
                Facebook
              </button>
              <h4 className="text-white">ဉာဏ်လင်းအောင်</h4>
            </div>
            <div className="flex gap-3 items-center">
              <button className=" flex items-center gap-2 justify-center bg-[#295396] rounded text-white min-w-[120px] py-2">
                <FaFacebookF className=" text-xl" />
                Facebook
              </button>
              <h4 className="text-white">ဉာဏ်လင်းအောင် - Unlock Your Future</h4>
            </div>
            <div className="flex gap-3 items-center">
              <button className=" flex items-center gap-2 justify-center bg-[#CB0000B2] rounded text-white min-w-[120px] py-2">
                <AiFillYoutube className=" text-xl" />
                YouTube
              </button>
              <h4 className="text-white">ဉာဏ်လင်းအောင် - Unlock Your Future</h4>
            </div>

          </div>
        </div>
      </div>
    </>

  );
};

export default Brand;
