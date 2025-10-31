"use client"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { useState } from 'react'
import { ErrorMessage, Form, Field, Formik } from "formik";
import * as Yup from 'yup';
import Button from "./button";
import { useTranslation } from "react-i18next";
import { FiDownloadCloud } from 'react-icons/fi';
import imageCompression from 'browser-image-compression';

export default function HeroForm() {
  const { t } = useTranslation();
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0];
  if (!file) return;

  const options = {
    maxSizeMB: 1, // максимально допустимий розмір після стиску
    maxWidthOrHeight: 1024, // максимально ширина або висота
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    console.log('Original size:', file.size / 1024 / 1024, 'MB');
    console.log('Compressed size:', compressedFile.size / 1024 / 1024, 'MB');

    // Можеш тепер відправляти compressedFile на бекенд
  } catch (error) {
    console.error(error);
  }
}

   const validationSchema = Yup.object().shape({
  text: Yup.string()
    .min(2, t("form.nicknameTooShort"))
    .max(10, t("form.nicknameTooLong"))
       .required(t("form.nicknameRequired")),
     
  select: Yup.string()
       .required(t("form.raceRequired")),
  
    number: Yup.number()
    .min(1, "form.levelTooLow")
       .max(105, t("form.levelTooHigh"))
       .required(t("form.levelRequired")),
    
   file: Yup.mixed<File>()
    .test(
      'fileSize',
      t('validation.fileTooLarge'), 
      (value) => !value || value.size <= 5 * 1024 * 1024
    )
    .test(
      'fileType',
      t('validation.unsupportedFormat'),
      (value) =>
        !value || ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
    ),
});
  const initialValues = {
      text: '',
      select: '',
      number: '',
      file: "",
    };

    const handleSubmit = () => { };
//   const handleSubmit = async (formData: { email: string; password: string }, formikHelpers: { resetForm: () => void }) => {
//     const { email, password } = formData;
//     const resultAction = await dispatch(loginUser({ email, password }));
    
//     if (loginUser.fulfilled.match(resultAction)) {
//       toast.success(t("toast.loginSuccess"), {
//         className: 'w-auto text-green-300 font-bold text-lg'
//       });
//       formikHelpers.resetForm();
//       router.push("/");
      
//     } else {
//       toast.error(t("toast.loginError"), {
//         className: 'w-auto text-red-300 font-bold text-lg'
//       });
//     }
//   };
  const characterKeys = ["druid", "werewolf", "archer", "priest", "mage", "warrior"];
  const [select, setSelected] = useState(characterKeys[0])
  
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={false}
        enableReinitialize={false}
      >
        <Form className="w-auto flex flex-row flex-wrap gap-6 items-end">     
          <label className="relative w-52">
              <span className='text-gray-700 font-sans font-bold text-xl'>{t("form.nickname")}</span>
                  <Field
                      type="text"
              name="text"
             
              maxLength={10}
                      className="w-full h-11 py-2 px-10 border border-gray-300 rounded hover:border-blue-600 hover:shadow-md
                       focus:border-blue-600 transition-all duration-300"
                      />
                          <ErrorMessage name="text" component="span" className="absolute text-xs left-0 -bottom-3 text-gray-800 font-bold" />
          </label>
         
          <label className="relative w-52"><span className='text-gray-700 font-sans font-bold text-xl'>{t("form.race")}</span>
           
            <Listbox value={select} onChange={setSelected} >
      <ListboxButton  className="w-full h-11 text-left py-2 px-10 border outline-none bg-white border-gray-300 rounded hover:border-blue-600 hover:shadow-md
                       focus:border-blue-600 transition-all duration-300">{t(`characters.${select}`)}</ListboxButton>
      <ListboxOptions anchor="bottom" >
        {characterKeys.map((key) => (
          <ListboxOption key={key} value={key} className="w-52  py-2 px-10 border outline-none bg-white border-gray-300 rounded hover:border-blue-600 hover:bg-blue-100 hover:shadow-md
                       focus:border-blue-600 transition-all duration-300">
            {t(`characters.${key}`)}
          </ListboxOption>
        ))}
      </ListboxOptions>
              </Listbox>
           
            </label>
            
          <label className="relative w-52">
              <span className='text-gray-700  font-sans font-bold text-xl'>{t("form.level")}</span>
                  <Field
                      type="number"
                      name="number"
                      min={1}
              max={105}
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      if (target.value.length > 3) target.value = target.value.slice(0,3); // максимум 3 цифри
  }}

                      className="w-full h-11 py-2 px-10 border border-gray-300 rounded  hover:border-blue-600 hover:shadow-md
                      focus:border-blue-600 transition-all duration-300"
                      />
                          <ErrorMessage name="number" component="span" className="absolute text-xs left-0 -bottom-3 text-gray-800 font-bold" />
          </label>   
           <label className="relative w-52 group">
              <span className='text-gray-700  font-sans font-bold text-xl'>{t("form.level")}</span>
                  <Field
              type="file"
              onChange={handleFileChange}
                      name="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-full h-11 flex items-center justify-center border border-gray-300 rounded group-hover:border-blue-600 group-hover:shadow-md transition-all duration-300 bg-white">
              <FiDownloadCloud size={30} color="#2563EB" />
    {/* {t("form.selectFile")}  */}
  </div>
                          <ErrorMessage name="file" component="span" className="absolute text-xs left-0 -bottom-3 text-gray-800 font-bold" />
          </label>      
          
          <button
      type="submit"
  
      className="ml-auto font-bold h-11 text-xl px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
    >
      {t("form.addBtn")}
    </button>
        </Form>
      </Formik>
      
       
      
  )
}