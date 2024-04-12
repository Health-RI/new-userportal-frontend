// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type FileUploadedProps = {
  filename: string;
};

function FileUploaded({ filename }: FileUploadedProps) {
  return (
    <div className="relative mt-5 flex items-center justify-between gap-x-1 rounded border-2 bg-white-smoke px-3 py-1.5 sm:gap-x-3">
      <div className="flex items-center gap-x-2 sm:gap-x-4">
        <FontAwesomeIcon
          icon={faFileCircleCheck}
          className="text-base text-info"
        />
        <h3 className="text-sm text-info">{filename}</h3>
      </div>
    </div>
  );
}

export default FileUploaded;
