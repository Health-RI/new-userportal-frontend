// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { Form } from "@/types/application.types";
import FieldContainer from "./FieldContainer";

type FormContainerProps = {
  form: Form;
};

function FormContainer({ form }: FormContainerProps) {
  const formTitle =
    form.externalTitle.find((label) => label.language === "en")?.name ||
    form.externalTitle?.[0]?.name;

  return (
    <div className="mt-10 rounded">
      <h3 className="text-2xl text-primary">{formTitle}</h3>
      <ul>
        {form.fields?.map(
          (field) =>
            field && (
              <li key={field.id}>
                <FieldContainer field={field} formId={form.id} />
              </li>
            ),
        )}
      </ul>
    </div>
  );
}

export default FormContainer;
