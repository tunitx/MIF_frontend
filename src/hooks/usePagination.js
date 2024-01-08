import { useState } from "react";

/**
 * usePagination Hook
 *
 * @param {Function} perPageItem - Function to determine items per page
 * @param {Array} data - Array of data to paginate
 * @returns {Object} - Pagination state and functions
 */

export const usePagination = (perPageItem, data) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const [itemsPerPage, setItemsPerPage] = useState(() => {
    return perPageItem();
  });

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data?.length / itemsPerPage);

  return {
    currentPage,
    handlePageChange,
    itemsPerPage,
    setItemsPerPage,
    currentItems,
    totalPages,
  };
};
