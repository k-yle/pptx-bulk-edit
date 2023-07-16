import JSZip from "jszip";
import { FoundVariables, SLIDE_PREFIX, SLIDE_SUFFIX } from "../constants";

/**
 * reads all the text in the powerpoint presentation to
 * find "__DATA_xxxx_"
 */
export async function readVariablesFromPowerpoint(
  inputPptBlob: File,
): Promise<FoundVariables> {
  const ppt = new JSZip();
  await ppt.loadAsync(inputPptBlob);

  const slides = Object.values(ppt.files).filter((file) =>
    file.name.startsWith(SLIDE_PREFIX),
  );

  const foundVariables: FoundVariables = {};

  for (const slide of slides) {
    const slideNumber = +slide.name
      .replace(SLIDE_PREFIX, "")
      .replace(SLIDE_SUFFIX, "");

    const xml = await slide.async("text");
    foundVariables[slideNumber] = [...xml.matchAll(/_data_([\w-]+)_/gi)].map(
      (match) => match[1].toLowerCase(),
    );
  }

  return foundVariables;
}
