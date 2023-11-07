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
import{ bodyData as body} from './bodyData.ts';

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

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${homeBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className=" min-h-screen  mx-auto md:px-24  gap-9 px-4 relative pt-16  md:pt-12">

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
         <div className="flex flex-col gap-y-20 md:gap-y-32 mt-0 md:mt-10">
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
