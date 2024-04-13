import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminNav, { Swap } from '@/app/components/ui/nav/AdminNav';

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <section className="min-h-screan">
        <div className="lg:drawer lg:drawer-open">
          <Swap />
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content min-h-screen">{children}</div>
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
  } else {
    redirect('/login');
  }
}
