"use client";

import { db } from "@/config";
import { JsonForms } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormUi from "../_components/FormUi";
import { JsonFormsModel } from "@/types/form-types";

interface RouteParams {
  formId: number;
}

const EditForm = ({ params }: { params: RouteParams }) => {
  const { user } = useUser();
  const createdBy = user?.primaryEmailAddress?.emailAddress || "";
  const [jsonForm, setJsonForm] = useState<JsonFormsModel | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      GetFormData();
    }
  }, [user]);

  const GetFormData = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(
        and(
          eq(JsonForms.id, params.formId),
          eq(JsonForms.createdBy, createdBy)
        )
      );
    if (result.length > 0) {
      const formData: JsonFormsModel = JSON.parse(result[0].jsonform);
      setJsonForm(formData);
    } else {
      console.error("No form data found for the given parameters.");
    }
  };

  return (
    <div className="p-10">
      <h2
        className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold"
        onClick={() => router.back()}
      >
        <ArrowLeft /> Back
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md">Controller</div>
        <div className="md:col-span-2 border rounded-lg p-4 h-screen">
          {jsonForm !== null ? (
            <FormUi jsonForm={jsonForm} />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditForm;
