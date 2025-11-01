import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function HeaderStats() {
     const { t } = useTranslation();
  const [stats, setStats] = useState({
    players: 0,
    characters: 0,
    clans: 0,
  });

  useEffect(() => {
  const loadStats = async () => {
   
      const res = await axios.get('http://localhost:8080/party/all/stats');
      setStats({
        players: res.data.usersCount,
        characters: res.data.charsCount,
        clans: 0, 
      });
  
  };
  loadStats();
}, []);

  return (
    <div className="flex flex-col gap-2 pl-96">
      <p className='font-bold text-white'>{t("header.players")} {stats.players}</p>
      <p className='font-bold text-white'>{t("header.characters")} {stats.characters}</p>
      <p className='font-bold text-white'>{t("header.clans")} {stats.clans}</p>
    </div>
  );
}