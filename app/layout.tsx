"use client"
import { ReactNode } from "react";
import "./globals.css";
import Sidebar from "./components/sidebar";
import { I18nextProvider } from 'react-i18next';
import i18n from "../i18n";
import ReModalContainer from "./components/modalContainer";
import { ReduxProvider } from "./components/reduxProvider";
const isAdmin = false



interface Props {
  children: ReactNode;
}
export default function RootLayout({ children }: Props) {
 
  return (
    <html lang="uk">
      <head>
        <title>Party Pulse Portal</title>
         <link rel="icon" href="/favicon.png" type="image/x-icon" />
      </head>
      <body>
         
         <I18nextProvider i18n={i18n}>
          <Sidebar isAdmin={isAdmin} />
          <ReduxProvider>
          {children}
            <ReModalContainer />
          </ReduxProvider>
          </I18nextProvider>
         
      </body>
    </html>
  );
}