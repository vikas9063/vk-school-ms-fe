import { Button } from "flowbite-react";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];

    const pageLimit = 5;
    const sidePages = 1;

    const startEllipsis = currentPage > sidePages + 2;
    const endEllipsis = currentPage < totalPages - (sidePages + 3);

    // Always show first page
    pages.push(
      <PageButton key={1} page={0} currentPage={currentPage} onPageChange={onPageChange} />
    );

    if (startEllipsis) {
      pages.push(<span key="start-ellipsis" className="px-2">...</span>);
    }

    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages - 2, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(
        <PageButton key={i + 1} page={i} currentPage={currentPage} onPageChange={onPageChange} />
      );
    }

    if (endEllipsis) {
      pages.push(<span key="end-ellipsis" className="px-2">...</span>);
    }

    if (totalPages > 1) {
      pages.push(
        <PageButton key={totalPages} page={totalPages - 1} currentPage={currentPage} onPageChange={onPageChange} />
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center flex-wrap gap-2 mt-4">
      <Button className="cursor-pointer"
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
        size="xs"
        color="purple"
        outline
      >
        Prev
      </Button>

      {renderPageNumbers()}

      <Button className="cursor-pointer"
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
        size="xs"
        color="purple"
        outline
      >
        Next
      </Button>
    </div>
  );
};

const PageButton = ({ page, currentPage, onPageChange }) => {
  const isActive = page === currentPage;
  return (
    <Button className="cursor-pointer"
      size="xs"
      onClick={() => onPageChange(page)}
      color={isActive ? "purple" : "white"}
      
    >
      {page + 1}
    </Button>
  );
};

export default PaginationComponent;
