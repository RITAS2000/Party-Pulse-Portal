import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import { DatePicker, registerLocale } from 'react-datepicker';
import { uk, enUS, ru, Locale } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { ClockLoader } from 'react-spinners';
import 'react-datepicker/dist/react-datepicker.css';
import { MouseEventHandler } from 'react';
import * as Yup from 'yup';
import TimePicker from 'react-time-picker';
import { createGvg } from '@/redux/gvg/operation';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';

const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;



const territories = [
  '1-Замерзшие земли',
  '2-Ледяной путь',
  '3-Ущелье лавин',
  '4-Лесной хребет',
  '5-Древний путь',
  '6-Роковой город',
  '7-Город истоков',
  '8-Великая стена',
  '9-Равнина побед',
  '10-Город мечей',
  '11-Крепость-Компас',
  '12-Сломанная гора',
  '13-Деревня огня',
  '14-Перечный луг',
  '15-Равнина ветров',
  '16-Поселок ветров',
  '17-Изумрудный лес',
  '18-Светлые горы',
  '19-Земли драконов',
  '20-Город оборотней',
  '21-Шелковые горы',
  '22-Портовый город',
  '23-Город Драконов',
  '24-Пахучий склон',
  '25-Плато заката',
  '26-Динный откос',
  '27-Небесное озеро',
  '28-Долина орхидей',
  '29-Персиковый док',
  '30-Высохшее море',
  '31-река Риошу',
  '32-Гора лебедя',
  '33-Безопасный путь',
  '34-Небесный утес',
  '35-Поле костей',
  '36-Южные горы',
  '37-Город перьев',
  '38-Тренога Юй-вана',
  '39-Бездушная топь',
  '40-Туманная чаща',
  '41-Белые горы',
  '42-Черные горы',
  '43-Горы мечтателей',
  '44-Порт мечты',
];
interface CustomInputProps {
  value?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const CustomInput = ({ value, onClick }: CustomInputProps) => (
  <button
    type="button"
    onClick={onClick}
    className=" h-11 w-56 text-left py-2 px-6 border outline-none bg-white border-gray-300 rounded hover:border-blue-600 hover:shadow-md
                 focus:border-blue-600 transition-all duration-300 text-gray-700"
  >
    {value || 'Виберіть дату'}
  </button>
);
registerLocale('uk', uk);
registerLocale('en', enUS);
registerLocale('ru', ru);


export default function AddGvGForm() {
    const params = useParams();
const clanId = Array.isArray(params?.clanId) ? params.clanId[0] : params?.clanId;
 const dispatch = useDispatch<AppDispatch>();

    const { t, i18n } = useTranslation();
    const validationSchema = Yup.object().shape({
    territory: Yup.string().required(t("form.territoryRequired")),
     enemy: Yup.string()
          .min(2, t('form.enemyTooShort'))
          .max(10, t('form.enemyTooLong'))
          .required(t('form.enemyRequired')),
  type: Yup.string().required(t("form.typeRequired")),
  date: Yup.date().nullable().required(t("form.dateRequired")),
  time: Yup.string()
    .required(t("form.timeRequired"))
    .matches(timeRegex, t("form.timeFormat")),
});

  const localeMap: Record<string, Locale> = {
    uk: uk,
    en: enUS,
    ru: ru,
  };
  const currentLocale = localeMap[i18n.language] || enUS;
  const types = ['attack', 'defense'];
  const initialValues = {
      territory: '',
      enemy: '',
    type: '',
      date: null as Date | null,
    time: "00:00",
    };
    

    
    const handleSubmit = async (
        values: typeof initialValues,
        formikHelpers: { resetForm: () => void }
    ) => {

        const payload = {
            territory: values.territory,
            enemy: values.enemy,
            type: values.type,
            date: values.date,
            time: values.time,
            clanId,
        };

        const resultAction = await dispatch(createGvg(payload));

        if (createGvg.fulfilled.match(resultAction)) {
            toast.success(t('toast.gvgSuccess'), {
                className: 'w-auto text-green-300 font-bold text-lg',
            });
            formikHelpers.resetForm();
        } else {
            toast.error(t('toast.gvgError'), {
                className: 'w-auto text-red-300 font-bold text-lg',
            });
        }
    }

    
  return (
    <div className="w-auto h-auto px-12 py-6 border-solid border  border-gray-700">
      <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              
      >
        <Form  className="w-auto flex flex-row flex-wrap gap-12 items-end">
          <label className="relative w-52">
            <span className="text-gray-700 font-sans font-bold text-xl">
              {t('form.territory')}
            </span>
            <Field name="territory">
              {({ field, form }: FieldProps) => (
                <>
                  <Listbox
                    value={field.value}
                    onChange={value => form.setFieldValue('territory', value)}
                  >
                    <div className="relative w-full">
                      <ListboxButton
                        className=" h-11 w-56 text-left py-2 px-6 border outline-none bg-white border-gray-300 rounded hover:border-blue-600 hover:shadow-md
                 focus:border-blue-600 transition-all duration-300 text-gray-700"
                      >
                        {field.value
                          ? t(`territories.${field.value.split('-')[0]}`)
                          : t('form.selectTerr')}
                      </ListboxButton>

                      <ListboxOptions anchor="bottom">
                        {territories.map((territory, index) => {
                          const key = territory.split('-')[0]; // витягуємо цифру
                          return (
                            <ListboxOption
                              key={index}
                              value={territory}
                              className="w-52 py-2 px-6 border outline-none bg-white border-gray-300 rounded hover:border-blue-600 hover:bg-blue-100 hover:shadow-md
                       focus:border-blue-600 transition-all duration-300 text-gray-700"
                            >
                              {t(`territories.${key}`)}
                            </ListboxOption>
                          );
                        })}
                      </ListboxOptions>
                    </div>
                  </Listbox>

                  <ErrorMessage
                    name="territory"
                    component="span"
                    className="absolute text-xs left-0 -bottom-3 text-gray-800 font-bold"
                  />
                </>
              )}
            </Field>
                  </label>
                   <label className="relative w-52">
                              <span className="text-gray-700 font-sans font-bold text-xl">
                                {t('form.enemy')}
                              </span>
                              <Field
                                type="text"
                                name="enemy"
                                
                                minLength={2}
                                maxLength={10}
                                className="w-full h-11 py-2 px-6 border border-gray-300 rounded hover:border-blue-600 hover:shadow-md
                                         focus:border-blue-600 transition-all duration-300 text-gray-700"
                              />
                              <ErrorMessage
                                name="enemy"
                                component="span"
                                
                                className="absolute text-xs left-0 -bottom-3 text-gray-800 font-bold"
                              />
                            </label>
          <label className="relative w-52">
            <span className="text-gray-700 font-sans font-bold text-xl">
              {t('form.type')}
            </span>
            <Field name="type">
              {({ field, form }:  FieldProps) => (
                <div className="relative w-56">
                  <Listbox
                    value={field.value}
                    onChange={(val: string) => form.setFieldValue('type', val)}
                  >
                    <ListboxButton
                      className=" h-11 w-52 text-left py-2 px-6 border outline-none bg-white border-gray-300 rounded hover:border-blue-600 hover:shadow-md
                 focus:border-blue-600 transition-all duration-300 text-gray-700"
                    >
                      {field.value
                        ? t(`modes.${field.value}`)
                        : t('form.selectType')}
                    </ListboxButton>

                    <ListboxOptions className="absolute w-52  bg-white border border-gray-300 rounded shadow-lg z-10">
                      {types.map(type => (
                        <ListboxOption
                          key={type}
                          value={type}
                          className="w-52 py-2 px-6 border outline-none bg-white border-gray-300 rounded hover:border-blue-600 hover:bg-blue-100 hover:shadow-md
                       focus:border-blue-600 transition-all duration-300 text-gray-700"
                        >
                          {t(`modes.${type}`)}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Listbox>

                  <ErrorMessage
                    name="type"
                    component="span"
                    className="absolute text-xs left-0 -bottom-3 text-gray-800 font-bold"
                  />
                </div>
              )}
            </Field>
          </label>
          <label className="relative w-52">
            <span className="text-gray-700 font-sans font-bold text-xl">
              {t('form.date')}
            </span>
            <Field name="date">
              {({ field, form }: FieldProps) => (
                <DatePicker
                  className="h-11 w-52 text-left py-2 px-6 border outline-none bg-white border-gray-300 rounded hover:border-blue-600 hover:shadow-md
                 focus:border-blue-600 transition-all duration-300 text-gray-700 "
                  selected={field.value}
                  onChange={(date: Date | null) =>
                    form.setFieldValue(field.name, date)
                  }
                  placeholderText={t('form.selectDate')}
                                  calendarClassName="capitalize"
                                 
                                  dateFormat="dd.MM.yyyy"
                                 
                  locale={currentLocale}
                  calendarStartDay={1}
                  customInput={<CustomInput />}
                  minDate={new Date()}
                  formatWeekDay={nameOfDay =>
                    nameOfDay.charAt(0).toUpperCase() + nameOfDay.charAt(1)
                  }
                />
              )}
            </Field>
            <ErrorMessage
              name="date"
              component="span"
              className="absolute text-xs left-0 -bottom-3 text-gray-800 font-bold"
            />
                  </label>
                  <label className="relative w-24"> <span className="text-gray-700 font-sans font-bold text-xl">
              {t('form.time')}
            </span>
<div className="relative w-24">
  <Field name="time">
    {({ field, form }: FieldProps) => (
      <>
        <input
          type="text"
          placeholder="HH:mm"
          maxLength={5}
          {...field}
          onChange={e => form.setFieldValue(field.name, e.target.value)}
          className="h-11 w-24 text-left py-2 px-6 border outline-none bg-white border-gray-300 rounded hover:border-blue-600 hover:shadow-md focus:border-blue-600 focus:ring-0 focus:shadow-none transition-all duration-300 text-gray-700"
          style={{
            outline: 'none',
            boxShadow: 'none',
          }}
        />
        <ErrorMessage
          name="time"
          component="span"
          className="absolute text-xs left-0 -bottom-3 text-gray-800 font-bold"
        />
      </>
    )}
                          </Field>
                        
                      </div>
                  </label>
                  
                 
               
          <button
            type="submit"
            className="ml-auto font-bold h-11 text-xl px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
          >
            {/* {isLoading ? (
                                  <ClockLoader size={30} color="white" />
                                ) : (
                                  t('form.addBtn')
                                )} */}{' '}
            Додати
          </button>
        </Form>
      </Formik>
    </div>
  );
}
