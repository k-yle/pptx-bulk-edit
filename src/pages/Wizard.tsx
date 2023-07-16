import { useEffect, useState } from "react";
import { Card, Center, Container } from "@mantine/core";
import { CsvObject, FoundVariables } from "../constants";
import {
  readVariablesFromPowerpoint,
  updatePowerpointWithDynamicData,
} from "../logic";

import { Steps } from "../components";
import { ConfirmDetails, DownloadOutput, UploadCsv, UploadPpt } from "./steps";
import { Failure, Loading } from "./states";

export const Wizard: React.FC<{ onCancel(): void }> = ({ onCancel }) => {
  const [inputPptx, setInputPptx] = useState<File>();
  const [inputCsv, setInputCsv] = useState<CsvObject>();
  const [foundVariables, setFoundVariables] = useState<FoundVariables>();
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [outputPptx, setOutputPptx] = useState<string>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (!inputPptx) return;

    readVariablesFromPowerpoint(inputPptx)
      .then(setFoundVariables)
      .catch(setError);
  }, [inputPptx]);

  useEffect(() => {
    if (!hasConfirmed || !foundVariables || !inputPptx || !inputCsv) return;

    updatePowerpointWithDynamicData(inputPptx, foundVariables, inputCsv)
      .then(URL.createObjectURL)
      .then(setOutputPptx)
      .catch(setError);
  }, [hasConfirmed, foundVariables, inputPptx, inputCsv]);

  function getPageContent() {
    if (error) return <Failure />;

    // Step 1. Upload PPT
    if (!inputPptx) {
      return <UploadPpt onBack={onCancel} onFinish={setInputPptx} />;
    }

    // Step 2. Upload PPT
    if (!inputCsv) {
      return (
        <UploadCsv
          onBack={() => setInputPptx(undefined)}
          onFinish={setInputCsv}
        />
      );
    }

    // Step 3a: Wait for PPT to be processed. Theoretically the
    //          user should never have to wait, beacuse this
    //          happens in the backgroudn while they upload their
    //          CSV file.
    if (!foundVariables) return <Loading />;

    // Step 3: Confirm the extracted details.
    if (!hasConfirmed) {
      return (
        <ConfirmDetails
          foundVariables={foundVariables}
          inputCsv={inputCsv}
          onBack={() => setInputCsv(undefined)}
          onFinish={() => setHasConfirmed(true)}
        />
      );
    }

    // Step 4a: Wait for the PPT to generate
    if (!outputPptx) return <Loading />;

    // Step 5: Download the result
    return (
      <DownloadOutput
        outputPptx={outputPptx}
        numberOfSlidesWithData={
          Object.values(foundVariables).filter((variables) => variables.length)
            .length
        }
      />
    );
  }

  return (
    <Container w="max(75%, 750px)">
      <Steps
        stage={
          outputPptx ? 5 : hasConfirmed ? 4 : inputCsv ? 3 : inputPptx ? 2 : 1
        }
      />
      <Center>
        <Card my={32}>{getPageContent()}</Card>
      </Center>
    </Container>
  );
};
