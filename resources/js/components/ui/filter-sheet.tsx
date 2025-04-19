import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface FilterSheetProps {
    isOpen: boolean;
    onClose: () => void;
}

export const FilterSheet: React.FC<FilterSheetProps> = ({ isOpen, onClose }) => {
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Filter Options</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                    <Input placeholder="Category Name" />
                    <Button className="w-full">Apply Filter</Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}