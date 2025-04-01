import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";

interface Props {
  progressProps?: LinearProgressProps;
  top?: string;
}
export const TopLoader: React.FC<Props> = ({ progressProps, top = "0" }) => {
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        top: `${top}`,
        right: 0,
        left: 0,
        zIndex: 1000000,
      }}
      className="!text-secondary">
      <LinearProgress
        sx={{ borderRadius: ".2rem" }}
        variant={progressProps?.variant ?? "query"}
        color={"inherit"}
        {...progressProps}
      />
    </Box>
  );
};
