import { Clan } from "@/redux/clan/slice";
import SimpleFormikTextarea from "./clanInfo";
import { IoClose } from 'react-icons/io5';
import { useTranslation } from "react-i18next";
interface Props {
  currentClan: Clan | null;
  onClose: () => void;
}
export default function MessagePopup({ currentClan, onClose }: Props) {
   const { t } = useTranslation();

   
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-[url(/message.jpg)] w-[700px] h-auto  px-16 py-12 border-solid border-2 border-red-800 drop-shadow-[0_0_6px_white] rounded-lg bg-no-repeat bg-center bg-cover">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white opacity-100 hover:opacity-50 transition-all duration-300"
        >
                  <IoClose size={30} />
        </button>
        <h3 className="text-lg font-bold font-serif text-white mb-4">{t("page.clansPage.editInfo")}</h3>
        <SimpleFormikTextarea  onClose={onClose} initialText={currentClan?.message || ''} currentClan={currentClan} />
      </div>
    </div>
  );
}