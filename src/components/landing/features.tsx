import type { LucideIcon } from "lucide-react";
import {
	Banknote,
	Building2,
	CalendarRange,
	IdCard,
	ScanLine,
	Users2,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./reveal";

type Feature = {
	icon: LucideIcon;
	tag: string;
	title: string;
	body: string;
	bullets: Array<string>;
};

const FEATURES: Array<Feature> = [
	{
		icon: CalendarRange,
		tag: "Event setup",
		title: "Configure once, sell everywhere",
		body: "Define ticket types, attendee questions, venues and activities in one workspace. Publish the public page and share a link.",
		bullets: [
			"Multi-tier ticketing",
			"Custom attendee questions",
			"Branded ticket preview",
		],
	},
	{
		icon: Banknote,
		tag: "Checkout & payments",
		title: "Sell in ETB, settle without chasing",
		body: "Pesapal, bank transfer and offline cash flows reconcile against the same order. Receipts and invoices are generated for you.",
		bullets: [
			"Pesapal integrated",
			"Bank transfer flow",
			"Receipts & invoices",
		],
	},
	{
		icon: IdCard,
		tag: "Onsite & badges",
		title: "Walk-in registration that doesn't queue",
		body: "Power-user mode for the front desk, designed badges that print straight from the dashboard, and a smooth handoff to scanning.",
		bullets: [
			"Power-user check-in",
			"Badge designer",
			"Magic-link self-service",
		],
	},
	{
		icon: ScanLine,
		tag: "Door scanning",
		title: "Validation in under a second",
		body: "Web-based scanner runs on any phone or tablet. Live counts at every gate. Reporting your operations team can actually use.",
		bullets: ["Multi-gate scanning", "Live throughput", "Scan reports"],
	},
	{
		icon: Building2,
		tag: "Exhibitors",
		title: "Exhibitor programs that scale",
		body: "Onboard companies, import their attendees, and manage exhibitor orders alongside your main event — not in a separate file.",
		bullets: ["Company management", "Bulk attendee import", "Exhibitor orders"],
	},
	{
		icon: Users2,
		tag: "Roles & access",
		title: "The right view for every teammate",
		body: "Permission-aware navigation means scanners only see scanning, finance sees orders, and organizers see the whole picture.",
		bullets: ["Granular permissions", "Multi-client tenancy", "Audit-friendly"],
	},
];

export function Features() {
	return (
		<section
			id="features"
			className="section"
			aria-labelledby="features-heading"
		>
			<div className="page-wrap">
				<div className="max-w-2xl">
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
					<Reveal delay={0.12}>
						<p className="prose-balance mt-4 text-ink-soft text-lg">
							From the day you publish the event page to the post-event report,
							Jet Events keeps every team on the same data.
						</p>
					</Reveal>
				</div>

				<Stagger className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
					{FEATURES.map((f, i) => (
						<StaggerItem key={f.title}>
							<FeatureCard feature={f} accent={i % 2 === 0} />
						</StaggerItem>
					))}
				</Stagger>
			</div>
		</section>
	);
}

function FeatureCard({
	feature,
	accent,
}: {
	feature: Feature;
	accent: boolean;
}) {
	const Icon = feature.icon;
	return (
		<article className="surface-card h-full p-6 flex flex-col">
			<div className="flex items-center justify-between">
				<div
					className="size-11 rounded-xl inline-flex items-center justify-center"
					style={{
						background: accent
							? "linear-gradient(160deg, color-mix(in oklab, var(--lagoon) 28%, white), color-mix(in oklab, var(--palm) 12%, white))"
							: "linear-gradient(160deg, color-mix(in oklab, var(--palm) 22%, white), color-mix(in oklab, var(--lagoon) 14%, white))",
						color: "var(--palm)",
						boxShadow: "inset 0 1px 0 white",
					}}
					aria-hidden
				>
					<Icon className="size-5" />
				</div>
				<span className="tag-chip">{feature.tag}</span>
			</div>

			<h3 className="display-title mt-5 text-[1.3rem] leading-[1.18] font-medium text-ink">
				{feature.title}
			</h3>
			<p className="prose-balance mt-2 text-ink-soft text-[0.95rem]">
				{feature.body}
			</p>

			<ul className="mt-5 pt-5 border-t border-[color:var(--line)] grid gap-1.5">
				{feature.bullets.map((b) => (
					<li
						key={b}
						className="flex items-center gap-2 text-[0.86rem] text-ink-soft"
					>
						<span
							aria-hidden
							className="size-1.5 rounded-full"
							style={{ background: "var(--palm)" }}
						/>
						{b}
					</li>
				))}
			</ul>
		</article>
	);
}
