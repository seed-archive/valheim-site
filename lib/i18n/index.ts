import en from "./en.json";

// English only for now.
export enum EnabledLanguages {
  EN = "EN",
}

export type NestedMessages = {
  [key: string]: string | NestedMessages;
};

export const i18n: Record<EnabledLanguages, NestedMessages> = {
  [EnabledLanguages.EN]: en,
};
