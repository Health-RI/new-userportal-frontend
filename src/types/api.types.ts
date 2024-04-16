export interface ErrorResponse {
  title: string;
  status: number;
  detail: string;
}

export interface ValidationWarnings {
  key: string;
  formId: string;
  fieldId: string;
  fieldValidationKey: string;
}
