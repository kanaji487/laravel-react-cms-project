import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Head, useForm  } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Role list',
        href: '/settings/role',
    },
    {
        title: 'Role create',
        href: '#'
    }
];

const Create = () => {

    type FormData = {
        name: string;
        description: string;
        permissions: Record<string, string[]>;
    };

    const { data, setData, post, processing, errors } = useForm<FormData>({
        name: '',
        description: '',
        permissions: {
          category: []
        }
    });

    const togglePermission = (module: string, action: string) => {
        const actions = data.permissions[module] || []
        const updated = actions.includes(action)
            ? actions.filter(a => a !== action)
            : [...actions, action]

        setData('permissions', {
            ...data.permissions,
            [module]: updated
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('roles.store'));
    }

    const permissions = [
        { module: 'category' }
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Role create" />
            <SettingsLayout>
                <div className="max-w-2xl mx-4 space-y-6 mt-8">
                    <h1 className="text-2xl font-bold">Create New Role</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id='name'
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className='mt-1'
                                type='text'
                                placeholder='name'
                            />
                            {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id='description'
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className='mt-1'
                                placeholder='description'
                            />
                            {errors.description && <div className="text-sm text-red-500">{errors.description}</div>}
                        </div>

                        <div className="border rounded-md p-4">
                            <h2 className="text-lg font-semibold mb-4">Assigned Permission</h2>
                            <div className="grid grid-cols-6 gap-4 items-center font-medium border-b pb-2">
                                <div className="col-span-2">Module</div>
                                <div>View</div>
                                <div>Modify</div>
                                <div>Delete</div>
                                <div>Publish</div>
                            </div>

                            {permissions.map((perm, index) => (
                                <div key={index} className="grid grid-cols-6 gap-4 items-center py-2 border-b last:border-b-0">
                                    <div className="col-span-2 flex items-center gap-2">
                                        <Label className="capitalize">{perm.module}</Label>
                                    </div>
                                    {['view', 'modify', 'delete', 'publish'].map(action => (
                                        <Checkbox
                                            key={action}
                                            checked={data.permissions[perm.module]?.includes(action)}
                                            onCheckedChange={() => togglePermission(perm.module, action)}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>

                        <Button type='submit' disabled={processing}>Save</Button>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    )
}

export default Create