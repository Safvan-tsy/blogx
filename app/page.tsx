import BlogListView from "./components/BlogListView";
import HomeProfileCard from "./components/ui/card/HomeProfileCard";

export default function Home() {
  return (
    <>
      <div
        className="min-h-screen flex flex-col m-auto lg:px-10 lg:py-5 lg:flex-row lg:justify-end 
      2xl:justify-center gap-10"
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
