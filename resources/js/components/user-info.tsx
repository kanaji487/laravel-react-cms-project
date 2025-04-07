import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';

export function UserInfo({ user, showEmail = false }: { user: User; showEmail?: boolean }) {
    const getInitials = useInitials();

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                {user.profile_picture ? (
                    <img
                        src={`/storage/${user.profile_picture}`}
                        alt="Profile"
                        className="h-24 w-24 rounded-full object-cover"
                    />
                ) : (
                    <div className="h-24 w-24 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                        {getInitials(user.name)}
                    </div>
                )}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                {showEmail && <span className="text-muted-foreground truncate text-xs">{user.email}</span>}
            </div>
        </>
    );
}
