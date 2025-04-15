import { Category } from '@/types/category';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Label } from '@/components/ui/label';

interface CategorySheetProps {
    category: Category | null;
    open: boolean;
    onClose: () => void;
}

export default function CategorySheet({ category, open, onClose }: CategorySheetProps){
    return(
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Category Detail</SheetTitle>
                    <SheetDescription>
                        This is the detail of selected category.
                    </SheetDescription>
                </SheetHeader>
                {category && (
                    <div className="space-y-4 py-4 px-4">
                        <div className='flex flex-row gap-4'>
                            <div className='w-1/2'>
                                <Label>Title</Label>
                                <h1>{category.title}</h1>
                            </div>
                            <div className='w-1/2'>
                                <Label>Slug</Label>
                                <h1>{category.slug}</h1>
                            </div>
                        </div>
                        <div>
                            <Label>Description</Label>
                            <h1>{category.description}</h1>
                        </div>
                        <div>
                            <Label>Created At</Label>
                            <h1>{new Date(category.created_at).toLocaleString()}</h1>
                        </div>
                        <div>
                            <Label>Updated At</Label>
                            <h1>{new Date(category.updated_at).toLocaleString()}</h1>
                        </div>
                        {/* <div><strong>Title:</strong> {category.title}</div>
                        <div><strong>Slug:</strong> {category.slug}</div>
                        <div><strong>Description:</strong> {category.description}</div>
                        <div><strong>Created At:</strong> {new Date(category.created_at).toLocaleString()}</div>
                        <div><strong>Updated At:</strong> {new Date(category.updated_at).toLocaleString()}</div> */}
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}