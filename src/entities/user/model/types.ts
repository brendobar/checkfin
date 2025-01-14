import {Operation} from "@/entities/operation";

export interface User {
    id: string;
    name?: string | null;
    email: string;
    password?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    accounts: Account[];
    operations: Operation[];
    balance: number;
    createdAt: Date;
    updatedAt: Date;
}


export interface Account {
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}