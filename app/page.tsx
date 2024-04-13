import BlogListView from './components/BlogListView';
import HomeProfileCard from './components/ui/card/HomeProfileCard';

export default function Home() {
  return (
    <>
      <div
        className="m-auto flex min-h-screen flex-col gap-10 px-2 pb-4 pt-3 
        sm:px-8 sm:pb-8 sm:pt-4 lg:justify-center lg:px-10 lg:pb-10 lg:pt-5 xl:flex-row"
      >
        <div>
          <BlogListView />
        </div>
        <div>
          <HomeProfileCard />
        </div>
      </div>
    </>
  );
}
