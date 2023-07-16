import JSZip from "jszip";
import {
  CsvObject,
  FoundVariables,
  SLIDE_PREFIX,
  SLIDE_SUFFIX,
} from "../constants";

/**
 * edits the supplied powerpoint presentation, changing
 * the text of the slides.
 */
export async function updatePowerpointWithDynamicData(
  inputPptBlob: File,
  foundVariables: FoundVariables,
  csvDataToInsert: CsvObject,
): Promise<Blob> {
  const ppt = new JSZip();
  await ppt.loadAsync(inputPptBlob);

  const slides = Object.values(ppt.files).filter((file) =>
    file.name.startsWith(SLIDE_PREFIX),
  );

  let index = 0;
  for (const slide of slides) {
    const slideNumber = +slide.name
      .replace(SLIDE_PREFIX, "")
      .replace(SLIDE_SUFFIX, "");

    const rowVariables = foundVariables[slideNumber];
    const rowData = csvDataToInsert[index];

    if (rowVariables.length && rowData) {
      const xml = await slide.async("text");
      const updatedXml = xml.replaceAll(
        /_data_([\w-]+)_/gi,
        (_, variableName) => rowData[variableName.toLowerCase()] || "",
      );
      ppt.file(slide.name, updatedXml);

      index++;
    }
  }

  const outputPptBlob = await ppt.generateAsync({ type: "blob" });

  return outputPptBlob;
}
