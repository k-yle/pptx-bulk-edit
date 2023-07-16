import { Alert, Button, Center, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export const DownloadOutput: React.FC<{
  outputPptx: string;
  numberOfSlidesWithData: number;
}> = ({ outputPptx, numberOfSlidesWithData }) => {
  return (
    <div style={{ maxWidth: 400 }}>
      <Alert
        icon={<IconInfoCircle size="1rem" />}
        title="Success"
        color="green"
      >
        {numberOfSlidesWithData} slides in your presentation have been updated.{" "}
        <br />
        <span style={{ color: "#000b" }}>
          If this tool saved you time, please consider{" "}
          <Text
            color="blue"
            component="a"
            href="https://ko-fi.com/kylenz"
            target="_blank"
            rel="noopener noreferrer"
          >
            making a donation
          </Text>{" "}
          to support the development of this tool.
        </span>
      </Alert>
      <Center my={32}>
        <Button
          variant="filled"
          component="a"
          href={outputPptx}
          download="output.pptx"
        >
          Download Updated Presentation
        </Button>
      </Center>
    </div>
  );
};
