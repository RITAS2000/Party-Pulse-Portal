'use client';
import { deleteCharacter } from '@/redux/char/operation';
import { selectIsLoading } from '@/redux/char/selectors';
import { closeModal } from '@/redux/modals/slice';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { ClockLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

type ModalDeleteCharProps = {
  characterId: string;
};

export default function ModalDeleteChar({ characterId }: ModalDeleteCharProps) {
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const handleDelete = () => {
    dispatch(deleteCharacter(characterId));
    dispatch(closeModal());
    toast.success(t("toast.deleteChar"));
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="font-serif text-3xl font-bold text-red-800">
          {t("form.deleteTitle")}
        </h2>
        <p className="text-white font-sans">
          {t("form.deleteDescription")}
        </p>
      </div>
      <div className="flex w-full justify-around">
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="font-bold w-28 h-11 text-xl px-4 py-2 bg-red-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
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
