import { useState } from "react";
import { Alert, Button, Center, Code, List, Text } from "@mantine/core";
import csvToJson from "csvtojson";
import { IconAlertCircle } from "@tabler/icons-react";
import { CsvObject } from "../../constants";
import { UploadFile } from "../../components";
import image from "../../assets/screenshot.png";

export const UploadCsv: React.FC<{
  onBack(): void;
  onFinish(csv: CsvObject): void;
}> = ({ onBack, onFinish }) => {
  const [error, setError] = useState(false);

  const onUpload = async (file: File) => {
    try {
      const csv = await file.text();
      const asJson = await csvToJson().fromString(csv);

      onFinish(asJson);
    } catch {
      setError(true);
    }
  };
  return (
    <>
      {error && (
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Invalid CSV File!"
          color="red"
        >
          Your CSV file is not valid. Please try again. You can use an app like
          “Notepad” to inspect your CSV file before you upload.
        </Alert>
      )}
      Next, upload your list of names.
      <List>
        <List.Item>
          If you use Excel, save the file as a <Code>.csv</Code> file.
        </List.Item>
        <List.Item>
          Alternatively, you can easily create <Code>.csv</Code> files using an
          app like “Notepad”.
        </List.Item>
        <List.Item>
          Keep the file simple, and make sure all columns have a header.
        </List.Item>
        <List.Item>
          If you used a template like{" "}
          <Code color="grey">
            _DATA_<span style={{ color: "#f00" }}>MY_FIELD</span>_
          </Code>{" "}
          in your slideshow, then the corresponding column should be called{" "}
          <Code color="grey">
            <span style={{ color: "#f00" }}>MY_FIELD</span>
          </Code>
          .{" "}
          <Text
            color="blue"
            component="a"
            href={image}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Example
          </Text>
          .
        </List.Item>
      </List>
      <br />
      <UploadFile
        title="Drop your CSV file here"
        description="Or click here to select a file"
        accept={[".csv"]}
        onUpload={onUpload}
      />
      <Center mt={32}>
        <Button variant="light" onClick={onBack}>
          Back
        </Button>
      </Center>
    </>
  );
};
