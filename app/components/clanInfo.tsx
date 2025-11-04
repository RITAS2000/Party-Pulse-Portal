"use client"
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function SimpleFormikTextarea() {
  const [emoji] = useState(['😊', '😂', '❤️','🙂','✨','🔥','🎉']);

  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={(values, { resetForm }) => {
        toast.success(" sended")
        resetForm();
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div>
            <Field
              as="textarea"
              name="message"
              rows={5}
              className=""
            />
          </div>

          <div className=''>
            {emoji.map((e) => (
              <button
                type="button"
                key={e}
                onClick={() =>
                  setFieldValue('message', values.message + e)
                }
                style={{ marginRight: '5px' }}
              >
                {e}
              </button>
            ))}
          </div>

          <button type="submit">Відправити</button>
        </Form>
      )}
    </Formik>
  );
}