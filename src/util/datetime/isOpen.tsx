import { ScheduleDate } from "@/types/ScheduleDate";

export default function isOpen(schedules: ScheduleDate[]): boolean {
    const timestamp = Math.round(Date.now() / 1000);

    const date = new Date(Date.now());
    const dateStr = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;

    let open = false;

    for(let i = 0; i < schedules.length; i++) {
        const schedule = schedules[i];

        if(schedule.date != dateStr) continue;

        if(timestamp < schedule.start_time) continue;
        if(timestamp > schedule.end_time) continue;

        open = true;
        break;
    }

    return open;
}