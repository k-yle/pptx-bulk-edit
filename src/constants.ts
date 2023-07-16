export const SLIDE_PREFIX = "ppt/slides/slide";
export const SLIDE_SUFFIX = ".xml";

export type FoundVariables = {
  [slideNumber: number]: string[];
};

export type CsvObject = Record<string, string>[];
