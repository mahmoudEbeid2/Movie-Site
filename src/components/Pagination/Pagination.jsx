'use client';

import { useMemo } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import './PaginationComponent.css';

function PaginationComponent({
  totalPage,
  currentPage,
  onPageChange,
  pageWindow = 5,
}) {
  const paginationRange = useMemo(() => {
    let startPage, endPage;

    if (totalPage <= pageWindow) {
      startPage = 1;
      endPage = totalPage;
    } else {
      const pagesToShowBeforeCurrent = Math.floor((pageWindow - 1) / 2);
      const pagesToShowAfterCurrent = Math.ceil((pageWindow - 1) / 2);

      if (currentPage <= pagesToShowBeforeCurrent + 1) {
        startPage = 1;
        endPage = pageWindow;
      } else if (currentPage + pagesToShowAfterCurrent >= totalPage) {
        startPage = totalPage - pageWindow + 1;
        endPage = totalPage;
      } else {
        startPage = currentPage - pagesToShowBeforeCurrent;
        endPage = currentPage + pagesToShowAfterCurrent;
      }
    }

    const items = [];
    for (let number = startPage; number <= endPage; number++) {
      items.push(number);
    }

    return {
      pageItemsToRender: items,
      showStartEllipsis: startPage > 1,
      showEndEllipsis: endPage < totalPage,
    };
  }, [currentPage, totalPage, pageWindow]);

  return (
    <div className="d-flex justify-content-center">
      <Pagination className="pagination-custom-yellow">
        <Pagination.First
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {paginationRange.showStartEllipsis && <Pagination.Ellipsis disabled />}

        {paginationRange.pageItemsToRender.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => onPageChange(number)}
          >
            {number}
          </Pagination.Item>
        ))}

        {paginationRange.showEndEllipsis && <Pagination.Ellipsis disabled />}

        <Pagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
        />
        <Pagination.Last
          onClick={() => onPageChange(totalPage)}
          disabled={currentPage === totalPage}
        />
      </Pagination>
    </div>
  );
}

export default PaginationComponent;