import { useDispatch, useSelector } from 'react-redux';
import { selectUserChars } from '../../redux/char/selectors';
import CharItem from './charListItem';
import { useEffect, useState } from 'react';
import { AppDispatch } from '@/redux/store';
import { getCharacter } from '@/redux/char/operation';
import { startTransition } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { fetchGallery } from '@/redux/gallery/operation';

export type CharacterType = {
  _id: string;
  server: string;
  nickname: string;
  race: string;
  level: number;
  avatar: string | null;
  galleryId?: string;
   clan: {
    clanId: string,
    role: string,
    accepted: boolean,
    
  };
};

export default function CharList() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const charactersFromStore = useSelector(selectUserChars) as CharacterType[];
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
    useEffect(() => {
       dispatch(fetchGallery());
     }, [dispatch]);
  useEffect(() => {
    dispatch(getCharacter());
  }, [dispatch]);

  useEffect(() => {
    if (charactersFromStore.length > 0) {
      startTransition(() => setCharacters(charactersFromStore));
    }
  }, [charactersFromStore]);

  const handleDragStart = (
    e: React.DragEvent<HTMLLIElement>,
    index: number
  ) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (
    e: React.DragEvent<HTMLLIElement>,
    index: number
  ) => {
    e.preventDefault();
    const draggedFrom =
      dragIndex ?? parseInt(e.dataTransfer.getData('text/plain'));
    if (draggedFrom === index) return;

    const newChars = [...characters];
    const [moved] = newChars.splice(draggedFrom, 1);
    newChars.splice(index, 0, moved);
    setCharacters(newChars);
    const reorderedIds = newChars.map((c, i) => ({
      id: c._id,
      order: i,
    }));

    await axios.patch('http://localhost:8080/party/char/reorder', {
      order: reorderedIds,
    });

    setDragIndex(null);
  };

  if (!characters || characters.length === 0) {
    return (
      <p className="text-xl text-gray-400 pl-12 pt-4">{t('page.notChars')}</p>
    );
  }

  return (
    <ul className="flex flex-row flex-wrap gap-7 px-8 py-4">
      {characters.map((char, index) => (
        <li
          key={char._id ?? index}
          draggable
          onDragStart={e => handleDragStart(e, index)}
          onDragOver={handleDragOver}
              onDrop={e => handleDrop(e, index)}
        
        >
          <CharItem character={char} />
        </li>
      ))}
    </ul>
  );
}
