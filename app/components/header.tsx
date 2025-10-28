"use client";
import { openModal } from "@/redux/modals/slice";
import Image from "next/image";
import React from "react";
import { useTranslation } from 'react-i18next';
import { IoExitOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";

export interface HeaderProps {
    onClick?: () => void;
} 


export default function Header( {}: HeaderProps) {
     const dispatch = useDispatch();
    const handleOpenModal = () => dispatch(openModal({ type: 'register' }));
     const { t } = useTranslation();
    return (
        <header className="w-full h-40 bg-[linear-gradient(to_left,rgba(220,38,38,1),rgba(220,38,38,0)),url('/header.jpg')] bg-cover bg-center flex items-center justify-between pr-10 py-4 shadow-lg">
            <div className="ml-80 pl-20 pr-6 text-white font-serif text-5xl"><h1>{t("header.welcome")}</h1><p></p></div>
            <Image src="/PW.png" alt="logo PW" width={140} height={130} />
            <div className="flex  gap-8 items-center"><button type="button" className="text-white ">{t("auth.login")}</button>
                <button type="button" onClick={handleOpenModal} className="text-white items-center justify-center px-4 h-12 rounded-lg bg-red-400 hover:drop-shadow-[0_0_6px_white] transition-all duration-300" >{t("auth.signup")}</button>
                <div className="w-1 h-[80px] rounded bg-yellow-200"></div>
                <button type="button"><IoExitOutline size={40} color="white"/></button></div>
        </header>
    )
}