import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category',
        href: '/category',
    },
];

interface Category {
    title: string;
    slug: string;
    description: string;
}

export default function CategoryList() {

    const props = usePage().props as unknown;
    const categories = (props as { categories?: Category[] }).categories || [];

    if (!categories) {
        return <div>No categories available</div>;
    }

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />

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

            <div className='px-4'>
                <Table className="border border-gray-300">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="border border-gray-300">Title</TableHead>
                            <TableHead className="border border-gray-300">Slug</TableHead>
                            <TableHead className="border border-gray-300">Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.length > 0 ? (
                            categories.map((cat, index) => (
                                <TableRow key={index}>
                                    <TableCell>{cat.title}</TableCell>
                                    <TableCell>{cat.slug}</TableCell>
                                    <TableCell>{cat.description}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell 
                                    colSpan={3}
                                    className='text-center'
                                >
                                    No categories available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    )
}