// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
"use client";

import { addAttachmentToApplication } from "@/services/daam/index.client";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileUploaded from "./fileUploaded";

type FieldAttachmentContainerProps = {
  fieldName: string;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  params: { id: string };
};

function FieldAttachmentContainer({
  fieldName,
  files,
  setFiles,
  params,
}: FieldAttachmentContainerProps) {
  const { id } = params;

  function onUploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      addAttachmentToApplication(id, data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mt-10 rounded border-2 border-white-smoke p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg text-primary sm:text-2xl">{`${fieldName} Attachment`}</h3>
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
            <FileUploaded
              fileId={index}
              fileName={file.name}
              files={files}
              setFiles={setFiles}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FieldAttachmentContainer;
