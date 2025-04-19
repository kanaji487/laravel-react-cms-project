import { 
    Sheet, 
    SheetContent, 
    SheetHeader, 
    SheetTitle 
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "./label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "./calendar";

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
                <div className="mt-4 mx-4 space-y-4">
                    <Label>Title</Label>
                    <Input 
                        type="text" 
                        placeholder="Title" 
                        className="border-white" 
                    />
                </div>
                <div className="mt-4 mx-4 space-y-4">
                    <Label>Slug</Label>
                    <Input 
                        type="text" 
                        placeholder="Slug"
                        className="border-white"
                    />
                </div>
                <div className="mt-4 mx-4 space-y-4">
                    <Label>Description</Label>
                    <Input 
                        type="text" 
                        placeholder="Description"
                        className="border-white"
                    />
                </div>
                <div className="mt-4 mx-4 space-y-4">
                    <Label>Language</Label>
                    <Select>
                        <SelectTrigger className="border-white">
                            <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="tha">THA</SelectItem>
                                <SelectItem value="eng">ENG</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="mt-4 mx-4 space-y-4">
                    <Label>Status</Label>
                    <Select>
                        <SelectTrigger className="border-white">
                            <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="publish">Publish</SelectItem>
                                <SelectItem value="unpublish">Unpublish</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="mt-4 mx-4 space-y-4">
                    <Label>Created At</Label>
                    
                </div>
            </SheetContent>
        </Sheet>
    )
}