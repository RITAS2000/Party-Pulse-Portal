"use client"
import { selectClans } from "@/redux/clan/selectors"
import { useSelector } from "react-redux"
import { ClanShowListItem } from "./clanShowListIttem"
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useEffect, useMemo } from "react";
import { getClans } from "@/redux/clan/operation";
import { getAllCharacters } from "@/redux/char/operation";
import { useTranslation } from "react-i18next";




export default function ClanShowList() {

 const dispatch = useDispatch<AppDispatch>();
    const clans = useSelector(selectClans)
      const { t } = useTranslation();
    const reversedClans = useMemo(() => [...clans].reverse(), [clans]);
     useEffect(() => {
         dispatch(getClans())
         dispatch(getAllCharacters());
}, [dispatch]);

    
    
     if (!clans || clans.length === 0) {
    return (
      <p className="text-xl text-gray-400 pl-12 pt-4">{t('page.notClans')}</p>
    );
  }
    return (
        
        <ul className="mt-4 mx-6 flex flex-wrap gap-4 ">
            {reversedClans.map(clan => (<li key={clan._id} >
                <ClanShowListItem clan={clan} />
            </li>))}
        </ul>
    )
}