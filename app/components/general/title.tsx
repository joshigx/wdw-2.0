import type { ReactNode } from "react";

export default function HeaderFooter(
  { title: title, children }: { title?: string; children?: ReactNode },
) {
  return (
    <>
      <h1>{title ? title : "Default Title"} {children}</h1>
    </>
  );
}
