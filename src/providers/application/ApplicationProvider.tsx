"use client";

import { addAttachmentToApplication } from "@/services/daam/index.client";
import {
  Form,
  FormField,
  RetrievedApplication,
} from "@/types/application.types";
import {
  addAttachmentIdToFieldValue,
  deleteAttachmentIdFromFieldValue,
  updateFormWithNewAttachment,
} from "@/utils/application";
import { useParams } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  ApplicationAction,
  ApplicationActionType,
  ApplicationContextState,
  ApplicationState,
} from "./ApplicationProvider.types";

const ApplicationContext = createContext<ApplicationContextState | undefined>(
  undefined,
);

function reducer(
  state: ApplicationState,
  action: ApplicationAction,
): ApplicationState {
  switch (action.type) {
    case ApplicationActionType.LOADING:
      return { ...state, isLoading: true };

    case ApplicationActionType.APPLICATION_LOADED:
      return {
        ...state,
        application: action.payload as RetrievedApplication,
        isLoading: false,
      };

    case ApplicationActionType.ATTACHMENT_ATTACHED:
      const attachPayload = action.payload as {
        formId: number;
        fieldId: number;
        attachmentId: number;
      };
      return {
        ...state,
        application: {
          ...state.application,
          forms: updateFormWithNewAttachment(
            state.application!.forms,
            attachPayload.formId,
            attachPayload.fieldId,
            attachPayload.attachmentId,
            addAttachmentIdToFieldValue,
          ) as Form[],
        } as RetrievedApplication,
        isLoading: false,
      };

    case ApplicationActionType.ATTACHMENT_DELETED:
      const deletePayload = action.payload as {
        formId: number;
        fieldId: number;
        attachmentId: number;
      };
      return {
        ...state,
        application: {
          ...state.application,
          forms: updateFormWithNewAttachment(
            state.application!.forms,
            deletePayload.formId,
            deletePayload.fieldId,
            deletePayload.attachmentId,
            deleteAttachmentIdFromFieldValue,
          ) as Form[],
        } as RetrievedApplication,
        isLoading: false,
      };

    case ApplicationActionType.REJECTED:
      return { ...state, error: action.payload as string, isLoading: false };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

type ApplicationProviderProps = {
  children: React.ReactNode;
};

function ApplicationProvider({ children }: ApplicationProviderProps) {
  const initialState: ApplicationState = {
    application: null,
    isLoading: false,
    error: null,
  };

  const [{ application, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const { id } = useParams<{ id: string }>();

  const fetchApplication = useCallback(async () => {
    dispatch({ type: ApplicationActionType.LOADING });
    try {
      const response = await fetch(`/api/applications/${id}`);
      const retrievedApplication = (await response.json()).body;
      dispatch({
        type: ApplicationActionType.APPLICATION_LOADED,
        payload: retrievedApplication,
      });
    } catch {
      dispatch({
        type: ApplicationActionType.REJECTED,
        payload: "Failed to fetch application",
      });
    }
  }, [id]);

  useEffect(() => {
    fetchApplication();
  }, [id, fetchApplication]);

  async function addAttachment(
    formId: number,
    fieldId: number,
    formData: FormData,
  ): Promise<void> {
    if (!formData.get("file"))
      dispatch({
        type: ApplicationActionType.REJECTED,
        payload: "Failed to add attachment: no file has been provided",
      });

    try {
      dispatch({ type: ApplicationActionType.LOADING });

      const { id: attachmentId } = await addAttachmentToApplication(
        application!.id,
        formData,
      );

      dispatch({
        type: ApplicationActionType.ATTACHMENT_ATTACHED,
        payload: {
          attachmentId,
          formId,
          fieldId,
        },
      });
    } catch {
      dispatch({
        type: ApplicationActionType.REJECTED,
        payload: "Failed to add attachment",
      });
    }
    saveFormAndDuos();
    fetchApplication();
  }

  function deleteAttachment(
    formId: number,
    fieldId: number,
    attachmentId: number,
  ) {
    dispatch({
      type: ApplicationActionType.ATTACHMENT_DELETED,
      payload: {
        attachmentId,
        formId,
        fieldId,
      },
    });
    saveFormAndDuos();
    fetchApplication();
  }

  function saveFormAndDuos() {
    fetch(`/api/applications/${application!.id}/save-forms-and-duos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        forms: application!.forms.map((form: Form) => ({
          id: form.id,
          fields: form.fields.map((field: FormField) => ({
            fieldId: field.id,
            value: field.value,
          })),
        })),
        duosCodes: [],
      }),
    });
  }

  function submitApplication() {
    fetch(`/api/applications/${application!.id}/submit`, {
      method: "POST",
    });
    fetchApplication();
  }
  return (
    <ApplicationContext.Provider
      value={{
        application,
        isLoading,
        error,
        addAttachment,
        deleteAttachment,
        submitApplication,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

function useApplicationDetails() {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error(
      "useAttachmentUpload must be used within a AttachmentUploadProvider",
    );
  }
  return context;
}

export { ApplicationProvider, useApplicationDetails };
