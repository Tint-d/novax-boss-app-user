
// import { useGetProfileQuery } from '@/redux/api/BusinessAddressApi';
import { t } from 'i18next';

import Detail from '../Detail';
import { useAppSelector } from '@/redux/hook';
import { selectProfile } from '@/redux/services/businessSlice';
import { detailsType } from '../BusinessDetail';

const BossAddressDetail = () => {

    // const { data, isLoading } = useGetProfileQuery({});
  const user = useAppSelector(selectProfile);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bossAddress = user?.boss_address as detailsType;

    const language = localStorage.getItem("language") || "en";

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
            title: t("Contact Number"),
            content: bossAddress?.contact_numbers[0]?.contact_no ?? ''
          },
          {
            title: t("City"),
            content: language == "en" ?  bossAddress?.city?.city_name :   bossAddress?.city?.city_mm_name
          },
          {
            title: t("Business Description"),
            content: bossAddress?.business_description
          },
        ],
        [
          {
            title: t("Vision"),
            content: bossAddress?.vision
          },
          {
            title: t("Mission"),
            content: bossAddress?.mission
          },
          {
            title: t("Core Value"),
            content: bossAddress?.core_value
          },
          {
            title: t("What Boss Team Suprises Us"),
            content: bossAddress?.business_suprise
          }
        ]
      ];

    return (
      <Detail sideData={sidesData} bossAddress={bossAddress} isLoading={false} />
  );
}

export default BossAddressDetail
