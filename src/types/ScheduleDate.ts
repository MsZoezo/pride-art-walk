export interface ScheduleDate {
    date: string;
    start_time: number;
    end_time: number;

    is_special_event?: boolean;
    special_event_description?: string;
}