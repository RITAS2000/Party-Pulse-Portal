import { Character } from '@/redux/char/slice';
import clsx from 'clsx';
import Image from 'next/image';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { selectUserId } from '@/redux/auth/selectors';
import { openModal } from '@/redux/modals/slice';
import { useState } from 'react';
import { FiInfo } from 'react-icons/fi';
import { toast } from 'react-toastify';
import {
  addOfficer,
  removeOfficer,
  transferLeadership,
} from '@/redux/clan/operation';
import { getAllCharacters } from '@/redux/char/operation';
import { useTranslation } from 'react-i18next';

type ClanCharsListItemProps = {
  char: Character;
  clanColor?: string;
  clanId: string;
  leaderId?: string;
  leaderChar?: string;
  onLeaderChange?: (newLeaderId: string) => void;
};

export default function ClanCharsListitem({
  char,
  clanColor,
  clanId,
  leaderId,
  leaderChar,
  onLeaderChange,
}: ClanCharsListItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const currentUserId = useSelector(selectUserId);
  const isLeader = currentUserId === leaderId;

  const canRemove = char.userId === currentUserId || leaderId === currentUserId;

  const bgColorClass = clsx({
    'bg-red-300': clanColor === 'red',
    'bg-blue-300': clanColor === 'blue',
    'bg-green-300': clanColor === 'green',
    'bg-yellow-200': clanColor === 'yellow',
    'bg-purple-300': clanColor === 'purple',
    'bg-orange-300': clanColor === 'orange',
    'bg-gray-400': clanColor === 'gray',
    'bg-pink-300': clanColor === 'pink',
    'bg-teal-200': clanColor === 'teal',
    'bg-indigo-300': clanColor === 'indigo',
  });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuPosition({ x: e.pageX, y: e.pageY });
  };
  const handleClose = () => setMenuPosition(null);

  const handleAction = async (action: string) => {
    if (action === 'Remove from clan') {
      dispatch(
        openModal({
          type: 'outClan',
          data: { charId: char._id, clanId, server: char.server, leaderChar },
        })
      );
    } else if (action === 'Appoint officer') {
      await dispatch(addOfficer({ charId: char._id, clanId }));
    } else if (action === 'Remove officer') {
      await dispatch(removeOfficer({ charId: char._id, clanId }));
    } else if (action === 'Transfer leadership') {
      if (leaderChar === char._id) {
        toast.error(t('toast.transferLeadership.error'));
        handleClose();
        return;
      }

      await dispatch(transferLeadership({ newLeaderCharId: char._id, clanId }));

      toast.success(t('toast.transferLeadership.success'));
      onLeaderChange?.(char._id);
    }
    dispatch(getAllCharacters());
    handleClose();
  };
  return (
    <div
      onContextMenu={handleContextMenu}
      className="flex items-center gap-3 ml-4 pr-3  "
    >
      <div
        className={`flex flex-row items-center justify-between w-56 h-[40px] ${bgColorClass} rounded py-1 px-3 shadow-[inset_0_0_6px_rgba(0,0,0,1)]`}
      >
        <div className="flex items-center gap-3 ">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black shadow-[inset_0_0_6px_rgba(255,255,255,1)]">
            <Image
              src={`/iconHero/${char.race}.png`}
              alt={`${char.race}`}
              width={30}
              height={30}
              className="w-7 h-7 rounded-full"
            />
          </div>
          <p className="font-serif font-bold">{char.nickname}</p>
        </div>
        <p className="font-bold">{char.level}</p>
      </div>
      {menuPosition && (
        <ul
          className="absolute bg-black border border-gray-700 text-white rounded shadow-lg z-50"
          style={{ top: menuPosition.y, left: menuPosition.x }}
          onMouseLeave={handleClose}
        >
          {isLeader && (
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => handleAction('Transfer leadership')}
            >
              {t('page.transferLeadership')}
            </li>
          )}
          {isLeader && (
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={() =>
                handleAction(
                  char.clan.role === 'officer'
                    ? 'Remove officer'
                    : 'Appoint officer'
                )
              }
            >
              {char.clan.role === 'officer'
                ? t('page.removeOfficer')
                : t('page.appointOfficer')}
            </li>
          )}

          {canRemove && (
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => handleAction('Remove from clan')}
            >
              {t('page.removeFromClan')}
            </li>
          )}
        </ul>
      )}{' '}
      <FiInfo color="white" size={24} className='hover:scale-125 transition-all duration-300'/>
    </div>
  );
}
