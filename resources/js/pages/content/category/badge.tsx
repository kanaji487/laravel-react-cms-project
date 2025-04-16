import { Badge } from "@/components/ui/badge";

type CategoryBadgeProps = {
    status: string;
};

export default function CategoryBadge({ status }: CategoryBadgeProps){

    const style = {
        publish: 'bg-green-100 text-green-800',
        unpublish: 'bg-gray-200 text-gray-700',
    }[status];

    return(
        <Badge className={`px-2 py-1 rounded-full text-sm font-medium ${style}`}>
            {status}
        </Badge>
    )
}