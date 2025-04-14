import { router } from '@inertiajs/react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface CardItemProps {
    title: string
    route: string
    icon?: React.ReactNode
}

export default function CardContentItem(
    { 
        title, 
        route, 
        icon 
    }: CardItemProps
){

    const handleClick = () => {
        router.visit(route)
    }

    return(
        <Card className="w-[150px] cursor-pointer" onClick={handleClick}>
            <CardHeader>
                {icon}
            </CardHeader>
            <CardContent className="text-center">
                <h1>{title}</h1>
            </CardContent>
        </Card>
    )
}