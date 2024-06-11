export type FormField = {
    field_name: string;
    placeholder: string;
    label: string;
    field_type: string;
    required: boolean;
    options?: string[]; // options is optional and only present in select and radio fields
  };
  
  export type JsonFormsModel = {
    form_title: string;
    form_subheading: string;
    form_fields: FormField[];
  };