"use client"
import { ReactNode } from "react";
import "./globals.css";
import Sidebar from "./components/sidebar";
import { I18nextProvider } from 'react-i18next';
import i18n from "../i18n";
import ReModalContainer from "./components/modalContainer";
import { ReduxProvider } from "./components/reduxProvider";
import { ToastContainer } from 'react-toastify';
import PersistProvider from "./components/persistProvider";
import Header from "./components/header";




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
      <body className="bg-[linear-gradient(to_top_left,#8b5cf6_0%,rgba(139,92,246,0)_100%)] ">
         
         <I18nextProvider i18n={i18n}>
          <ReduxProvider>
          <PersistProvider>
              <Sidebar />
              <Header/>
          {children}
            <ReModalContainer />
              <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} rtl={false} pauseOnFocusLoss draggable={false} pauseOnHover theme="dark" />
          </PersistProvider>
          </ReduxProvider>
          </I18nextProvider>
         
      </body>
    </html>
  );
}