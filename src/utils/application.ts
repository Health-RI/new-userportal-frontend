// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { Form, RetrievedApplication, State } from '@/types/application.types';

function formatApplicationState(state: State) {
  const s = state.split('/').pop() as string;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function isApplicationComplete(application: RetrievedApplication) {
  return application.forms
    .map((form) => form.fields)
    .flat()
    .every((field) => field.value !== '');
}

function isApplicationEditable(application: RetrievedApplication) {
  return application.state === State.DRAFT || application.state === State.RETURNED;
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
  if (isPresent(newAttachmentId, value)) return value;
  return value ? `${value},${newAttachmentId}` : newAttachmentId.toString();
}

function deleteAttachmentIdFromFieldValue(value: string, attachmentId: number) {
  if (!isPresent(attachmentId, value)) return value;

  return value === attachmentId.toString()
    ? ''
    : value
        .split(',')
        .filter((id) => id !== attachmentId.toString())
        .join(',');
}

function isPresent(id: number, set: string) {
  return set.split(',').includes(id.toString());
}

export {
  addAttachmentIdToFieldValue,
  deleteAttachmentIdFromFieldValue,
  formatApplicationState,
  isApplicationComplete,
  isApplicationEditable,
  updateFormWithNewAttachment,
};
