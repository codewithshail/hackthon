"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { AiChatSession } from "@/config/AiModel";
import { db } from "@/config";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { JsonForms } from "@/config/schema";
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const prompt =
  ",On the basis of description please give form in json format with form title, form subheading with form having Form field, form name, placeholder name, and form label, fieldtype, field required in Json format";

export function CreateForm() {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();

  const { user } = useUser();

  const route = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(event.target.value);
  };

  const onCreateForm = async () => {
    setLoading(true);
    const result = await AiChatSession.sendMessage(
      "Description:" + (userInput || "") + prompt
    );
    const createdBy = user?.primaryEmailAddress?.emailAddress || "";
    console.log(result.response.text());
    if (result.response.text) {
      const resp = await db
        .insert(JsonForms)
        .values({
          jsonform: result.response.text(),
          createdBy: createdBy,
          createdDate: moment().format("DD/MM/yyyy"),
        })
        .returning({ id: JsonForms.id });
      console.log("New Form ID", resp[0].id);
      if(resp[0].id)
        {
          route.push('/edit-form/' + resp[0].id)
        }
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div>
      <Button onClick={() => setOpenDialog(true)}>Create Form</Button>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new form</DialogTitle>
            <DialogDescription>
              <Textarea
                className="my-2"
                placeholder="Write a description of your form"
                value={userInput}
                onChange={handleInputChange}
              />
              <div className="flex gap-2 my-3 justify-end">
                <Button
                  onClick={() => setOpenDialog(false)}
                  variant="destructive"
                >
                  Cancel
                </Button>
                <Button disabled={loading} onClick={() => onCreateForm()}>
                  {loading? <Loader2 className="animate-spin" /> : 'Create'}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
