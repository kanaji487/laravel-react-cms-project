import React from 'react';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { Category } from '@/types/category';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationProps = {
    currentPage: number;
    lastPage: number;
    prevPageUrl: string | null;
    nextPageUrl: string | null;
    onPageChange: (url: string | null) => void;
};

const PaginationComponent = ({
    currentPage,
    lastPage,
    prevPageUrl,
    nextPageUrl,
    onPageChange,
  }: PaginationProps) => {
    return (
      <Pagination className="px-4 py-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(prevPageUrl)}
              className={prevPageUrl ? '' : 'pointer-events-none opacity-50'}
            />
          </PaginationItem>
  
          <PaginationItem>
            <span className="text-sm px-2 py-1 border rounded">
              Page {currentPage} of {lastPage}
            </span>
          </PaginationItem>
  
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(nextPageUrl)}
              className={nextPageUrl ? '' : 'pointer-events-none opacity-50'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

export default PaginationComponent