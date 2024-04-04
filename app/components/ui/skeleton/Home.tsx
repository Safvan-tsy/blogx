export const BlogListViewSkelton: React.FC = () => {
  const count = [0, 1, 2, 3, 4];
  return (
    <>
      <div className="flex flex-col gap-2 lg:gap-4 lg:py-5">
        {count.map((item, index) => (
          <div
            key={item}
            className={`card ${
              index !== 0 ? "md:card-side" : ""
            }  bg-base-100 shadow-xl border border-base-200 hover:bg-base-200 p-2 cursor-pointer`}
          >
            <figure>
              <div
                className={`mask skeleton w-full rounded-xl
              ${index == 0 ? "md:w-full h-60 xl:h-80" : "md:w-40 h-28 md:h-20 "}`}
              ></div>
            </figure>
            <div className="card-body cursor-pointer">
              <h2 className="lg:w-[20rem] xl:w-[30rem] 2xl:w-[40rem] h-4 lg:h-5 xl:h-6 skeleton"></h2>
              <div className="badge badge-md skeleton w-20 h-2 md:h-3 lg:w-28 lg:h-3"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
