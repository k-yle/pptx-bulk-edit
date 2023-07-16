import { Stepper } from "@mantine/core";

export const Steps: React.FC<{ stage: 1 | 2 | 3 | 4 | 5 }> = ({ stage }) => (
  <Stepper active={stage - 1} breakpoint="sm">
    <Stepper.Step label="Upload Powerpoint File" />
    <Stepper.Step label="Upload CSV File" />
    <Stepper.Step label="Confirm Details" />
    <Stepper.Step label="Save new Powerpoint" />
  </Stepper>
);
