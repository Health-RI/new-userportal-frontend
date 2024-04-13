// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
"use client";

import { addAttachmentToApplication } from "@/services/daam/index.client";
import { FormField, RetrievedApplication } from "@/types/application.types";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import { useState } from "react";
import FileUploaded from "./fileUploaded";

type FieldAttachmentContainerProps = {
  field: FormField;
  formId: number;
  application: RetrievedApplication;
  setApplication: React.Dispatch<React.SetStateAction<RetrievedApplication>>;
};

function FieldAttachmentContainer({
  field,
  formId,
  application,
  setApplication,
}: FieldAttachmentContainerProps) {
  const [files, setFiles] = useState<File[]>([]);
  const id = useParams()["id"] as string;

  async function onUploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setFiles((files) => [...files, file]);

    try {
      const data = new FormData();
      data.set("file", file);

      const { id: attachmentId } = await addAttachmentToApplication(id, data);

      setApplication((application) => {
        return {
          ...application,
          attachments: [
            ...application.attachments,
            { id: attachmentId, filename: file.name, type: file.type },
          ],
          forms: application.forms.map((form) => {
            if (!(form.id === formId)) return form;

            return {
              ...form,
              fields: form.fields.map((field) => {
                if (!(field.id === field.id)) return field;

                return {
                  ...field,
                  value: files.map((file) => file.name).join(","),
                };
              }),
            };
          }),
        };
      });

      fetch(`/api/applications/${id}/save-forms-and-duos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          forms: application.forms.map((form) => ({
            id: form.id,
            fields: form.fields.map((field) => ({
              fieldId: field.id,
              value: field.value,
            })),
          })),
          duosCodes: [],
        }),
      });

      const response = await fetch(`/api/applications/${id}`);
      const retrievedApplication = (await response.json()).body;
      setApplication(retrievedApplication);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mt-10 rounded border p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg text-primary sm:text-xl">{`${field.title[0].name} Attachment`}</h3>
        </div>
        <input
          type="file"
          id="file-upload"
          onChange={onUploadFile}
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
        {" "}
        {files.map((file: File, index) => (
          <li key={index} className="list-none">
            <FileUploaded filename={file.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FieldAttachmentContainer;
