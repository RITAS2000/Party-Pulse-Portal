"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from 'react-i18next';


export interface SidebarProps { 
      isAdmin?: boolean;
}
export default function Sidebar({ isAdmin }: SidebarProps) {
    const { t, i18n } = useTranslation();
    
    
      const changeLanguage = (lng: string) => {
          i18n.changeLanguage(lng);
          
}
 
    return (
        <aside className="fixed flex flex-col  gap-8 px-4 py-4 w-80 h-full rounded-tr-lg rounded-br-lg border-r-4  border-yellow-200 bg-red-800">
            <div className="  flex flex-col gap-6 w-full h-36 items-center border-b-2 border-yellow-200">
                <div className="flex flex-row justify-around w-full items-center">
                <Link href="https://portfolio-lev-yuliia.vercel.app/" className="w-31 h-13">
                <Image src="/my-logo-1.png" alt="logo" width={124} height={48} className=" hover:drop-shadow-[0_0_6px_white] transition-all duration-300"/></Link>
                    <Link href="https://ko-fi.com/ritas2000" target="_blank" rel="noopener noreferrer" className="flex items-center border-2 p-1 hover:bg-red-400 transition duration-300 ease-in-out"><p className="font-sans text-xs text-center text-white w-16">{t("sidebar.coffee")}</p><Image src="/coffee.png" alt="coffee" width={30} height={30} /></Link>
                    </div>
                <div className="w-40 flex justify-around">
                    <button onClick={() => changeLanguage('uk')} className="w-7 h-7 rounded-full overflow-hidden border-2 border-white flex items-center justify-center hover:scale-110 transition-all duration-300 "><Image src="/UK.jpg" alt="uk-flag" width={24} height={24}  className="object-cover"/></button>
                    <button onClick={() => changeLanguage('en')} className="w-7 h-7 rounded-full overflow-hidden border-2 border-white
                     flex items-center justify-center hover:scale-110 transition-all duration-300"><Image src="/GB.jpg" alt="gb-flag" width={30} height={30} className="object-cover" /></button>
                    <button onClick={() => changeLanguage('ru')} className="w-7 h-7 rounded-full overflow-hidden border-2 border-white flex items-center justify-center hover:scale-110 transition-all duration-300"><Image src="/RU.jpg" alt="ru-flag" width={24} height={24}  className="object-cover"/></button>
                </div>
            </div>
            <nav><ul>
                <li><Link href="/">Home</Link></li>
                 {isAdmin && (
          <li>
            <Link href="/admin">Admin Page</Link>
          </li>
                )}
            </ul></nav>
        </aside>
    );

}