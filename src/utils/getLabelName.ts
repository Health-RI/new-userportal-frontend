// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
import { Label } from '@/types/application.types';

const CURRENT_SUPPORTED_LANGUAGE = 'en';

export function getLabelName(labels: Label[]): string {
  const label = labels.find((label) => label.language === CURRENT_SUPPORTED_LANGUAGE);
  return label ? label.name : '';
}
