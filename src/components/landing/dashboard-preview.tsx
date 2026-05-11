import { ArrowUpRight, Check, ScanLine, Ticket, Users } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const SPARK = [4, 8, 6, 12, 10, 16, 14, 22, 19, 28, 26, 34, 32, 42];

function buildSparklinePath(values: number[], width: number, height: number) {
	const max = Math.max(...values);
	const min = Math.min(...values);
	const range = Math.max(1, max - min);
	const step = width / (values.length - 1);
	return values
		.map((v, i) => {
			const x = i * step;
			const y = height - ((v - min) / range) * height;
			return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
		})
		.join(" ");
}

export function DashboardPreview() {
	const reduce = useReducedMotion();
	const path = buildSparklinePath(SPARK, 220, 60);
	const areaPath = `${path} L220,60 L0,60 Z`;

	return (
		<div className="relative">
			<div
				aria-hidden
				className="absolute -inset-4 rounded-[28px] -z-10"
				style={{
					background:
						"radial-gradient(60% 60% at 30% 20%, color-mix(in oklab, var(--lagoon) 28%, transparent), transparent 70%)," +
						" radial-gradient(50% 50% at 80% 80%, color-mix(in oklab, var(--palm) 18%, transparent), transparent 70%)",
					filter: "blur(18px)",
				}}
			/>

			<div className="surface-card-strong p-5 md:p-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2.5">
						<div
							aria-hidden
							className="size-2 rounded-full"
							style={{
								background: "var(--palm)",
								boxShadow:
									"0 0 0 4px color-mix(in oklab, var(--palm) 18%, transparent)",
							}}
						/>
						<span className="text-[0.78rem] font-medium tracking-wide text-ink-soft">
							Live &middot; Tech Summit Addis 2026
						</span>
					</div>
					<div className="text-[0.72rem] text-ink-soft hidden sm:flex items-center gap-1">
						<span className="kbd">⌘</span>
						<span className="kbd">K</span>
					</div>
				</div>

				<div className="mt-5 grid grid-cols-3 gap-3">
					<MetricCard
						icon={<Ticket className="size-3.5" />}
						label="Tickets sold"
						value="2,418"
						delta="+184 today"
					/>
					<MetricCard
						icon={<Users className="size-3.5" />}
						label="Checked in"
						value="1,902"
						delta="78.6% rate"
					/>
					<MetricCard
						icon={<ScanLine className="size-3.5" />}
						label="Scans / min"
						value="46"
						delta="3 gates open"
					/>
				</div>

				<div className="mt-4 surface-card p-4">
					<div className="flex items-center justify-between mb-3">
						<div>
							<div className="text-[0.72rem] uppercase tracking-wider text-ink-soft font-semibold">
								Revenue this week
							</div>
							<div className="text-ink font-semibold text-lg mt-0.5">
								ETB 1,284,500
							</div>
						</div>
						<div className="inline-flex items-center gap-1 text-[0.72rem] font-semibold text-palm">
							<ArrowUpRight className="size-3.5" />
							+18.2%
						</div>
					</div>

					<svg
						viewBox="0 0 220 60"
						width="100%"
						height="60"
						preserveAspectRatio="none"
						role="img"
						aria-label="Revenue trend, growing this week"
					>
						<title>Revenue trend, growing this week</title>
						<defs>
							<linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="0"
									stopColor="var(--lagoon-deep)"
									stopOpacity="0.35"
								/>
								<stop
									offset="1"
									stopColor="var(--lagoon-deep)"
									stopOpacity="0"
								/>
							</linearGradient>
						</defs>
						<motion.path
							d={areaPath}
							fill="url(#spark-fill)"
							initial={reduce ? false : { opacity: 0 }}
							animate={reduce ? undefined : { opacity: 1 }}
							transition={{ duration: 1, delay: 0.6 }}
						/>
						<motion.path
							d={path}
							fill="none"
							stroke="var(--lagoon-deep)"
							strokeWidth="1.6"
							strokeLinecap="round"
							strokeLinejoin="round"
							initial={reduce ? false : { pathLength: 0 }}
							animate={reduce ? undefined : { pathLength: 1 }}
							transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
						/>
					</svg>
				</div>

				<div className="mt-4 grid sm:grid-cols-5 gap-3">
					<div className="surface-card p-4 sm:col-span-3">
						<div className="text-[0.72rem] uppercase tracking-wider text-ink-soft font-semibold mb-3">
							Ticket types
						</div>
						<TicketRow
							name="Early bird — 3-day"
							sold={840}
							cap={1000}
							price="ETB 4,500"
						/>
						<TicketRow
							name="Standard pass"
							sold={1124}
							cap={1500}
							price="ETB 6,800"
						/>
						<TicketRow
							name="VIP &amp; Exhibitor"
							sold={454}
							cap={500}
							price="ETB 18,000"
						/>
					</div>

					<div className="surface-card p-4 sm:col-span-2">
						<div className="text-[0.72rem] uppercase tracking-wider text-ink-soft font-semibold mb-3">
							Door activity
						</div>
						<ScanRow
							status="ok"
							name="Tigist H."
							note="Standard &middot; Gate 2"
							delay={0.7}
						/>
						<ScanRow
							status="ok"
							name="Daniel B."
							note="VIP &middot; Gate 1"
							delay={0.9}
						/>
						<ScanRow
							status="ok"
							name="Hanna A."
							note="Exhibitor &middot; Hall B"
							delay={1.1}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

function MetricCard({
	icon,
	label,
	value,
	delta,
}: {
	icon: React.ReactNode;
	label: string;
	value: string;
	delta: string;
}) {
	return (
		<div className="surface-card p-3.5">
			<div className="inline-flex items-center gap-1.5 text-[0.7rem] uppercase tracking-wider text-ink-soft font-semibold">
				<span className="text-palm">{icon}</span>
				{label}
			</div>
			<div className="mt-1.5 text-ink font-semibold text-lg">{value}</div>
			<div className="text-[0.72rem] text-ink-soft">{delta}</div>
		</div>
	);
}

function TicketRow({
	name,
	sold,
	cap,
	price,
}: {
	name: string;
	sold: number;
	cap: number;
	price: string;
}) {
	const pct = Math.round((sold / cap) * 100);
	return (
		<div className="py-2 border-t border-[color:var(--line)] first:border-t-0 first:pt-0">
			<div className="flex items-center justify-between text-[0.82rem]">
				<span className="text-ink font-medium">{name}</span>
				<span className="text-ink-soft tabular-nums">{price}</span>
			</div>
			<div className="mt-1.5 flex items-center gap-3">
				<div className="flex-1 h-1.5 rounded-full bg-[color:var(--line)] overflow-hidden">
					<div
						className="h-full rounded-full"
						style={{
							width: `${pct}%`,
							background:
								"linear-gradient(90deg, var(--lagoon-deep), var(--palm))",
						}}
					/>
				</div>
				<span className="text-[0.7rem] text-ink-soft tabular-nums w-24 text-right">
					{sold.toLocaleString()} / {cap.toLocaleString()}
				</span>
			</div>
		</div>
	);
}

function ScanRow({
	status,
	name,
	note,
	delay = 0,
}: {
	status: "ok" | "warn";
	name: string;
	note: string;
	delay?: number;
}) {
	const reduce = useReducedMotion();
	return (
		<motion.div
			className="flex items-center gap-3 py-2 border-t border-[color:var(--line)] first:border-t-0 first:pt-0"
			initial={reduce ? false : { opacity: 0, x: -6 }}
			whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
			viewport={{ once: true, amount: 0.4 }}
			transition={{ duration: 0.5, delay, ease: "easeOut" }}
		>
			<div
				className="size-7 rounded-full inline-flex items-center justify-center"
				style={{
					background:
						status === "ok"
							? "color-mix(in oklab, var(--palm) 18%, white)"
							: "color-mix(in oklab, #c08400 18%, white)",
					color: status === "ok" ? "var(--palm)" : "#8a5a00",
				}}
				aria-hidden
			>
				<Check className="size-3.5" />
			</div>
			<div className="min-w-0">
				<div className="text-[0.82rem] text-ink font-medium truncate">
					{name}
				</div>
				<div className="text-[0.72rem] text-ink-soft truncate">{note}</div>
			</div>
		</motion.div>
	);
}
