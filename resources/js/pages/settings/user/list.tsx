import { useState } from 'react';
import { type BreadcrumbItem } from '@/types';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { 
    Head,
    usePage,
    router
} from '@inertiajs/react';
import { 
    EllipsisVertical,
    Pencil,
    Trash2,
    Eye
} from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User list',
        href: '/settings/profile',
    },
];

type User = {
    id: number;
    name: string;
    email: string;
    profile_picture?: string;
    last_login_at: Date;
};

const UserList = () => {

    const { users } = usePage<{ users: User[] }>().props;
    const getInitials = useInitials();
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleQuickView = (user: User) => {
        setSelectedUser(user);
        setIsSheetOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User list" />
            <SettingsLayout>
                <div>
                    <div className='my-4'>
                        <Button>Create</Button>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Last login</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users?.map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            {
                                                user.profile_picture ? (
                                                    <img
                                                        src={`/storage/${user.profile_picture}`}
                                                        alt={user.name}
                                                        className="h-8 w-8 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-white">
                                                        {getInitials(user.name)}
                                                    </div>
                                                )
                                            }
                                        </TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            {user.last_login_at?.toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <Popover>
                                                <PopoverTrigger>
                                                    <EllipsisVertical className="cursor-pointer" />
                                                </PopoverTrigger>
                                                <PopoverContent className="w-40 bg-zinc-900 text-white p-2 rounded-lg shadow-lg space-y-1">
                                                    <button
                                                        onClick={() => router.visit(`/settings/profile/${user.id}/edit`)}
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
                                                        onClick={() => handleQuickView(user)}
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

                        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>User Detail</SheetTitle>
                                    <SheetDescription>
                                        {selectedUser ? (
                                            <>
                                                <div className="mt-4 space-y-2">
                                                    <div><strong>Name:</strong> {selectedUser.name}</div>
                                                    <div><strong>Email:</strong> {selectedUser.email}</div>
                                                    <div><strong>Last login:</strong> {selectedUser.last_login_at?.toLocaleString()}</div>
                                                </div>
                                            </>
                                        ) : (
                                            "No user selected"
                                        )}
                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    )
}

export default UserList