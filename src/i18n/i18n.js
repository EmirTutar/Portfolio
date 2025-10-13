import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'de',
    supportedLngs: ['de', 'en', 'tr'],
    interpolation: { escapeValue: false },
    backend: {
      // Adjust base path if your repo is a project page like /<REPO_NAME>/
      //loadPath: '/locales/{{lng}}/{{ns}}.json'
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`
    }
  })

export default i18n
