import { Group, Text, rem, useMantineTheme } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";

export const UploadFile: React.FC<{
  onUpload(file: File): void;
  accept: string[];
  title: string;
  description: string;
}> = ({ accept, onUpload, title, description }) => {
  const theme = useMantineTheme();
  return (
    <Dropzone
      onDrop={(files) => onUpload(files[0])}
      maxSize={3 * 1024 ** 2}
      accept={accept}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: rem(220), pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            size="3.2rem"
            stroke={1.5}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 4 : 6
              ]
            }
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size="3.2rem"
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size="3.2rem" stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            {title}
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            {description}
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};
