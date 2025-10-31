"use client";
import Image from "next/image";
import React from "react";
import { useTranslation } from 'react-i18next';
import { IoExitOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors"
import { logout } from "../../redux/auth/operation";
import { AppDispatch } from "../../redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";


export interface HeaderProps {
    onClick?: () => void;
} 


export default function Header({ }: HeaderProps) {
    const router = useRouter();
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const dispatch = useDispatch<AppDispatch>();
    const hanleLogout = () => {
        dispatch(logout()); 
        router.push("/");
    };
        
     const { t } = useTranslation();
    return (
        <header className="fixed z-10 w-full h-40 bg-[linear-gradient(to_left,rgba(220,38,38,1),rgba(220,38,38,0)),url('/header.jpg')] bg-cover bg-center flex items-center  pr-10 py-4 shadow-lg">
            <div className="flex  gap-8 items-center ml-auto">
                 <Image src="/PW.png" alt="logo PW" width={140} height={130} className="w-36 h-auto" />
                {!isLoggedIn && <Link href="/login" className=" w-[52px] h-full text-white font-bold hover:underline transition-all duration-300">{t("auth.login")}</Link>}
                {!isLoggedIn && <Link href="/register" className="w-[130px] text-white font-bold text-nowrap flex items-center justify-center px-4 h-12 rounded-lg bg-red-400 hover:drop-shadow-[0_0_6px_white] transition-all duration-300" >{t("auth.signup")}</Link>}
                {isLoggedIn && <div className="w-1 h-[80px] rounded bg-yellow-200"></div>}
                {isLoggedIn && <button type="button" onClick={hanleLogout}><IoExitOutline size={40} color="white" /></button>}
                </div>
        </header>
    )
}