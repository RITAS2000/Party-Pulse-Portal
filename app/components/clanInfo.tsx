'use client';
import { FaRegSmile } from 'react-icons/fa';
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { AppDispatch } from '@/redux/store';
import * as Yup from 'yup';
import Button from './button';
import { ClockLoader } from 'react-spinners';
import {  upsertClanMessage } from '../../redux/clan/operation';
import { selectClansLoading } from '@/redux/clan/selectors';
import { Clan } from '@/redux/clan/slice';
import { useTranslation } from 'react-i18next';



interface Props {
  currentClan: Clan | null;
  initialText: string;
  onClose: () => void;
}

export default function SimpleFormikTextarea({ currentClan, initialText, onClose}: Props) {
  const [showEmoji, setShowEmoji] = useState(false);
  const isLoading = useSelector(selectClansLoading);
  const { t } = useTranslation();
  const [emoji] = useState(['😊', '😂','🤗', '😅', '🙂', '🥰', '😎', '🤔', '🤩', '😴', '😱', '✨', '🔥', '🎉', '📅', '👽', '🦀', '🎀', '🎁', '🧧', '📗', '📌', '🕰️', '🍾', '🥂', '❄️', '☃️', '💛', '💚', '💙', '🩵', '💜', '🤎', '❤️', '🖤', '🩶', '🧡', '🤢',
  '😭', '😡', '👍', '🙌', '💪', '🌸', '🌈', '⭐', '⚡', '🫶','⚔️', '🛡️', '🏹', '👑', '🔥', '💀', '🩸', '🌌', '⚡', '🕹️',
  '🏆', '🎯', '🔮', '🧙‍♂️', '🧝‍♀️', '🐉', '💣', '🗡️', '🧩', '🏰','😄', '🥳',  '💬', '🎶', '🌟', '💖', '🫰', '😇',
  '🧸', '🍀', '☕', '🍰', '🎈', '📸', '📱', '💌', '🕊️']);
    const dispatch = useDispatch<AppDispatch>();
  
    
    
    const validationSchema = Yup.object({
  text: Yup.string()
    .trim()
    .max(2000, t("form.max2000"))
    

})

  const handleSubmit = async (
  values: { text: string },
  
) => {
  const trimmed = values.text.trim();
  const sanitized = trimmed.replace(/<\s*script.*?>.*?<\s*\/\s*script>/gi, '');

  if (!currentClan?._id) return; 

  const payload = {
    clanId: currentClan._id,
    message: sanitized,
  };

  const resultAction = await dispatch(upsertClanMessage(payload));

  if (upsertClanMessage.fulfilled.match(resultAction)) {
    toast.success(t("toast.infoAdded"));
     onClose();
    dispatch({
    type: 'clan/updateMessage',
    payload: { clanId: currentClan._id, message: sanitized }
  });
  } else {
    toast.error(t("toast.editError"));
  }
};

  return (
    <Formik
         initialValues={{ text: initialText }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
>
  {({ values, setFieldValue }) => (
    <Form className="w-full flex flex-col">
      <div>
        <Field
          as="textarea"
          name="text"
                          rows={5}
                          maxLength={2000}
                          placeholder={t("page.clansPage.writeDescription")}
                          className="w-full rounded p-6"
        />
      </div>

    <div className="relative">
            <button
              type="button"
              onClick={() => setShowEmoji(!showEmoji)}
              className="p-2 rounded-full bg-white  transition-all duration-300 mb-6"
            >
              <FaRegSmile className="w-6 h-6 text-blue-600 hover:text-blue-700 transition-all duration-300" />
            </button>

            {showEmoji && (
              <div className="absolute z-10 bg-white shadow-lg rounded-xl p-2 flex flex-wrap gap-1 mt-2 border border-gray-200">
                {emoji.map((e, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setFieldValue('text', values.text + e)}
                    className="text-xl hover:scale-110 transition-transform"
                  >
                    {e}
                  </button>
                ))}
              </div>
            )}
          </div>


      <Button type="submit">
                      {isLoading ? <ClockLoader size={24} color="white" />: t("page.clansPage.edit")}
      </Button>
    </Form>
  )}
</Formik>
  );
}