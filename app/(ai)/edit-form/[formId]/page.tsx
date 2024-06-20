"use client";

import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft, Share2, SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { JsonFormsModel } from "@/types/form-types";
import { db } from "@/lib/db";
import { JsonForms } from "@/lib/db/schema";
import FormUi from "../../_components/FormUi";
import Controller from "../../_components/Controller";
import { Button } from "@/components/ui/button";

interface RouteParams {
  formId: number;
}

const EditFormPage = ({ params }: { params: RouteParams }) => {
  const { user } = useUser();
  const createdBy = user?.primaryEmailAddress?.emailAddress || "";
  const [jsonForm, setJsonForm] = useState<JsonFormsModel | null>(null);
  const router = useRouter();
  const [record, setRecord] = useState<any | null>(null); // Update to store the record data
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedBackground, setSelectedBackground] = useState("");

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
        and(eq(JsonForms.id, params.formId), eq(JsonForms.createdBy, createdBy))
      );
    if (result.length > 0) {
      const formData: JsonFormsModel = JSON.parse(result[0].jsonform);
      setJsonForm(formData);
      setRecord(result[0]); // Update record state with the fetched data
      setSelectedTheme(result[0].theme || "");
      setSelectedBackground(result[0].background || "");
    } else {
      console.error("No form data found for the given parameters.");
    }
  };

  const handleUpdate = async (updatedForm: JsonFormsModel) => {
    await db
      .update(JsonForms)
      .set({ jsonform: JSON.stringify(updatedForm) })
      .where(
        and(eq(JsonForms.id, params.formId), eq(JsonForms.createdBy, createdBy))
      );
    setJsonForm(updatedForm);
  };

  const handleThemeChange = async (newTheme: string) => {
    setSelectedTheme(newTheme);
    await db
      .update(JsonForms)
      .set({ theme: newTheme })
      .where(
        and(eq(JsonForms.id, params.formId), eq(JsonForms.createdBy, createdBy))
      );
  };

  const handleBackgroundChange = async (newBackground: string) => {
    setSelectedBackground(newBackground);
    await db
      .update(JsonForms)
      .set({ background: newBackground })
      .where(
        and(eq(JsonForms.id, params.formId), eq(JsonForms.createdBy, createdBy))
      );
  };

  const livePreview = () => {
    if (record && record.id) {
      window.open(`/aiform/${record.id}`, '_blank'); // Open in a new tab
    } else {
      console.error("No valid record ID found.");
    }
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h2
          className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold"
          onClick={() => router.back()}
        >
          <ArrowLeft /> Back
        </h2>
        <div className="flex gap-2">
          <Button className="flex gap-2" onClick={livePreview}>
            <SquareArrowOutUpRight className="h-5 w-5 " />Live Preview
          </Button>
          <Button className="flex gap-2 bg-green-600 hover:bg-green-700">
            <Share2 className="h-5 w-5" /> Share
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md">
          <Controller
            selectedTheme={selectedTheme}
            onThemeChange={handleThemeChange}
            selectedBackground={selectedBackground}
            onBackgroundChange={handleBackgroundChange}
          />
        </div>
        <div
          className="md:col-span-2 border rounded-lg p-5 flex items-center justify-center"
          style={{ backgroundImage: selectedBackground }}
        >
          {jsonForm !== null ? (
            <FormUi
              selectedTheme={selectedTheme}
              jsonForm={jsonForm}
              onUpdate={handleUpdate}
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditFormPage;
