import {
  DialogProps,
  DialogActions,
  DialogContent,
  Dialog,
  ButtonProps as MuiButtonProps,
  Button,
} from "@mui/material";
import { StyledDialogTitle } from "./StyledDialogTitle";

export function GenericDialog({
  onClose,
  onSubmit,
  dialog,
  children,
  sx,
  ...props
}: GenericDialogProps) {
  const { title, closeButton, submitButton } = dialog;
  const { label: submitButtonLabel, ...submitButtonProps } = submitButton;
  const { label: closeButtonLabel, ...closeButtonProps } = closeButton;

  return (
    <Dialog
      onClose={onClose}
      maxWidth="md"
      fullWidth
      {...props}
      sx={{ ...(sx as any) }}
    >
      <StyledDialogTitle onClose={onClose}>{title}</StyledDialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions
        sx={{
          justifyContent: "flex-start",
          columnGap: 1,
        }}
      >
        {!!submitButton && (
          <Button
            variant="contained"
            sx={{
              px: 4,
            }}
            {...submitButtonProps}
            onClick={onSubmit}
          >
            {submitButtonLabel}
          </Button>
        )}
        {!!closeButton && (
          <Button
            variant="contained"
            color="secondary"
            sx={{
              px: 4,
            }}
            {...closeButtonProps}
            onClick={onClose}
          >
            {closeButtonLabel}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export type GenericDialogProps = Omit<DialogProps, "onClose" | "onSubmit"> & {
  dialog: {
    title: string;
    submitButton: MuiButtonProps & {
      label: string;
    };
    closeButton: MuiButtonProps & {
      label: string;
    };
  };
  onClose: () => void;
  onSubmit?: () => void;
};
