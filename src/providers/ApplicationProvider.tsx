"use client";

import { addAttachmentToApplication } from "@/services/daam/index.client";
import { Form, FormField } from "@/types/application.types";
import { useParams } from "next/navigation";
import { createContext, useContext, useEffect, useReducer } from "react";
import {
  ApplicationDetailsAction,
  ApplicationDetailsState,
} from "./ApplicationProvider.types";

type ApplicationContextState = ApplicationDetailsState & {
  addAttachment: (
    formId: number,
    fieldId: number,
    formData: FormData,
  ) => Promise<void>;
  deleteAttachment: (
    formId: number,
    fieldId: number,
    attachmentId: number,
  ) => void;
  submitApplication: () => void;
};

const ApplicationContext = createContext<ApplicationContextState | undefined>(
  undefined,
);

function updateFormWithNewAttachment(
  forms: Form[],
  formId: number,
  fieldId: number,
  newAttachmentId: number,
  action: "add" | "delete",
) {
  return forms.map((form) =>
    form.id === formId
      ? updateFieldWithNewAttachment(form, fieldId, newAttachmentId, action)
      : form,
  );
}

function updateFieldWithNewAttachment(
  form: Form,
  fieldId: number,
  newAttachmentId: number,
  action: "add" | "delete",
) {
  const callback =
    action === "add"
      ? addAttachmentIdToFieldValue
      : deleteAttachmentIdFromFieldValue;
  return form.fields.map((field) =>
    field.id === fieldId
      ? { ...field, value: callback(field.value, newAttachmentId) }
      : field,
  );
}

function addAttachmentIdToFieldValue(value: string, newAttachmentId: number) {
  return value ? `${value},${newAttachmentId}` : newAttachmentId;
}

function deleteAttachmentIdFromFieldValue(value: string, attachmentId: number) {
  return value === attachmentId.toString()
    ? null
    : value
        .split(",")
        .filter((id) => id !== attachmentId.toString())
        .join(",");
}

function reducer(
  state: ApplicationDetailsState,
  action: ApplicationDetailsAction,
) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "application/loaded":
      return { ...state, application: action.payload, isLoading: false };

    case "application/attachment/attached":
      return {
        ...state,
        application: {
          ...state.application,
          attachments: [
            ...state.application!.attachments!,
            action.payload.newAttachment,
          ],
          forms: updateFormWithNewAttachment(
            state.application!.forms,
            action.payload.formId,
            action.payload.fieldId,
            action.payload.newAttachment.attachmentId,
            "add",
          ),
        },
        isLoading: false,
      };

    case "application/attachment/deleted":
      return {
        ...state,
        application: {
          ...state.application,
          attachments: state.application!.attachments.filter(
            (attachment) => attachment.id !== action.payload.attachmentId,
          ),
          forms: updateFormWithNewAttachment(
            state.application!.forms,
            action.payload.formId,
            action.payload.fieldId,
            action.payload.attachmentId,
            "delete",
          ),
          isLoading: false,
        },
      };

    case "rejected":
      return { ...state, error: action.payload };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

type ApplicationDetailsProviderProps = {
  children: React.ReactNode;
  pathname: string;
};

function ApplicationDetailsProvider({
  children,
}: ApplicationDetailsProviderProps) {
  const initialState: ApplicationDetailsState = {
    application: null,
    isLoading: false,
    error: null,
  };

  const [{ application, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function fetchApplication() {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`/api/applications/${id}`);
        const retrievedApplication = (await response.json()).body;
        dispatch({ type: "application/loaded", payload: retrievedApplication });
      } catch {
        dispatch({ type: "rejected", payload: "Failed to fetch application" });
      }
    }
    fetchApplication();
  }, [id]);

  async function addAttachment(
    formId: number,
    fieldId: number,
    formData: FormData,
  ): Promise<void> {
    if (!formData.get("file"))
      dispatch({
        type: "rejected",
        payload: "Failed to add attachment: no file has been provided",
      });

    try {
      dispatch({ type: "loading", payload: true });

      const { id } = await addAttachmentToApplication(application.id, formData);

      const newAttachment = {
        id,
        filename: (formData.get("file") as File)?.name || "",
        type: (formData.get("file") as File)?.type || "",
      };

      dispatch({
        type: "application/attachment/attached",
        payload: {
          newAttachment,
          formId,
          fieldId,
        },
      });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Failed to add attachment",
      });
    }
    saveFormAndDuos();
  }

  function deleteAttachment(
    formId: number,
    fieldId: number,
    attachmentId: number,
  ) {
    dispatch({
      type: "application/attachment/deleted",
      payload: {
        attachmentId,
        formId,
        fieldId,
      },
    });
    saveFormAndDuos();
  }

  function saveFormAndDuos() {
    fetch(`/api/applications/${application.id}/save-forms-and-duos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        forms: application.forms.map((form: Form) => ({
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
    fetch(`/api/applications/${application.id}/submit`, {
      method: "POST",
    });
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

export { ApplicationDetailsProvider, useApplicationDetails };
