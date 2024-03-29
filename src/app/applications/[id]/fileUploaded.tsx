// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { faClose, faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type FileUploadedProps = {
  fileId: number;
  fileName: string;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

function FileUploaded({ fileId, fileName, setFiles }: FileUploadedProps) {
  function onDeleteFile() {
    setFiles((files) => files.filter((_, index) => index !== fileId));
  }
  return (
    <div className="relative mt-5 flex items-center justify-between gap-x-1 rounded border-2 bg-white-smoke px-3 py-1.5 sm:gap-x-3">
      <div className="flex items-center gap-x-2 sm:gap-x-4">
        <FontAwesomeIcon
          icon={faFileCircleCheck}
          className="text-base text-info"
        />
        <h3 className="text-sm text-info">{fileName}</h3>
      </div>
      <FontAwesomeIcon
        icon={faClose}
        onClick={onDeleteFile}
        className="border-1 cursor-pointer text-sm text-info"
      />
    </div>
  );
}

export default FileUploaded;
