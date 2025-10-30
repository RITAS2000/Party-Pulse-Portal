import Image from "next/image";
import { RootState } from "@/redux/store";
import { setLanguage } from "@/redux/lang/slice";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

export default function LangBox() {

      const locale = useSelector((state: RootState) => state.lang.locale);
    const dispatch = useDispatch();
    const { i18n } = useTranslation();

  
    useEffect(() => {
        i18n.changeLanguage(locale);
    }, [locale, i18n]);

    const changeLanguage = (lng: string) => {
        dispatch(setLanguage(lng)); 
    }; 
    return (
        <div className="w-40 flex justify-around">
           <button onClick={() => changeLanguage('uk')} className="w-7 h-7 rounded-full overflow-hidden border-2 border-white flex items-center justify-center hover:scale-110 transition-all duration-300 ">
                <Image src="/UK.jpg" alt="uk-flag" width={24} height={24} className="object-cover" />
           </button>
           <button onClick={() => changeLanguage('en')} className="w-7 h-7 rounded-full overflow-hidden border-2 border-white flex items-center justify-center hover:scale-110 transition-all duration-300">
                <Image src="/GB.jpg" alt="gb-flag" width={30} height={30} className="object-cover" />
           </button>
            <button onClick={() => changeLanguage('ru')} className="w-7 h-7 rounded-full overflow-hidden border-2 border-white flex items-center justify-center hover:scale-110 transition-all duration-300">
                <Image src="/RU.jpg" alt="ru-flag" width={24} height={24} className="w-6 h-6 object-cover" />
            </button>
        </div>)
}