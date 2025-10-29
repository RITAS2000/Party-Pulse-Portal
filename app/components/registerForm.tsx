"use client";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Button from './button';
import { TbPasswordUser } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/operation';
import type { AppDispatch } from '../../redux/store';
import { closeModal, openModal } from '@/redux/modals/slice';
<FiUser />



export default function RegistarForm() {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3,  t('yup.minName'))
    .max(16, t('yup.maxName'))
    .required(t('yup.requiredName')),

  email: Yup.string()
    .email(t('yup.invalidEmail'))
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/, t('yup.invalidEmailFormat'))
    .max(128, t('yup.maxEmail'))
    .required(t('yup.requiredEmail')),

  password: Yup.string()
    .min(8, t('yup.minPassword'))
    .max(64, t('yup.maxPassword'))
    .required(t('yup.requiredPassword')),

  confirm: Yup.string()
    .oneOf([Yup.ref('password')], t('yup.passwordMatches'))
    .required(t('yup.requiredConfirmPassword')),
});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
    
    const initialValues = {
    username: '',
    email: '',
    password: '',
    confirm: '',
    };
     const hendleLogin = () => {
            dispatch(closeModal());
             dispatch(openModal({ type: 'login' }));
    
         }
        
    const handleSubmit = async (formData: { username: string; email: string; password: string }) => {
       const { username, email, password } = formData;
    const resultAction = await dispatch(registerUser({ username, email, password }));

    if (registerUser.fulfilled.match(resultAction)) {
      toast.success(t("toast.registrationSuccess"), {
            className: 'w-auto text-green-300 font-bold text-lg'
        });
    } else {
        toast.error(t("toast.registrationError"), {
            className: 'w-auto text-red-300 font-bold text-lg'
        });
    }
  };

    return (<div className='flex flex-col gap-10'>
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            validateOnChange={true}
            validateOnBlur={false}
            enableReinitialize={false}
            >
            <Form className="w-[420px] flex flex-col gap-6">
                <div>
                <h2 className='font-serif text-3xl font-bold  text-red-800'>{t("auth.signup")}</h2>
                    <p className='text-white font-sans'>{t("form.textRegister")}</p>
                    </div>
                <label className="relative mb-4">
                    <span className='text-white font-sans font-bold text-xl'>{t("form.spanName")}</span>
                    <FiUser size={24} color="#2563EB" className='absolute  left-2 top-9'/>
                <Field
                    type="text"
                    name="username"
                    className="w-full py-2 px-10 border border-gray-300 rounded hover:border-blue-600 hover:shadow-md
              focus:border-blue-600 transition-all duration-300"
                />
                    <ErrorMessage name="username" component="span" className="absolute text-xs left-0 -bottom-3 text-gray-800 font-bold" />
                </label>
                 <label className="relative mb-4">
                    <span className='text-white font-sans font-bold text-xl'>{t("form.spanEmail")}</span>
                    <MdOutlineEmail size={24} color="#2563EB" className='absolute left-2 top-9'/>
                <Field
                    type="email"
                    name="email"
                    className="w-full py-2 px-10 border border-gray-300 rounded  hover:border-blue-600 hover:shadow-md
              focus:border-blue-600 transition-all duration-300"
                />
                    <ErrorMessage name="email" component="span" className="absolute text-xs left-0 -bottom-3 text-gray-800 font-bold" />
                </label>
                 <label className="relative mb-4">
                    <span className='text-white font-sans font-bold text-xl'>{t("form.spanPassword")}</span>
                    <TbPasswordUser size={24} color="#2563EB" className='absolute  left-2 top-9' />
                <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="w-full py-2 px-10 border border-gray-300 rounded  hover:border-blue-600 hover:shadow-md
              focus:border-blue-600 transition-all duration-300"
                    />
                     <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-10 text-gray-600 hover:text-gray-800 focus:outline-none"
                  >
                    {showPassword ? (
                      <AiOutlineEye size={20} />
                    ) : (
                      <AiOutlineEyeInvisible size={20} />
                    )}
                  </button>
                    <ErrorMessage name="password" component="span" className="absolute text-xs left-0 -bottom-3 text-gray-800 font-bold" />
                </label>
                 <label className=" relative mb-10">
                    <span className='text-white font-sans font-bold text-xl'>{t("form.spanConfirmPassword")}</span>
                    <TbPasswordUser size={24} color="#2563EB" className='absolute   left-2 top-9' />                 
                <Field
                    type={showConfirm ? 'text' : 'password'}
                    name="confirm"
                    className="w-full py-2 px-10 border border-gray-300 rounded  hover:border-blue-600 hover:shadow-md
              focus:border-blue-600 transition-all duration-300"
                    />
                     <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className=" absolute right-2 top-10 text-gray-600 hover:text-gray-800 focus:outline-none"
                  >
                    {showConfirm ? (
                      <AiOutlineEye size={20} />
                    ) : (
                      <AiOutlineEyeInvisible size={20} />
                    )}
                  </button>
                    <ErrorMessage name="confirm" component="span" className="absolute text-xs left-0 -bottom-3 text-gray-800 font-bold" />
                </label>
                <Button type="submit">{t("form.buttonRegister") }</Button>
        </Form>
        </Formik>
         <div className='flex gap-2 justify-center'>
            <p className='text-white'>{t("form.pathThree")}</p>
                <button type="button" onClick={hendleLogin} className="font-bold  text-red-800 underline hover:text-white transition-all duration-300">{t("form.pathFour")}</button>
        </div>
        </div>
    )

}