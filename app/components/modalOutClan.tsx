'use client';

import { closeModal } from '@/redux/modals/slice';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { ClockLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { notAcceptCharToClan } from '@/redux/clan/operation';
import { selectClansLoading } from '@/redux/clan/selectors';
import { getAllCharacters, getFreeChars } from '@/redux/char/operation';

type ModalOutClanProps = {
    charId: string;
    clanId: string;
    server: string;
    leaderChar: string;
  
};

export default function ModalOutClan({ charId, clanId, server, leaderChar }: ModalOutClanProps) {
  const isLoading = useSelector(selectClansLoading);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();



    const handleOut = async (charId: string, clanId: string) => {
        if (leaderChar === charId) {
            toast.info(t("toast.leaderActionRequired"))
            return;
      }
       await dispatch(notAcceptCharToClan({ charId, clanId }));
      toast.success(t("toast.charLeftClan"))
      dispatch(closeModal());
        dispatch(getFreeChars(server))
         dispatch(getAllCharacters());
    };
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="font-serif text-3xl font-bold text-red-800">
          {t("form.leaveTitle")}
        </h2>
        <p className="text-white font-sans">
          {t("form.leaveConfirm")}
        </p>
      </div>
      <div className="flex w-full justify-around">
        <button
                  onClick={() => { handleOut(charId, clanId) }}
          disabled={isLoading}
          className="font-bold w-28 h-11 text-xl flex justify-center items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
        >
          {!isLoading ? (
            <span>{t("form.deleteConfirm")}</span>
          ) : (
            <ClockLoader size={20} color="#ffffff" />
          )}
        </button>
        <button
          onClick={() => dispatch(closeModal())}
          className="font-bold w-28 h-11 text-xl px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
        >
          {t("form.deteteCancel")}
        </button>
      </div>
    </div>
  );
}