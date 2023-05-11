import React, { useEffect, useState } from "react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number | null | undefined;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const maxButtons = 5;
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(totalPages || 0);

  const showPrevious = currentPage > 1;
  const showNext = currentPage < (totalPages || 0);

  const showFirst = totalPages === undefined && startPage > 1;

  useEffect(() => {
    if (totalPages !== null && totalPages !== undefined) {
      const updatedStartPage = Math.max(
        1,
        currentPage - Math.floor(maxButtons / 2)
      );
      const updatedEndPage = Math.min(
        totalPages,
        updatedStartPage + maxButtons - 1
      );

      setStartPage(updatedStartPage);
      setEndPage(updatedEndPage);
    }
  }, [currentPage, maxButtons, totalPages]);

  if (totalPages === null || totalPages === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pagination flex justify-center items-center mt-4">
      <div className="nav-buttons flex space-x-1">
        {showPrevious && (
          <button
            onClick={() => handleClick(currentPage - 1)}
            className="btn btn-primary text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Previous
          </button>
        )}
        {showFirst && (
          <button
            onClick={() => handleClick(1)}
            className="btn btn-primary text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            First
          </button>
        )}
      </div>
      <div className="page-buttons flex justify-center flex-grow">
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={index}
            className={`btn btn-primary px-4 py-2 rounded-md ${
              currentPage === startPage + index
                ? "bg-blue-700 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
            onClick={() => handleClick(startPage + index)}
            style={{ margin: "0 0.25rem" }}
          >
            {startPage + index}
          </button>
        ))}
      </div>
      <div className="nav-buttons flex space-x-1">
        {showNext && (
          <button
            onClick={() => handleClick(currentPage + 1)}
            className="btn btn-primary text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:
ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
