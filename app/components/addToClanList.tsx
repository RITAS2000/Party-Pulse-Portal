"use client"
import { selectAllChars } from "@/redux/char/selectors"
import { useDispatch, useSelector } from "react-redux"
import { CharacterType } from "./charList";
import AddToClanItem from "./addToClanListItem";
import { useEffect, useMemo } from "react";
import { getAllCharacters } from "@/redux/char/operation";
import { AppDispatch } from "@/redux/store";
import { useTranslation } from "react-i18next";

type AddToClanListProps = {
    clanId: string;
    clanColor?: string;
    leaderId?: string;

}

export default function AddToClanList({ clanId, clanColor , leaderId}: AddToClanListProps) {
    const dispatch = useDispatch<AppDispatch>();
     const { t } = useTranslation();
  
    const chars = useSelector(selectAllChars) as CharacterType[];
    useEffect(() => {
        dispatch(getAllCharacters());
    }, [dispatch]);


   const filteredChars = useMemo(() => {
  return chars.filter(
    char => char.clan?.clanId === clanId && char.clan?.accepted === false
  );
}, [chars, clanId]);
   
    

    return ( <div className="px-12 py-12">
      <h3 className="text-lg font-bold text-gray-700 mb-4">{t("page.clansPage.pendingApproval")}</h3>
      {filteredChars.length > 0 ? (
        <ul className="flex flex-row flex-wrap gap-5">
          {filteredChars.map((char, index) => (
              <li key={char._id} className="flex items-center pl-4  bg-black rounded"><p className="text-white font-bold">{ index+1}</p>
                  <AddToClanItem char={char} clanColor={clanColor} clanId={clanId} leaderId={leaderId} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xl text-gray-400 pl-12 pt-4">{t("page.clansPage.noPendingRequests")}</p>
      )}
    </div>
    )
}