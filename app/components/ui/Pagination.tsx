import React from 'react';

const Pagination: React.FC<{
  currentPage: number;
  onChange: (page: number) => void;
  totalPage?: number;
}> = ({ currentPage, onChange, totalPage }) => {
  const changePageMinus = () => {
    const page = currentPage - 1;
    onChange(page);
  };
  const changePagePlus = () => {
    const page = currentPage + 1;
    onChange(page);
  };

  return (
    <div className="join">
      <button
        className="btn join-item"
        disabled={currentPage == 1 ? true : false}
        onClick={changePageMinus}
      >
        «
      </button>
      <button className="btn join-item">{currentPage}</button>
      <button
        className="btn join-item"
        onClick={changePagePlus}
        disabled={totalPage && totalPage == currentPage ? true : false}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
