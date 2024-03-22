import AdminNav, { Swap } from "@/app/components/ui/nav/AdminNav";
import Link from "next/link";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screan">
      <div className="drawer lg:drawer-open">
        <Swap/>
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {children}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <AdminNav />
        </div>
      </div>
    </section>
  );
}
