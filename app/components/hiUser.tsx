"use client"
import { useSelector } from 'react-redux';
import { selectUserData } from '@/redux/auth/selectors';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HiUser() {
     const router = useRouter();
     const user = useSelector(selectUserData);
     const { t } = useTranslation();
     useEffect(() => {
    if (!user) {
         router.replace('/');   
          }  
     }, [user, router]);
     if (!user) return null;
    return (
         <h2 className="pl-12 pt-12 mb-2 font-serif text-2xl font-bold text-red-800">
              {user.username} {t("page.greeting")}</h2>
    )
}