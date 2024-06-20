import { Edit, Trash } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { FormField } from "@/types/form-types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  defaultValue: FormField;
  onSave: (updatedField: FormField) => void;
  onDelete: () => void; // Add onDelete callback
};

const EditForm = ({ defaultValue, onSave, onDelete }: Props) => {
  const [label, setLabel] = useState(defaultValue.label);
  const [placeholder, setPlaceholder] = useState(defaultValue.placeholder);

  useEffect(() => {
    setLabel(defaultValue.label);
    setPlaceholder(defaultValue.placeholder);
  }, [defaultValue]);

  const handleSave = () => {
    onSave({
      ...defaultValue,
      label,
      placeholder,
    });
  };

  const handleDelete = () => {
    onDelete(); // Call onDelete callback when trash icon is clicked
  };

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger>
          <Edit className="h-4 w-4 text-gray-500" />
        </PopoverTrigger>
        <PopoverContent>
          <h2>Edit Field</h2>
          <div>
            <label>Label Name</label>
            <Input
              type="text"
              className="mt-2"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
            <label className="mt-2">Placeholder Name</label>
            <Input
              type="text"
              className="mt-2"
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
            />
            <button
              onClick={handleSave}
              className="mt-2 bg-blue-500 text-white p-2 rounded"
            >
              Save
            </button>
          </div>
        </PopoverContent>
      </Popover>

      <AlertDialog>
        <AlertDialogTrigger>
          {" "}
          <Trash
            className="h-4 w-4 text-red-500 cursor-pointer"
             
          />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditForm;
