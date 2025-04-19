import thai from '../../../../../public/thailand.png';
import eng from '../../../../../public/english.png';
import AppLayout from '@/layouts/app-layout';
import CategorySheet from './sheet';
import CategoryBadge from './badge';
import { type BreadcrumbItem } from '@/types';
import { Category } from '@/types/category';
import { 
    Head, 
    router 
} from '@inertiajs/react';
import { 
    EllipsisVertical,
    Pencil,
    Trash2,
    Eye
} from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { 
    Table, 
    TableHeader, 
    TableBody, 
    TableRow, 
    TableCell, 
    TableHead 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category',
        href: '/category',
    },
];

interface PaginatedCategories {
    data: Category[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

export default function CategoryList() {

    const props = usePage().props as unknown as { categories: PaginatedCategories };
    const { data: categories, ...pagination } = props.categories;
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const handlePageChange = (url: string | null) => {
        if (url) {
            router.visit(url, {
                preserveScroll: true,
                preserveState: true,
            });
        }
    }

    const handleQuickView = (cat: Category) => {
        setSelectedCategory(cat);
        setIsSheetOpen(true);
    };

    const handleDelete = (cat: Category) => {
        router.delete(`/content/category/${cat.id}`, {
            preserveScroll: true,
        });
    };

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />
            
            <div className='max-w-[1600px]'>
                <div className='p-4 flex flex-row gap-4 justify-between'>
                    <div className='flex flex-row gap-4'>
                        <Input
                            type='text'
                            className='w-2xl border border-gray-300'
                        />
                        <Button>Search</Button>
                    </div>
                    <Button onClick={() => router.visit('/content/category/create')}>Create</Button>
                </div>

                <div className='px-4 overflow-x-auto'>
                    <div className="w-full">
                        <Table className="border border-gray-300">
                            <TableHeader >
                                <TableRow>
                                    <TableHead className="border border-gray-300 w-[120px]">Title</TableHead>
                                    <TableHead className="border border-gray-300 w-[120px]">Slug</TableHead>
                                    <TableHead className="border border-gray-300 w-[250px]">Description</TableHead>
                                    <TableHead className="border border-gray-300 w-[50px]">Lang</TableHead>
                                    <TableHead className="border border-gray-300 w-[120px]">Status</TableHead>
                                    <TableHead className="border border-gray-300 w-[120px]">Created At</TableHead>
                                    <TableHead className="border border-gray-300 w-[120px]">Updated At</TableHead>
                                    <TableHead className="border border-gray-300 w-[120px]">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.length > 0 ? (
                                    categories.map((cat, index) => (
                                        <TableRow key={index}>
                                            <TableCell className='w-[120px]'>{cat.title}</TableCell>
                                            <TableCell className='w-[120px]'>{cat.slug}</TableCell>
                                            <TableCell className='max-w-[250px] overflow-hidden whitespace-nowrap text-ellipsis'>{cat.description}</TableCell>
                                            <TableCell className='w-[50px]'>
                                                {cat.obj_lang === 'tha' ? (
                                                    <img src={thai} alt="Thai" width={24} height={24} />
                                                ) : cat.obj_lang === 'eng' ? (
                                                    <img src={eng} alt="English" width={24} height={24} />
                                                ) : (
                                                    cat.obj_lang
                                                )}
                                            </TableCell>
                                            <TableCell className='w-[120px]'>
                                                <CategoryBadge status={cat.obj_status} />
                                            </TableCell>
                                            <TableCell className='w-[120px]'>
                                                {new Date(cat.created_at).toLocaleString('th-TH', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </TableCell>
                                            <TableCell className='w-[120px]'>
                                                {new Date(cat.updated_at).toLocaleString('th-TH', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </TableCell>
                                            <TableCell className='w-[120px]'>
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <EllipsisVertical className="cursor-pointer" />
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-40 bg-zinc-900 text-white p-2 rounded-lg shadow-lg space-y-1">
                                                        <button
                                                            onClick={() => router.visit(`/content/category/${cat.id}/edit`)}
                                                            className="flex items-center gap-2 w-full hover:bg-zinc-800 px-2 py-1 rounded-md transition-colors"
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                            <span>Edit</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(cat)}
                                                            className="flex items-center gap-2 w-full hover:bg-zinc-800 px-2 py-1 rounded-md transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            <span>Delete</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleQuickView(cat)}
                                                            className="flex items-center gap-2 w-full hover:bg-zinc-800 px-2 py-1 rounded-md transition-colors"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                            <span>Quick view</span>
                                                        </button>
                                                    </PopoverContent>
                                                </Popover>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            className='text-center'
                                        >
                                            No categories available
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>

                            <CategorySheet
                                category={selectedCategory}
                                open={isSheetOpen}
                                onClose={() => setIsSheetOpen(false)}
                            />
                        </Table>
                    </div>

                    <CategorySheet
                        category={selectedCategory}
                        open={isSheetOpen}
                        onClose={() => setIsSheetOpen(false)}
                    />
                </div>

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
            </div>
        </AppLayout>
    )
}