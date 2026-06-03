import { useEffect, useState } from "react";
import type { MotionValue } from "motion/react";
import {
	AnimatePresence,
	animate,
	motion,
	useMotionValue,
	useReducedMotion,
	useTransform,
} from "motion/react";
import {
	BarChart3,
	CalendarRange,
	Check,
	Printer,
	ScanLine,
	Ticket,
	Users,
} from "lucide-react";
import { Reveal } from "./reveal";

const STEPS = [
	{
		id: "plan",
		label: "Plan",
		icon: CalendarRange,
		headline: "Build your event in minutes",
		sub: "Tickets, sessions, venues — configured once, live everywhere.",
	},
	{
		id: "sell",
		label: "Sell",
		icon: Ticket,
		headline: "Live page, live payments",
		sub: "Share a link. Payments land directly in your account.",
	},
	{
		id: "badges",
		label: "Badges",
		icon: Printer,
		headline: "Branded badges, generated instantly",
		sub: "Templates tailored to your brand. Print-ready in seconds.",
	},
	{
		id: "checkin",
		label: "Check-in",
		icon: Users,
		headline: "Front desk that moves fast",
		sub: "Find anyone instantly. Print a badge. Move on.",
	},
	{
		id: "scan",
		label: "Scan",
		icon: ScanLine,
		headline: "Any phone, any gate",
		sub: "Web scanner. Sub-second validation. Live gate counts.",
	},
	{
		id: "report",
		label: "Report",
		icon: BarChart3,
		headline: "Numbers without the spreadsheet",
		sub: "Revenue, attendance and channel breakdown — ready to export.",
	},
] as const;

// ─── Badge Conveyor ───────────────────────────────────────────

const BADGE_PEOPLE = [
	{
		event: "TECH SUMMIT",
		date: "Nov 12–14, 2025",
		first: "YOHANNES",
		last: "TESFAYE",
		org: "Addis Digital",
		role: "VIP DELEGATE",
		headerBg: "#173a40",
		accent: "#4fb8b2",
	},
	{
		event: "AFCA ANNUAL",
		date: "Mar 3–5, 2026",
		first: "MARTA",
		last: "HAILU",
		org: "AFCA Board",
		role: "SPEAKER",
		headerBg: "#2f6a4a",
		accent: "#7ec8a0",
	},
	{
		event: "ADDIS DEVS",
		date: "Jan 18, 2026",
		first: "BEKELE",
		last: "SHIFERAW",
		org: "Safaricom ET",
		role: "EXHIBITOR",
		headerBg: "#1e3a5f",
		accent: "#64a6ea",
	},
];

type BadgePerson = (typeof BADGE_PEOPLE)[number];

function RealisticQR({ size = 54 }: { size?: number }) {
	const sq = Math.round(size * 0.27);
	const inner = Math.round(sq * 0.44);
	const cornerBase = {
		position: "absolute" as const,
		width: sq,
		height: sq,
		border: "2.5px solid #173a40",
		background: "white",
		display: "flex",
		alignItems: "center" as const,
		justifyContent: "center" as const,
	};
	return (
		<div
			style={{
				width: size,
				height: size,
				position: "relative",
				background: "white",
				borderRadius: 2,
				overflow: "hidden",
			}}
		>
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage:
						"repeating-linear-gradient(0deg,rgba(23,58,64,0.26) 0,rgba(23,58,64,0.26) 1px,transparent 1px,transparent 4px),repeating-linear-gradient(90deg,rgba(23,58,64,0.26) 0,rgba(23,58,64,0.26) 1px,transparent 1px,transparent 4px)",
					backgroundSize: "4px 4px",
				}}
			/>
			<div style={{ ...cornerBase, top: 3, left: 3 }}>
				<div style={{ width: inner, height: inner, background: "#173a40" }} />
			</div>
			<div style={{ ...cornerBase, top: 3, right: 3 }}>
				<div style={{ width: inner, height: inner, background: "#173a40" }} />
			</div>
			<div style={{ ...cornerBase, bottom: 3, left: 3 }}>
				<div style={{ width: inner, height: inner, background: "#173a40" }} />
			</div>
		</div>
	);
}

function BadgeCard({
	badge,
	nameOpacity,
	qrOpacity,
	roleOpacity,
}: {
	badge: BadgePerson;
	nameOpacity: MotionValue<number>;
	qrOpacity: MotionValue<number>;
	roleOpacity: MotionValue<number>;
}) {
	return (
		<div
			style={{
				width: 142,
				height: 210,
				borderRadius: 12,
				overflow: "hidden",
				background: "white",
				display: "flex",
				flexDirection: "column",
			}}
		>
			{/* Header with gradient overlay */}
			<div
				style={{
					position: "relative",
					background: badge.headerBg,
					padding: "10px 12px 9px",
					display: "flex",
					alignItems: "flex-start",
					justifyContent: "space-between",
					flexShrink: 0,
				}}
			>
				<div
					style={{
						position: "absolute",
						inset: 0,
						background:
							"linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.22) 100%)",
						pointerEvents: "none",
					}}
				/>
				<motion.div
					style={{ opacity: nameOpacity, position: "relative", zIndex: 1 }}
				>
					<div
						style={{
							fontSize: "0.52rem",
							fontWeight: 800,
							letterSpacing: "0.16em",
							color: badge.accent,
							textTransform: "uppercase" as const,
							lineHeight: 1.2,
						}}
					>
						{badge.event}
					</div>
					<div
						style={{
							fontSize: "0.41rem",
							fontWeight: 600,
							letterSpacing: "0.07em",
							color: "rgba(255,255,255,0.6)",
							marginTop: 2,
						}}
					>
						{badge.date}
					</div>
				</motion.div>
				<div
					style={{
						position: "relative",
						zIndex: 1,
						width: 14,
						height: 14,
						borderRadius: "50%",
						border: `2px solid ${badge.accent}`,
						opacity: 0.65,
						flexShrink: 0,
					}}
				/>
			</div>

			{/* Body */}
			<div
				style={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					padding: "0 12px 10px",
				}}
			>
				{/* Lanyard punch hole */}
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						paddingTop: 7,
						paddingBottom: 6,
						flexShrink: 0,
					}}
				>
					<div
						style={{
							width: 20,
							height: 7,
							borderRadius: 4,
							background: "#ccd2d6",
						}}
					/>
				</div>

				{/* Name + Org */}
				<motion.div style={{ opacity: nameOpacity, flexShrink: 0 }}>
					<div
						style={{
							fontSize: "0.76rem",
							fontWeight: 900,
							lineHeight: 1.15,
							color: "#0f2e35",
							letterSpacing: "0.02em",
						}}
					>
						{badge.first}
					</div>
					<div
						style={{
							fontSize: "0.76rem",
							fontWeight: 900,
							lineHeight: 1.15,
							color: "#0f2e35",
							letterSpacing: "0.02em",
						}}
					>
						{badge.last}
					</div>
					<div
						style={{
							fontSize: "0.52rem",
							fontWeight: 600,
							color: badge.accent,
							marginTop: 3,
							letterSpacing: "0.04em",
						}}
					>
						{badge.org}
					</div>
				</motion.div>

				<div style={{ flex: 1 }} />

				{/* QR */}
				<motion.div
					style={{
						opacity: qrOpacity,
						alignSelf: "center",
						marginBottom: 5,
						flexShrink: 0,
					}}
				>
					<RealisticQR size={54} />
				</motion.div>

				{/* Role pill */}
				<motion.div
					style={{
						opacity: roleOpacity,
						alignSelf: "center",
						flexShrink: 0,
					}}
				>
					<span
						style={{
							fontSize: "0.44rem",
							fontWeight: 700,
							textTransform: "uppercase" as const,
							letterSpacing: "0.12em",
							padding: "2.5px 9px",
							borderRadius: 4,
							background: badge.headerBg,
							color: badge.accent,
							display: "inline-block",
						}}
					>
						{badge.role}
					</span>
				</motion.div>
			</div>
		</div>
	);
}

function MovingBadge({
	badge,
	delay,
}: {
	badge: BadgePerson;
	delay: number;
}) {
	const reduce = useReducedMotion();
	const x = useMotionValue(420);

	// Hard clip-path reveal — badge crosses beam → color layer unveils left-to-right
	// x=55: badge left edge at center → 0% revealed
	// x=-55: badge right edge at center → 100% revealed
	const colorClipPath = useTransform(
		x,
		[71, -71],
		["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
	);

	// Dynamic glow shadow: intensifies as badge approaches beam
	const boxShadow = useTransform(x, [-70, 0, 70], [
		"0 8px 22px rgba(0,0,0,0.45)",
		"0 10px 40px rgba(0,0,0,0.55), 0 0 28px rgba(79,184,178,0.4), 0 0 8px rgba(79,184,178,0.6)",
		"0 8px 22px rgba(0,0,0,0.45)",
	]);

	// Scale: enter small → full → exit small
	const scale = useTransform(x, [420, 300, -300, -420], [0.78, 1, 1, 0.78]);

	// Staggered content reveal (name first, then QR, then role)
	const nameOpacity = useTransform(x, [390, 260], [0, 1]);
	const qrOpacity = useTransform(x, [370, 240], [0, 1]);
	const roleOpacity = useTransform(x, [350, 220], [0, 1]);

	useEffect(() => {
		if (reduce) return;
		const controls = animate(x, -470, {
			duration: 6,
			delay,
			ease: "linear",
			repeat: Number.POSITIVE_INFINITY,
		});
		return () => controls.stop();
	}, [x, delay, reduce]);

	const posStyle = {
		position: "absolute" as const,
		left: "50%",
		top: "50%",
		marginLeft: -71,
		marginTop: -127,
	};

	const badgeContent = (
		<>
			<BadgeCard
				badge={badge}
				nameOpacity={nameOpacity}
				qrOpacity={qrOpacity}
				roleOpacity={roleOpacity}
			/>
		</>
	);

	if (reduce) {
		return (
			<div
				style={{
					...posStyle,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<div
					style={{
						width: 2,
						height: 22,
						background: "rgba(255,255,255,0.22)",
						borderRadius: 1,
					}}
				/>
				{badgeContent}
			</div>
		);
	}

	return (
		<motion.div
			style={{
				...posStyle,
				x,
				scale,
				zIndex: 1,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			{/* Lanyard string */}
			<div
				style={{
					width: 2,
					height: 22,
					background: "rgba(255,255,255,0.22)",
					borderRadius: 1,
				}}
			/>

			{/* Badge layers */}
			<div style={{ position: "relative", borderRadius: 12 }}>
				{/* Gray base layer — always visible */}
				<motion.div
					style={{
						boxShadow,
						borderRadius: 12,
						filter: "grayscale(1) brightness(0.55)",
					}}
				>
					{badgeContent}
				</motion.div>

				{/* Color layer — hard reveal as badge crosses center beam */}
				<motion.div
					style={{
						clipPath: colorClipPath,
						position: "absolute",
						inset: 0,
						borderRadius: 12,
						overflow: "hidden",
						pointerEvents: "none",
					}}
				>
					{badgeContent}
				</motion.div>
			</div>
		</motion.div>
	);
}

function BadgeConveyor() {
	return (
		<div
			className="relative overflow-hidden"
			style={{ height: 320, background: "#0b1921" }}
		>
			{/* Subtle conveyor track line */}
			<div
				className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px pointer-events-none"
				style={{
					background:
						"linear-gradient(to right, transparent, rgba(79,184,178,0.08) 20%, rgba(79,184,178,0.18) 50%, rgba(79,184,178,0.08) 80%, transparent)",
				}}
			/>

			{/* Zone labels */}
			<div className="absolute inset-x-0 top-3 flex justify-between px-6 pointer-events-none z-10">
				<span
					style={{
						fontSize: "0.52rem",
						fontWeight: 700,
						letterSpacing: "0.12em",
						textTransform: "uppercase",
						color: "rgba(79,184,178,0.55)",
					}}
				>
					← Branded
				</span>
				<span
					style={{
						fontSize: "0.52rem",
						fontWeight: 700,
						letterSpacing: "0.12em",
						textTransform: "uppercase",
						color: "rgba(79,184,178,0.3)",
					}}
				>
					Generating →
				</span>
			</div>

			{/* Center beam — core + wide glow */}
			<div
				className="absolute inset-y-0 left-1/2 z-20 pointer-events-none"
				style={{ width: 1, transform: "translateX(-50%)" }}
			>
				{/* Wide ambient glow */}
				<div
					className="absolute inset-y-0"
					style={{
						width: 48,
						left: -24,
						background:
							"radial-gradient(ellipse 24px 100% at center, rgba(79,184,178,0.14) 0%, transparent 100%)",
					}}
				/>
				{/* Core beam */}
				<div
					className="absolute inset-0"
					style={{
						background:
							"linear-gradient(to bottom, transparent 4%, #4fb8b2 22%, #4fb8b2 78%, transparent 96%)",
						boxShadow:
							"0 0 6px 1px rgba(79,184,178,0.9), 0 0 16px 2px rgba(79,184,178,0.4)",
					}}
				/>
			</div>

			{/* Badges */}
			{BADGE_PEOPLE.map((badge, i) => (
				<MovingBadge key={badge.first} badge={badge} delay={i * 2} />
			))}
		</div>
	);
}

function BadgesVisual() {
	return (
		<div className="flex flex-col">
			<div
				className="px-6 pt-5 pb-4 flex items-center justify-between"
				style={{ borderBottom: "1px solid var(--line)" }}
			>
				<p className="text-[0.82rem] font-medium text-ink">
					Wide template library — tailored to your brand, print-ready in seconds
				</p>
				<span
					className="text-[0.6rem] font-semibold px-2.5 py-1 rounded-full shrink-0 ml-4"
					style={{
						background: "color-mix(in oklab, var(--lagoon) 12%, transparent)",
						color: "var(--lagoon-deep)",
					}}
				>
					Unlimited templates
				</span>
			</div>
			<BadgeConveyor />
		</div>
	);
}

// ─── Other Visuals ────────────────────────────────────────────

function PlanVisual() {
	return (
		<div className="p-6 lg:p-8 grid md:grid-cols-2 gap-6">
			<div className="space-y-4">
				<div>
					<label className="text-[0.62rem] font-semibold uppercase tracking-wider text-ink-soft block mb-1.5">
						Event name
					</label>
					<div
						className="px-3 py-2.5 rounded-lg text-[0.9rem] font-medium text-ink"
						style={{
							border: "1.5px solid var(--lagoon)",
							background: "color-mix(in oklab, var(--lagoon) 5%, white)",
						}}
					>
						Tech Summit 2025
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3">
					<div>
						<label className="text-[0.62rem] font-semibold uppercase tracking-wider text-ink-soft block mb-1.5">
							Date
						</label>
						<div
							className="px-3 py-2.5 rounded-lg text-[0.82rem] text-ink"
							style={{ border: "1px solid var(--line)" }}
						>
							Nov 12–14, 2025
						</div>
					</div>
					<div>
						<label className="text-[0.62rem] font-semibold uppercase tracking-wider text-ink-soft block mb-1.5">
							Venue
						</label>
						<div
							className="px-3 py-2.5 rounded-lg text-[0.82rem] text-ink"
							style={{ border: "1px solid var(--line)" }}
						>
							Skylight Hotel
						</div>
					</div>
				</div>
			</div>

			<div>
				<div className="flex items-center justify-between mb-2">
					<span className="text-[0.62rem] font-semibold uppercase tracking-wider text-ink-soft">
						Ticket tiers
					</span>
					<button
						type="button"
						className="text-[0.68rem] font-semibold"
						style={{ color: "var(--lagoon-deep)" }}
					>
						+ Add tier
					</button>
				</div>
				<div className="space-y-2">
					{[
						{ label: "VIP Pass", price: "ETB 2,500", sold: 100, cap: 200 },
						{ label: "General", price: "ETB 800", sold: 847, cap: 1200 },
						{ label: "Student", price: "ETB 400", sold: 210, cap: 300 },
					].map((t) => (
						<div
							key={t.label}
							className="px-3 py-2.5 rounded-lg"
							style={{
								border: "1px solid var(--line)",
								background: "color-mix(in oklab, var(--sea-ink) 2%, white)",
							}}
						>
							<div className="flex items-center justify-between mb-1.5">
								<span className="text-[0.82rem] font-semibold text-ink">
									{t.label}
								</span>
								<span
									className="text-[0.78rem] font-bold"
									style={{ color: "var(--lagoon-deep)" }}
								>
									{t.price}
								</span>
							</div>
							<div className="flex items-center gap-2">
								<div
									className="flex-1 h-1 rounded-full"
									style={{ background: "var(--line)" }}
								>
									<div
										className="h-full rounded-full"
										style={{
											width: `${(t.sold / t.cap) * 100}%`,
											background: "var(--lagoon)",
										}}
									/>
								</div>
								<span className="text-[0.58rem] text-ink-soft shrink-0">
									{t.sold}/{t.cap}
								</span>
							</div>
						</div>
					))}
				</div>
				<button
					type="button"
					className="mt-4 w-full py-2.5 rounded-lg text-[0.82rem] font-semibold text-white"
					style={{ background: "var(--lagoon)" }}
				>
					Publish event →
				</button>
			</div>
		</div>
	);
}

function SellVisual() {
	return (
		<div className="p-6 lg:p-8">
			<div className="grid md:grid-cols-2 gap-6">
				<div>
					<p className="text-[0.62rem] font-semibold uppercase tracking-wider text-ink-soft mb-1">
						Total revenue
					</p>
					<p className="text-[2.6rem] font-black text-ink leading-none">
						ETB 847,500
					</p>
					<div
						className="mt-3 h-2 rounded-full"
						style={{ background: "var(--line)" }}
					>
						<div
							className="h-full rounded-full"
							style={{
								width: "72%",
								background:
									"linear-gradient(90deg, var(--lagoon), var(--lagoon-deep))",
							}}
						/>
					</div>
					<p className="mt-1.5 text-[0.72rem] text-ink-soft">
						1,157 / 1,600 tickets sold · 72%
					</p>
				</div>
				<div className="space-y-2">
					<p className="text-[0.62rem] font-semibold uppercase tracking-wider text-ink-soft mb-2">
						Recent sales
					</p>
					{[
						{
							name: "Yohannes T.",
							type: "VIP",
							amt: "2,500",
							via: "Stripe",
							when: "just now",
						},
						{
							name: "Marta H.",
							type: "General",
							amt: "800",
							via: "Telebirr",
							when: "2m ago",
						},
						{
							name: "Bekele S.",
							type: "Student",
							amt: "400",
							via: "CBE Birr",
							when: "4m ago",
						},
					].map((s) => (
						<div
							key={s.name}
							className="flex items-center gap-2 px-3 py-2 rounded-lg text-[0.72rem]"
							style={{ border: "1px solid var(--line)" }}
						>
							<span
								className="size-1.5 rounded-full shrink-0"
								style={{ background: "var(--lagoon)" }}
							/>
							<span className="font-medium text-ink flex-1">{s.name}</span>
							<span className="text-ink-soft">{s.type}</span>
							<span className="font-semibold text-ink">ETB {s.amt}</span>
							<span className="text-ink-soft">{s.via}</span>
							<span className="text-ink-soft/60">{s.when}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function CheckinVisual() {
	return (
		<div className="p-6 lg:p-8">
			<div
				className="flex items-center gap-2 px-3 py-2.5 rounded-lg mb-4"
				style={{
					border: "1.5px solid var(--lagoon)",
					background: "color-mix(in oklab, var(--lagoon) 5%, white)",
				}}
			>
				<svg
					className="size-4 text-ink-soft"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-hidden
				>
					<circle cx="11" cy="11" r="8" strokeWidth="2" />
					<path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
				</svg>
				<span className="text-[0.85rem] text-ink-soft">
					Search name or order number...
				</span>
			</div>

			<div className="space-y-2">
				{[
					{ name: "Bekele Shiferaw", type: "VIP", status: "pending" },
					{ name: "Tigist Alemu", type: "General", status: "done", time: "09:42" },
					{ name: "Meron Kebede", type: "Press", status: "done", time: "09:38" },
					{ name: "Dawit Hailu", type: "VIP", status: "pending" },
				].map((a) => (
					<div
						key={a.name}
						className="flex items-center gap-3 px-3 py-3 rounded-xl"
						style={{
							border: "1px solid var(--line)",
							background:
								a.status === "done"
									? "color-mix(in oklab, var(--lagoon) 5%, white)"
									: "white",
						}}
					>
						<span
							className="size-2 rounded-full shrink-0"
							style={{
								background:
									a.status === "done" ? "rgb(52 211 153)" : "var(--line)",
							}}
						/>
						<span className="text-[0.88rem] font-semibold text-ink flex-1">
							{a.name}
						</span>
						<span
							className="text-[0.68rem] px-1.5 py-0.5 rounded font-medium"
							style={{
								background: "color-mix(in oklab, var(--sea-ink) 8%, transparent)",
								color: "var(--sea-ink-soft)",
							}}
						>
							{a.type}
						</span>
						{a.status === "done" ? (
							<span
								className="text-[0.72rem] font-semibold"
								style={{ color: "var(--lagoon-deep)" }}
							>
								✓ {a.time}
							</span>
						) : (
							<button
								type="button"
								className="text-[0.72rem] font-semibold px-3 py-1 rounded-lg text-white"
								style={{ background: "var(--sea-ink)" }}
							>
								Check in
							</button>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

function ScanVisual() {
	return (
		<div className="p-6 lg:p-8 flex flex-col items-center gap-6">
			<div className="w-full flex items-center justify-between text-[0.72rem]">
				<div className="flex items-center gap-1.5">
					<span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
					<span className="font-semibold text-ink">Gate A — Online</span>
				</div>
				<span className="font-mono text-ink-soft">0:00.8s avg</span>
			</div>

			<div
				className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden"
				style={{ border: "1px solid var(--line)" }}
			>
				<div
					className="px-4 py-3 flex items-center justify-between"
					style={{ background: "var(--sea-ink)" }}
				>
					<span className="text-[0.65rem] font-bold tracking-widest text-white/60 uppercase">
						Tutto Scanner
					</span>
					<span
						className="text-[0.65rem] font-semibold px-2 py-0.5 rounded-full"
						style={{
							background: "rgb(52 211 153 / 0.2)",
							color: "rgb(52 211 153)",
						}}
					>
						Live
					</span>
				</div>
				<div
					className="px-5 py-5 flex items-center gap-4"
					style={{
						background: "color-mix(in oklab, var(--lagoon) 8%, white)",
						borderBottom: "1px solid var(--line)",
					}}
				>
					<span
						className="size-10 rounded-full flex items-center justify-center shrink-0"
						style={{ background: "var(--lagoon)" }}
					>
						<Check className="size-5 text-white" strokeWidth={3} />
					</span>
					<div>
						<p className="text-[1rem] font-black text-ink">Yohannes Tesfaye</p>
						<p className="text-[0.72rem] text-ink-soft">#ETH-2847 · VIP · Hall A</p>
					</div>
				</div>
				<div className="grid grid-cols-3 text-center py-3 px-4">
					{[
						{ n: "848", l: "Admitted" },
						{ n: "3", l: "Gates" },
						{ n: "752", l: "Remaining" },
					].map((s) => (
						<div key={s.l}>
							<p className="text-[1rem] font-black text-ink">{s.n}</p>
							<p className="text-[0.6rem] text-ink-soft">{s.l}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function ReportVisual() {
	const bars = [
		{ label: "Stripe", pct: 52, amt: "621,000" },
		{ label: "Telebirr", pct: 32, amt: "388,000" },
		{ label: "CBE Birr", pct: 16, amt: "191,000" },
	];

	return (
		<div className="p-6 lg:p-8">
			<div className="grid md:grid-cols-3 gap-4 mb-6">
				{[
					{ label: "Revenue", value: "ETB 1.2M" },
					{ label: "Attendees", value: "1,157" },
					{ label: "Avg ticket", value: "ETB 1,037" },
				].map((s) => (
					<div
						key={s.label}
						className="rounded-xl px-4 py-3.5 text-center"
						style={{
							border: "1px solid var(--line)",
							background: "color-mix(in oklab, var(--sea-ink) 3%, white)",
						}}
					>
						<p className="text-[0.62rem] font-semibold uppercase tracking-wider text-ink-soft mb-1">
							{s.label}
						</p>
						<p className="text-[1.2rem] font-black text-ink">{s.value}</p>
					</div>
				))}
			</div>

			<p className="text-[0.62rem] font-semibold uppercase tracking-wider text-ink-soft mb-3">
				Revenue by channel
			</p>
			<div className="space-y-2.5">
				{bars.map((b) => (
					<div key={b.label} className="flex items-center gap-3">
						<span className="text-[0.82rem] font-medium text-ink w-20 shrink-0">
							{b.label}
						</span>
						<div
							className="flex-1 h-2 rounded-full"
							style={{ background: "var(--line)" }}
						>
							<motion.div
								className="h-full rounded-full"
								style={{
									background:
										"linear-gradient(90deg, var(--lagoon-deep), var(--lagoon))",
								}}
								initial={{ width: 0 }}
								whileInView={{ width: `${b.pct}%` }}
								viewport={{ once: true }}
								transition={{
									duration: 0.7,
									delay: 0.1 * bars.indexOf(b),
									ease: [0.16, 1, 0.3, 1],
								}}
							/>
						</div>
						<span className="text-[0.72rem] font-semibold text-ink w-20 text-right shrink-0">
							ETB {b.amt}
						</span>
						<span className="text-[0.68rem] text-ink-soft w-8 text-right shrink-0">
							{b.pct}%
						</span>
					</div>
				))}
			</div>

			<div className="mt-5 flex gap-2">
				<button
					type="button"
					className="px-4 py-2 rounded-lg text-[0.78rem] font-semibold text-white"
					style={{ background: "var(--sea-ink)" }}
				>
					Export CSV
				</button>
				<button
					type="button"
					className="px-4 py-2 rounded-lg text-[0.78rem] font-semibold text-ink"
					style={{ border: "1px solid var(--line)" }}
				>
					Share report
				</button>
			</div>
		</div>
	);
}

const VISUALS = [
	PlanVisual,
	SellVisual,
	BadgesVisual,
	CheckinVisual,
	ScanVisual,
	ReportVisual,
];

// ─── Section ─────────────────────────────────────────────────

export function Workflows() {
	const [active, setActive] = useState(0);
	const ActiveVisual = VISUALS[active];
	const step = STEPS[active];

	return (
		<section
			id="workflows"
			className="section"
			aria-labelledby="workflows-heading"
		>
			<div className="page-wrap">
				<Reveal>
					<div className="eyebrow mb-3">Workflows</div>
				</Reveal>
				<Reveal delay={0.05}>
					<h2
						id="workflows-heading"
						className="display-title text-[2rem] sm:text-[2.5rem] leading-[1.05] font-medium text-ink max-w-xl"
					>
						The full event lifecycle — one workspace.
					</h2>
				</Reveal>

				<div className="mt-10 grid lg:grid-cols-12 gap-6 items-start">
					{/* Step selector */}
					<div className="lg:col-span-3">
						<div className="flex lg:flex-col gap-1 overflow-x-auto pb-1 lg:pb-0">
							{STEPS.map((s, i) => {
								const Icon = s.icon;
								const isActive = active === i;
								return (
									<button
										key={s.id}
										type="button"
										onMouseEnter={() => setActive(i)}
										onClick={() => setActive(i)}
										className="group flex items-start gap-3 px-4 py-3 rounded-xl text-left transition-all shrink-0 lg:shrink"
										style={{
											background: isActive
												? "color-mix(in oklab, var(--sea-ink) 7%, white)"
												: "transparent",
											border: isActive
												? "1px solid var(--line)"
												: "1px solid transparent",
										}}
									>
										<span
											className="mt-0.5 size-7 rounded-lg flex items-center justify-center shrink-0 transition-colors"
											style={{
												background: isActive
													? "var(--sea-ink)"
													: "color-mix(in oklab, var(--sea-ink) 8%, transparent)",
												color: isActive ? "white" : "var(--sea-ink-soft)",
											}}
										>
											<Icon className="size-3.5" />
										</span>
										<div className="hidden lg:block">
											<p
												className="text-[0.88rem] font-semibold leading-none"
												style={{
													color: isActive
														? "var(--sea-ink)"
														: "var(--sea-ink-soft)",
												}}
											>
												{s.label}
											</p>
											<p className="mt-1 text-[0.72rem] text-ink-soft leading-snug">
												{s.sub}
											</p>
										</div>
										<span
											className="lg:hidden text-[0.82rem] font-semibold"
											style={{
												color: isActive
													? "var(--sea-ink)"
													: "var(--sea-ink-soft)",
											}}
										>
											{s.label}
										</span>
									</button>
								);
							})}
						</div>
					</div>

					{/* Visual panel */}
					<div className="lg:col-span-9">
						<div
							className="rounded-2xl overflow-hidden"
							style={{
								border: "1px solid var(--line)",
								background: "white",
								minHeight: 360,
							}}
						>
							{/* Panel header */}
							<div
								className="flex items-center gap-3 px-5 py-3.5"
								style={{
									borderBottom: "1px solid var(--line)",
									background:
										"color-mix(in oklab, var(--sea-ink) 4%, white)",
								}}
							>
								<div className="flex gap-1.5">
									<span className="size-2.5 rounded-full bg-red-400/70" />
									<span className="size-2.5 rounded-full bg-amber-400/70" />
									<span className="size-2.5 rounded-full bg-emerald-400/70" />
								</div>
								<AnimatePresence mode="wait">
									<motion.span
										key={step.id}
										initial={{ opacity: 0, y: 4 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -4 }}
										transition={{ duration: 0.18 }}
										className="text-[0.72rem] font-semibold text-ink-soft"
									>
										{step.headline}
									</motion.span>
								</AnimatePresence>
							</div>

							{/* Content */}
							<AnimatePresence mode="wait">
								<motion.div
									key={active}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
								>
									<ActiveVisual />
								</motion.div>
							</AnimatePresence>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
