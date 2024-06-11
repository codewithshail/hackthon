import React from "react";
import { CreateForm } from "../../_components/CreateForm";

const FormBuilder = () => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-2x flex item-center justify-between">
        <span className="text-2xl">FormBuilder</span>
        <CreateForm />
      </h2>
    </div>
  );
};

export default FormBuilder;
