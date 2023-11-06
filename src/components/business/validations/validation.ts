
import * as Yup from 'yup';

export const BossAddressValidationSchema = Yup.object().shape({
    // boss_no : Yup.string()
    //   .required('Boss No is required'),
    // boss_name: Yup.string()
    //   .required('Boss Name is required'),
    // boss_address: Yup.string()
    //   .required('Boss Address is required'),
    // business_name: Yup.string()
    //   .required('Business_name is required'),
    // business_address: Yup.string()
    //     .required('Business_address is required'),
    // business_description: Yup.string()
    //     .required('Business_description is required'),
    // main_product : Yup.string()
    //     .required('Main_product is required'),
    // profile_photo : Yup.object().shape({
    //     file : Yup.mixed().required('Profile Photo is required')
    // }),
    // business_logo : Yup.object().shape({
    //     file : Yup.mixed().required('Business Logo is required')
    // }),
    // business_photos : Yup.array().of(
    //     Yup.object().shape({
    //         file : Yup.mixed().required('Business_photos is required')
    //     })
    // ).min(4, 'Minimum 4 photos are required'),
  });