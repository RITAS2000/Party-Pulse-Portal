'use client';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { ErrorMessage, Form, Field, FieldProps, Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle, FiDownloadCloud } from 'react-icons/fi';
import imageCompression from 'browser-image-compression';
import { toast } from 'react-toastify';
import { createCharacter, getCharacter } from '@/redux/char/operation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { ClockLoader } from 'react-spinners';
import { selectIsLoading } from '@/redux/char/selectors';

interface FormValues {
  server: string;
  nickname: string;
  race: string;
  level: number;
  avatar: File | null;
 
}

export default function HeroForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading)


  const validationSchema = Yup.object().shape({
    server: Yup.string()
      .min(2, t('form.serverTooShort'))
      .max(16, t('form.serverTooLong'))
      .required(t('form.serverRequired')),
    nickname: Yup.string()
      .min(2, t('form.nicknameTooShort'))
      .max(10, t('form.nicknameTooLong'))
      .required(t('form.nicknameRequired')),

    race: Yup.string().required(t('form.raceRequired')),

    level: Yup.number()
      .min(1, 'form.levelTooLow')
      .max(105, t('form.levelTooHigh'))
      .required(t('form.levelRequired')),

    avatar: Yup.mixed()
      .nullable()
      .test('fileSize', t('validation.fileTooLarge'), value => {
        const file = value as File | null | undefined;
        return !file || file.size <= 5 * 1024 * 1024;
      })
      .test('fileType', t('validation.unsupportedFormat'), value => {
        const file = value as File | null | undefined;
        return (
          !file || ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
        );
      }),
  });
  const characterKeys = [
    'druid',
    'werewolf',
    'archer',
    'priest',
    'mage',
    'warrior',
  ];

  const initialValues = {
    server: '',
    nickname: '',
    race: characterKeys[0],
    level: 1,
    avatar: null,
  };

  const handleSubmit = async (
    values: FormValues,
    formikHelpers: { resetForm: () => void }
  ) => {
    const response = await fetch('/coffee.png');
    const blob = await response.blob();
    const defaultAvatar = new File([blob], 'coffee.png', { type: blob.type });
    const payload = {
      server: values.server,
      nickname: values.nickname,
      race: values.race,
      level: values.level.toString(),
      avatar: values.avatar || defaultAvatar,
    };
  
    const resultAction = await dispatch(createCharacter(payload));

    if (createCharacter.fulfilled.match(resultAction)) {
      toast.success(t('toast.characterCreated'), {
        className: 'w-auto text-green-300 font-bold text-lg',
      });
      formikHelpers.resetForm();
      dispatch(getCharacter());
    } else {
      toast.error(t('toast.characterCreateError'), {
        className: 'w-auto text-red-300 font-bold text-lg',
      });
    }
  };

  return (
  <div className="w-auto h-auto px-12 py-6 border-solid border  border-gray-700">
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnChange={true}
      validateOnBlur={false}
      enableReinitialize={false}
    >
      <Form
        encType="multipart/form-data"
        className="w-auto flex flex-row flex-wrap gap-12 items-end"
      >
        <label className="relative w-52">
          <span className="text-gray-700 font-sans font-bold text-xl">
            {t('form.server')}
          </span>
          <Field
            type="text"
            name="server"
            minLength={2}
            maxLength={16}
            className="w-full h-11 py-2 px-10 border border-gray-300 rounded hover:border-blue-600 hover:shadow-md
                       focus:border-blue-600 transition-all duration-300"
          />
          <ErrorMessage
            name="server"
            component="span"
            className="absolute text-xs left-0 -bottom-3 text-gray-800 font-bold"
          />
        </label>

        <label className="relative w-52">
          <span className="text-gray-700 font-sans font-bold text-xl">
            {t('form.nickname')}
          </span>
          <Field
            type="text"
            name="nickname"
            minLength={2}
            maxLength={10}
            className="w-full h-11 py-2 px-10 border border-gray-300 rounded hover:border-blue-600 hover:shadow-md
                       focus:border-blue-600 transition-all duration-300"
          />
          <ErrorMessage
            name="nickname"
            component="span"
            className="absolute text-xs left-0 -bottom-3 text-gray-800 font-bold"
          />
        </label>

        <label className="relative w-52">
          <span className="text-gray-700 font-sans font-bold text-xl">
            {t('form.race')}
          </span>

          <Field name="race">
            {({ field, form }: FieldProps<FormValues>) => (
              <Listbox 
                value={field.value}
                onChange={value => form.setFieldValue('race', value)}
              ><div className="relative w-full">
                <ListboxButton
                  className="w-full h-11 text-left py-2 px-10 border outline-none bg-white border-gray-300 rounded hover:border-blue-600 hover:shadow-md
                         focus:border-blue-600 transition-all duration-300"
                >
                  {t(`characters.${field.value}`)}
                </ListboxButton>

                <ListboxOptions anchor="bottom">
                  {characterKeys.map(key => (
                    <ListboxOption
                      key={key}
                      value={key}
                      className="w-52 py-2 px-10 border outline-none bg-white border-gray-300 rounded hover:border-blue-600 hover:bg-blue-100 hover:shadow-md
                         focus:border-blue-600 transition-all duration-300"
                    >
                      {t(`characters.${key}`)}
                    </ListboxOption>
                  ))}
                    </ListboxOptions>
                    </div>
              </Listbox>
            )}
          </Field>
        </label>

        <label className="relative w-52">
          <span className="text-gray-700  font-sans font-bold text-xl">
            {t('form.level')}
          </span>

          <Field
            type="number"
            name="level"
            min={1}
            max={105}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              if (target.value.length > 3)
                target.value = target.value.slice(0, 3); // максимум 3 цифри
            }}
            className="w-full h-11 py-2 px-10 border border-gray-300 rounded  hover:border-blue-600 hover:shadow-md
                      focus:border-blue-600 transition-all duration-300"
          />
          <ErrorMessage
            name="level"
            component="span"
            className="absolute text-xs left-0 -bottom-3 text-gray-800 font-bold"
          />
        </label>
        <label className="relative w-52 group">
          <span className="text-gray-700  font-sans font-bold text-xl">
            {t('form.avatar')}
          </span>
          <Field name="avatar">
            {({ form }: FieldProps<FormValues>) => (
              <>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={async e => {
                    const file = e.currentTarget.files?.[0];
                    if (!file) return;

                    const compressed = await imageCompression(file, {
                      maxSizeMB: 1,
                      maxWidthOrHeight: 1024,
                      useWebWorker: true,
                    });

                    form.setFieldValue('avatar', compressed);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div
                  className="w-full h-11 flex items-center justify-center border border-gray-300 rounded 
                        group-hover:border-blue-600 group-hover:shadow-md transition-all duration-300 bg-white"
                >
                  {(() => {
                    const file = form.values.avatar as File | null; // 👈 чітко вказуємо тип

                    return file ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <FiCheckCircle size={22} />
                        <span className="text-sm font-medium">
                          {t('form.fileAdded')}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-blue-600">
                        <FiDownloadCloud size={22} />
                        <span className="text-sm">{t('form.selectFile')}</span>
                      </div>
                    );
                  })()}
                </div>
              </>
            )}
          </Field>
          <ErrorMessage
            name="file"
            component="span"
            className="absolute text-xs left-0 -bottom-3 text-gray-800 font-bold"
          />
        </label>

        <button
          type="submit"
          className="ml-auto font-bold h-11 text-xl px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
        >
         {isLoading ? <ClockLoader size={30} color="white"/> : t('form.addBtn')}
        </button>
      </Form>
      </Formik></div>
     
  );
}
