import { RetrievedApplication, State } from '@/types/application.types';

export function formatState(state: State) {
  if (!state) return '';

  const s = state.split('/')?.pop() || '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function isApplicationComplete(application: RetrievedApplication) {
  if (!application.forms) return false;

  return application.forms
    .map((form) => form?.fields)
    .flat()
    .every((field) => field?.value?.split(',')?.length > 0);
}
