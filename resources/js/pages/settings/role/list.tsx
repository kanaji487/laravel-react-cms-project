import { useState, useEffect } from 'react';
import { type BreadcrumbItem } from '@/types';
import { 
    Head, 
    router,
    usePage
} from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { 
    EllipsisVertical,
    Pencil,
    Trash2,
    Eye
} from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { 
    RolePageProps
} from '@/types/role';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Role settings',
        href: '/settings/role',
    },
];

export default function RoleList() {

    const { roles } = usePage<RolePageProps>().props;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(roles.last_page);
    const [loading, setLoading] = useState(false);

    const handlePageChange = (page: number) => {
        if (loading) return;
        setLoading(true);
        setCurrentPage(page);

        router.get(`/settings/role?page=${page}`, {}, {
            preserveState: true,
            replace: true,
            onFinish: () => setLoading(false),
        });
    };

    useEffect(() => {
        setTotalPages(roles.last_page);
    }, [roles]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Role settings" />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Role management" description="Create, edit and delete role" />
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-4">
                        <Input type="text" className="w-1xl border border-gray-300" />
                        <Button>Search</Button>
                    </div>
                    <Button onClick={() => router.visit('/settings/role/create')}>Create</Button>
                </div>
                <div className="px-4 overflow-x-auto w-full">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Updated At</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles.data.map((role: any) => (
                                <TableRow key={role.id}>
                                    <TableCell>{role.name}</TableCell>
                                    <TableCell>{role.description}</TableCell>
                                    <TableCell>
                                        {new Date(role.created_at).toLocaleDateString('th-TH', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        })} {new Date(role.created_at).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(role.updated_at).toLocaleDateString('th-TH', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        })} {new Date(role.updated_at).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                                    </TableCell>
                                    <TableCell>
                                        <Popover>
                                            <PopoverTrigger>
                                                <EllipsisVertical className="cursor-pointer" />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-40 bg-zinc-900 text-white p-2 rounded-lg shadow-lg space-y-1">
                                                <button
                                                    className="flex items-center gap-2 w-full hover:bg-zinc-800 px-2 py-1 rounded-md"
                                                    onClick={() => router.visit(`/settings/role/${role.id}/edit`)}
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                    <span>Edit</span>
                                                </button>
                                                <button
                                                    className="flex items-center gap-2 w-full hover:bg-zinc-800 px-2 py-1 rounded-md"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    <span>Delete</span>
                                                </button>
                                                <button
                                                    className="flex items-center gap-2 w-full hover:bg-zinc-800 px-2 py-1 rounded-md"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    <span>Quick view</span>
                                                </button>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex justify-end mt-4 space-x-2">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        isActive={currentPage > 1}
                                        className={currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}
                                    />
                                </PaginationItem>
                                <PaginationItem>
                                    <span>
                                        Page {currentPage} of {totalPages}
                                    </span>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext 
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        isActive={currentPage < totalPages}
                                        className={currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    )
}