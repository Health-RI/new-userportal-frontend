// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useApplicationDetails } from "@/providers/application/ApplicationProvider";
import { FormField } from "@/types/application.types";

type InputFormFieldProps = {
  field: FormField;
  formId: number;
  title: string;
};

function InputFormField({ formId, field, title }: InputFormFieldProps) {
  const { isLoading } = useApplicationDetails();

  return (
    <div className="rounded border p-4">
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-lg text-primary sm:text-xl">{`${title} ${field.optional ? "(Optional)" : ""}`}</h3>
        </div>
        <input
          type="text"
          placeholder={title}
          className="mt-4 w-full rounded-lg border-2 border-primary px-4 py-[9px] shadow-sm transition-all duration-200 ease-in-out hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isLoading}
        />
      </div>
    </div>
  );
}

export default InputFormField;
