"use client";

import { ButtonBox } from "./button.styles";
import * as React from "react";
import { CircularProgress, Theme } from "@mui/material";

export const AppButton: React.FC<IButtonProps> = ({
  link,
  onClick,
  isDisabled,
  type = "button",
  loading,
  variant = "Primary",
  children,
  extraClass,
}) => {
  const btnPrimary = {
    backgroundColor: (theme: Theme) => theme.palette.primary.main,
    color: "#ffffff",
    borderColor: (theme: Theme) => theme.palette.primary.main,

    "&:hover": {
      backgroundColor: (theme: Theme) => theme.palette.primary.light,
    },

    "&:disabled": {
      backgroundColor: "#C4C4C4 !important",
      borderColor: "#C4C4C4 !important",
    },
  };

  const btnOutline = {
    backgroundColor: "transparent",
    color:
      variant === "PrimaryOutline"
        ? (theme: Theme) => theme.palette.primary.main
        : (theme: Theme) => theme.palette.secondary.main,
    borderColor:
      variant === "PrimaryOutline"
        ? (theme: Theme) => theme.palette.primary.main
        : (theme: Theme) => theme.palette.secondary.main,
    borderWidth: "1px",

    "&:hover": {
      color: "#ffffff",
      backgroundColor:
        variant === "PrimaryOutline"
          ? (theme: Theme) => theme.palette.primary.main
          : (theme: Theme) => theme.palette.secondary.main,
    },

    "&:disabled": {
      backgroundColor: "#C4C4C4",
      borderColor: "transparent",
    },
  };

  const btnSecondary = {
    backgroundColor: (theme: Theme) => theme.palette.secondary.main,
    color: "#ffffff",
    borderColor: "#ffffff",
    borderWidth: "1px",

    "&:hover": {
      color: "#ffffff",
      backgroundColor: (theme: Theme) => theme.palette.secondary.light,
    },

    "&:disabled": {
      backgroundColor: "#C4C4C4",
    },
  };

  return (
    <ButtonBox
      href={link}
      disabled={isDisabled}
      onClick={onClick}
      sx={
        variant === "Primary"
          ? btnPrimary
          : variant === "PrimaryOutline" || variant === "SecondaryOutline"
            ? btnOutline
            : variant === "Secondary"
              ? btnSecondary
              : undefined
      }
      className={extraClass}
      type={type}>
      <div className="flex items-center font-B_G gap-x-2">
        {children}

        {loading && (
          <CircularProgress
            sx={{
              width: "20px !important",
              height: "20px !important",
              color: isDisabled ? "#84858c" : "#ffffff",
            }}
            className="ms-2"
          />
        )}
      </div>
    </ButtonBox>
  );
};

interface IButtonProps {
  link?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  loading?: boolean;
  variant?: "Primary" | "PrimaryOutline" | "SecondaryOutline" | "Secondary";
  children: React.ReactNode;
  extraClass?: string;
  type?: "button" | "submit";
}
