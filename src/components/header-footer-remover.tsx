"use client";

import { usePathname } from "next/navigation";

export default function HeaderFooterRemover({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const blockedPaths = ["/login", "next-dynamic"];

  if (blockedPaths.some((bp) => new RegExp(bp).test(pathname))) {
    return null;
  }
  return <>{children}</>;
}
