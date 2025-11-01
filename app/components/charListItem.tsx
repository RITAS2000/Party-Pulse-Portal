import Image from 'next/image';
import type { CharacterType } from './charList';
import { MdDelete } from 'react-icons/md';

import LevelEditor from './level';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import axios from 'axios';
import { updateCharacterLevel } from '@/redux/char/slice';
import { openModal } from '@/redux/modals/slice';
import { useTranslation } from 'react-i18next';

type CharacterCardProps = {
  character: CharacterType;
};

export default function CharItem({ character }: CharacterCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const race = character.race ? character.race.toLowerCase() : 'druid'; 
  const avatar = character.avatar || `/Hero/${race}.png`;
  const icon = `/iconHero/${race}.png`;

  return (
    <div
      className="flex flex-col gap-2 items-center min-w-[230px] px-4 py-2 bg-blue-300 rounded-xl border border-solid shadow-[inset_0_0_6px_rgba(0,0,0,1)] hover:scale-100 hover:bg-green-300 transition-all duration-300 cursor-grab select-none"
      onDragStart={e => e.stopPropagation()}
    >
      <h3 className="font-serif text-xl text-center text-gray-800">
        {character.nickname}
      </h3>

      <div
        draggable={false}
        onDragStart={e => e.stopPropagation()}
        className=" flex items-center justify-center w-48 h-60 overflow-hidden bg-black rounded-xl "
      >
        <Image
          src={avatar}
          alt={character.nickname}
          width={100}
          height={100}
          unoptimized
          draggable={false}
          className="w-48 h-60 object-cover rounded-xl pointer-events-none "
        />
      </div>
      <div className="flex flex-col w-full">
        <div
          draggable={false}
          onDragStart={e => e.preventDefault()}
          className="flex w-full justify-between"
        >
          <p className="font-bold">{t("form.race")}:</p>
          <div className="w-7 h-7  bg-black  rounded-full">
            <Image
              src={icon}
              alt={character.race}
              width={30}
              height={30}
              unoptimized
              className="w-6 h-6  rounded-full"
            />
          </div>
        </div>
        <div className="flex w-full justify-between">
          <p className="font-bold">{t("form.level")}: {character.level}</p>
          <LevelEditor
            level={character.level}
            onSave={async (newLevel: number) => {
              await axios.patch(`/party/char/${character._id}`, {
                level: newLevel,
              });
              dispatch(
                updateCharacterLevel({ id: character._id, level: newLevel })
              );
            }}
          />
        </div>
      </div>
      <p className="font-bold">
        {t('form.server')}: {character.server}
      </p>

      <div className="flex gap-2 w-full justify-end border-t border-t-gray-800 mt-2 pt-2">
        <button
          type="button"
          onClick={() =>
            dispatch(openModal({ type: 'deleteChar', data: character._id }))
          }
          className="w-10 h-10 flex items-center justify-center rounded border-solid border border-black bg-red-700 shadow-[inset_0_0_6px_rgba(0,0,0,1)]"
        >
          <MdDelete
            size={30}
            color="white"
            className="hover:w-[24px] transition-all duration-300"
          />
        </button>
      </div>
    </div>
  );
}
