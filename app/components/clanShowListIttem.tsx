import { ClanColor } from '@/redux/clan/colors';

import Image from 'next/image';


interface Clan {
  clanName: string;
  clanColor: ClanColor;
  logo: string;
  server: string;
  leaderId: string;
  members: string[];
}

interface ClanShowListItemProps {
  clan: Clan;
}

const COLOR_OPTIONS = {
  red: 'bg-red-300',
  blue: 'bg-blue-300',
  green: 'bg-green-300',
  yellow: 'bg-yellow-200',
  purple: 'bg-purple-300',
  orange: 'bg-orange-300',
  gray: 'bg-gray-400',
  pink: 'bg-pink-300',
  teal: 'bg-teal-200',
  indigo: 'bg-indigo-300',
};


export function ClanShowListItem({ clan }: ClanShowListItemProps) {
     
    const colorClass = COLOR_OPTIONS[clan.clanColor as keyof typeof COLOR_OPTIONS];


  return (
      <div className={`${colorClass} w-[500px] h-40 p-4 rounded-xl flex border border-solid shadow-[inset_0_0_6px_rgba(0,0,0,1)] hover:scale-100 hover:bg-green-300 transition-all duration-300`}>
          <div className='rounded-full overflow-hidden w-14 h-14 bg-black'>
              <Image unoptimized src={clan.logo} alt={clan.clanName} width={30} height={30} className='w-12 h-12 rounded-full object-cover ' />
          </div>
          <div className='flex flex-col'>
      <h3>{clan.clanName}</h3>
              <p>сервер {clan.server}</p>
              </div>
    </div>
  );
}
