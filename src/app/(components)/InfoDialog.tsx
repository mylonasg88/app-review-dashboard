import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Submission } from "@/server/db";
import { StatusType } from "@/types/status";
import { SubmissionActions, SubmissionCard } from "./SubmissionCard";

interface InfoDialogProps {
  display: boolean;
  onClose: () => void;
  onAction: (id: string, action: StatusType) => void;
  submission: Submission;
}

export default function InfoDialog({
  display,
  onClose,
  onAction,
  submission,
}: InfoDialogProps) {
  const [open, setOpen] = React.useState(display);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{submission.name}</DialogTitle>
      <DialogContent>
        <SubmissionCard submission={submission} />
      </DialogContent>
      <DialogActions>
        <SubmissionActions submission={submission} onAction={onAction} />
      </DialogActions>
    </Dialog>
  );
}
