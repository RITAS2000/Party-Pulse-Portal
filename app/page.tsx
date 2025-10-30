'use client'
import React from "react";

import { useTranslation } from "react-i18next";

export default function Home() {
    const { t } = useTranslation();
  return (
 
    <main className="pl-80 pt-40">
   
       <div className="ml-80 pl-20 pr-6 text-gray-700 font-serif text-5xl">
                      <h1>{t("header.welcome")}</h1>
                     
                  </div></main> 
    
  );
}
