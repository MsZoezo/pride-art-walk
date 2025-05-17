export interface Team {
    id: number
    photo?: string,
    name: string
    pivot?: {
        about_us_id: number,
        partner_id: number
    }
    created_at?: string
    updated_at?: string
}