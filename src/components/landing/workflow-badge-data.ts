export type WorkflowBadgeData = {
	id: string;
	name: string;
	role: string;
	event: string;
	variant: "ember" | "paper" | "onyx" | "lagoon" | "solar";
	cardColor: string;
	inkColor: string;
	accent: string;
	bandColor: string;
	initial: [number, number, number];
	anchor: [number, number, number];
};

/** Five hero badges; tune names, roles, and colors here for both fallback and WebGL. */
export const WORKFLOW_BADGE_DATA: Array<WorkflowBadgeData> = [
	{
		id: "atlas",
		name: "Tigist Hailu",
		role: "Summit Host",
		event: "Jet Events",
		variant: "ember",
		cardColor: "#151515",
		inkColor: "#fff7ed",
		accent: "#ff4b32",
		bandColor: "#f5efe6",
		initial: [-5.25, -0.58, 0],
		anchor: [-5.25, 3.12, 0],
	},
	{
		id: "orbit",
		name: "Daniel Bekele",
		role: "Expo Lead",
		event: "Addis Expo",
		variant: "paper",
		cardColor: "#f7f3ea",
		inkColor: "#151515",
		accent: "#d71920",
		bandColor: "#111111",
		initial: [-2.62, -0.52, 0],
		anchor: [-2.62, 3.18, 0],
	},
	{
		id: "signal",
		name: "Hanna Alemu",
		role: "Founder",
		event: "Jet Summit",
		variant: "onyx",
		cardColor: "#050505",
		inkColor: "#f8fafc",
		accent: "#f7c948",
		bandColor: "#f0f0f0",
		initial: [0, -0.62, 0],
		anchor: [0, 3.08, 0],
	},
	{
		id: "current",
		name: "Yared Tesfaye",
		role: "Operations",
		event: "Summit 26",
		variant: "lagoon",
		cardColor: "#0f5d63",
		inkColor: "#ecfeff",
		accent: "#9ff4e5",
		bandColor: "#083336",
		initial: [2.62, -0.54, 0],
		anchor: [2.62, 3.16, 0],
	},
	{
		id: "nova",
		name: "Meron Kebede",
		role: "VIP Guest",
		event: "Jet Expo",
		variant: "solar",
		cardColor: "#fffdf6",
		inkColor: "#111827",
		accent: "#ef3b2d",
		bandColor: "#f59e0b",
		initial: [5.25, -0.6, 0],
		anchor: [5.25, 3.14, 0],
	},
];
