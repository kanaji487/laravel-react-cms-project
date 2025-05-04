export interface Role {
    id: number;
    name: string;
    description: string;
    permission: string;
    created_at: string;
    updated_at: string;
}

export interface PaginatedRoles {
    data: Role[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number;
    to: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export interface RolePageProps extends PageProps {
    roles: PaginatedRoles;
    [key: string]: any;
}