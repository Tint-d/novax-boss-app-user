import { IResourceType } from './i18n';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import  translationEN  from  '../locales/en/translation.json';
import  translationMM from  '../locales/mm/translation.json';


const resources : IResourceType = {
    en: {
      translation: translationEN,
    },
    mm: {
      translation: translationMM,
    },
};


  const localstorageLanguage : string  = localStorage.getItem('language') || 'mm';
  console.log('resources', localstorageLanguage)

  i18n.use(initReactI18next).init({
    lng: 'mm', // Default language
    fallbackLng: 'mm',
    resources: resources,
    interpolation: {
      escapeValue: false, // React already escapes, so no need to escape HTML entities
    },
  });

export default i18n;
