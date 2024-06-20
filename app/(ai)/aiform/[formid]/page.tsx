"use client";
import { db } from "@/lib/db";
import { JsonForms } from "@/lib/db/schema";
import React, { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { JsonFormsModel } from "@/types/form-types";
import FormUi from "../../_components/FormUi";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    formid?: string;
  };
};

const LiveAiForm: React.FC<Props> = ({ params }) => {
  const [record, setRecord] = useState<any | null>(null);
  const [jsonForm, setJsonForm] = useState<JsonFormsModel | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>("default");
  const router = useRouter()

  useEffect(() => {
    console.log(params);
    if (params?.formid) {
      fetchFormData();
    }
  }, [params]);

  const fetchFormData = async () => {
    try {
      const result = await db
        .select()
        .from(JsonForms)
        .where(eq(JsonForms.id, Number(params.formid)));

      if (result.length > 0) {
        setRecord(result[0]);
        setJsonForm(JSON.parse(result[0].jsonform));
      }

      console.log(result);
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  const handleUpdate = (updatedData: any) => {
    console.log("Form updated:", updatedData);
  };

  const onClick = () => {
    router.push('/form')
  }

  return (
    <div
      className="p-10 flex justify-center items-center"
      style={{
        backgroundImage: record?.background
        }}
        
    >
      {jsonForm && (
        <FormUi
          selectedTheme={selectedTheme}
          jsonForm={jsonForm}
          onUpdate={handleUpdate}
          editable={false}
        />
      )}
      <div className="flex gap-2 items-center bg-black text-white px-3 py-1 rounded-full fixed bottom-5 left-5 cursor-pointer" onClick={onClick}>
        <Image src="/logo.png" alt="Logo" width={20} height={20} />
        Build your own AI Form
      </div>
    </div>
  );
};

export default LiveAiForm;
