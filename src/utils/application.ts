// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { Form, RetrievedApplication, State } from '@/types/application.types';

function formatApplicationState(state: State) {
  if (!state) return '';

  const s = state.split('/')?.pop() || '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function isApplicationComplete(application: RetrievedApplication) {
  if (!application.forms) return false;

  return application.forms
    .map((form) => form?.fields)
    .flat()
    .every((field) => field?.value?.split(',')?.length > 1);
}

function updateFormWithNewAttachment(
  forms: Form[],
  formId: number,
  fieldId: number,
  newAttachmentId: number,
  action: (fieldValue: string, attachmentId: number) => string,
) {
  return forms.map((form) =>
    form.id === formId ? updateFormFieldWithNewAttachment(form, fieldId, newAttachmentId, action) : form,
  );
}

function updateFormFieldWithNewAttachment(
  form: Form,
  fieldId: number,
  newAttachmentId: number,
  action: (fieldValue: string, attachmentId: number) => string,
): Form {
  return {
    ...form,
    fields: form.fields.map((field) =>
      field.id === fieldId ? { ...field, value: action(field.value, newAttachmentId)! } : field,
    ),
  };
}

function addAttachmentIdToFieldValue(value: string, newAttachmentId: number) {
  return value ? `${value},${newAttachmentId}` : newAttachmentId.toString();
}

function deleteAttachmentIdFromFieldValue(value: string, attachmentId: number) {
  return value === attachmentId.toString()
    ? ''
    : value
        .split(',')
        .filter((id) => id !== attachmentId.toString())
        .join(',');
}

export {
  addAttachmentIdToFieldValue,
  deleteAttachmentIdFromFieldValue,
  formatApplicationState,
  isApplicationComplete,
  updateFormWithNewAttachment,
};
