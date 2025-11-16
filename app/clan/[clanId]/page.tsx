'use client';

import { getClans } from '@/redux/clan/operation';
import { selectClans, selectClansLoading } from '@/redux/clan/selectors';

import { AppDispatch } from '@/redux/store';
import { ClockLoader } from 'react-spinners';
import { FaRegEdit } from 'react-icons/fa';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import MessagePopup from '@/app/components/messagPopup';
import { selectUserId } from '@/redux/auth/selectors';
import AddToClanForm from '@/app/components/addToClanForm';
import AddToClanList from '@/app/components/addToClanList';
import ClanCharsList from '@/app/components/clanCharsList';
import { selectAllChars } from '@/redux/char/selectors';
import { Character } from '@/redux/char/slice';
import Link from 'next/link';
import { MdDelete } from 'react-icons/md';
import { openModal } from '@/redux/modals/slice';

export default function Page() {
  const params = useParams();
  const { t } = useTranslation();
  const clanId = Array.isArray(params?.clanId)
    ? params.clanId[0]
    : params?.clanId;

  const dispatch = useDispatch<AppDispatch>();
  const chars = useSelector(selectAllChars) as Character[];
  const clans = useSelector(selectClans);
  const userId = useSelector(selectUserId);
  const isLoading = useSelector(selectClansLoading);
  const [isOpen, setIsOpen] = useState(false);
  const isLeader = clans.find(clan => clan.leaderId === userId);
  const isOfficer = chars.some(
  char =>
    char.userId === userId &&
    char.clan?.clanId === clanId &&
    char.clan?.role === "officer"
); 
  const currentClan = useMemo(() => {
    return clans.find(clan => clan._id === clanId) || null;
  }, [clans, clanId]);
  useEffect(() => {
    if (!clans.length) {
      dispatch(getClans());
    }
  }, [dispatch, clans.length]);

  const userHasAcceptedChar = useMemo(() => {
    return chars.some(
      char =>
        char.userId === userId &&
        char.clan?.clanId === clanId &&
        char.clan?.accepted === true
    );
  }, [chars, userId, clanId]);

  if (!currentClan) return null;

  return (
    <main className="pl-80 pt-40 min-w-screen min-h-screen flex flex-col relative">
      {(isLeader || isOfficer) &&(<Link
        href={`/clan/${clanId}/gvg`}
        className="absolute w-64 flex items-center justify-center h-11 z-50 top-52 right-10 bg-black  text-xl text-white font-bold px-4 py-2 rounded hover:bg-red-400 transition-transform shadow-[inset_0_0_6px_rgba(255,0,0,1)] border border-red-700"
      >
       {t("page.clansPage.createGvg")}
      </Link>)}
      
      <h2 className="pl-12 pt-12 mb-6 font-serif text-2xl font-bold text-red-800">
        {t('page.clan')} <span className='text-black'>{currentClan?.clanName}</span>
      </h2>

      <div className="mb-8 pl-32">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-lg font-bold text-gray-700">
            {t('page.clansPage.clanAbout')}
          </p>
          {isLeader && (
            
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="text-blue-600 hover:text-blue-700 transition-all duration-300"
            >
              <FaRegEdit size={22} />
            </button>
          )}
        </div>

        {isLoading ? (
          <ClockLoader size={24} color="#2563eb" />
        ) : (
          <p className="max-w-[900px] bg-blue-100 text-lg text-gray-700 p-2 rounded mr-12">
            {currentClan?.message || t('page.clansPage.clanInfoNotAdded')}
          </p>
        )}
      </div>

      <div className="w-auto h-auto border-solid border-t border-gray-700"></div>

      {isOpen && clanId && (
        <MessagePopup
          currentClan={currentClan}
          onClose={() => setIsOpen(false)}
        />
      )}

      <div className=" flex flex-row  ">
        <AddToClanForm currentClan={currentClan} />
        <div className="w-full pb-16 border-l border-solid border-gray-700">
          <AddToClanList
            clanId={clanId!}
            clanColor={currentClan?.clanColor}
            leaderId={currentClan?.leaderId}
          />
        </div>
      </div>

      <div className="w-auto h-auto border-solid border-t border-gray-700"></div>

      {userHasAcceptedChar && <ClanCharsList currentClan={currentClan} />}
      <div className="w-auto h-auto border-solid border-t border-gray-700"></div>
      
      {isLeader && (  <div className="px-12 py-12 flex justify-between"><h3 className="text-lg font-bold text-gray-700 mb-4">{t("page.clansPage.clanDeleteRestriction")}</h3>
        <button
          type="button"
          onClick={() =>
            dispatch(
              openModal({
                type: 'deleteClan',
                data: {
                  clanId: currentClan._id,
                  clanChars: currentClan.clanChars,
                },
              })
            )
          }
          className="w-64 h-11 flex items-center justify-center rounded border border-black bg-red-700 shadow-[inset_0_0_6px_rgba(0,0,0,1)] text-white font-bold text-xl"
        > {t("page.clansPage.deleteClan")} 
       
        </button></div>
      )}
    </main>
  );
}
