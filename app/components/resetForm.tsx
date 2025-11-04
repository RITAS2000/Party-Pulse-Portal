"use client";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Button from './button';
import { TbPasswordUser } from "react-icons/tb";
import {  useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { resetPassword } from "../../redux/auth/operation"

import type { AppDispatch } from '../../redux/store';
import { useRouter } from 'next/navigation';




export default function ResetForm() { 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();




    const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, t('yup.minPassword'))
    .max(64, t('yup.maxPassword'))
    .required(t('yup.requiredPassword')),

  confirm: Yup.string()
    .oneOf([Yup.ref('password')], t('yup.passwordMatches'))
    .required(t('yup.requiredConfirmPassword')),
});
  
    
    const initialValues = {
    password: '',
    confirm: '',
    };
        const tokenFromQueryRaw = new URLSearchParams(window.location.search).get('token');
const token = tokenFromQueryRaw || '';
    const handleSubmit = async (formData: { password: string; confirm: string },
  formikHelpers: { resetForm: () => void }
) => {
  const { password } = formData;

if (!token) {
    toast.error(t("form.toastMissing"));
    return;
      }

 const resultAction = await dispatch(resetPassword({ token, password }));

if (resetPassword.fulfilled.match(resultAction)) {
  
  router.push('/');
  toast.success(t("toast.resetSuccses"), {
    className: 'w-auto text-green-300 font-bold text-lg'
  });
  formikHelpers.resetForm();
} else {

  toast.error(t("toast.resetError"), {
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
                <h2 className='font-serif text-3xl font-bold  text-red-800'>{t("form.resetTitle")}</h2>
            <p className='text-white font-sans'>{t("form.resetText")}</p>
                    </div>
                
                 
                 <label className="relative mb-4">
                    <span className='text-white font-sans font-bold text-xl'>{t("form.spanPassword")}</span>
                    <TbPasswordUser size={24} color="#2563EB" className='absolute  left-2 top-9' />
                <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="w-full py-2 px-10 border border-gray-300 rounded  hover:border-blue-600 hover:shadow-md
              focus:border-blue-600 transition-all duration-300 text-gray-700"
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
              focus:border-blue-600 transition-all duration-300 text-gray-700"
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
                <Button type="submit">{t("form.resetBtn") }</Button>
        </Form>
        </Formik>
         
        </div>
    )

}
    