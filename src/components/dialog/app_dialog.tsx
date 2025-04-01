import * as React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

interface TransitionComponentProps extends TransitionProps {
  children: React.ReactElement;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionComponentProps,
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AppDialog = ({
  open,
  handleClose,
  children,
  icon,
  label,
  centerLabel = false,
  ...props
}: IDialogProps) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={true}
        maxWidth={"sm"}
        onClose={handleClose}
        {...props}
        aria-describedby="alert-dialog-slide-description"
        className="!rounded-[20px]">
        <div className="p-10">
          {icon && <div className="mb-6 flex justify-center"> {icon}</div>}
          {label && (
            <div
              className={`mb-6 font-bold text-[1.5rem] ${
                centerLabel && "text-center"
              }`}>
              {label}
            </div>
          )}
          <div>{children}</div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

interface IDialogProps extends DialogProps {
  open: boolean;
  handleClose: (event: React.MouseEvent | React.KeyboardEvent) => void;
  children: React.ReactNode;
  label?: string;
  centerLabel?: boolean;
  icon?: React.ReactNode;
}
