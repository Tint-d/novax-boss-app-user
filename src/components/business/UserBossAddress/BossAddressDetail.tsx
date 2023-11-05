
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
      <Detail sideData={sidesData} bossAddress={bossAddress} isLoading={false} />
  );
}

export default BossAddressDetail
