'use client';

import { closeModal } from '@/redux/modals/slice';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { ClockLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { deleteClan, getClans } from '@/redux/clan/operation';
import { selectClansLoading } from '@/redux/clan/selectors';

type ModalDeleteClanProps = {
  clanId: string;
  clanChars: string[];
};

export default function ModalDeleteClan({ clanId, clanChars }: ModalDeleteClanProps) {
  const isLoading = useSelector(selectClansLoading);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const handleDelete = async () => {
   
   if (clanChars.length > 1) {
     toast.error(t("toast.clanHasMultipleMembers"));
     return;
   }
    const resultAction = await dispatch(deleteClan(clanId));
    
    if (deleteClan.fulfilled.match(resultAction)) {
      toast.success(t("toast.deleteClan"));
      dispatch(getClans()); 
      dispatch(closeModal());
    } else {
      toast.error(t("toast.deleteClanError"));
    }
 
  }


  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="font-serif text-3xl font-bold text-red-800">
          {t("form.deleteClanTitle")}
        </h2>
        <p className="text-white font-sans">
          {t("form.deleteClanDescription")}
        </p>
      </div>
      <div className="flex w-full justify-around">
        <button
          onClick={handleDelete}
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
