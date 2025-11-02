"use client"
import { selectClans } from "@/redux/clan/selectors"
import { useSelector } from "react-redux"
import { ClanShowListItem } from "./clanShowListIttem"
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getClans } from "@/redux/clan/operation";




export default function ClanShowList() {

 const dispatch = useDispatch<AppDispatch>();
    const clans = useSelector(selectClans)
     useEffect(() => {
 dispatch(getClans())
}, [dispatch]);

     if (!clans || clans.length === 0) {
    return <p>Клани відсутні</p>;
    }
    

    return (
        
        <ul className="mt-4 mx-6 flex flex-wrap justify-between ">
            {[...clans].reverse().map(clan => (<li key={clan._id} >
                <ClanShowListItem clan={clan} />
            </li>))}
        </ul>
    )
}