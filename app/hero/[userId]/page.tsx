'use client';
import '../../globals.css';
import { useSelector } from 'react-redux';
import HeroForm from '../../components/heroAdd';
import { selectUserData } from '@/redux/auth/selectors';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CharList from '@/app/components/charList';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import { FaCheck } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import HiUser from '@/app/components/hiUser';
import UlTextChar from '@/app/components/ultextChar';

export default function Page() {
  const user = useSelector(selectUserData);
  const { t } = useTranslation();

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);
  if (!user) return null;

  return (
    <main className="pl-80 pt-40 w-full min-h-screen   ">
      <div className='pl-32'>
        <HiUser />
        <UlTextChar />
      </div>
      <div className="flex gap-4 items-center">
        <h3 className="pl-12 mb-2 font-serif text-2xl font-bold text-red-800">
          {t('page.addChar')}
        </h3>
        {!isOpen ? (
          <button type="button" onClick={() => setIsOpen(true)}>
            <HiOutlineViewGridAdd
              size={30}
              className="text-blue-600 hover:text-blue-700 transition-all duration-300"
            />
          </button>
        ) : (
          <button type="button" onClick={() => setIsOpen(false)}>
            <FaCheck
              size={24}
              className="text-green-600 hover:text-green-700 transition-all duration-300"
            />
          </button>
        )}
      </div>
      {!isOpen ? (
        <div className="w-auto h-auto border-solid border-t border-gray-700"></div>
      ) : (
        <HeroForm />
      )}

      <CharList />
    </main>
  );
}
