import NotFoundPage from "./(storefront)/not-found";
import { StorefrontShell } from "./storefront-shell";

export default function RootNotFound() {
  return (
    <StorefrontShell>
      <NotFoundPage />
    </StorefrontShell>
  );
}
