"use client";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { toast } from 'react-toastify';
import Button from './button';
import { MdOutlineEmail } from 'react-icons/md';
import { forgotPassword } from '../../redux/auth/operation';

import { closeModal } from '@/redux/modals/slice';


export default function ForgotPasswordForm() {
    const { t } = useTranslation();
           const dispatch = useDispatch<AppDispatch>();
       
       const validationSchema = Yup.object().shape({
               
         email: Yup.string()
           .email(t('yup.invalidEmail'))
           .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/, t('yup.invalidEmailFormat'))
           .max(128, t('yup.maxEmail'))
           .required(t('yup.requiredEmail')),
       });

       
           const initialValues = {
           email: ''
    };

           const handleSubmit = async (formData: { email: string }, formikHelpers: { resetForm: () => void }) => {
              const {email } = formData;
           const resultAction = await dispatch(forgotPassword(email));
       
           if (forgotPassword.fulfilled.match(resultAction)) {
             toast.success(t("toast.sendMail"), {
                   className: 'w-auto text-green-300 font-bold text-lg'
             });
             formikHelpers.resetForm();
             dispatch(closeModal());
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
                       <h2 className='font-serif text-3xl font-bold  text-red-800'>{t("form.titleForgot")}</h2>
                           <p className='text-white font-sans'>{t("form.descriptionForgot")}</p>
                           </div>
                     
                        <label className="relative mb-4">
                           <span className='text-white font-sans font-bold text-xl'>{t("form.spanEmail")}</span>
                           <MdOutlineEmail size={24} color="#2563EB" className='absolute left-2 top-9'/>
                       <Field
                           type="email"
                           name="email"
                           className="w-full py-2 px-10 border border-gray-300 rounded  hover:border-blue-600 hover:shadow-md
                     focus:border-blue-600 transition-all duration-300 text-gray-700"
                       />
                           <ErrorMessage name="email" component="span" className="absolute text-xs left-0 -bottom-3 text-gray-800 font-bold" />
                       </label>
                    
                     
                       <Button type="submit">{t("form.buttonForget") }</Button>
               </Form>
               </Formik>
          
           </div>)
}