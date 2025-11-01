import { useState, useRef, useEffect } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { HiOutlineSaveAs } from 'react-icons/hi';

interface LevelEditorProps {
  level: number;
  onSave: (newLevel: number) => Promise<void> | void;
}

export default function LevelEditor({ level, onSave } : LevelEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempLevel, setTempLevel] = useState(level);
  const ref = useRef<HTMLDivElement>(null);

  // Закриваємо при кліку поза поповером
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
     
         <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
          className="w-6 h-6 flex items-center justify-center"
        >
          <FaRegEdit size={14}  className='fill-blue-700 hover:fill-black transition-all duration-300' />
              </button>

      {isOpen && (
        <div
          ref={ref}
          className="absolute z-10 p-3 bg-white border rounded shadow-md flex gap-2 items-center"
                  style={{
                      top: 
        -25, left: -90
                  }}
        >
          <input
            type="number"
            value={tempLevel}
            min={1}
            max={105}
            onChange={(e) => {
    let val = e.target.value;

    if (val.length > 3) {
      val = val.slice(0, 3);
    }

    let num = Number(val);

    if (num < 1) num = 1;
    if (num > 105) num = 105;

    setTempLevel(num);
  }}
            className="border px-2 rounded w-12"
          />
          <button
            onClick={() => {
              onSave(tempLevel);
              setIsOpen(false);
            }}
            className="bg-blue-600 text-white px-2 rounded hover:bg-blue-800 transition-all duration-300"
          >
                      <HiOutlineSaveAs size={24} />
          </button>
        </div>
      )}
    </div>
  );
}