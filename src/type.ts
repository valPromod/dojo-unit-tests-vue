import Vue from "vue";
export interface RootState {
  version: string;
}

export type VForm = Vue & { validate: () => boolean };
