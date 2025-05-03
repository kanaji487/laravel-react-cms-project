import { type BreadcrumbItem, type SharedData } from '@/types';
import { 
    Head, 
    router 
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Role settings',
        href: '/settings/role',
    },
];

export default function Role() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Role settings" />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Role management" description="Creat, edit and delete role" />
                </div>
                <div className='flex flex-row gap-4'>
                    <div className='flex flex-row gap-4'>
                        <Input
                            type='text'
                            className='w-1xl border border-gray-300'
                        />
                        <Button>Search</Button>
                    </div>
                    <Button onClick={() => router.visit('/settings/role/create')}>
                        Create
                    </Button>
                </div>
                <div className='px-4 overflow-x-auto w-full'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Role</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Updated At</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>

                                </TableCell>
                                <TableCell>

                                </TableCell>
                                <TableCell>

                                </TableCell>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger>
                                            <EllipsisVertical className="cursor-pointer" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-40 bg-zinc-900 text-white p-2 rounded-lg shadow-lg space-y-1">
                                            <button
                                                className="flex items-center gap-2 w-full hover:bg-zinc-800 px-2 py-1 rounded-md"
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
                        </TableBody>
                    </Table>
                </div>
            </SettingsLayout>
        </AppLayout>
    )
}