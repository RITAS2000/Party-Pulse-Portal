import { getAllCharacters, getFreeChars } from '@/redux/char/operation';
import { selectFreeChars} from '@/redux/char/selectors';
import { Character, removeFreeChar } from '@/redux/char/slice';import { addCharToClan } from '@/redux/clan/operation';
;
import { Clan } from '@/redux/clan/slice';
import { AppDispatch } from '@/redux/store';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { Form, Formik, Field, FieldProps } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ClockLoader } from 'react-spinners';
import { toast } from 'react-toastify';




interface AddToClanFormProps {
  currentClan: Clan | null;
}

export default function AddToClanForm({ currentClan }: AddToClanFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const chars = useSelector(selectFreeChars);

  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    if (currentClan?.server) {
      dispatch(getFreeChars(currentClan.server));
    }
  }, [dispatch, currentClan]);



  
  const handleAddChar = async (values: { char: string }, formikHelpers: { resetForm: () => void }) => {
if (!currentClan?._id) return;
  if (!values.char) {
    toast.error(t("form.noFreeChars"));
    return;
  }
 setIsSubmitting(true); 
  const resultAction = await dispatch(addCharToClan({ charId: values.char, clanId: currentClan._id }));
  setIsSubmitting(false);
  if (addCharToClan.fulfilled.match(resultAction)) {
    toast.success(t('toast.charQueued'));
    formikHelpers.resetForm();
    dispatch(removeFreeChar(values.char));
     dispatch(getAllCharacters());
   
   
  
  } else {
    toast.error(resultAction.payload as string || t('clan.addCharError'));
  }
};

  return (
    <div className='flex  w-[800px] py-12 px-12 gap-12 '>
      
      
      <p className="text-lg font-bold text-gray-700">{t("form.clanJoinInfo")}</p>
       
    <Formik
      initialValues={{ char: '' }}
      onSubmit={handleAddChar}
    >
      <Form className="w-auto h-[100px] flex flex-row flex-wrap gap-8">
        <label className="relative w-52">
        
          <Field name="char">
            {({ field, form }: FieldProps) => (
              <Listbox
                value={field.value}
                onChange={value => form.setFieldValue('char', value)}
              >
                <div className="relative w-full">
                  <ListboxButton
                    className="w-full h-11 text-left py-2 px-6 border outline-none bg-white border-gray-300 rounded hover:border-blue-600 hover:shadow-md
                                                      focus:border-blue-600 transition-all duration-300 text-gray-700"
                  >
                    {field.value
                      ? chars.find(
                          (char: Character) => char._id === field.value
                        )?.nickname
                      : t('form.selectCharacter')}
                  </ListboxButton>

                  <ListboxOptions as="div" anchor="bottom">
                    {chars.length > 0 ? (
                      chars.map((char: Character) => (
                        <ListboxOption
                          key={char._id}
                          value={char._id}
                          className="w-52 py-2 px-6 bg-white border border-gray-300 rounded hover:border-blue-600 hover:bg-blue-100 transition-all duration-300"
                        >
                          {char.nickname}
                        </ListboxOption>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">
                        {t("form.noFreeChars")}
                      </div>
                    )}
                  </ListboxOptions>
                </div>
              </Listbox>
            )}
          </Field>
        </label>
        <button
          type="submit"
           className=" flex  items-center justify-center font-bold w-52 h-11 text-xl px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700  transition-colors duration-300"
        >
          {isSubmitting ? (
            <ClockLoader size={24} color="white" />
          ) : (
            t('form.joinBtn')
          )}
        </button>
      </Form>
      </Formik>
      
      </div>
  );
}
