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
      
      <h1 className=""> hi admin</h1></main> 
    
  );
}
