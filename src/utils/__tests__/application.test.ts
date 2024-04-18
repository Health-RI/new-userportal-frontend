// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { Form, RetrievedApplication, State } from '@/types/application.types';
import {
  addAttachmentIdToFieldValue,
  deleteAttachmentIdFromFieldValue,
  formatApplicationState,
  isApplicationComplete,
  updateFormWithNewAttachment,
} from '../application';

describe('Update application correctly when adding an attachment', () => {
  it('should concatenate the current field value with the attachment id when field value already contains values', () => {
    const forms: Form[] = getForms();
    const formId = 1;
    const fieldId = 2;
    const newAttachmentId = 193;

    const updatedForms = updateFormWithNewAttachment(forms, formId, fieldId, newAttachmentId, addAttachmentIdToFieldValue);

    expect(updatedForms[0].fields[1].value).toEqual('4,5,193');
  });

  it('should set the field value as attachment id when field value is empty string', () => {
    const forms: Form[] = getForms();
    const formId = 1;
    const fieldId = 1;
    const newAttachmentId = 11;

    const updatedForms = updateFormWithNewAttachment(forms, formId, fieldId, newAttachmentId, addAttachmentIdToFieldValue);

    expect(updatedForms[0].fields[0].value).toEqual('11');
  });

  it('should not update the field value if the attachment to be added is already present in field value', () => {
    const forms: Form[] = getForms();
    const formId = 1;
    const fieldId = 2;
    const newAttachmentId = 5;

    const updatedForms = updateFormWithNewAttachment(forms, formId, fieldId, newAttachmentId, addAttachmentIdToFieldValue);

    expect(updatedForms[0].fields[1].value).toEqual('4,5');
  });
});

describe('Update application correctly when removing an attachment', () => {
  it('should remove the attachment id from field value when field value already contains values', () => {
    const forms: Form[] = getForms();
    const formId = 2;
    const fieldId = 2;
    const attachmentId = 8;

    const updatedForms = updateFormWithNewAttachment(forms, formId, fieldId, attachmentId, deleteAttachmentIdFromFieldValue);

    expect(updatedForms[1].fields[1].value).toEqual('2');
  });

  it('should set the field value as empty string when field value equals attachment id', () => {
    const forms: Form[] = getForms();
    const formId = 2;
    const fieldId = 1;
    const attachmentId = 22;

    const updatedForms = updateFormWithNewAttachment(forms, formId, fieldId, attachmentId, deleteAttachmentIdFromFieldValue);

    expect(updatedForms[1].fields[0].value).toEqual('');
  });

  it('should not update the field value if the attachment id to be removed is not present in field value', () => {
    const forms: Form[] = getForms();
    const formId = 1;
    const fieldId = 2;
    const attachmentId = 47;

    const updatedForms = updateFormWithNewAttachment(forms, formId, fieldId, attachmentId, deleteAttachmentIdFromFieldValue);

    expect(updatedForms[0].fields[1].value).toEqual('4,5');
  });
});

describe('Check if application is complete', () => {
  it('should consider application complete if every field has at least one attachment', () => {
    const application = getCompleteApplication();

    const isComplete = isApplicationComplete(application);

    expect(isComplete).toBeTruthy();
  });
  it('should consider application incomplete if at least one field has no attachment ', () => {
    const application = getInCompleteApplication();

    const isComplete = isApplicationComplete(application);

    expect(isComplete).toBeFalsy();
  });
});

describe('Check if application state is correctly formatted', () => {
  it('should format state correctly', () => {
    const state = State.APPROVED;

    const formattedState = formatApplicationState(state);

    expect(formattedState).toEqual('Approved');
  });
});

function getCompleteApplication(): RetrievedApplication {
  return {
    id: 12,
    externalId: '12',
    generatedExternalId: '12',
    description: '',
    createdAt: new Date(),
    modifiedAt: new Date(),
    lastActivity: new Date(),
    permissions: [],
    roles: [],
    worflow: {
      id: 12,
      type: 'type',
    },
    applicant: {
      userId: '12',
      name: 'John Doe',
      email: '',
    },
    members: [],
    datasets: [],
    invitedMembers: [],
    events: [],
    attachments: [],
    licenses: [],
    state: State.DRAFT,
    forms: [
      {
        id: 1,
        internalName: 'form1',
        externalTitle: [],
        fields: [
          {
            id: 1,
            value: '10',
            optional: false,
            private: false,
            visible: false,
            title: [],
            type: '',
          },
          {
            id: 2,
            value: '21',
            optional: false,
            private: false,
            visible: false,
            title: [],
            type: '',
          },
        ],
      },
    ],
  };
}

function getInCompleteApplication(): RetrievedApplication {
  return {
    id: 12,
    externalId: '12',
    generatedExternalId: '12',
    description: '',
    createdAt: new Date(),
    modifiedAt: new Date(),
    lastActivity: new Date(),
    permissions: [],
    roles: [],
    worflow: {
      id: 12,
      type: 'type',
    },
    applicant: {
      userId: '12',
      name: 'John Doe',
      email: '',
    },
    members: [],
    datasets: [],
    invitedMembers: [],
    events: [],
    attachments: [],
    licenses: [],
    state: State.DRAFT,
    forms: [
      {
        id: 1,
        internalName: 'form1',
        externalTitle: [],
        fields: [
          {
            id: 1,
            value: '1',
            optional: false,
            private: false,
            visible: false,
            title: [],
            type: '',
          },
          {
            id: 2,
            value: '12',
            optional: false,
            private: false,
            visible: false,
            title: [],
            type: '',
          },
        ],
      },
      {
        id: 2,
        internalName: 'form2',
        externalTitle: [],
        fields: [
          {
            id: 1,
            value: '198, 19',
            optional: false,
            private: false,
            visible: false,
            title: [],
            type: '',
          },
          {
            id: 2,
            value: '',
            optional: false,
            private: false,
            visible: false,
            title: [],
            type: '',
          },
        ],
      },
    ],
  };
}

function getForms(): Form[] {
  return [
    {
      id: 1,
      internalName: 'form1',
      externalTitle: [],
      fields: [
        {
          id: 1,
          value: '',
          optional: false,
          private: false,
          visible: false,
          title: [],
          type: '',
        },
        {
          id: 2,
          value: '4,5',
          optional: false,
          private: false,
          visible: false,
          title: [],
          type: '',
        },
      ],
    },
    {
      id: 2,
      internalName: 'form2',
      externalTitle: [],
      fields: [
        {
          id: 1,
          value: '22',
          optional: false,
          private: false,
          visible: false,
          title: [],
          type: '',
        },
        {
          id: 2,
          value: '8,2',
          optional: false,
          private: false,
          visible: false,
          title: [],
          type: '',
        },
      ],
    },
  ];
}
