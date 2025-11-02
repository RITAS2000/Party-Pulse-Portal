import Image from 'next/image';
import { useTranslation } from 'react-i18next';
export type CharacterType = {
  _id: string;
  server: string;
  nickname: string;
  race: string;
  level: number;
  avatar: string | null;
  isApproved: boolean;
  galleryId?: string;
};
type GalleryItemProps = {
  item: CharacterType;
  isAdmin: boolean;
  onApprove?: (id: string) => void; 
};
export function GalleryItem({ item, isAdmin, onApprove }: GalleryItemProps) {
  const { t } = useTranslation();

  const race = item.race ? item.race.toLowerCase() : 'druid';
  const avatar = item.avatar || `/Hero/${race}.png`;
  const icon = `/iconHero/${race}.png`;
  return (
    <div
      className="flex flex-col gap-2 items-center min-w-[230px] px-4 py-2 bg-blue-300 rounded-xl border border-solid shadow-[inset_0_0_6px_rgba(0,0,0,1)] hover:scale-100 hover:bg-green-300 transition-all duration-300"
      
    >
      <h3 className="font-serif text-xl text-center text-gray-800">
        {item.nickname}
      </h3>
      {isAdmin && !item.isApproved && onApprove && (
        <button
          className="mt-2 px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => onApprove(item._id)}
        >
          Схвалити
        </button>
      )}

      <div
        className=" flex items-center justify-center w-48 h-60 overflow-hidden bg-black rounded-xl "
      >
        <Image
          src={avatar}
          alt={item.nickname}
          width={100}
          height={100}
          unoptimized
          className="w-48 h-60 object-cover rounded-xl pointer-events-none "
        />
      </div>
      <div className="flex flex-col w-full">
        <div
          className="flex w-full justify-between"
        >
          <p className="font-bold">{t('form.race')}:</p>
          <div className="w-7 h-7  bg-black  rounded-full">
            <Image
              src={icon}
              alt={item.race}
              width={30}
              height={30}
              unoptimized
              className="w-6 h-6  rounded-full"
            />
          </div>
        </div>
        <div className="flex w-full justify-between">
          <p className="font-bold">{t('form.level')}:</p>
          <div className="flex">
            <p className="font-bold"> {item.level}</p>
          </div>
        </div>
      </div>
      <p className="font-bold">
        {t('form.server')}: {item.server}
      </p>
    </div>
  );
}
