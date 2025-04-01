"use client";

import { useState } from "react";
import { Avatar, IconButton, Paper, InputBase } from "@mui/material";
import { NavTwoLogo, SearchIcon } from "@/assets/svg";
import { MobileSidebar, TopBarMenu } from "./menu";
import { CgMenu } from "react-icons/cg";
import { useRouter } from "next/navigation";

export const TopBar = () => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const goToDashboard = () => router.push("/");

  return (
    <>
      <div className="flex items-center justify-between bg-white shadow-none p-4 border border-b">
        <div className="flex lg:hidden items-center" onClick={goToDashboard}>
          <NavTwoLogo />
          <h6 className="ml-3 text-secondary font-medium">tangl</h6>
        </div>

        <div className="hidden lg:flex items-center gap-4 ">
          <div className="relative flex items-center">
            <Paper className="!px-1 !py-0.5 !flex !items-center !w-[400px] !shadow-none !rounded-lg !border !border-none !bg-gray-100">
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
     
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleMenuOpen}>
            <Avatar
              alt={"Tangl"}
              src=""
              className="!w-8 lg:!w-10 !h-8 lg:!h-10"
            />
            <span className="hidden lg:inline font-medium">info@tangl.com</span>
            {/* <DropIcon /> */}
          </div>
          <IconButton
            className="!flex lg:!hidden"
            onClick={() => setOpenMobileMenu(true)}>
            <CgMenu className="text-secondary" />
          </IconButton>

          <TopBarMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          />

          <div className="fixed top-0 left-0">
            <MobileSidebar
              open={openMobileMenu}
              onClose={() => setOpenMobileMenu(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
