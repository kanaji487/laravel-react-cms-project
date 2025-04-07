import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Module settings',
        href: '/settings/module',
    },
];

export default function Module() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Module settings" />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Module management" description="Creat, edit and delete module" />
                </div>
            </SettingsLayout>
        </AppLayout>
    )
}