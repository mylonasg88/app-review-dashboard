"use client";

import { Button, List, ListItem, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

const statuses = ["all", "pending", "approved", "rejected", "flagged"];

export type SidebarProps = {
  filters: { q?: string; status?: string };
  setFilters: Dispatch<SetStateAction<{ q?: string; status?: string }>>;
};

function Sidebar({ filters, setFilters }: SidebarProps) {
  return (
    <aside className="sidebar">
      <TextField
        id="outlined-basic"
        label="Search app..."
        variant="outlined"
        value={filters.q ?? ""}
        onChange={(e) =>
          setFilters((filter) => ({ ...filter, q: e.target.value }))
        }
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "white" },
            "&.Mui-focused fieldset": { borderColor: "white" },
          },
          "& .MuiInputLabel-root": { color: "white" },
        }}
      />
      <List>
        {statuses.map((status) => (
          <ListItem key={status}>
            <Button
              fullWidth
              variant="contained"
              onClick={() =>
                setFilters({ status: status === "all" ? undefined : status })
              }
              key={status}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          </ListItem>
        ))}
      </List>
    </aside>
  );
}

export default Sidebar;
