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
  boss_name: string;
  business_name: string;
  categories: {
    category_name: string;
  };
  main_product: string;
  business_address: string;
  contact_numbers: string[];
  city: {
    city_name: string;
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
  href: string;
  type: string;
}


const BusinessDetail = () => {
  const { id } = useParams() as { id: string };
  const { data: items, isLoading } = useGetBusinessAddressDetailQuery(id);


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
        content: bossAddress?.categories?.category_name

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
        content: bossAddress?.city?.city_name
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
