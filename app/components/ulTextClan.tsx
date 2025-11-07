import { useTranslation } from 'react-i18next';

export default function UlTextClan() {
    const { t } = useTranslation();
    
  return (
    <div className="mb-8">
      <p className="text-lg text-gray-700">{t("page.clansPage.create")}</p>
      <ul className="list-disc ml-6 mt2">
        <li className="text-lg text-gray-700">{t("page.clansPage.note")}</li>
        <li className="text-lg text-gray-700">{t("page.clansPage.info")}</li>
        <li className="text-lg text-gray-700">{t("page.clansPage.delete")}</li>
             
          
              
      </ul>
    
      {/* <p className="text-lg mt-2 text-gray-700">{t("page.ul.note")}</p> */}
    </div>
  );
}
