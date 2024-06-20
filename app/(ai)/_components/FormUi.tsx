import React, { useState } from "react";
import { JsonFormsModel, FormField } from "@/types/form-types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import EditForm from "./EditForm";

type FormType = {
  jsonForm: JsonFormsModel;
  onUpdate: (updatedForm: JsonFormsModel) => void;
  selectedTheme: String;
  editable: Boolean;
};

const FormUi = ({
  jsonForm,
  onUpdate,
  selectedTheme,
  editable = true,
}: FormType) => {
  const [formFields, setFormFields] = useState(jsonForm.form_fields);

  const handleSaveField = (updatedField: FormField, index: number) => {
    const updatedFields = [...formFields];
    updatedFields[index] = updatedField;
    setFormFields(updatedFields);

    onUpdate({
      ...jsonForm,
      form_fields: updatedFields,
    });
  };

  const handleDeleteField = (index: number) => {
    const updatedFields = formFields.filter((_, i) => i !== index);
    setFormFields(updatedFields);

    onUpdate({
      ...jsonForm,
      form_fields: updatedFields,
    });
  };

  return (
    <div className="border p-5 rounded-lg" data-theme={selectedTheme}>
      <h2 className="font-bold text-center text-2xl">{jsonForm.form_title}</h2>
      <h2 className="text-xm text-gray-400 text-center">
        {jsonForm.form_subheading}
      </h2>

      {formFields?.map((field, index) => (
        <div key={index} className="flex items-center gap-2">
          {field.field_type === "select" ? (
            <div className="my-3 w-full">
              <label className="text-sm text-gray-500">{field.label}</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : field.field_type === "radio" ? (
            <div className="my-3 w-full">
              <label className="text-sm text-gray-500">{field.label}</label>
              <RadioGroup>
                {field.options?.map((item, index) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <RadioGroupItem value={item} id={item} />
                    <Label htmlFor={item}>{item}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.field_type === "checkbox" ? (
            <div className="my-3 w-full">
              <label className="text-sm text-gray-500">{field.label}</label>
              {field?.options ? (
                field.options?.map((item, index) => (
                  <div className="flex gap-2 items-center" key={index}>
                    <Checkbox />
                    <h2>{item}</h2>
                  </div>
                ))
              ) : (
                <div className="flex gap-2 items-center">
                  <Checkbox />
                  <h2>{field.label}</h2>
                </div>
              )}
            </div>
          ) : (
            <div className="my-3 w-full">
              <label className="text-sm text-gray-500">{field.label}</label>
              <Input
                type={field.field_type}
                placeholder={field.placeholder}
                name={field.field_name}
              />
            </div>
          )}
          <div>
            {editable && (
              <EditForm
                defaultValue={field}
                onSave={(updatedField) => handleSaveField(updatedField, index)}
                onDelete={() => handleDeleteField(index)}
              />
            )}
          </div>
        </div>
      ))}
      <button className="btn btn-primary">Submit</button>
    </div>
  );
};

export default FormUi;
