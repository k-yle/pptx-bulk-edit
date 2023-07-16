import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export const Failure: React.FC = () => (
  <Alert
    icon={<IconAlertCircle size="1rem" />}
    title="Process Failed!"
    color="red"
  >
    Due to an unexpected error, your file could not be converted. You can reload
    the page and try again.
  </Alert>
);
