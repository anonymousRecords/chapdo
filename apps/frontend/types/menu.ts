import { type ComponentType } from 'react';

export interface Menu {
  id: string;
  name: string;
  href: string;
  description?: string;
  icon?: ComponentType;
}