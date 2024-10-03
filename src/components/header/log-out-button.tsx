"use client";

import { Loader2, LogOut } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useState } from "react";

export function LogOutMenuItem() {
  const [loading, setLoading] = useState(false);

  return (
    <DropdownMenuItem
      onClick={() => {
        setLoading(true);
        void signOut();
      }}
    >
      {loading ? <Loader2 /> : <LogOut className="mr-2 size-4" />}

      <span>Log out</span>
    </DropdownMenuItem>
  );
}
