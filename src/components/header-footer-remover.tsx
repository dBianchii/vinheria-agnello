"use client";

import { usePathname } from "next/navigation";

export default function HeaderFooterRemover({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const blockedPaths = ["/signIn", "cadastrese"];

  if (blockedPaths.some((bp) => new RegExp(bp).test(pathname))) {
    return null;
  }
  return <>{children}</>;
}
