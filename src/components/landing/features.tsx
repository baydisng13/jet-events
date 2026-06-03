import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CalendarRange, IdCard, ScanLine } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./reveal";

type Feature = {
	icon: LucideIcon;
	tag: string;
	title: string;
	body: string;
};

const FEATURES: Array<Feature> = [
	{
		icon: CalendarRange,
		tag: "Event setup",
		title: "Configure once, sell everywhere",
		body: "Define ticket types, venues and activities in one workspace. Publish the page and share a link.",
	},
	{
		icon: IdCard,
		tag: "Onsite & badges",
		title: "Walk-in registration that doesn't queue",
		body: "Power-user mode for the front desk, designed badges that print straight from the dashboard.",
	},
	{
		icon: ScanLine,
		tag: "Door scanning",
		title: "Validation in under a second",
		body: "Web-based scanner runs on any phone or tablet. Live counts at every gate, instantly.",
	},
];

// ─── Visual Previews ──────────────────────────────────────────

function TicketingVisual() {
	return (
		<div className="p-4 space-y-2">
			{[
				{ label: "VIP Pass", price: "ETB 2,500", selected: true },
				{ label: "General Admission", price: "ETB 800", selected: false },
				{ label: "Student", price: "ETB 400", selected: false },
			].map((t) => (
				<div
					key={t.label}
					className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[0.65rem]"
					style={{
						border: t.selected
							? "1.5px solid var(--lagoon)"
							: "1px solid var(--line)",
						background: t.selected
							? "color-mix(in oklab, var(--lagoon) 8%, var(--surface-strong))"
							: "transparent",
					}}
				>
					<span
						className="size-3 rounded-full shrink-0 flex items-center justify-center"
						style={{
							background: t.selected ? "var(--lagoon)" : "transparent",
							border: t.selected ? "none" : "1.5px solid var(--line)",
						}}
					>
						{t.selected && (
							<span
								className="size-1.5 rounded-full"
								style={{ background: "white" }}
							/>
						)}
					</span>
					<span
						className="font-medium flex-1"
						style={{
							color: t.selected ? "var(--sea-ink)" : "var(--sea-ink-soft)",
						}}
					>
						{t.label}
					</span>
					<span
						className="font-semibold"
						style={{
							color: t.selected ? "var(--lagoon-deep)" : "var(--sea-ink-soft)",
						}}
					>
						{t.price}
					</span>
				</div>
			))}
		</div>
	);
}

function BadgeVisual() {
	return (
		<div className="p-4 flex justify-center items-center">
			<div
				className="rounded-xl overflow-hidden"
				style={{
					width: 160,
					border: "1px solid var(--line)",
					boxShadow:
						"0 4px 16px -4px color-mix(in oklab, var(--sea-ink) 16%, transparent)",
				}}
			>
				<div
					className="px-3 py-2 flex items-center justify-between"
					style={{ background: "var(--sea-ink)" }}
				>
					<span
						className="text-[0.55rem] font-black tracking-widest"
						style={{ color: "var(--lagoon)" }}
					>
						TUTTO
					</span>
					<span className="text-[0.5rem] font-semibold tracking-wider uppercase text-white/60">
						Keynote
					</span>
				</div>
				<div
					className="px-3 py-2.5 flex items-end justify-between"
					style={{ background: "var(--surface-strong)" }}
				>
					<div>
						<div className="text-[0.7rem] font-bold text-ink leading-tight">
							YOHANNES
						</div>
						<div className="text-[0.7rem] font-bold text-ink leading-tight">
							TESFAYE
						</div>
						<div
							className="mt-1 text-[0.52rem] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
							style={{
								background:
									"color-mix(in oklab, var(--lagoon) 14%, transparent)",
								color: "var(--lagoon-deep)",
								display: "inline-block",
							}}
						>
							VIP
						</div>
					</div>
					<div
						className="size-9 rounded"
						style={{
							backgroundImage:
								"repeating-linear-gradient(0deg, color-mix(in oklab, var(--sea-ink) 30%, transparent) 0, color-mix(in oklab, var(--sea-ink) 30%, transparent) 1px, transparent 1px, transparent 4px), repeating-linear-gradient(90deg, color-mix(in oklab, var(--sea-ink) 30%, transparent) 0, color-mix(in oklab, var(--sea-ink) 30%, transparent) 1px, transparent 1px, transparent 4px)",
							backgroundSize: "4px 4px",
							border: "1px solid var(--line)",
						}}
					/>
				</div>
			</div>
		</div>
	);
}

function ScanVisual() {
	return (
		<div className="p-4 flex flex-col items-center gap-3">
			<div
				className="flex items-center gap-2.5 px-3 py-2 rounded-xl"
				style={{
					background:
						"color-mix(in oklab, var(--lagoon) 12%, transparent)",
					border:
						"1px solid color-mix(in oklab, var(--lagoon) 28%, transparent)",
				}}
			>
				<span
					className="size-5 rounded-full flex items-center justify-center shrink-0"
					style={{ background: "var(--lagoon)" }}
				>
					<Check className="size-3 text-white" strokeWidth={3} />
				</span>
				<div>
					<div
						className="text-[0.62rem] font-bold"
						style={{ color: "var(--lagoon-deep)" }}
					>
						Valid — Yohannes T.
					</div>
					<div className="text-[0.55rem] text-ink-soft">#ETH-2847 · VIP</div>
				</div>
			</div>
			<div className="flex gap-6 text-center">
				{[
					{ n: "847", label: "Admitted" },
					{ n: "3", label: "Gates active" },
					{ n: "0.8s", label: "Avg scan" },
				].map((s) => (
					<div key={s.label}>
						<div
							className="text-[0.85rem] font-black"
							style={{ color: "var(--sea-ink)" }}
						>
							{s.n}
						</div>
						<div className="text-[0.55rem] text-ink-soft">{s.label}</div>
					</div>
				))}
			</div>
		</div>
	);
}

const VISUALS = [TicketingVisual, BadgeVisual, ScanVisual];

// ─── Card ─────────────────────────────────────────────────────

function FeatureCard({
	feature,
	Visual,
}: {
	feature: Feature;
	Visual: React.FC;
}) {
	const Icon = feature.icon;
	return (
		<article className="surface-card h-full flex flex-col overflow-hidden">
			<div
				style={{
					borderBottom: "1px solid var(--line)",
					background:
						"color-mix(in oklab, var(--sea-ink) 3%, var(--surface-strong))",
					minHeight: 140,
				}}
			>
				<Visual />
			</div>

			<div className="p-5 flex flex-col flex-1">
				<div className="flex items-center justify-between mb-3">
					<div
						className="size-8 rounded-lg inline-flex items-center justify-center"
						style={{
							background:
								"color-mix(in oklab, var(--lagoon) 14%, var(--surface-strong))",
							color: "var(--lagoon-deep)",
						}}
						aria-hidden
					>
						<Icon className="size-4" />
					</div>
					<span className="tag-chip">{feature.tag}</span>
				</div>
				<h3 className="display-title text-[1.1rem] leading-[1.22] font-semibold text-ink">
					{feature.title}
				</h3>
				<p className="mt-1.5 text-ink-soft text-[0.88rem] leading-relaxed">
					{feature.body}
				</p>
			</div>
		</article>
	);
}

// ─── Section ──────────────────────────────────────────────────

export function Features() {
	return (
		<section
			id="features"
			className="section"
			aria-labelledby="features-heading"
		>
			<div className="page-wrap">
				<div className="max-w-2xl mb-12">
					<Reveal>
						<div className="eyebrow mb-4">The platform</div>
					</Reveal>
					<Reveal delay={0.05}>
						<h2
							id="features-heading"
							className="display-title text-[2.2rem] sm:text-[2.7rem] leading-[1.04] font-medium text-ink"
						>
							One platform for the entire event lifecycle.
						</h2>
					</Reveal>
				</div>

				<Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
					{FEATURES.map((f, i) => {
						const Visual = VISUALS[i];
						return (
							<StaggerItem key={f.title}>
								<FeatureCard feature={f} Visual={Visual} />
							</StaggerItem>
						);
					})}
				</Stagger>
			</div>
		</section>
	);
}
