import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uk from "./public/locales/uk.json";
import en from "./public/locales/en.json";
import ru from "./public/locales/ru.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      uk: { translation: uk },
      en: { translation: en },
      ru: { translation: ru },
    },
    lng: "uk", 
    fallbackLng: "uk",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;