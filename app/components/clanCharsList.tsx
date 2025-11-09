import { selectAllChars } from "@/redux/char/selectors";
import { Clan } from "@/redux/clan/slice"
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { Character } from "@/redux/char/slice";
import ClanCharsListitem from "./clanCharsListItem";

interface ClanCharsListProps {
  currentClan: Clan | null;
}

export default function ClanCharsList({ currentClan }: ClanCharsListProps) {
    const clanId = currentClan?._id
    const chars = useSelector(selectAllChars) as Character[];
    const filteredChars = useMemo(() => {
      return chars.filter(
        char => char.clan?.clanId === clanId && char.clan?.accepted === true
      ).sort((a, b) => b.level - a.level);
    }, [chars, clanId]);
    
    return (
        <div className="px-12 py-12"><h3 className="text-lg font-bold text-gray-700 mb-4">состав клана:</h3>
            <ul className="flex flex-row flex-wrap gap-5">
                {filteredChars.map((char, index) => (<li  className="flex w-[314px] bg-black rounded items-center pl-4" key={char._id}><p className="text-white font-bold">{index+1}</p><ClanCharsListitem char={char} clanColor={currentClan?.clanColor} clanId={currentClan!._id} leaderId={currentClan?.leaderId} leaderChar={currentClan?.charId} /></li>))}
            </ul></div>
    )
}