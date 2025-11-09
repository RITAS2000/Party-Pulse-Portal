import { Character } from "@/redux/char/slice";
import clsx from "clsx";
import Image from "next/image";
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { selectUserId } from "@/redux/auth/selectors";
import { openModal } from "@/redux/modals/slice";

type ClanCharsListItemProps = {
    char: Character;
    clanColor?: string;
    clanId: string;
    leaderId?: string;
    leaderChar?: string;
};

export default function ClanCharsListitem({ char, clanColor, clanId, leaderId, leaderChar }: ClanCharsListItemProps) {
    const dispatch = useDispatch<AppDispatch>();
    // const { t } = useTranslation();
    
    const currentUserId = useSelector(selectUserId); 

  const canRemove =
    char.userId === currentUserId || leaderId === currentUserId; 


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
    
    
  
    return (
        <div className="flex items-center gap-3 ml-4 pr-3  ">
           
                <div className={`flex flex-row items-center justify-between w-56 h-[48px] ${bgColorClass} rounded py-2 px-3 shadow-[inset_0_0_6px_rgba(0,0,0,1)]`}>
                <div className="flex items-center gap-3 ">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black shadow-[inset_0_0_6px_rgba(255,255,255,1)]">
                <Image src={`/iconHero/${char.race}.png`} alt={`${char.race}`} width={30} height={30} className="w-7 h-7 rounded-full"/></div>
                    <p className="font-serif font-bold">{char.nickname}</p></div><p className="font-bold">{char.level}</p></div>
            <div className="flex gap-4 mt-1">
                {canRemove  &&
                    <button type="button" className="flex items-center justify-center w-6 h-6 bg-red-600 shadow-[inset_0_0_6px_rgba(0,0,0,1)]"><IoClose onClick={() =>
              dispatch(
                openModal({
                  type: 'outClan',
                  data: { charId: char._id, clanId, server: char.server, leaderChar,},
                })
              )
            } size={20} color="white" /></button>}
            
            </div>
            </div>
    )
}