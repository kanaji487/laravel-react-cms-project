import { router } from '@inertiajs/react'
import { type BreadcrumbItem } from '@/types';
import { Folder } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Content',
        href: '/content',
    },
];

export default function Content(){

    const handleClick = () => {
        router.visit('/content/category')
    }

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Articles" />
            <div className='flex flex-row justify-between items-center p-4'>
                <div>
                    <Label className='text-2xl border-2'>Category management</Label>
                    <div className='my-4'>
                        <Card className="w-[150px]">
                            <CardHeader>
                                <Folder className='w-full h-full' />
                            </CardHeader>
                            <CardContent 
                                className='text-center'
                                onClick={handleClick}
                            >
                                <h1>Category</h1>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}