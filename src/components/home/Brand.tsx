import { BiMessageRoundedDots } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import homeBg from "../../assets/homeBg.png";
import wave from "../../assets/wave.png";
import Logo from "../../assets/logo.png";
import Home from "../../assets/home2.png";
import Vision from "../../assets/vision.png";
import Eyes from "../../assets/eyes.png";
import Nya from "../../assets/nyaLogo.png";
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
    if (window.pageYOffset > 900) {
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

        <div className=" w-full container flex flex-col mx-auto justify-center items-center my-auto">
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
         <div className="flex flex-col gap-y-10 md:gap-y-60 mt-0 md:mt-10">
         <BodyHero title={body['boss_network'].title} content={body['boss_network'].content} mmContent={body['boss_network'].mmContent} image={Home}
            lng={lng} boxContainerClass=" md:w-6/12" textClass="text-3xl md:text-5xl "  imageContainerClass="justify-center " container="justify-between flex-col-reverse md:flex-row" imageClass="mx-auto w-12/12 md:w-[400px]" formatList={true}
          />

          <div className="flex items-center flex-col md:flex-row-reverse gap-y-10 pb-10 md:pb-20 2xl:pb-0">
          <BodyHero title={body['vision'].title} content={body['vision'].content} mmContent={body['vision'].mmContent} image={Vision}
            lng={lng} container="flex-col-reverse w-fulls md:w-1/2 md:items-end " 
            textClass="text-2xl "
            imageClass="mx-auto w-8/12 md:w-[150px] md:h-[250px]"  imageContainerClass="flex w-full justify-center items-center"
          />

          <BodyHero title={body['mission'].title} content={body['mission'].content} mmContent={body['mission'].mmContent} image={Eyes}
            lng={lng} container="flex-col-reverse w-fulls md:w-1/2 md:items-start"
            textClass="text-2xl "
            imageClass="mx-auto w-8/12 md:w-[200px] md:h-[250px]" imageContainerClass="flex w-full justify-center items-center"

          />
          </div>
        
         </div>


          <div className="fixed bottom-[10%] md:right-20 right-5">
            {message && (
              <Suspense fallback={<div className="text-whtie">Loading...</div>}>
                <QA setMessage={setMessage} />
              </Suspense>
            )}
            <button
              onClick={() => setMessage(!message)}
              className="w-[50px] absolute bottom-[-55px] right-[10px] h-[50px] 2xl:h-[100px] 2xl:w-[100px] rounded-full  bg-[#DCA715]"
            >
              <BiMessageRoundedDots className="text-3xl mx-auto text-black 2xl:text-5xl" />
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
        className=" flex gap-3 mb-6 md:max-h-[400px] md:px-24 mt-20 md:mt-20 pb-10 md:pb-20 ">
        <div className="w-full  container flex flex-col mx-auto gap-y-20 ">

          <div className="w-full flex flex-col md:flex-row items-end justify-between gap-y-20 ">
          <div className="flex items-center gap-x-4 w-full justify-center md:w-fit" >
            <div className="">
              <img src={Nya} className=" w-20 object-contain" alt="" />
            </div>
            <div className="flex flex-col text-sm ">
              <p>Product by</p>
              <p>Nyan Lin Aung ( Unlock Your Future )</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-8 px-10 md:px-0 text-[.8em] md:text-[1em]">
            <h4 className="text-2xl text-[#DCA715]">{t('Social Medias')}</h4>

            <a href="https://www.facebook.com/myanmarfuturecoach?mibextid=LQQJ4d"
            target="_blank" rel="noreferrer"
            className="flex gap-3 items-center">
              <button className=" flex items-center gap-2 justify-center bg-[#295396] rounded text-white min-w-[120px] py-2">
                <FaFacebookF className=" text-xl" />
                Facebook
              </button>
              <h4 className="text-white">ဉာဏ်လင်းအောင်</h4>
            </a>
            <a href="https://www.facebook.com/profile.php?id=100088077374499&mibextid=LQQJ4d"
            target="_blank" rel="noreferrer"
            className="flex gap-3 items-center">
              <button className=" flex items-center gap-2 justify-center bg-[#295396] rounded text-white min-w-[120px] py-2">
                <FaFacebookF className=" text-xl" />
                Facebook
              </button>
              <h4 className="text-white">ဉာဏ်လင်းအောင် - Unlock Your Future</h4>
            </a>
            <a href="https://youtube.com/@nyanlinaung-unlockyourfutu8764?si=-EGbpQYqZALdLodx"
            target="_blank" rel="noreferrer"
            className="flex gap-3 items-center">
              <button className=" flex items-center gap-2 justify-center bg-[#CB0000B2] rounded text-white min-w-[120px] py-2">
                <AiFillYoutube className=" text-xl" />
                YouTube
              </button>
              <h4 className="text-white">ဉာဏ်လင်းအောင် - Unlock Your Future</h4>
            </a>

          </div>
          </div>

          <div className="flex justify-center items-center w-full">
            <div className="flex flex-col items-center gap-y-2">
              <p>Copyright © 2023 </p>
              <span className="text-[.7em] md:text-[.8em] whitespace-nowrap lg:text-[.9em]">Unlock Your Futures. All rights reserved. Website developed by <a 
              href="https://novax-mm.com" target="_blank" rel="noreferrer"
              className="text-[#DCA715]">NOVAX</a></span>
            </div>
          </div>
        </div>
        
      </div>

     
    </>

  );
};

export default Brand;
