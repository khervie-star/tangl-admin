/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState } from "react";
import { Menu, MenuItem, Divider } from "@mui/material";
import {
  HiOutlineUserCircle,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { useRouter } from "next/navigation";
import { AppButton } from "@/components";
import { AppDialog } from "@/components";

export const TopBarMenu = ({
  anchorEl,
  open,
  onClose,
}: {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: any;
}) => {
  const router = useRouter();

  const [openLogoutPopup, setOpenLogoutPopup] = useState<boolean>(false);

  const handleLogout = () => {
    setOpenLogoutPopup(false);
  };

  const handleProfileSettings = () => {
    router.push("/#");
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        slotProps={{
          paper: {
            className:
              "w-56 rounded-xl shadow-lg border border-gray-100 p-2 !bg-white",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}>
        <MenuItem
          onClick={() => {
            handleProfileSettings();
            onClose();
          }}
          className="rounded-lg p-3 hover:bg-gray-50 group transition-colors">
          <HiOutlineUserCircle className="w-5 h-5 mr-3 text-gray-500 group-hover:text-blue-500" />
          <span className="flex-1 text-gray-700 group-hover:text-gray-900">
            Profile
          </span>
          <HiOutlineChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleProfileSettings();
            onClose();
          }}
          className="rounded-lg p-3 hover:bg-gray-50 group transition-colors">
          <HiOutlineCog className="w-5 h-5 mr-3 text-gray-500 group-hover:text-blue-500" />
          <span className="flex-1 text-gray-700 group-hover:text-gray-900">
            Settings
          </span>
          <HiOutlineChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        </MenuItem>

        <Divider className="my-2" />

        <MenuItem
          onClick={() => {
            setOpenLogoutPopup(true);
            onClose();
          }}
          className="rounded-lg p-3 hover:bg-red-50 group transition-colors">
          <HiOutlineLogout className="w-5 h-5 mr-3 text-gray-500 group-hover:text-red-500" />
          <span className="flex-1 text-gray-700 group-hover:text-red-600">
            Logout
          </span>
          <HiOutlineChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
        </MenuItem>
      </Menu>

      <AppDialog
        open={openLogoutPopup}
        handleClose={() => setOpenLogoutPopup(false)}
        centerLabel={false}
        label="Confirm action">
        <div>
          <p>
            Are you sure you want to logout? Your session and all unsaved data
            will be cleared
          </p>
          <div className="flex items-start gap-5 mt-6">
            <AppButton
              variant="SecondaryOutline"
              onClick={() => setOpenLogoutPopup(false)}>
              Cancel
            </AppButton>
            <AppButton onClick={handleLogout}>Logout</AppButton>
          </div>
        </div>
      </AppDialog>
    </>
  );
};
