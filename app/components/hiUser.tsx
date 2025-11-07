"use client"
import { useSelector } from 'react-redux';
import { selectUserData } from '@/redux/auth/selectors';

export default function HiUser() {
     const user = useSelector(selectUserData);
    return (
         <h2 className="pl-12 pt-12 mb-2 font-serif text-2xl font-bold text-red-800">
   {user.username} Привіт!</h2>
    )
}