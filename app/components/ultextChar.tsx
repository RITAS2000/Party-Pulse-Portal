import { useTranslation } from 'react-i18next';

export default function UlTextChar() {
    const { t } = useTranslation();
    
  return (
    <div className="mb-8">
      <p className="text-lg text-gray-700">{t("page.ul.title")}</p>
      <ul className="list-disc ml-6 mt2">
        <li className="text-lg text-gray-700">{t("page.ul.item1")}</li>
        <li className="text-lg text-gray-700">{t("page.ul.item2")}</li>
        <li className="text-lg text-gray-700">
          {t("page.ul.item3")}
              </li>
              <li className="text-lg text-gray-700">{t("page.ul.item5")}</li>
              <li className="text-lg text-gray-700">{t("page.ul.item4")}</li>
              
      </ul>
    
      {/* <p className="text-lg mt-2 text-gray-700">{t("page.ul.note")}</p> */}
    </div>
  );
}
