import { Button, Center, Code, Image, List, Title } from "@mantine/core";
import { UploadFile } from "../../components";
import image from "../../assets/screenshot.png";

export const UploadPpt: React.FC<{
  onBack(): void;
  onFinish(file: File): void;
}> = ({ onBack, onFinish }) => {
  return (
    <>
      Start by uploading your existing PowerPoint presentation.
      <List>
        <List.Item>
          You should create a placeholder slide, and copy–paste it several
          times.
        </List.Item>
        <List.Item>
          If your list of names has a column called{" "}
          <Code color="grey">
            <span style={{ color: "#f00" }}>MY_FIELD</span>
          </Code>
          , then use{" "}
          <Code color="grey">
            _DATA_<span style={{ color: "#f00" }}>MY_FIELD</span>_
          </Code>{" "}
          as a placeholder in your slide. See the example photo below.
        </List.Item>
      </List>
      <Title mt={16} size="h3">
        Example
      </Title>
      <Image src={image} maw={400} />
      <Title mt={16} size="h3">
        Get Started
      </Title>
      <UploadFile
        title="Drop your PowerPoint file here"
        description="Or click here to select a file"
        accept={[".pptx"]}
        onUpload={onFinish}
      />
      <Center mt={32}>
        <Button variant="light" onClick={onBack}>
          Cancel
        </Button>
      </Center>
    </>
  );
};
