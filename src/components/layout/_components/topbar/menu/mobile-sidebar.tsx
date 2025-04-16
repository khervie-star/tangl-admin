"use client";

import {

  PowerIcon,
  SettingIcon,
  TanglIcon,

} from "@/assets/svg";
import { Button, IconButton } from "@mui/material";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AppDialog } from "@/components";
import { AppButton } from "@/components";
import { FaXmark } from "react-icons/fa6";
import { LayoutDashboard, Users, FileText, ClipboardList } from "lucide-react";

export const MobileSidebar = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [openLogoutPopup, setOpenLogoutPopup] = useState<boolean>(false);

  const handleClick = (href: string) => {
    if (href === "logout") {
      setOpenLogoutPopup(true);
    } else {
      router.push(href);
    }
  };

  const handleLogout = () => {
    setOpenLogoutPopup(false);
  };

  const isActive = (href: string, name: string) => {
    if (name == "Dashboard") {
      return href === pathname;
    } else {
      const pathParts = pathname.split("/");
      const hrefParts = href.split("/");

      // Check if the pathname exactly matches the href
      if (pathname === href) {
        return true;
      }

      // Check if the pathname starts with the href and has the same number of parts
      if (pathname.startsWith(href) && pathParts.length === hrefParts.length) {
        return true;
      }

      // Fallback to checking if the pathname starts with the href
      return pathname.startsWith(href);
    }
  };

  return (
    <>
      <div
        className={`bg-secondary w-[16rem] h-screen min-h-screen fixed z-10 px-6 pt-10 overflow-y-auto block lg:hidden rounded-r-lg transition-all ease-in-out duration-500 ${open ? "ml-0" : "-ml-[16rem]"}`}>
        <div className=" flex justify-between items-center mb-16">
          <div className="flex items-center ">
            <TanglIcon />
            <h6 className="ml-3 text-white font-medium">tangl</h6>
          </div>
          <IconButton onClick={onClose}>
            <FaXmark className="text-white text-[1rem]" />
          </IconButton>
        </div>

        <div className="space-y-4">
          {[
            {
              href: "/",
              icon: <LayoutDashboard />,
              label: "Dashboard",
            },
            {
              href: "/waitlist",
              icon: <Users />,
              label: "Waitlist",
            },
            {
              href: "/brochure",
              icon: <FileText />,
              label: "Brochure",
            },
            {
              href: "/investment-requests",
              icon: <ClipboardList />,
              label: "Investments",
            },
          ].map((link) => (
            <Button
              key={link.href}
              className={clsx(
                "!flex !items-center !justify-start !px-4 !py-3 !w-full !text-white !rounded-lg !transition !duration-200 !normal-case !text-[1rem]",
                isActive(link.href, link.label)
                  ? "!bg-white !bg-opacity-15"
                  : "hover:!bg-white hover:!bg-opacity-15"
              )}
              onClick={() => {
                handleClick(link.href);
                onClose();
              }}>
              {link.icon}
              <p className="!ml-4 !font-medium">{link.label}</p>
            </Button>
          ))}
        </div>
        <div className="mt-20 space-y-4">
          {[
            {
              href: "#",
              icon: <SettingIcon />,
              label: "Settings",
            },
            { href: "logout", icon: <PowerIcon />, label: "Log Out" },
          ].map((link) => (
            <Button
              key={link.href}
              className={clsx(
                "!flex !items-center !justify-start !px-4 !py-3 !w-full !text-white !rounded-lg !transition !duration-200 !normal-case !text-[1rem]",
                isActive(link.href, link.label)
                  ? "!bg-white !bg-opacity-15"
                  : "hover:!bg-white hover:!bg-opacity-15"
              )}
              onClick={() => {
                handleClick(link.href);
                onClose();
              }}>
              {link.icon}
              <p className="!ml-4 !font-medium">{link.label}</p>
            </Button>
          ))}
        </div>
      </div>
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
