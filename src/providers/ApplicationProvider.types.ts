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
