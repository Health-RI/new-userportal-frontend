// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useApplicationDetails } from "@/providers/application/ApplicationProvider";
import { FormField } from "@/types/application.types";
import { isApplicationComplete } from "@/utils/application";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileUploaded from "./FileUploaded";

type FieldContainerProps = {
  formId: number;
  field: FormField;
};

function FieldContainer({ formId, field }: FieldContainerProps) {
  const { application, addAttachment } = useApplicationDetails();

  const fieldTitle =
    field.title.find((label) => label.language === "en")?.name ||
    field.title[0].name;

  return (
    <div className="mt-10 rounded border p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg text-primary sm:text-xl">{`${fieldTitle} Attachment`}</h3>
        </div>
        <input
          type="file"
          id="file-upload"
          onChange={(e) => {
            const file = e.target.files![0];
            const formData = new FormData();
            formData.set("file", file);
            addAttachment(formId, field.id, formData);
          }}
          className="hidden"
          disabled={!isApplicationComplete(application!)}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer rounded-lg bg-info p-2 py-2 text-[9px] font-bold tracking-wide text-white transition-colors duration-200 hover:opacity-80 sm:w-auto sm:px-4 sm:text-xs"
        >
          <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
          <span>Upload File</span>
        </label>
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-x-6">
        {field.value &&
          field.value.split(",").map((attachmentId: string) => {
            const attachment = application?.attachments.find(
              (a) => a.id === parseInt(attachmentId),
            );
            return (
              attachment && (
                <li key={attachmentId} className="list-none">
                  <FileUploaded filename={attachment.filename} />
                </li>
              )
            );
          })}
      </ul>
    </div>
  );
}

export default FieldContainer;
