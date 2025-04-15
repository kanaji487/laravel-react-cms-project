import { type BreadcrumbItem } from '@/types';
import { Folder } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import CardContentItem from '@/components/card-content-item';
import { Head } from '@inertiajs/react';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Content',
        href: '/content',
    },
];

const cardItems = [
    {
        title: 'Category',
        route: '/content/category/list',
        icon: <Folder className="w-full h-full" />
    }
];

export default function Content(){

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Articles" />
            <div className='flex flex-row justify-between items-center p-4'>
                <div>
                    <Label className='text-2xl border-2'>Category management</Label>
                    <div className='my-4'>
                        {cardItems.map((item, index) => (
                            <CardContentItem 
                                key={index} 
                                title={item.title} 
                                route={item.route}
                                icon={item.icon}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}