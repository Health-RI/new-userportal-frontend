// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useApplicationDetails } from "@/providers/application/ApplicationProvider";
import { FormField } from "@/types/application.types";
import { useEffect, useState } from "react";

type InputFormFieldProps = {
  field: FormField;
  formId: number;
  title: string;
};

function InputFormField({ formId, field, title }: InputFormFieldProps) {
  const { isLoading, updateInputFields } = useApplicationDetails();
  const [inputValue, setInputValue] = useState(field.value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue !== field.value) {
        updateInputFields(formId, field.id, inputValue);
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [inputValue, formId, field, updateInputFields]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="rounded border p-4">
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-primary text-lg sm:text-xl">{`${title} ${
            field.optional ? "(Optional)" : ""
          }`}</h3>
        </div>
        <input
          type="text"
          placeholder={title}
          value={inputValue}
          onChange={handleInputChange}
          className="border-primary focus:ring-primary mt-4 w-full rounded-lg border-2 px-4 py-[9px] shadow-sm transition-all duration-200 ease-in-out hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2"
          disabled={isLoading}
        />
      </div>
    </div>
  );
}

export default InputFormField;
