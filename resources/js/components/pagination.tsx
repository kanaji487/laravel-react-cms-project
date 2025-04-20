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

interface PaginatedCategories {
    data: Category[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

const PaginationComponent = () => {

    const props = usePage().props as unknown as { categories: PaginatedCategories };
    const { data: categories, ...pagination } = props.categories;

    const handlePageChange = (url: string | null) => {
        if (url) {
            router.visit(url, {
                preserveScroll: true,
                preserveState: true,
            });
        }
    }

    return (
        <Pagination className="px-4 py-4">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => handlePageChange(pagination.prev_page_url)}
                        className={pagination.prev_page_url ? '' : 'pointer-events-none opacity-50'}
                    />
                </PaginationItem>

                <PaginationItem>
                    <span className="text-sm px-2 py-1 border rounded">
                        Page {pagination.current_page} of {pagination.last_page}
                    </span>
                </PaginationItem>

                <PaginationItem>
                    <PaginationNext
                        onClick={() => handlePageChange(pagination.next_page_url)}
                        className={pagination.next_page_url ? '' : 'pointer-events-none opacity-50'}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationComponent