import { Flavor, DARK } from "@protomaps/basemaps";

/**
 * This is the coloring for the map, extending from the base DARK theme.
 */
export const theme: Flavor = {
	...DARK,

	water: "#c1e8fa",

	park_a: "#231f20",
	park_b: "#231f20",

	other: "#231f20",

	highway: "white",
	tunnel_highway: "white",
	bridges_highway: "white",
};

/**
 * Color definitions for the exhibitions on the map.
 */
export enum colors {
	exhibition_open = "#00973a",
	exhibition_closed = "#e30513",
	user_location = "#f7c2db",
}
