import { Submission } from "@/server/db";

import { List, ListItem } from "@mui/material";
import { SubmissionCard } from "./SubmissionCard";
import { StatusType } from "@/types/status";

export type SubmissionListProps = {
  items: Submission[];
  onClick?: (id: string) => void;
  onAction?: (id: string, action: StatusType) => void;
};

function SubmissionList({ items, onClick, onAction }: SubmissionListProps) {
  return (
    <List>
      {items &&
        items.map((sub) => (
          <ListItem key={sub.id}>
            <SubmissionCard
              onClick={() => onClick?.(sub.id)}
              key={sub.id}
              submission={sub}
              onAction={onAction}
              displayActions
            />
          </ListItem>
        ))}
    </List>
  );
}

export default SubmissionList;
