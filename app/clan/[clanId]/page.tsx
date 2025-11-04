"use client"
import SimpleFormikTextarea from "@/app/components/clanInfo";
import { useState } from "react";


export default function Page() {
   
    const [isOpen, setIsOpen]= useState(false);

    const hendleOpen = () => {
        setIsOpen(true)
    };
    return <main className="pl-80 pt-40 min-w-screen min-h-screen  flex flex-col  ">
        <h2>Клан название клана </h2>
        <p>описание <span>текст из сохраненного сообщения</span></p>
        <button type="button" onClick={hendleOpen}> радактировать </button>
        {isOpen && <SimpleFormikTextarea/>}
        
        </main>
}