import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Category } from '@/types/category';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category',
        href: '/category',
    },
];

export default function CategoryEdit({ category }: { category: Category }) {
    const { data, setData, put, processing, errors } = useForm({
        title: category.title || '',
        slug: category.slug || '',
        description: category.description || '',
        obj_lang: category.obj_lang || '',
        obj_status: category.obj_status || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/content/category/${category.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Category" />

            <div className="max-w-2xl mx-4 space-y-6 mt-8">
                <h1 className="text-2xl font-bold">Edit Category</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1"
                            required
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500 mt-1">{errors.title}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            className="mt-1"
                            required
                        />
                        {errors.slug && (
                            <p className="text-sm text-red-500 mt-1">{errors.slug}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1"
                            required
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <Label>Lang</Label>
                        <Select
                            value={data.obj_lang}
                            onValueChange={(value) => setData('obj_lang', value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="tha">THA</SelectItem>
                                    <SelectItem value="eng">ENG</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.obj_lang && (
                            <p className="text-sm text-red-500 mt-1">{errors.obj_lang}</p>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <Label>Status</Label>
                        <Select
                            value={data.obj_status}
                            onValueChange={(value) => setData('obj_status', value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="publish">Publish</SelectItem>
                                    <SelectItem value="unpublish">Unpublish</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.obj_status && (
                            <p className="text-sm text-red-500 mt-1">{errors.obj_status}</p>
                        )}
                    </div>

                    <Button type="submit" disabled={processing}>
                        {processing ? 'Updating...' : 'Update Category'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    )
}