/**
 * This interface describes the properties for a specific schedule date for an exhibition.
 */
export interface IScheduleDate {
	/** The date this applies to. */
	date: string;

	/** The openings time. */
	start_time: number;

	/** The closing time */
	end_time: number;

	/** Is this a special event. */
	is_special_event?: boolean;

	/** Describes the special event. */
	special_event_description?: string;
}
