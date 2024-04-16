import { RetrievedApplication } from '@/types/application.types';

export type ApplicationDetailsState = {
  application: RetrievedApplication | null;
  isLoading: boolean;
  error: string | null;
};

export type ApplicationDetailsAction = {
  type: string;
  payload?: any;
};

export type ApplicationContextState = ApplicationDetailsState & {
  addAttachment: (formId: number, fieldId: number, formData: FormData) => Promise<void>;
  deleteAttachment: (formId: number, fieldId: number, attachmentId: number) => void;
  submitApplication: () => void;
};
