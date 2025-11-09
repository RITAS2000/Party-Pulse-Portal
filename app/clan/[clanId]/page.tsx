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




export default function Page() {
    const params = useParams();
    const { t } = useTranslation();
  const clanId = Array.isArray(params?.clanId)
    ? params.clanId[0]
    : params?.clanId;
 const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const chars = useSelector(selectAllChars) as Character[];
    const clans = useSelector(selectClans);
  const userId = useSelector(selectUserId)
  const isLoading = useSelector(selectClansLoading)
   const [isOpen, setIsOpen] = useState(false);
const isLeader = clans.find(clan => clan.leaderId === userId);
const currentClan = useMemo(() => {
  return clans.find(clan => clan._id === clanId) || null;
}, [clans, clanId]);
    useEffect(() => {
   
    if (!clans.length) {
      dispatch(getClans());
    }
  }, [dispatch, clans.length]);
    useEffect(() => {
    if (currentClan === null) {
      router.push('/'); 
    }
    }, [currentClan, router]);
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
  <main className="pl-80 pt-40 min-w-screen min-h-screen flex flex-col"
    >
    <h2 className="pl-12 pt-12 mb-6 font-serif text-2xl font-bold text-red-800">
      {t("page.clan")} {currentClan?.clanName}
    </h2>

    <div className="mb-8 pl-32">
      <div className="flex items-center gap-2 mb-2">
        <p className="text-lg font-bold text-gray-700">{t("page.clansPage.clanAbout")}</p>
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
          {currentClan?.message|| t('page.clansPage.clanInfoNotAdded')}
        </p>
      )}
    </div>

    <div className="w-auto h-auto border-solid border-t border-gray-700"></div>

    {isOpen && clanId && (
      <MessagePopup currentClan={currentClan} onClose={() => setIsOpen(false)} />
          )}
          


      <div className=' flex flex-row  '>  

        <AddToClanForm currentClan={currentClan} /><div className='w-full pb-16 border-l border-solid border-gray-700'>
          <AddToClanList clanId={clanId!} clanColor={currentClan?.clanColor} leaderId={currentClan?.leaderId} />
        </div></div> 
      
      <div className="w-auto h-auto border-solid border-t border-gray-700"></div>

      {userHasAcceptedChar && <ClanCharsList currentClan={currentClan} />}
  </main>
);
}
