"use client";

import { Button, styled } from "@mui/material";

export const ButtonBox = styled(Button)(({}) => ({
  borderRadius: "4px",
  padding: "0.55rem 1rem",
  textAlign: "center",
  transition: "0.3s all ease-in-out",
  fontWeight: 600,
  fontSize: "1rem",
  borderWidth: "1px",
  borderStyle: "solid",
  textTransform: "none",
}));
