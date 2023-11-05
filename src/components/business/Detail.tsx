import "../../App.css";
import Skeleton from 'react-loading-skeleton'
import { lazy } from "react";
import { detailsType } from "./BusinessDetail";



const OgDetail = lazy(() => import("./Mobile/OgDetail"));
const MobileDetail = lazy(() => import("./Mobile/MobileDetail"));

type SideData = {
    title: string;
    content: string; 
  };
  
  type SidesData = SideData[][];

  interface BusinesssDetailProps {
    sideData: SidesData;
    bossAddress : detailsType
    isLoading : boolean
  }


const Detail = ({sideData,bossAddress,isLoading} : BusinesssDetailProps) => {
  const loadingSkeleton = (
    <div className="flex justify-center items-center relative mt-12 pb-10 w-full">
      <Skeleton height={"100vh"} baseColor='#96969613' className={`w-[80vw]`} highlightColor='#6f6e6e13' count={1} />
    </div>)

  if (isLoading) {
    return (
      loadingSkeleton
    );
  }
  const beyondMobile = window.innerWidth > 768;


  return (
    beyondMobile ? <OgDetail sideData={sideData} bossAddress={bossAddress} isLoading={isLoading} /> : (
      <MobileDetail sideData={sideData} bossAddress={bossAddress} isLoading={isLoading} />
      )
  );
};

export default Detail;
