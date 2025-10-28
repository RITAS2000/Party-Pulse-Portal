"use client";
import React from "react";
import { useTranslation } from 'react-i18next';



export default function Header() {
     const { t, i18n } = useTranslation();
    return (
        <header className="w-full h-40 bg-[linear-gradient(to_left,rgba(220,38,38,1),rgba(220,38,38,0)),url('/header.jpg')] bg-cover bg-center flex items-center justify-between pr-10 shadow-lg">
            <div className="ml-80 px-20  text-white font-serif text-5xl"><h1>{t("header.welcome")}</h1><p></p></div>
            <div className="flex  gap-8"><button>login</button>
                <button>register</button>
            <button>exit</button></div>
        </header>
    )
}