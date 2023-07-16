import { useState } from "react";
import { AppShell, Header, Title } from "@mantine/core";
import { Home, Wizard } from "./pages";

export const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          <Title
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            fw={800}
            sx={{ fontFamily: "Nunito" }}
            w="fit-content"
          >
            PowerPoint Bulk Edit
          </Title>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {hasStarted ? (
        <Wizard onCancel={() => setHasStarted(false)} />
      ) : (
        <Home onStart={() => setHasStarted(true)} />
      )}
    </AppShell>
  );
};
