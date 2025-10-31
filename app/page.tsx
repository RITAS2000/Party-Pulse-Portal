'use client'
import React from "react";

import { useTranslation } from "react-i18next";

export default function Home() {
    const { t } = useTranslation();
  return (
 
    <main className="pl-80 pt-40">
   
       <div className=" pr-6">
        <h1 className=" text-gray-700 font-serif text-5xl">{t("header.welcome")}</h1>
        <p>Цей портал створено для ком’юніті гри Perfect World (ранні версії), де складно, але весело.
За участі гравців портал надає можливість в кілька кліків, без додаткових нагадувань, зареєструватися на GVG клан.
Майстер по GVG швидко може створити партію, легко копіювати дані та організувати гру. Легка гра — легке створення та керування партіями!</p>
                     
                  </div></main> 
    
  );
}
