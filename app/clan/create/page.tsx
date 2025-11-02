"use client"
import AddClan from "@/app/components/clanAdd";
import ClanShowList from "@/app/components/clanShowList";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCheck } from 'react-icons/fa6';
import { HiOutlineViewGridAdd } from "react-icons/hi";


export default function Page() {
    const { t } = useTranslation();
     const [isOpen, setIsOpen] = useState(false);
    return <main className="pl-80 pt-60 min-w-screen min-h-screen   ">
           <div className="flex gap-4 items-center">
                <h3 className="pl-12 mb-2 font-serif text-2xl font-bold text-red-800">
                  {t('page.addClan')}
                </h3>
                {!isOpen ? (
                  <button type="button" onClick={() => setIsOpen(true)}>
                    <HiOutlineViewGridAdd
                      size={30}
                      className="text-blue-600 hover:text-blue-700 transition-all duration-300"
                    />
                  </button>
                ) : (
                  <button type="button" onClick={() => setIsOpen(false)}>
                    <FaCheck
                      size={24}
                      className="text-green-600 hover:text-green-700 transition-all duration-300"
                    />
                  </button>
                )}
              </div>
              {!isOpen ? (
                <div className="w-auto h-auto border-solid border-t border-gray-700"></div>
              ) : (
                <AddClan />
              )}
        
        <ClanShowList/>
        </main>
}