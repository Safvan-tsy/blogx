import React from "react";

const Pagination: React.FC<{
  currentPage: number;
  onChange: (page: number) => void;
}> = ({ currentPage, onChange }) => {
  const changePageMinus = () => {
    if (currentPage == 1) return;
    const page = currentPage - 1;
    onChange(page);
  };
  const changePagePlus = () => {
    const page = currentPage + 1;
    onChange(page);
  };

  return (
    <div className="join">
      <button className="join-item btn" onClick={changePageMinus}>
        «
      </button>
      <button className="join-item btn">{currentPage}</button>
      <button className="join-item btn" onClick={changePagePlus}>
        »
      </button>
    </div>
  );
};

export default Pagination;
