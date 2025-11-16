import { selectAllChars } from "@/redux/char/selectors";
import { Clan } from "@/redux/clan/slice"
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { Character } from "@/redux/char/slice";
import ClanCharsListitem from "./clanCharsListItem";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface ClanCharsListProps {
  currentClan: Clan | null;
}

export default function ClanCharsList({ currentClan }: ClanCharsListProps) {
     const { t } = useTranslation();
    const clanId = currentClan?._id
    const chars = useSelector(selectAllChars) as Character[];
    const [currentLeaderChar, setCurrentLeaderChar] = useState(currentClan?.charId);
    const filteredChars = useMemo(() => {
      return chars.filter(
        char => char.clan?.clanId === clanId && char.clan?.accepted === true
      ).sort((a, b) => b.level - a.level);
    }, [chars, clanId]);

    const handleLeaderChange = (newLeaderId: string) => {
  setCurrentLeaderChar(newLeaderId);
};
  
    return (
        <div className="px-12 py-12"><h3 className="text-lg font-bold text-gray-700 mb-4">{t("page.clansPage.composition")}</h3>
           <ul className="flex flex-row flex-wrap gap-5">
  {filteredChars.map((char, index) => {
    const borderColorClass = clsx({
      "border-red-700 shadow-[0_0_10px_rgba(255,0,0,0.6)]": char.clan.role === "leader",
      "border-blue-700 shadow-[0_0_10px_rgba(0,0,255,0.6)]": char.clan.role === "officer",
      "border-green-700 shadow-[0_0_10px_rgba(0,255,0,0.6)]": char.clan.role === "member",
    });
    
    return (
      <li 
        key={char._id}
        className={`flex w-auto bg-black rounded border-solid border-2 items-center pl-4 ${borderColorClass}`}
      >
        <p className="text-white font-bold">{index + 1}</p>
        <ClanCharsListitem
          char={char}
          clanColor={currentClan?.clanColor}
          clanId={currentClan!._id}
          leaderId={currentClan?.leaderId}
                leaderChar={currentLeaderChar}
                onLeaderChange={handleLeaderChange}
        />
      </li>
    );
  })}
</ul></div>
    )
}