// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { useApplicationDetails } from "@/providers/application/ApplicationProvider";
import { Attachment } from "@/types/application.types";
import { isApplicationEditable } from "@/utils/application";
import { faClose, faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type FileUploadedProps = {
  attachment: Attachment;
  formId: number;
  fieldId: number;
};

function FileUploaded({ attachment, formId, fieldId }: FileUploadedProps) {
  const { application, isLoading, deleteAttachment } = useApplicationDetails();
  return (
    <div className="bg-white-smoke relative mt-5 flex items-center justify-between gap-x-1 break-all rounded border-2 px-3 py-1.5 sm:gap-x-3">
      <div className="flex items-center gap-x-2 sm:gap-x-4">
        <FontAwesomeIcon
          icon={faFileCircleCheck}
          className="text-info text-base"
        />
        <h3 className="text-info text-sm">{attachment.filename}</h3>
      </div>
      {isApplicationEditable(application!) && (
        <FontAwesomeIcon
          icon={faClose}
          className={`border-1 text-info hover:text-primary cursor-pointer rounded-full p-1.5 text-sm transition-colors duration-200 ${
            isLoading ? "pointer-events-none opacity-10" : ""
          }`}
          onClick={() => deleteAttachment(formId, fieldId, attachment.id)}
        />
      )}
    </div>
  );
}

export default FileUploaded;
