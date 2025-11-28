import { headers } from "next/headers";

export async function LandingPage() {
  const headersStore = await headers();

  return <div>LandingPage</div>;
}
