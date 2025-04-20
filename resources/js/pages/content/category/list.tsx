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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { DataTable } from '@/components/data-table';
import type { Column } from '@/components/data-table';
import { FilterSheet } from './filter';
import PaginationComponent from '@/components/pagination';

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

type FilterValues = {
    title: string
    slug: string
    description: string
    language: string
    status: string
}

export default function CategoryList() {

  const props = usePage().props as unknown as { categories: PaginatedCategories };
  const { data: categories, ...pagination } = props.categories;
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const openFilterSheet = () => setIsFilterOpen(true)
  const closeFilterSheet = () => setIsFilterOpen(false)

  const handlePageChange = (url: string | null) => {
    if (url) {
      router.visit(url, {
        preserveScroll: true,
        preserveState: true,
      });
    }
  };
  
  const handleQuickView = (cat: Category) => {
    setSelectedCategory(cat);
    setIsSheetOpen(true);
  };

  const handleDelete = (cat: Category) => {
    router.delete(`/content/category/${cat.id}`, {
      preserveScroll: true,
    });
  };

  const handleFilterSubmit = (filters: FilterValues) => {
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '')
    );
  
    router.get('/content/category/list', cleanedFilters, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  const columns: Column<Category>[] = [
    { key: 'title', header: 'Title', className: 'w-[120px]' },
    { key: 'slug', header: 'Slug', className: 'w-[120px]' },
    {
      key: 'description',
      header: 'Description',
      className: 'max-w-[250px]',
      render: (cat) => (
        <div className="overflow-hidden whitespace-nowrap text-ellipsis">
          {cat.description}
        </div>
      ),
    },
    {
      key: 'obj_lang',
      header: 'Lang',
      className: 'w-[50px]',
      render: (cat) =>
        cat.obj_lang === 'tha' ? (
          <img src={thai} alt="Thai" width={24} height={24} />
        ) : cat.obj_lang === 'eng' ? (
          <img src={eng} alt="English" width={24} height={24} />
        ) : (
          cat.obj_lang
        ),
    },
    {
      key: 'obj_status',
      header: 'Status',
      className: 'w-[120px]',
      render: (cat) => <CategoryBadge status={cat.obj_status} />,
    },
    {
      key: 'created_at',
      header: 'Created At',
      className: 'w-[120px]',
      render: (cat) =>
        new Date(cat.created_at).toLocaleString('th-TH', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
    },
    {
      key: 'updated_at',
      header: 'Updated At',
      className: 'w-[120px]',
      render: (cat) =>
        new Date(cat.updated_at).toLocaleString('th-TH', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
    },
    {
      key: 'actions',
      header: 'Action',
      className: 'w-[120px]',
      render: (cat) => (
        <Popover>
          <PopoverTrigger>
            <EllipsisVertical className="cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent className="w-40 bg-zinc-900 text-white p-2 rounded-lg shadow-lg space-y-1">
            <button
              onClick={() => router.visit(`/content/category/${cat.id}/edit`)}
              className="flex items-center gap-2 w-full hover:bg-zinc-800 px-2 py-1 rounded-md"
            >
              <Pencil className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => handleDelete(cat)}
              className="flex items-center gap-2 w-full hover:bg-zinc-800 px-2 py-1 rounded-md"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
            <button
              onClick={() => handleQuickView(cat)}
              className="flex items-center gap-2 w-full hover:bg-zinc-800 px-2 py-1 rounded-md"
            >
              <Eye className="w-4 h-4" />
              <span>Quick view</span>
            </button>
          </PopoverContent>
        </Popover>
      ),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Category" />

      <div className='max-w-[1700px]'>
        <div className='p-4 flex flex-row gap-4 justify-between'>
          <div className='flex flex-row gap-4'>
            <Input
              type='text'
              className='w-2xl border border-gray-300'
            />
            <Button>Search</Button>
          </div>
          <div className='flex flex-row gap-4'>
            <Button onClick={() => router.visit('/content/category/create')}>Create</Button>
            <Button onClick={openFilterSheet}>Filter</Button>
          </div>
          <FilterSheet
            isOpen={isFilterOpen}
            onClose={closeFilterSheet}
            onSubmit={handleFilterSubmit}
          />
        </div>

        <div className='px-4 overflow-x-auto'>
          <div className="w-full">
            <DataTable<Category>
              data={categories}
              columns={columns}
              getRowKey={(cat) => cat.id}
            />
          </div>

          <CategorySheet
            category={selectedCategory}
            open={isSheetOpen}
            onClose={() => setIsSheetOpen(false)}
          />
        </div>

        <PaginationComponent
          currentPage={pagination.current_page}
          lastPage={pagination.last_page}
          prevPageUrl={pagination.prev_page_url}
          nextPageUrl={pagination.next_page_url}
          onPageChange={handlePageChange}
        />
      </div>
    </AppLayout>
  )
}