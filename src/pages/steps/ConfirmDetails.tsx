import { Alert, Button, Center, Code, Group, Table } from "@mantine/core";
import { IconAlertCircle, IconInfoCircle } from "@tabler/icons-react";
import { CsvObject, FoundVariables } from "../../constants";

export const ConfirmDetails: React.FC<{
  inputCsv: CsvObject;
  foundVariables: FoundVariables;
  onFinish(): void;
  onBack(): void;
}> = ({ foundVariables, inputCsv, onBack, onFinish }) => {
  let index = 0;

  const numberOfSlidesWithData = Object.values(foundVariables).filter(
    (variables) => variables.length,
  ).length;

  const tooLittleData = inputCsv.length < numberOfSlidesWithData;
  const tooMuchData = inputCsv.length > numberOfSlidesWithData;

  const counts = (
    <>
      Your PowerPoint file has <strong>{numberOfSlidesWithData}</strong> slides
      with placeholders. Your CSV file has <strong>{inputCsv.length}</strong>{" "}
      rows.
    </>
  );

  return (
    <>
      {tooLittleData ? (
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Too little data"
          color="orange"
        >
          {counts}
          <br />
          <br />
          This means only the <strong>
            first {numberOfSlidesWithData}
          </strong>{" "}
          placeholder slides will be populated.
        </Alert>
      ) : tooMuchData ? (
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Too much data"
          color="orange"
        >
          {counts}
          <br />
          <br />
          This means the{" "}
          <strong>last {inputCsv.length - numberOfSlidesWithData}</strong> rows
          of names will <strong>not</strong> be included in your presentation.
        </Alert>
      ) : (
        <Alert
          icon={<IconInfoCircle size="1rem" />}
          title="Correct number of slides"
          color="green"
        >
          {counts}
        </Alert>
      )}
      <Table>
        <thead>
          <tr>
            <th>Slide Number</th>
            <th>Replacements</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(foundVariables).map(([slideNumber, variables]) => {
            if (variables.length) index++;
            const dataForThisRow = inputCsv[index];
            return (
              <tr key={slideNumber}>
                <td>Slide {slideNumber}</td>
                <td>
                  <ul>
                    {variables.length
                      ? dataForThisRow
                        ? variables.map((variable) => {
                            const replacement =
                              dataForThisRow[variable] || "(blank)";
                            return (
                              <li key={variable}>
                                <Code>{variable}</Code>
                                {" --> "}
                                <Code>{replacement}</Code>
                              </li>
                            );
                          })
                        : "⚠️ No Change - there is not enough data in your csv file"
                      : "No variables found"}
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Center>
        <Group>
          <Button variant="light" onClick={onBack}>
            Back
          </Button>
          <Button variant="filled" onClick={onFinish}>
            Continue
          </Button>
        </Group>
      </Center>
    </>
  );
};
