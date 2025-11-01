"use client";
import React from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { selectIsAdmin } from "@/redux/auth/selectors";


export default function AdminPage() {
  const isAdmin = useSelector(selectIsAdmin)
     if (!isAdmin) { redirect("/");}
  return (
 
    <main className="pl-80 pt-40 ">
      
      <h1 className=""> hi admin</h1>
       <p className="text-xl pt-8 pb-2 pl-4">
            слухай а як наприклад я зроблю клан и на картинці клана додам кнопку
            всупить мае відправитись повидомлення в базу що я хочу вступити типа ади
            клана ааки игрока и член ффолс а на клан странице типа получать игрока с
            айди и фолс и делать его не активнім и дать кму возможность принять
            изменяя на тру да?
      </p>
    <p>так я хочу створити галерею персонажів загальну тобто шоб пушили в нову колекцію щоб я как админ її бачив и підтверджувала чи показувати чи ні тобто це мае бути копія персонажа а не основний персонаж на своему персонажі грацець натискае показати або сховати якщо показати то він мае пушнутись до нової колекціі яку спочатку перревіряе адмн і якщо тру то тільки тоді відображати</p></main> 
    
  );
}

