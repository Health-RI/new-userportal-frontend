// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
"use client";

import { useApplicationDetails } from "@/providers/ApplicationProvider";
import { Attachment, FormField } from "@/types/application.types";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileUploaded from "./fileUploaded";

type FieldAttachmentContainerProps = {
  formId: number;
  field: FormField;
};

function FieldAttachmentContainer({
  formId,
  field,
}: FieldAttachmentContainerProps) {
  const { application, addAttachment } = useApplicationDetails();

  return (
    <div className="mt-10 rounded border p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg text-primary sm:text-xl">{`${field.title[0]?.name} Attachment`}</h3>
        </div>
        <input
          type="file"
          id="file-upload"
          onChange={(e) => {
            const file = e.target?.files?.[0];
            if (!file) return;
            const formData = new FormData();
            formData.set("file", file);
            addAttachment(formId, field.id, formData);
          }}
          className="hidden"
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
        {application?.attachments.map((attachment: Attachment) => (
          <li key={attachment.id} className="list-none">
            <FileUploaded filename={attachment.filename} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FieldAttachmentContainer;
