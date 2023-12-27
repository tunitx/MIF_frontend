import { useState } from "react";

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
