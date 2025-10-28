import React from "react";
import { redirect } from "next/navigation";
const isAdmin= true

export default function AdminPage() {
     if (!isAdmin) { redirect("/");}
  return (
 
    <main className="ml-70 ">
      
      <h1 className="pl-80"> hi admin</h1></main> 
    
  );
}
