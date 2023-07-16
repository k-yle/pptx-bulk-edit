import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import image from "../assets/screenshot.png";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
}));

export const Home: React.FC<{ onStart(): void }> = ({ onStart }) => {
  const { classes } = useStyles();
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>PowerPoint Bulk Edit</Title>
            <Text color="dimmed" mt="md">
              This tool automatically converts a list of names into a PowerPoint
              presentation. Simply upload your PowerPoint file with
              placeholders, and upload a list of names.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck size={rem(12)} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Save time and energy</b> – avoid copy–pasting 100s of names
                into PowerPoint.
              </List.Item>
              <List.Item>
                <b>Privacy Focussed</b> – All the processing happens in your
                browser. Your data is <em>never</em> uploaded to a server, nor
                sent over the internet.
              </List.Item>
              <List.Item>
                <b>100% Free and open source</b> – This tool is free, and the
                code{" "}
                <Text
                  color="blue"
                  component="a"
                  href="https://github.com/k-yle/pptx-bulk-edit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  is publicly available
                </Text>
                .
              </List.Item>
            </List>

            <Group mt={30}>
              <Button
                radius="xl"
                size="md"
                className={classes.control}
                onClick={onStart}
              >
                Get started
              </Button>
            </Group>
          </div>
          <Image src={image} className={classes.image} />
        </div>
      </Container>
    </div>
  );
};
