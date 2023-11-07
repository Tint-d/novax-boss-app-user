import { useParams } from "react-router-dom";
import { useGetBusinessAddressDetailQuery } from "../../redux/api/BusinessAddressApi";
import "swiper/css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../App.css";
import { t } from "i18next";
import Detail from "./Detail";


export interface detailsType {
  id: number;
  boss_no : string,
  boss_name: string;
  business_name: string;
  categories: {
    id: number;
    category_name: string;
    category_mm_name : string;
  };
  main_product: string;
  business_address: string;
  contact_numbers: string[];
  city: {
    id: number;
    city_name: string;
    city_mm_name : string;
  };
  business_description: string;
  vision: string;
  mission: string;
  cover_photo: string;
  business_logo: string;
  social_links: Social[];
  images : BusinessPhoto[];
  core_value : string;
  business_goal : string;
  business_suprise : string;
}

interface BusinessPhoto {
  
  id: number,
  business_photo : string
  boss_address_id: string

}

interface Social {
  id : string;
  href: string;
  type: string;
}


const BusinessDetail = () => {
  const { id } = useParams() as { id: string };
  const { data: items, isLoading } = useGetBusinessAddressDetailQuery(id);
    const language = localStorage.getItem("language") || "en";


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bossAddress = (items as any)?.address;

  const sidesData = [
    [
      {
        title: t("Boss Name"),
        content: bossAddress?.boss_name
      },
      {
        title: t("Business Type"),
        content:  language == "en" ? bossAddress?.categories?.category_name : bossAddress?.categories?.category_mm_name


      },
      {
        title: t("Business Address"),
        content: bossAddress?.business_address
      },
      {
        title: t("Main Product"),
        content: bossAddress?.main_product
      },
    ],
    [
      {
        title: t("Business City"),
        content: language == "en" ?  bossAddress?.city?.city_name :   bossAddress?.city?.city_mm_name

      },
      {
        title: t("Business Description"),
        content: bossAddress?.business_description
      },
      {
        title: t("Business Goal"),
        content: bossAddress?.business_goal
      },
      {
        title: t("Business Vision"),
        content: bossAddress?.vision
      }
    ],
    [
      {
        title: t("Business Mission"),
        content: bossAddress?.mission
      },
      {
        title: t("Business Value"),
        content: bossAddress?.core_value
      },
      {
        title: t("Business Suprise"),
        content: bossAddress?.business_suprise
      }
    ]
  ];

  return (
      <Detail sideData={sidesData} bossAddress={bossAddress} isLoading={isLoading} />
  );
};

export default BusinessDetail;
