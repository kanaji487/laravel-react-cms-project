import { useState } from 'react';
import { 
    type BreadcrumbItem, 
    type SharedData 
} from '@/types';
import { Transition } from '@headlessui/react';
import { Head, 
    Link, 
    useForm, 
    usePage 
} from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { useInitials } from '@/hooks/use-initials';
import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import CropImageModal from '@/core/crop-image-modal';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

type ProfileForm = {
    id: number;
    name: string;
    email: string;
    profile_picture: File | null;
    role_id: number;
}

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<{ auth: { user: { id: number; name: string; email: string; role_id: number; profile_picture: string | null } } }>().props;
    const getInitials = useInitials();
    const [showCrop, setShowCrop] = useState(false);
    const [srcImage, setSrcImage] = useState<string | null>(null);
    const { roles } = (usePage().props as unknown as { roles: { id: number; name: string }[] });

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        id: auth.user.id,
        name: auth.user.name,
        email: auth.user.email,
        profile_picture: null,
        role_id: auth.user.role_id,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
    
        post(route('profile.update'), {
            method: 'patch',
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Profile information" description="Update your name and email address" />

                    <form onSubmit={submit} className="space-y-6">

                        <div className="grid gap-2">
                            <Label htmlFor="profile_picture">Profile image</Label>
                            {typeof auth.user.profile_picture === 'string' && auth.user.profile_picture.trim() !== '' ? (
                                <img
                                    src={`/storage/${auth.user.profile_picture}`}
                                    alt="Profile"
                                    className="h-24 w-24 rounded-full object-cover"
                                />
                            ) : (
                                <div className="h-24 w-24 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400 text-xl font-semibold">
                                    {getInitials(auth.user.name)}
                                </div>
                            )}
                            <Button
                                type="button"
                                className='w-36 my-4'
                                onClick={() => setShowCrop(true)}
                            >
                                Upload Profile Image
                            </Button>
                            <CropImageModal
                                show={showCrop}
                                onClose={setShowCrop}
                                srcImage={srcImage}
                                setSrcImage={setSrcImage}
                                onCropped={(croppedFile) => setData('profile_picture', croppedFile)}
                                image_width={250}
                                image_height={250}
                            />
                            <InputError className="mt-2" message={errors.profile_picture} />
                        </div>

                        <div className="grid gap-2 md:max-w-lg">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Full name"
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2 md:max-w-lg">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                readOnly
                                autoComplete="username"
                                placeholder="Email address"
                            />
                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        <div className="grid gap-2 md:max-w-lg">
                            <Label htmlFor="role">Role</Label>
                            <Select
                                value={data.role_id?.toString()}
                                onValueChange={(value) => setData('role_id', parseInt(value))}
                            >
                                <SelectTrigger id="role">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Roles</SelectLabel>
                                        {roles.map((role) => (
                                            <SelectItem key={role.id} value={role.id.toString()}>
                                                {role.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}