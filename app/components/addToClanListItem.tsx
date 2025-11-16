import { Character } from "@/redux/char/slice";
import clsx from "clsx";
import Image from "next/image";
import { IoClose } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa6';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { acceptCharToClan, notAcceptCharToClan } from "@/redux/clan/operation";
import { getAllCharacters, getFreeChars } from "@/redux/char/operation";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { selectUserId } from "@/redux/auth/selectors";

 
type AddToClanItemProps = {
    char: Character;
    clanColor?: string;
    clanId: string;
    leaderId?: string;
};
export default function AddToClanItem({ char, clanColor, clanId, leaderId }: AddToClanItemProps) {
    const dispatch = useDispatch<AppDispatch>();
     const { t } = useTranslation();
    const currentUserId = useSelector(selectUserId); 
    const isLeader = leaderId === currentUserId; 
    const canRemove = leaderId === currentUserId || char.userId === currentUserId;

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
    
    const handleAccept = async(charId: string, clanId: string) => {
        await dispatch(acceptCharToClan({ charId, clanId })).unwrap();
        toast.success(t("toast.characterAccepted"))
        dispatch(getAllCharacters());
  
     };
    const handleNoAccept = async (charId: string, clanId: string) => {
       await dispatch(notAcceptCharToClan({ charId, clanId }));
        toast.success(t("toast.notAccepted"))
        dispatch(getFreeChars(char.server))
         dispatch(getAllCharacters());
    };
    
    return (<div className=" flex items-center gap-3 pr-3 ml-4 ">
        <div className={`flex flex-row items-center justify-between w-[224px] h-[40px] ${bgColorClass} rounded py-1 px-3 shadow-[inset_0_0_6px_rgba(0,0,0,1)]`}>
        <div className="flex items-center gap-3 ">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black shadow-[inset_0_0_6px_rgba(255,255,255,1)]">
        <Image src={`/iconHero/${char.race}.png`} alt={`${char.race}`} width={30} height={30} className="w-7 h-7 rounded-full"/></div>
            <p className="font-serif font-bold">{char.nickname}</p></div><p className="font-bold">{char.level}</p></div>
        <div className="flex gap-4">
            {isLeader && <button type="button" onClick={() => handleAccept(char._id, clanId)} className="flex items-center justify-center w-6 h-6 bg-green-600 shadow-[inset_0_0_6px_rgba(0,0,0,1)] hover:bg-green-300 transition-all duration-300 "><FaCheck color="white" /></button>}
            {canRemove && <button type="button" className="flex items-center justify-center w-6 h-6 bg-red-600 shadow-[inset_0_0_6px_rgba(0,0,0,1)] hover:bg-red-300 transition-all duration-300"><IoClose onClick={() => { handleNoAccept(char._id, clanId) }} size={20} color="white" /></button>}</div>
    </div>)

}