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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { ClockLoader } from 'react-spinners';
import { selectUserChars } from '@/redux/char/selectors';
import { createClan, getClans } from '@/redux/clan/operation';
import { useEffect } from 'react';
import { getCharacter } from '@/redux/char/operation';
import { Character } from '@/redux/char/slice';
import { selectClans, selectClansLoading } from '@/redux/clan/selectors';
import { SERVERS } from './heroAdd';

interface FormValues {
  server: string;
  clanName: string;
  charId: string;
  leaderCharNick: string;
  clanColor: string;
  logo: File | null;
}
export const COLOR_OPTIONS = {
  red: 'bg-red-500',
  blue: 'bg-blue-400',
  green: 'bg-green-400',
  yellow: 'bg-yellow-300',
  purple: 'bg-purple-400',
  orange: 'bg-orange-400',
  gray: 'bg-gray-400',
  pink: 'bg-pink-400',
  teal: 'bg-teal-300',
  indigo: 'bg-indigo-300',
};
export default function AddClan() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectClansLoading);
  const chars = useSelector(selectUserChars);
  const clans = useSelector(selectClans);

  const clanColorKeys = Object.keys(COLOR_OPTIONS) as Array<
    keyof typeof COLOR_OPTIONS
  >;

  const validationSchema = Yup.object().shape({
    server: Yup.string()
      .min(2, t('form.serverTooShort'))
      .max(16, t('form.serverTooLong'))
      .required(t('form.serverRequired')),
    clanName: Yup.string()
      .min(2, t('form.clanNameTooShort'))
      .max(10, t('form.clanNameTooLong'))
      .required(t('form.clanNameRequired')),
    charId: Yup.string().nullable().required(t('form.nicknameRequired')),

    clanColor: Yup.string(),

    logo: Yup.mixed()
      .nullable()
      .test('fileSize', t('validation.fileTooLarge'), value => {
        const file = value as File | null | undefined;
        return !file || file.size <= 5 * 1024 * 1024;
      })
      .test('fileType', t('validation.unsupportedFormat'), value => {
        const file = value as File | null | undefined;
        return (
          !file ||
          ['image/jpeg', 'image/svg', 'image/png', 'image/gif'].includes(
            file.type
          )
        );
      }),
  });
  useEffect(() => {
    dispatch(getCharacter());
    dispatch(getClans());
  }, [dispatch]);

  const initialValues = {
    server: '',
    clanName: '',
    charId: chars.length > 0 ? chars[0]._id : '',
    leaderCharNick: '',
    clanColor: '',
    logo: null,
  };
  //  const handleSubmit =() => {}
  const handleSubmit = async (
    values: FormValues,
    formikHelpers: { resetForm: () => void }
  ) => {
    const selectedChar: Character = chars.find(
      (c: Character) => c._id === (values.charId as string)
    );
    const clanAlreadyExists = clans.some(
  clan => clan.charId === values.charId && clan.server === values.server
);

if (clanAlreadyExists) {
  toast.error(t('toast.characterCannotBeLeaderOfTwoClans'));
  return;
}


if (selectedChar.server !== values.server) {
  toast.error(t('toast.characterWrongServer'));
  return;
      }
      const clanNameExists = clans.some(
  clan =>
    clan.clanName.toLowerCase() === values.clanName.toLowerCase() &&
    clan.server === values.server
);

if (clanNameExists) {
  toast.error(t('toast.clanNameAlreadyExists'));
  return;
}

    const response = await fetch('/coffee.png');
    const blob = await response.blob();
    const defaultLogo = new File([blob], 'coffee.png', { type: blob.type });
    const payload = {
      server: values.server,
      clanName: values.clanName,
      charId: values.charId,
      leaderCharNick: selectedChar.nickname,
      clanColor: values.clanColor,
      logo: values.logo || defaultLogo,
    };
    const resultAction = await dispatch(createClan(payload));

    if (createClan.fulfilled.match(resultAction)) {
      toast.success(t('toast.clanSuccess'), {
        className: 'w-auto text-green-300 font-bold text-lg',
      });
      formikHelpers.resetForm();
      dispatch(getClans());
    } else {
      toast.error(t('toast.clanError'), {
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
            <Field name="server">
              {({ field, form }: FieldProps<FormValues>) => (
                <>
                  <Listbox
                    value={field.value}
                    onChange={value => form.setFieldValue('server', value)}
                  >
                    <div className="relative w-full">
                      <ListboxButton
                        className="w-full h-11 text-left py-2 px-6 border outline-none bg-white border-gray-300 rounded hover:border-blue-600 hover:shadow-md
                                           focus:border-blue-600 transition-all duration-300 text-gray-700"
                      >
                        {field.value
                          ? (field.value as unknown as string)
                          : t('form.selectServer')}
                      </ListboxButton>

                      <ListboxOptions anchor="bottom">
                        {SERVERS.map(server => (
                          <ListboxOption
                            key={server}
                            value={server}
                            className="w-52 py-2 px-10 border outline-none bg-white border-gray-300 rounded hover:border-blue-600 hover:bg-blue-100 hover:shadow-md
                                               focus:border-blue-600 transition-all duration-300 text-gray-700"
                          >
                            {server}
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </div>
                  </Listbox>

                  <ErrorMessage
                    name="server"
                    component="span"
                    className="absolute text-xs left-0 -bottom-3 text-gray-800 font-bold"
                  />
                </>
              )}
            </Field>
          </label>

          {/* <label className="relative w-52">
            <span className="text-gray-700 font-sans font-bold text-xl">
              {t('form.server')}
            </span>
            <Field
              type="text"
              name="server"
              minLength={2}
              maxLength={16}
              className="w-full h-11 py-2 px-6 border border-gray-300 rounded hover:border-blue-600 hover:shadow-md
                       focus:border-blue-600 transition-all duration-300 text-gray-700"
            />
            <ErrorMessage
              name="server"
              component="span"
              className="absolute text-xs left-0 -bottom-3 text-gray-800 font-bold"
            />
          </label> */}

          <label className="relative w-52">
            <span className="text-gray-700 font-sans font-bold text-xl">
              {t('form.clanName')}
            </span>
            <Field
              type="text"
              name="clanName"
              minLength={2}
              maxLength={10}
              className="w-full h-11 py-2 px-6 border border-gray-300 rounded hover:border-blue-600 hover:shadow-md
                       focus:border-blue-600 transition-all duration-300 text-gray-700"
            />
            <ErrorMessage
              name="clanName"
              component="span"
              className="absolute text-xs left-0 -bottom-3 text-gray-800 font-bold"
            />
          </label>

          <label className="relative w-52">
            <span className="text-gray-700 font-sans font-bold text-xl">
              {t('form.masterNick')}
            </span>

            <Field name="charId">
              {({ field, form }: FieldProps<FormValues>) => {
                const selectedChar = chars.find(
                  (c: Character) => c._id === (field.value as unknown as string)
                );

                return (
                  <>
                    <Listbox
                      value={field.value}
                      onChange={value => form.setFieldValue('charId', value)}
                    >
                      <ListboxButton
                        className="w-full h-11 text-left py-2 px-6 border outline-none bg-white border-gray-300 rounded hover:border-blue-600 hover:shadow-md
             focus:border-blue-600 transition-all duration-300 text-gray-700"
                      >
                        {selectedChar
                          ? selectedChar.nickname
                          : t('form.selectCharacter')}
                      </ListboxButton>

                      <ListboxOptions anchor="bottom">
                        {chars.map(
                          (char: { _id: string; nickname: string }) => (
                            <ListboxOption
                              key={char._id}
                              value={char._id}
                              className="w-52 py-2 px-10 border outline-none bg-white border-gray-300 rounded hover:border-blue-600 hover:bg-blue-100 hover:shadow-md
               focus:border-blue-600 transition-all duration-300 text-gray-700"
                            >
                              {char.nickname}
                            </ListboxOption>
                          )
                        )}
                      </ListboxOptions>
                    </Listbox>
                    <ErrorMessage
                      name="charId"
                      component="span"
                      className="absolute text-xs left-0 -bottom-3 text-gray-800 font-bold"
                    />
                  </>
                );
              }}
            </Field>
          </label>
          <label className="relative w-52">
            <span className="text-gray-700 font-sans font-bold text-xl">
              {t('form.clanColor')}
            </span>

            <Field name="clanColor">
              {({ field, form }: FieldProps<FormValues>) => (
                <Listbox
                  value={field.value}
                  onChange={value => form.setFieldValue('clanColor', value)}
                >
                  <ListboxButton
                    className="w-full h-11 text-left py-2 px-6 border outline-none bg-white border-gray-300 rounded hover:border-blue-600 hover:shadow-md
                         focus:border-blue-600  transition-all duration-300 text-gray-700"
                    onClick={() => {}}
                  >
                    {field.value
                      ? t(`color.${field.value}`)
                      : t('form.selectColor')}
                  </ListboxButton>

                  <ListboxOptions anchor="bottom">
                    {clanColorKeys.map(colorKey => (
                      <ListboxOption
                        key={colorKey}
                        value={colorKey}
                        className={`w-52 py-2 px-10 border outline-none ${COLOR_OPTIONS[colorKey]} border-gray-300 rounded hover:border-blue-600 hover:bg-blue-100 hover:shadow-md
                         focus:border-blue-600 transition-all duration-300 text-gray-700`}
                      >
                        {t(`color.${colorKey}`)}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Listbox>
              )}
            </Field>
          </label>

          <label className="relative w-52 group">
            <span className="text-gray-700  font-sans font-bold text-xl">
              {t('form.logo')}
            </span>
            <Field name="logo">
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

                      form.setFieldValue('logo', compressed);
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <div
                    className="w-full h-11 flex items-center justify-center border border-gray-300 rounded 
                        group-hover:border-blue-600 group-hover:shadow-md transition-all duration-300 bg-white"
                  >
                    {(() => {
                      const file = form.values.logo as File | null;

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
                          <span className="text-sm">
                            {t('form.selectFile')}
                          </span>
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
            {isLoading ? (
              <ClockLoader size={30} color="white" />
            ) : (
              t('form.addBtn')
            )}
          </button>
        </Form>
      </Formik>
    </div>
  );
}
