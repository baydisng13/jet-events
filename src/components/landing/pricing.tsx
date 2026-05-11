import { Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { Reveal, Stagger, StaggerItem } from "./reveal";

type Tier = {
	id: string;
	name: string;
	tagline: string;
	priceETB: number;
	priceSuffix: string;
	description: string;
	features: Array<string>;
	highlight?: boolean;
	cta: string;
};

const TIERS: Array<Tier> = [
	{
		id: "starter",
		name: "Starter",
		tagline: "For first events & smaller programs",
		priceETB: 70_000,
		priceSuffix: "per event",
		description:
			"The full lifecycle for one event: ticketing, registration and door scanning, with a single organizer workspace.",
		features: [
			"Up to 1,500 attendees",
			"Pesapal + bank transfer checkout",
			"Web scanner on unlimited devices",
			"Branded ticket & badge templates",
			"Email support",
		],
		cta: "Plan a Starter event",
	},
	{
		id: "growth",
		name: "Growth",
		tagline: "Most popular for annual conferences",
		priceETB: 95_000,
		priceSuffix: "per event",
		description:
			"Everything in Starter, plus the tools mid-sized organizers reach for: coupons, custom questions, exhibitor onboarding.",
		features: [
			"Up to 5,000 attendees",
			"Coupons & multi-tier pricing",
			"Exhibitor company management",
			"Custom attendee questions",
			"Bulk attendee import",
			"Priority support",
		],
		highlight: true,
		cta: "Talk to sales",
	},
	{
		id: "enterprise",
		name: "Enterprise",
		tagline: "For trade fairs & multi-event teams",
		priceETB: 120_000,
		priceSuffix: "from / event",
		description:
			"For organizations running flagship events or recurring exhibitions. Multi-tenant clients, white-label, and named support.",
		features: [
			"Unlimited attendees",
			"White-label branding & domain",
			"Multi-client tenancy",
			"Role-based access controls",
			"Onsite go-live support",
			"Named customer success contact",
		],
		cta: "Request enterprise pricing",
	},
];

const fmt = new Intl.NumberFormat("en-ET");

export function Pricing() {
	const [annual, setAnnual] = useState(false);

	return (
		<section id="pricing" className="section" aria-labelledby="pricing-heading">
			<div className="page-wrap">
				<div className="grid lg:grid-cols-12 gap-8 items-end">
					<div className="lg:col-span-7">
						<Reveal>
							<div className="eyebrow mb-4">Pricing in ETB</div>
						</Reveal>
						<Reveal delay={0.05}>
							<h2
								id="pricing-heading"
								className="display-title text-[2.2rem] sm:text-[2.7rem] leading-[1.04] font-medium text-ink"
							>
								Priced for the size of your event &mdash; not your team's
								headcount.
							</h2>
						</Reveal>
						<Reveal delay={0.1}>
							<p className="prose-balance mt-4 text-ink-soft text-lg max-w-2xl">
								Each tier is a flat per-event fee. No per-attendee surprises and
								no platform cuts on tickets you sell off-platform.
							</p>
						</Reveal>
					</div>

					<Reveal delay={0.15} className="lg:col-span-5 lg:justify-self-end">
						<div
							role="tablist"
							aria-label="Billing cadence"
							className="hairline inline-flex rounded-xl p-1 bg-white"
						>
							<PricingTabButton
								active={!annual}
								onClick={() => setAnnual(false)}
								label="Per event"
							/>
							<PricingTabButton
								active={annual}
								onClick={() => setAnnual(true)}
								label="Annual program"
								badge="Save up to 22%"
							/>
						</div>
					</Reveal>
				</div>

				<Stagger className="mt-10 grid lg:grid-cols-3 gap-4">
					{TIERS.map((tier) => (
						<StaggerItem key={tier.id}>
							<TierCard tier={tier} annual={annual} />
						</StaggerItem>
					))}
				</Stagger>

				<Reveal delay={0.1}>
					<div className="mt-8 hairline surface-card p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
						<div>
							<div className="eyebrow mb-2">Need a custom shape?</div>
							<h3 className="display-title text-xl text-ink">
								Multi-event programs, white-label deployments and government
								tenders.
							</h3>
							<p className="prose-balance mt-1 text-ink-soft text-[0.95rem]">
								If your event doesn't fit a tier, we'll quote against scope
								&mdash; not headcount.
							</p>
						</div>
						<a
							href="#cta"
							className="btn-secondary-brand inline-flex items-center justify-center gap-2 rounded-xl h-11 px-5 text-sm font-semibold no-underline shrink-0"
						>
							Tell us about your event
						</a>
					</div>
				</Reveal>
			</div>
		</section>
	);
}

function PricingTabButton({
	active,
	onClick,
	label,
	badge,
}: {
	active: boolean;
	onClick: () => void;
	label: string;
	badge?: string;
}) {
	return (
		<button
			type="button"
			role="tab"
			aria-selected={active}
			onClick={onClick}
			className="relative inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
			style={{
				background: active
					? "linear-gradient(180deg, var(--lagoon-deep), var(--palm))"
					: "transparent",
				color: active ? "white" : "var(--sea-ink-soft)",
				boxShadow: active
					? "0 6px 14px -8px color-mix(in oklab, var(--lagoon-deep) 80%, transparent)"
					: undefined,
			}}
		>
			{label}
			{badge && (
				<span
					className="text-[0.65rem] font-bold uppercase tracking-wider rounded-full px-1.5 py-0.5"
					style={{
						background: active
							? "rgba(255,255,255,0.18)"
							: "color-mix(in oklab, var(--palm) 14%, white)",
						color: active ? "white" : "var(--palm)",
					}}
				>
					{badge}
				</span>
			)}
		</button>
	);
}

function TierCard({ tier, annual }: { tier: Tier; annual: boolean }) {
	const yearly = Math.round((tier.priceETB * 4 * 0.78) / 1000) * 1000;
	const display = annual ? yearly : tier.priceETB;
	const suffix = annual ? "per year, all events" : tier.priceSuffix;

	return (
		<article
			className="relative h-full rounded-[22px] p-6 flex flex-col"
			style={{
				border: tier.highlight
					? "1px solid color-mix(in oklab, var(--lagoon-deep) 42%, transparent)"
					: "1px solid var(--line)",
				background: tier.highlight
					? "linear-gradient(180deg, white, color-mix(in oklab, var(--foam) 78%, white))"
					: "linear-gradient(180deg, white, color-mix(in oklab, var(--foam) 60%, white))",
				boxShadow: tier.highlight
					? "0 26px 60px -28px rgba(20,90,80,0.22), 0 6px 18px -8px rgba(20,90,80,0.12), inset 0 1px 0 white"
					: "0 14px 30px -16px rgba(20,70,60,0.16), inset 0 1px 0 white",
			}}
		>
			{tier.highlight && (
				<div
					className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider"
					style={{
						background:
							"linear-gradient(180deg, var(--lagoon-deep), var(--palm))",
						color: "white",
						boxShadow:
							"0 6px 14px -8px color-mix(in oklab, var(--lagoon-deep) 70%, transparent)",
					}}
				>
					<Sparkles className="size-3" />
					Most chosen
				</div>
			)}

			<div>
				<h3 className="display-title text-2xl text-ink">{tier.name}</h3>
				<p className="text-[0.86rem] text-palm font-semibold mt-0.5">
					{tier.tagline}
				</p>
			</div>

			<div className="mt-5 flex items-end gap-2">
				<div className="text-[0.78rem] text-ink-soft font-semibold mb-1.5">
					ETB
				</div>
				<div className="display-title text-[2.6rem] leading-none font-medium text-ink tabular-nums">
					{fmt.format(display)}
				</div>
			</div>
			<div className="text-[0.84rem] text-ink-soft mt-1">{suffix}</div>

			<p className="prose-balance mt-4 text-[0.95rem] text-ink-soft">
				{tier.description}
			</p>

			<ul className="mt-5 pt-5 border-t border-[color:var(--line)] grid gap-2.5">
				{tier.features.map((f) => (
					<li
						key={f}
						className="flex items-start gap-2.5 text-[0.92rem] text-ink"
					>
						<span
							aria-hidden
							className="mt-0.5 size-4 inline-flex items-center justify-center rounded-full shrink-0"
							style={{
								background: tier.highlight
									? "linear-gradient(160deg, var(--lagoon-deep), var(--palm))"
									: "color-mix(in oklab, var(--lagoon) 18%, white)",
								color: tier.highlight ? "white" : "var(--lagoon-deep)",
							}}
						>
							<Check className="size-2.5" strokeWidth={3} />
						</span>
						<span>{f}</span>
					</li>
				))}
			</ul>

			<a
				href="#cta"
				className={
					tier.highlight
						? "btn-primary-brand mt-6 inline-flex items-center justify-center rounded-xl h-11 text-sm font-semibold no-underline"
						: "btn-secondary-brand mt-6 inline-flex items-center justify-center rounded-xl h-11 text-sm font-semibold no-underline"
				}
			>
				{tier.cta}
			</a>
		</article>
	);
}
