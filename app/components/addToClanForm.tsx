import { getFreeChars } from '@/redux/char/operation';
import { selectFreeChars, selectIsLoading } from '@/redux/char/selectors';
import { Character } from '@/redux/char/slice';import { addCharToClan } from '@/redux/clan/operation';
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
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ClockLoader } from 'react-spinners';
import { toast } from 'react-toastify';
// import clsx from 'clsx';



interface AddToClanFormProps {
  currentClan: Clan | null;
}

export default function AddToClanForm({ currentClan }: AddToClanFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const chars = useSelector(selectFreeChars);
  const isLoading = useSelector(selectIsLoading);
  const { t } = useTranslation();


  useEffect(() => {
    if (currentClan?.server) {
      dispatch(getFreeChars(currentClan.server));
    }
  }, [dispatch, currentClan]);
  const handleAddChar = async () => {
     if (!currentClan?._id) return;
  const resultAction = await dispatch(addCharToClan({ charId: chars._id, clanId: currentClan._id }));
  if (addCharToClan.fulfilled.match(resultAction)) {
    toast.success(t('clan.charQueued'));
  } else {
    toast.error(resultAction.payload as string || t('clan.addCharError'));
  }
};

  return (
    <div className='flex  w-[800px] py-12 px-12 gap-12 '>
      
      
      <p className='text-gray-700'>{t("form.clanJoinInfo")}</p>
       
    <Formik
      initialValues={{ char: '' }}
      onSubmit={handleAddChar}
    >
      <Form className="w-auto flex flex-row flex-wrap gap-8">
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
           className={`font-bold w-52 h-11 text-xl px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700  transition-colors duration-300`}
        >
          {isLoading ? (
            <ClockLoader size={30} color="white" />
          ) : (
            t('form.joinBtn')
          )}
        </button>
      </Form>
      </Formik>
      
      </div>
  );
}
