"use client";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { toast } from 'react-toastify';
import Button from './button';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { TbPasswordUser } from 'react-icons/tb';
import { MdOutlineEmail } from 'react-icons/md';
import { useState } from 'react';
import { closeModal, openModal } from '@/redux/modals/slice';
import { loginUser } from '../../redux/auth/operation';
import Link from 'next/link';


export default function LoginForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
    
  const validationSchema = Yup.object().shape({
            
    email: Yup.string()
      .email(t('yup.invalidEmail'))
      .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/, t('yup.invalidEmailFormat'))
      .max(128, t('yup.maxEmail'))
      .required(t('yup.requiredEmail')),
    
    password: Yup.string()
      .min(8, t('yup.minPassword'))
      .max(64, t('yup.maxPassword'))
      .required(t('yup.requiredPassword')),
  });
  const [showPassword, setShowPassword] = useState(false);
    
  const initialValues = {
    email: '',
    password: '',
  };
  const handleSubmit = async (formData: { email: string; password: string }, formikHelpers: { resetForm: () => void }) => {
    const { email, password } = formData;
    const resultAction = await dispatch(loginUser({ email, password }));
    
    if (loginUser.fulfilled.match(resultAction)) {
      toast.success(t("toast.loginSuccess"), {
        className: 'w-auto text-green-300 font-bold text-lg'
      });
      formikHelpers.resetForm();
      dispatch(closeModal());
    } else {
      toast.error(t("toast.loginError"), {
        className: 'w-auto text-red-300 font-bold text-lg'
      });
    }
  };
 
  const hendleForgot = () => {
    dispatch(closeModal());
    dispatch(openModal({ type: 'forgot' }));
  }
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
            <h2 className='font-serif text-3xl font-bold  text-red-800'>{t("auth.login")}</h2>
            <p className='text-white font-sans'>{t("form.textLogin")}</p>
          </div>
                  
          <label className="relative mb-4">
            <span className='text-white font-sans font-bold text-xl'>{t("form.spanEmail")}</span>
            <MdOutlineEmail size={24} color="#2563EB" className='absolute left-2 top-9' />
            <Field
              type="email"
              name="email"
              className="w-full py-2 px-10 border border-gray-300 rounded  hover:border-blue-600 hover:shadow-md
                  focus:border-blue-600 transition-all duration-300"
            />
            <ErrorMessage name="email" component="span" className="absolute text-xs left-0 -bottom-3 text-gray-800 font-bold" />
          </label>
          <label className="relative mb-10">
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
                  
          <Button type="submit">{t("form.buttonLogin")}</Button>
        </Form>
      </Formik>
      <div className='w-[420px]'>
        <div className='flex gap-2 justify-center'>
          <p className='text-white'>{t("form.pathOne")}</p>
          <Link href="/register" className="font-bold  text-red-800 underline hover:text-white transition-all duration-300">{t("form.pathTwo")}</Link>
        </div>
        <div className='flex gap-2 justify-center'>
          <p className='text-white'>{t("form.textForgotPathOne")}</p>
          <button type="button" onClick={hendleForgot} className="font-bold  text-red-800 underline hover:text-white transition-all duration-300">{t("form.textForgotPathTwo")}</button>
        </div>
      </div>
    </div>)
  }

