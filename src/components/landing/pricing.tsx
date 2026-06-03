import { Check, Minus, Sparkles } from "lucide-react";
import { useState } from "react";
import { Reveal } from "./reveal";

// ─── Data ─────────────────────────────────────────────────────

type TierDef = {
	id: string;
	name: string;
	tagline: string;
	priceETB: number;
	annualETB: number;
	highlight?: boolean;
	cta: string;
};

const TIERS: TierDef[] = [
	{
		id: "starter",
		name: "Starter",
		tagline: "Your first event, done right",
		priceETB: 100_000,
		annualETB: 400_000,
		cta: "Get started",
	},
	{
		id: "growth",
		name: "Growth",
		tagline: "Built for serious organizers",
		priceETB: 130_000,
		annualETB: 550_000,
		highlight: true,
		cta: "Talk to sales",
	},
	{
		id: "enterprise",
		name: "Enterprise",
		tagline: "Flagship & multi-event teams",
		priceETB: 200_000,
		annualETB: 680_000,
		cta: "Request a quote",
	},
];

type CellValue = boolean | string;

type FeatureRow = {
	label: string;
	starter: CellValue;
	growth: CellValue;
	enterprise: CellValue;
};

type FeatureGroup = {
	name: string;
	rows: FeatureRow[];
};

const FEATURE_GROUPS: FeatureGroup[] = [
	{
		name: "Capacity",
		rows: [
			{ label: "Attendees", starter: "300", growth: "1,000", enterprise: "Unlimited" },
			{ label: "Door scanners", starter: "3", growth: "10", enterprise: "Unlimited" },
			{ label: "Scanning areas / gates", starter: "1", growth: "5", enterprise: "Unlimited" },
			{ label: "Organizer seats", starter: "2", growth: "10", enterprise: "Unlimited" },
		],
	},
	{
		name: "Ticketing",
		rows: [
			{ label: "Ticket types", starter: "2", growth: "Unlimited", enterprise: "Unlimited" },
			{ label: "Coupon & promo codes", starter: false, growth: true, enterprise: true },
			{ label: "Custom attendee questions", starter: false, growth: true, enterprise: true },
			{ label: "Bulk attendee import", starter: false, growth: true, enterprise: true },
			{ label: "Reserved / table seating", starter: false, growth: false, enterprise: true },
		],
	},
	{
		name: "Payments",
		rows: [
			{ label: "Telebirr & CBE Birr", starter: true, growth: true, enterprise: true },
			{ label: "Awash Pay & Amole", starter: true, growth: true, enterprise: true },
			{ label: "International cards (Pesapal)", starter: false, growth: true, enterprise: true },
			{ label: "Stripe & PayPal", starter: false, growth: true, enterprise: true },
			{ label: "Custom payment gateway", starter: false, growth: false, enterprise: true },
			{ label: "Custom invoice generation", starter: false, growth: true, enterprise: true },
		],
	},
	{
		name: "Onsite & Badges",
		rows: [
			{ label: "Badge templates", starter: "3", growth: "10", enterprise: "Custom" },
			{ label: "Exhibitor company portal", starter: false, growth: true, enterprise: true },
			{ label: "Walk-in on-day registration", starter: true, growth: true, enterprise: true },
			{ label: "Certificate & document QR", starter: false, growth: false, enterprise: true },
		],
	},
	{
		name: "Support",
		rows: [
			{ label: "Email support", starter: true, growth: true, enterprise: true },
			{ label: "Telegram & WhatsApp", starter: false, growth: true, enterprise: true },
			{ label: "Phone & SMS support", starter: false, growth: false, enterprise: true },
			{ label: "Onsite go-live support", starter: false, growth: false, enterprise: true },
			{ label: "Named customer success manager", starter: false, growth: false, enterprise: true },
		],
	},
	{
		name: "Developer & Enterprise",
		rows: [
			{ label: "API access", starter: false, growth: false, enterprise: true },
			{ label: "Webhook integrations", starter: false, growth: false, enterprise: true },
			{ label: "White-label branding", starter: false, growth: false, enterprise: true },
			{ label: "Custom event domain", starter: false, growth: false, enterprise: true },
			{ label: "Role-based access control", starter: false, growth: false, enterprise: true },
			{ label: "Multi-event portfolio dashboard", starter: false, growth: false, enterprise: true },
		],
	},
];

const fmt = new Intl.NumberFormat("en-ET");
const COL_KEYS: Array<keyof Omit<FeatureRow, "label">> = ["starter", "growth", "enterprise"];
const COLS = "1.4fr repeat(3, 1fr)";

// ─── Section ──────────────────────────────────────────────────

export function Pricing() {
	const [annual, setAnnual] = useState(false);
	const [hoveredCol, setHoveredCol] = useState<number | null>(null);

	const colBg = (i: number) =>
		hoveredCol === i
			? "color-mix(in oklab, var(--lagoon) 6%, white)"
			: i === 1
				? "color-mix(in oklab, var(--sea-ink) 2%, white)"
				: "white";

	const colTx = "background 0.14s ease";

	return (
		<section id="pricing" className="section" aria-labelledby="pricing-heading">
			<div className="page-wrap">
				{/* Heading */}
				<div className="max-w-xl mb-10">
					<Reveal>
						<div className="eyebrow mb-4">Pricing in ETB</div>
					</Reveal>
					<Reveal delay={0.05}>
						<h2
							id="pricing-heading"
							className="display-title text-[2.2rem] sm:text-[2.7rem] leading-[1.04] font-medium text-ink"
						>
							One platform. Three sizes.
						</h2>
					</Reveal>
					<Reveal delay={0.08}>
						<p className="mt-3 text-ink-soft text-[1rem]">
							Flat per-event fee. No per-attendee surprises, no platform cuts.
						</p>
					</Reveal>
				</div>

				{/* Table — sticky header is a sibling of the body so overflow:hidden on body
				    doesn't block sticky. Both share the same grid column template. */}
				<Reveal delay={0.05}>
					<div onMouseLeave={() => setHoveredCol(null)}>

						{/* ── Sticky header ──────────────────────────── */}
						<div
							style={{
								display: "grid",
								gridTemplateColumns: COLS,
								position: "sticky",
								top: 56,
								zIndex: 20,
								background: "white",
								border: "1px solid var(--line)",
								borderRadius: "16px 16px 0 0",
								boxShadow: "0 4px 16px -6px rgba(12,34,40,0.1)",
							}}
						>
							{/* Left: label + toggle */}
							<div
								className="px-5 py-5 flex flex-col justify-between gap-4"
								onMouseEnter={() => setHoveredCol(null)}
							>
								<p
									className="text-[0.7rem] font-bold uppercase tracking-widest"
									style={{ color: "var(--sea-ink-soft)" }}
								>
									Compare plans
								</p>
								<div
									role="tablist"
									aria-label="Billing cadence"
									className="inline-flex rounded-xl p-1 self-start"
									style={{
										border: "1px solid var(--line)",
										background: "color-mix(in oklab, var(--sea-ink) 4%, white)",
									}}
								>
									<PricingTab
										active={!annual}
										onClick={() => setAnnual(false)}
										label="Per event"
									/>
									<PricingTab
										active={annual}
										onClick={() => setAnnual(true)}
										label="Annual"
										badge="−20%"
									/>
								</div>
							</div>

							{/* Tier header cells */}
							{TIERS.map((tier, i) => (
								<div
									key={tier.id}
									className="relative px-5 py-5 flex flex-col gap-1"
									style={{
										borderLeft: "1px solid var(--line)",
										background: tier.highlight ? "var(--sea-ink)" : colBg(i),
										transition: tier.highlight ? undefined : colTx,
										borderRadius: i === 2 ? "0 16px 0 0" : undefined,
									}}
									onMouseEnter={() => !tier.highlight && setHoveredCol(i)}
								>
									{tier.highlight && (
										<div
											className="absolute -top-3 left-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider"
											style={{ background: "var(--lagoon)", color: "white" }}
										>
											<Sparkles className="size-2.5" />
											Popular
										</div>
									)}
									<p
										className="text-[1rem] font-bold"
										style={{
											color: tier.highlight ? "white" : "var(--sea-ink)",
										}}
									>
										{tier.name}
									</p>
									<div className="mt-2 flex items-end gap-1">
										<span
											className="text-[0.72rem] font-semibold mb-1"
											style={{
												color: tier.highlight
													? "rgba(255,255,255,0.45)"
													: "var(--sea-ink-soft)",
											}}
										>
											ETB
										</span>
										<span
											className="text-[1.9rem] font-medium leading-none tabular-nums"
											style={{
												color: tier.highlight ? "white" : "var(--sea-ink)",
											}}
										>
											{fmt.format(
												annual ? tier.annualETB : tier.priceETB,
											)}
										</span>
									</div>
									<p
										className="text-[0.75rem]"
										style={{
											color: tier.highlight
												? "rgba(255,255,255,0.42)"
												: "var(--sea-ink-soft)",
										}}
									>
										{annual ? "per year · all events" : "per event"}
									</p>
									<a
										href="#cta"
										className="mt-3 inline-flex items-center justify-center rounded-xl h-9 text-[0.78rem] font-semibold no-underline transition-colors"
										style={
											tier.highlight
												? { background: "var(--lagoon)", color: "white" }
												: {
														border: "1px solid var(--line)",
														background: "white",
														color: "var(--sea-ink)",
													}
										}
									>
										{tier.cta}
									</a>
								</div>
							))}
						</div>

						{/* ── Feature rows body ──────────────────────── */}
						<div
							style={{
								border: "1px solid var(--line)",
								borderTop: "none",
								borderRadius: "0 0 16px 16px",
								overflow: "hidden",
							}}
						>
							{FEATURE_GROUPS.map((group, gi) => (
								<div key={group.name}>
									{/* Group label row */}
									<div
										style={{
											display: "grid",
											gridTemplateColumns: COLS,
											borderTop:
												gi === 0 ? "none" : "1px solid var(--line)",
											background:
												"color-mix(in oklab, var(--sea-ink) 4%, white)",
										}}
									>
										<div className="col-span-4 px-5 py-2.5">
											<span
												className="text-[0.66rem] font-bold uppercase tracking-widest"
												style={{ color: "var(--sea-ink-soft)" }}
											>
												{group.name}
											</span>
										</div>
									</div>

									{/* Feature rows */}
									{group.rows.map((row) => (
										<div
											key={row.label}
											style={{
												display: "grid",
												gridTemplateColumns: COLS,
												borderTop: "1px solid var(--line)",
											}}
										>
											{/* Label */}
											<div
												className="px-5 py-3.5 flex items-center"
												onMouseEnter={() => setHoveredCol(null)}
											>
												<span
													className="text-[0.88rem]"
													style={{ color: "var(--sea-ink)" }}
												>
													{row.label}
												</span>
											</div>

											{/* Values */}
											{COL_KEYS.map((key, ci) => (
												<div
													key={key}
													className="px-4 py-3.5 flex items-center justify-center"
													style={{
														background: colBg(ci),
														transition: colTx,
														borderLeft: "1px solid var(--line)",
													}}
													onMouseEnter={() => setHoveredCol(ci)}
												>
													<FeatureCell value={row[key]} />
												</div>
											))}
										</div>
									))}
								</div>
							))}
						</div>
					</div>
				</Reveal>

				{/* Bottom CTA */}
				<Reveal delay={0.05}>
					<div
						className="mt-6 p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
						style={{
							border: "1px solid var(--line)",
							background:
								"color-mix(in oklab, var(--sea-ink) 3%, white)",
						}}
					>
						<div>
							<div className="eyebrow mb-1.5">Need a custom shape?</div>
							<p className="text-ink font-semibold text-[0.95rem]">
								Multi-event programs, white-label deployments and government
								tenders — quoted against scope.
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

// ─── Toggle ───────────────────────────────────────────────────

function PricingTab({
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
			className="relative inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[0.78rem] font-semibold transition-colors"
			style={{
				background: active ? "var(--sea-ink)" : "transparent",
				color: active ? "white" : "var(--sea-ink-soft)",
			}}
		>
			{label}
			{badge && (
				<span
					className="text-[0.58rem] font-bold rounded-full px-1.5 py-0.5"
					style={{
						background: active
							? "rgba(255,255,255,0.16)"
							: "color-mix(in oklab, var(--lagoon) 14%, white)",
						color: active ? "white" : "var(--lagoon-deep)",
					}}
				>
					{badge}
				</span>
			)}
		</button>
	);
}

// ─── Cell ─────────────────────────────────────────────────────

function FeatureCell({ value }: { value: CellValue }) {
	if (value === true) {
		return (
			<span
				className="size-5 inline-flex items-center justify-center rounded-full"
				style={{
					background: "color-mix(in oklab, var(--lagoon) 14%, white)",
				}}
			>
				<Check
					className="size-3"
					strokeWidth={3}
					style={{ color: "var(--lagoon-deep)" }}
				/>
			</span>
		);
	}
	if (value === false) {
		return (
			<Minus
				className="size-4"
				strokeWidth={1.5}
				style={{ color: "var(--line)" }}
			/>
		);
	}
	return (
		<span
			className="text-[0.88rem] font-semibold tabular-nums"
			style={{ color: "var(--sea-ink)" }}
		>
			{value}
		</span>
	);
}
