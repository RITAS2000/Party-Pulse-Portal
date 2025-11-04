"use client"
;
import { useTranslation } from "react-i18next";
import GalleryList from "../components/galleryList";

export default function Page() {
      const { t } = useTranslation();
    
    return <main className="pl-80 pt-40 min-w-screen min-h-screen">
         <h3 className="pl-12 pt-12 mb-2 font-serif text-2xl font-bold text-red-800">
          {t('page.galleryTitle')}
        </h3>
        <div className="w-auto h-auto border-solid border-t border-gray-700"></div>
     <GalleryList/>
        </main>
}