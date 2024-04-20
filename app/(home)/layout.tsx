import HomeProfileCard from '../components/ui/card/HomeProfileCard';

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="m-auto flex min-h-screen flex-col gap-10 px-2 pb-4 pt-3 
        sm:px-8 sm:pb-8 sm:pt-4 lg:justify-center lg:px-10 lg:pb-10 lg:pt-5 xl:flex-row"
    >
      {children}
      <div>
        <HomeProfileCard />
      </div>
    </div>
  );
}
