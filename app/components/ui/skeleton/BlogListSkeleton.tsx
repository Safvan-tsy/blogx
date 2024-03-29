import React from "react";

interface BlogListSkeletonProps {
  numberOfRows: number;
}

const BlogListSkeleton: React.FC<BlogListSkeletonProps> = ({
  numberOfRows,
}) => {
  const generateSkeletonRow = () => (
    <tr key={Math.random()}>
      <th>
        <label>
          <div className="skeleton w-4 h-4"></div>
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div>
            <div className="skeleton w-[12rem] h-6"></div>
          </div>
        </div>
      </td>
      <td>
        <div className="skeleton w-36 h-16"></div>
      </td>
      <td>
        <div className="skeleton w-32 h-6"></div>
      </td>
      <th>
        <div className="flex flex-row flex-wrap items-center justify-between gap-2">
          <div className="skeleton w-6 h-6"></div>
          <div className="skeleton w-6 h-6"></div>
        </div>
      </th>
    </tr>
  );

  // Generating multiple skeleton rows
  const skeletonRows = Array.from({ length: numberOfRows }, () =>
    generateSkeletonRow()
  );

  return (
    <div className="overflow-x-auto mt-3">
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Title</th>
            <th>Cover</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{skeletonRows}</tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Cover</th>
            <th>Status</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default BlogListSkeleton;
