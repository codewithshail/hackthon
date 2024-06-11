import React from 'react';
import { JsonFormsModel } from '@/types/form-types';
import { Input } from '@/components/ui/input';

type FormType = {
  jsonForm: JsonFormsModel;
};

const FormUi = ({ jsonForm }: FormType) => {
  return (
    <div className="border p-5 h-screen">
      <h2 className='font-bold text-center text-2xl'>{jsonForm.form_title}</h2>
      <h2 className='text-xm text-gray-400 text-center'>{jsonForm.form_subheading}</h2>

      {jsonForm?.form_fields.map((field, index) => (
        <div>
          <div className="my-3">
            <label className='text-sm text-gray-500'>{field.label}</label>
          <Input type={field?.field_type} placeholder={field.placeholder} name={field.field_name} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormUi;
