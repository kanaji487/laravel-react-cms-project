import { useState } from "react";
import { router } from "@inertiajs/react";
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
    onSubmit: (filters: FilterValues) => void
}

type FilterValues = {
    title: string
    slug: string
    description: string
    language: string
    status: string
}

export const FilterSheet: React.FC<FilterSheetProps> = ({ isOpen, onClose, onSubmit  }) => {

    const [filters, setFilters] = useState<FilterValues>({
        title: "",
        slug: "",
        description: "",
        language: "",
        status: "",
    });

    const handleChange = (field: keyof FilterValues, value: string) => {
        setFilters(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = () => {
        onSubmit(filters)
        onClose()
    }

    const handleReset = () => {
        router.get("/content/category/list");
    };

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
                        value={filters.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />
                </div>

                <div className="mt-4 mx-4 space-y-4">
                    <Label>Slug</Label>
                    <Input
                        type="text"
                        placeholder="Slug"
                        className="border-white"
                        value={filters.slug}
                        onChange={(e) => handleChange("slug", e.target.value)}
                    />
                </div>

                <div className="mt-4 mx-4 space-y-4">
                    <Label>Description</Label>
                    <Input
                        type="text"
                        placeholder="Description"
                        className="border-white"
                        value={filters.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                    />
                </div>

                <div className="mt-4 mx-4 space-y-4">
                    <Label>Language</Label>
                    <Select
                        onValueChange={(value) => handleChange("language", value)}
                        value={filters.language}
                    >
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
                    <Select
                        onValueChange={(value) => handleChange("status", value)}
                        value={filters.status}
                    >
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

                <div className="flex flex-row gap-2 mx-4 mt-6">
                    <Button className="w-1/2" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button className="w-1/2" onClick={handleReset}>
                        Reset
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}