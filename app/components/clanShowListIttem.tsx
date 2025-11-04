'use client';
import { ClanColor } from '@/redux/clan/colors';
import { FaPerson } from 'react-icons/fa6';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';
import { openModal } from '@/redux/modals/slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { selectUserId } from '@/redux/auth/selectors';
import { useTranslation } from 'react-i18next';

interface Clan {
  _id: string;
  clanName: string;
  charId: string;
  leaderCharNick: string;
  clanColor: ClanColor;
  logo: string;
  server: string;
  leaderId: string;
  members: string[];
  clanChars: string[];
}

interface ClanShowListItemProps {
  clan: Clan;
}

const COLOR_OPTIONS = {
  red: 'bg-red-500',
  blue: 'bg-blue-400',
  green: 'bg-green-400',
  yellow: 'bg-yellow-300',
  purple: 'bg-purple-400',
  orange: 'bg-orange-400',
  gray: 'bg-gray-400',
  pink: 'bg-pink-400',
  teal: 'bg-teal-300',
  indigo: 'bg-indigo-300',
};

export function ClanShowListItem({ clan }: ClanShowListItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const colorClass =
    COLOR_OPTIONS[clan.clanColor as keyof typeof COLOR_OPTIONS];
  const userId = useSelector(selectUserId);
  const isLeader = userId === clan.leaderId;

  return (
    <div
      className={`${colorClass} w-[500px] h-auto p-4 rounded-xl flex flex-col border border-solid shadow-[inset_0_0_6px_rgba(0,0,0,1)] hover:scale-100 hover:bg-green-300 transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="rounded-full overflow-hidden mr-4 w-[54px] h-[54px] bg-black shadow-[0_0_6px_rgba(255,255,255,1)]">
          <Image
            unoptimized
            src={clan.logo}
            alt={clan.clanName}
            width={54}
            height={54}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col  flex-1">
          <h3 className="font-serif text-xl text-gray-800">{clan.clanName}</h3>
          <p className="font-bold">
            {t('form.server')}: {clan.server}
          </p>
        </div>

        <div className="flex flex-col gap-2 items-end">
          <div className="flex items-center gap-2">
            <FaPerson size={24} />
            <p className="font-bold">{clan.clanChars.length}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-gray-800 pt-2 mt-2">
        <p className="font-bold">
          {t('form.master')}:{' '}
          <span className="font-serif">{clan.leaderCharNick} </span>
        </p>
        {!isLeader ? (
          <button
            type="button"
            className="h-10 px-4 text-white text-xl font-bold flex items-center justify-center rounded border border-black bg-green-700 shadow-[inset_0_0_6px_rgba(0,0,0,1)] hover:bg-blue-700"
          >
            {t('form.join')}
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              dispatch(openModal({ type: 'deleteClan', data: clan._id }))
            }
            className="w-10 h-10 flex items-center justify-center rounded border border-black bg-red-700 shadow-[inset_0_0_6px_rgba(0,0,0,1)]"
          >
            <MdDelete
              size={26}
              color="white"
              className="hover:scale-110 transition-all duration-300"
            />
          </button>
        )}
      </div>
    </div>
  );
}
