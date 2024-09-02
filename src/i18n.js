
/* Primary instance that handles translations */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './translations/en/common';
import translationES from './translations/es/common';

/* resources contains the languages supported by the application */
const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
};

i18n
  /* Activates the browser's language detector */
  .use(LanguageDetector)
  /* To enable the use of translations within React components */
  .use(initReactI18next)
  /* Initializes the i18n configuration */
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      /* react already safes from xss */
      escapeValue: false,
    },
  });

/* i18n is exported to be used throughout the application */
export default i18n;
