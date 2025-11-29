import { DashboardPage } from "nebulatics/dashboard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default DashboardPage({
  async authentication() {
    // In a real production app, we would use a proper authentication system.
    // Don't do this in a production app, as it's not secure.
    // const cookieStore = await cookies();
    // const token = cookieStore.get("token");

    // if (!token) {
    //   redirect("/login");
    // }
  },
});
