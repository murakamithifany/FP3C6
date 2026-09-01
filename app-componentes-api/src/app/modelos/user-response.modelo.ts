import { User } from "./user.modelo";

export interface UserResponse{
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: User[]
}