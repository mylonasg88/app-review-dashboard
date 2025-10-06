"use client";
import { Submission } from "@/server/db";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import FlagIcon from "@mui/icons-material/Flag";
import { StatusType } from "@/types/status";

const COLORS = {
  pending: "info",
  approved: "success",
  rejected: "error",
  flagged: "warning",
};

export type SubmissionCardProps = {
  submission: Submission;
  onAction?: (id: string, action: StatusType) => void;
  onClick?: (id: string) => void;
  displayActions?: boolean;
};

export function SubmissionCard({
  submission,
  onAction,
  onClick,
  displayActions,
}: SubmissionCardProps) {
  if (!submission) return null;

  return (
    <Card sx={{ width: 500, height: 200, display: "flex" }} elevation={0}>
      <CardMedia
        onClick={() => onClick?.(submission.id)}
        component="img"
        sx={{
          width: 150,
          "&:hover": {
            cursor: "pointer",
          },
        }}
        image={submission.imageUrl}
        alt={submission.name}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 0,
          background: "#efefef",
          flex: 1,
        }}
      >
        <CardContent>
          <Chip
            size="small"
            label={submission.status}
            color={COLORS[submission.status] as "default"}
            sx={{ position: "absolute", top: 20, right: 30 }}
          />
          <Typography
            variant="h6"
            onClick={() => onClick?.(submission.id)}
            sx={{
              "&:hover": {
                cursor: "pointer",
                textDecoration: "underline",
              },
            }}
          >
            {submission.name}
          </Typography>
          <Typography variant="subtitle1">{submission.developer}</Typography>
          <Typography variant="subtitle2">{submission.category}</Typography>
          <Typography variant="subtitle2">{submission.description}</Typography>
        </CardContent>
        {displayActions && (
          <SubmissionActions onAction={onAction} submission={submission} />
        )}
      </Box>
    </Card>
  );
}

export function SubmissionActions({
  onAction,
  submission,
}: {
  onAction?: (id: string, action: StatusType) => void;
  submission: Submission;
}) {
  return (
    <Box sx={{ mt: "auto" }}>
      <Stack
        direction="row"
        gap={2}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          size="small"
          type="button"
          variant="outlined"
          color="success"
          onClick={() => onAction && onAction(submission.id, "approved")}
          startIcon={<CheckIcon />}
        >
          Approve
        </Button>

        <Button
          size="small"
          type="button"
          variant="outlined"
          color="warning"
          onClick={() => onAction && onAction(submission.id, "flagged")}
          startIcon={<FlagIcon />}
        >
          Flag
        </Button>
        <Button
          size="small"
          type="button"
          variant="outlined"
          color="error"
          onClick={() => onAction && onAction(submission.id, "rejected")}
        >
          Reject
        </Button>
      </Stack>
    </Box>
  );
}
