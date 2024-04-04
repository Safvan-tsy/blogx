import BlogListView from "./components/BlogListView";
import HomeProfileCard from "./components/ui/card/HomeProfileCard";

export default function Home() {
  return (
    <>
      <div
        className="min-h-screen flex flex-col m-auto px-2 pt-3 pb-4 lg:px-10 
        sm:px-8 sm:pt-4 sm:pb-8 lg:pt-5 lg:pb-10 lg:flex-row lg:justify-center gap-10"
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
