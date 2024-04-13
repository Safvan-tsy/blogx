export const BlogListViewSkelton: React.FC = () => {
  const count = [0, 1, 2, 3, 4];
  return (
    <>
      <div className="flex flex-col gap-2 lg:gap-4 lg:py-5">
        {count.map((item, index) => (
          <div
            key={item}
            className={`card ${
              index !== 0 ? 'md:card-side' : ''
            }  cursor-pointer border border-base-200 bg-base-100 p-2 shadow-xl hover:bg-base-200`}
          >
            <figure>
              <div
                className={`mask skeleton w-full rounded-xl
              ${index == 0 ? 'h-60 md:w-full xl:h-80' : 'h-28 md:h-20 md:w-40 '}`}
              ></div>
            </figure>
            <div className="card-body cursor-pointer">
              <h2 className="skeleton h-4 lg:h-5 lg:w-[20rem] xl:h-6 xl:w-[30rem] 2xl:w-[40rem]"></h2>
              <div className="badge skeleton badge-md h-2 w-20 md:h-3 lg:h-3 lg:w-28"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export const BlogViewSkelton: React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-2 lg:gap-4 lg:py-5">
        <div className="card cursor-pointer border border-base-200 bg-base-100 p-2 shadow-xl hover:bg-base-200">
          <figure>
            <div className="mask skeleton h-60 w-full rounded-xl md:w-full xl:h-80"></div>
          </figure>
          <div className="card-body cursor-pointer">
            <div
              className="flex flex-col gap-2 pb-2 pt-1 sm:pb-4 sm:pt-2 md:pb-6 
            md:pt-3 lg:pb-8 lg:pt-4 xl:pb-10 xl:pt-5"
            >
              <h2 className="skeleton h-6 lg:h-8 lg:w-[25rem] xl:h-10 xl:w-[30rem] 2xl:w-[40rem]"></h2>
              <div className="badge skeleton badge-md h-3 w-20 md:h-4 lg:h-5 lg:w-28"></div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="skeleton h-3 md:h-4 lg:h-5 lg:w-[25rem] xl:w-[30rem] 2xl:w-[40rem]"></p>
              <p className="skeleton h-3 md:h-4 lg:h-5 lg:w-[25rem] xl:w-[30rem] 2xl:w-[40rem]"></p>
              <p className="skeleton h-3 md:h-4 lg:h-5 lg:w-[20rem] xl:w-[25rem] 2xl:w-[35rem]"></p>
              <p className="skeleton mt-2 h-3 md:h-4 lg:mt-3 lg:h-5 lg:w-[25rem] xl:w-[30rem] 2xl:w-[40rem]"></p>
              <p className="skeleton h-3 md:h-4 lg:h-5 lg:w-[20rem] xl:w-[25rem] 2xl:w-[35rem]"></p>
              <p className="skeleton h-3 md:h-4 lg:h-5 lg:w-[10rem] xl:w-[15rem] 2xl:w-[25rem]"></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
