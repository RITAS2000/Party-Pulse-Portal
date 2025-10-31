"use client"
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectAuth } from '../../redux/auth/selectors.js';
import { logout } from '../../redux/auth/operation';
import { AppDispatch } from '../../redux/store.js';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next'; 
import { useRouter } from 'next/navigation';


export function useTokenGuard() {
const { t } = useTranslation();
const dispatch = useDispatch<AppDispatch>();
  const { accessToken, expiresIn } = useSelector(selectAuth);
  const router = useRouter();

useEffect(() => {
if (!accessToken) {
  dispatch(logout());
   router.push("/"); 
return;
  }
  
const cleanDate =
  String(expiresIn).match(
    /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/
  )?.[0] || null;

if (!cleanDate) {
  dispatch(logout());
   router.push("/"); 
  return;
}
const expired = Date.now() > new Date(cleanDate).getTime();

if (expired) {
  toast.warning(t("toast.sessionOff"));
  dispatch(logout());
   router.push("/"); 
}


}, [accessToken, expiresIn, dispatch, router, t]);
}
export default function TokenGuard() {
  useTokenGuard();
  return null;
}