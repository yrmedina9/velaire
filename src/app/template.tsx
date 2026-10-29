import type { ReactNode } from "react";

/**
 * Se vuelve a montar en cada navegación: la página entra con un
 * fundido suave, como en una app.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
