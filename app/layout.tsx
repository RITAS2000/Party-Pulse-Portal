"use client"
import { ReactNode } from "react";
import "./globals.css";
import Sidebar from "./components/sidebar";
import { I18nextProvider } from 'react-i18next';
import i18n from "../i18n";



interface Props {
  children: ReactNode;
}
export default function RootLayout({ children }: Props) {
 
  return (
    <html lang="uk">
      <head>
        <title>Party Pulse Portal</title>
      </head>
      <body>
         <I18nextProvider i18n={i18n}>
        <Sidebar/>
          {children}
       </I18nextProvider>
      </body>
    </html>
  );
}