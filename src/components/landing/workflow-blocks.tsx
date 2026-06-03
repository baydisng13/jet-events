import {
	Check,
	CreditCard,
	FileDown,
	Mail,
	ScanLine,
	UserRound,
	Users,
	Wallet,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal, Stagger, StaggerItem } from "./reveal";

const steps = ["Plan", "Sell", "Check-in", "Scan", "Report"] as const;

export function WorkflowEndToEnd() {
	const reduce = useReducedMotion();
	return (
		<section
			id="workflow-end-to-end"
			className="surface-card p-4 sm:p-5"
			aria-labelledby="workflow-e2e-heading"
		>
			<h3
				id="workflow-e2e-heading"
				className="text-[0.68rem] font-semibold uppercase tracking-wider text-ink-soft"
			>
				End-to-end
			</h3>
			<p className="mt-1.5 text-sm font-medium text-ink">
				One workspace from first ticket to last scan — no handoffs between
				tools.
			</p>
			<div className="mt-3 flex flex-wrap items-center gap-2">
				{steps.map((label, i) => (
					<motion.div
						key={label}
						className="flex items-center gap-2"
						initial={reduce ? false : { opacity: 0, y: 6 }}
						whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.6 }}
						transition={{
							delay: 0.05 * i,
							duration: 0.45,
							ease: [0.16, 1, 0.3, 1],
						}}
					>
						<span className="tag-chip !normal-case !tracking-normal text-[0.72rem] text-ink">
							{label}
						</span>
						{i < steps.length - 1 && (
							<span className="text-ink-soft/80 text-xs" aria-hidden>
								→
							</span>
						)}
					</motion.div>
				))}
			</div>
		</section>
	);
}

export function WorkflowScanning() {
	const reduce = useReducedMotion();
	return (
		<section
			className="surface-card p-4 sm:p-5"
			aria-labelledby="workflow-scan-heading"
		>
			<div className="flex items-center gap-2">
				<div
					className="flex size-8 items-center justify-center rounded-lg"
					style={{
						background: "color-mix(in oklab, var(--lagoon) 16%, white)",
						color: "var(--lagoon-deep)",
					}}
					aria-hidden
				>
					<ScanLine className="size-4" />
				</div>
				<h3
					id="workflow-scan-heading"
					className="text-[0.68rem] font-semibold uppercase tracking-wider text-ink-soft"
				>
					Scanning / door staff
				</h3>
			</div>
			<p className="mt-2 text-sm text-ink">
				Scanner sign-in, large targets, live throughput — built for noisy
				foyers.
			</p>

			<div className="relative mt-4 overflow-hidden rounded-xl border border-[color:var(--line)] bg-white/70 p-4">
				<div className="flex items-center justify-between text-[0.72rem] text-ink-soft">
					<span>Gate 2 · Online</span>
					<span className="tabular-nums">0:00.9</span>
				</div>

				<div className="relative mt-3 flex min-h-[132px] items-center justify-center">
					<motion.div
						className="absolute inset-x-8 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-[color:var(--lagoon-deep)]/25"
						aria-hidden
					/>
					<motion.div
						className="relative z-[1] w-[5.5rem] overflow-hidden rounded-lg border border-[color:var(--line)] shadow-md"
						style={{
							background:
								"linear-gradient(180deg, white, color-mix(in oklab, var(--foam) 75%, white))",
						}}
						initial={reduce ? false : { x: -56, opacity: 0 }}
						whileInView={reduce ? undefined : { x: 0, opacity: 1 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
					>
						<div className="border-b border-[color:var(--line)] px-2 py-1.5">
							<div className="text-[0.58rem] font-semibold uppercase tracking-wider text-ink-soft">
								Badge
							</div>
							<div className="text-[0.78rem] font-semibold text-ink">
								Meron K.
							</div>
							<div className="text-[0.62rem] text-ink-soft">Press · Hall A</div>
						</div>
						<div
							className="relative flex h-14 items-center justify-center"
							style={{
								background:
									"repeating-linear-gradient(90deg, var(--sea-ink) 0 3px, transparent 3px 6px), color-mix(in oklab, var(--lagoon) 8%, white)",
							}}
						>
							{!reduce && (
								<motion.div
									className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-[color:var(--lagoon-deep)] shadow-[0_0_12px_var(--lagoon)]"
									initial={{ left: "4%" }}
									whileInView={{ left: "88%" }}
									viewport={{ once: true, amount: 0.5 }}
									transition={{ duration: 0.85, delay: 0.35, ease: "linear" }}
									aria-hidden
								/>
							)}
						</div>
					</motion.div>

					<motion.div
						className="pointer-events-none absolute right-5 top-3 z-[2] flex items-center gap-1 rounded-full border border-[color:var(--line)] bg-white px-2 py-1 text-[0.68rem] font-semibold text-palm shadow-sm"
						initial={reduce ? false : { scale: 0.85, opacity: 0 }}
						whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={
							reduce
								? undefined
								: { delay: 1.0, duration: 0.35, ease: [0.16, 1, 0.3, 1] }
						}
						aria-live="polite"
					>
						<Check className="size-3.5" aria-hidden />
						Admitted
					</motion.div>
				</div>
			</div>
		</section>
	);
}

const attendeeFeatures = [
	{
		label: "Profile & custom questions",
		icon: UserRound,
		tone: "lagoon" as const,
	},
	{
		label: "Badge PDF on demand",
		icon: FileDown,
		tone: "palm" as const,
	},
	{
		label: "Organizer-branded emails",
		icon: Mail,
		tone: "lagoon" as const,
	},
];

export function WorkflowAttendee() {
	return (
		<section
			className="surface-card p-4 sm:p-5"
			aria-labelledby="workflow-attendee-heading"
		>
			<Reveal delay={0} y={12} amount={0.3}>
				<div className="flex items-center gap-2">
					<div
						className="flex size-8 shrink-0 items-center justify-center rounded-lg"
						style={{
							background: "color-mix(in oklab, var(--lagoon) 14%, white)",
							color: "var(--lagoon-deep)",
						}}
						aria-hidden
					>
						<Users className="size-4" />
					</div>
					<h3
						id="workflow-attendee-heading"
						className="text-[0.68rem] font-semibold uppercase tracking-wider text-ink-soft"
					>
						Attendee experience
					</h3>
				</div>
				<p className="mt-2.5 text-sm font-medium leading-snug text-ink">
					Magic-link updates, re-download tickets, event-scoped portal — fewer
					“I can’t log in” messages.
				</p>
			</Reveal>

			<Stagger className="mt-4 grid gap-2.5 sm:grid-cols-3 sm:gap-3">
				{attendeeFeatures.map(({ label, icon: Icon, tone }) => (
					<StaggerItem key={label}>
						<div
							className="flex h-full flex-col gap-2.5 rounded-xl border border-[color:var(--line)] p-3 shadow-[inset_0_1px_0_white] sm:p-3.5"
							style={{
								background:
									"linear-gradient(180deg, color-mix(in oklab, white 92%, var(--foam)), color-mix(in oklab, white 98%, var(--foam)))",
							}}
						>
							<div
								className="flex size-9 items-center justify-center rounded-lg"
								style={{
									background:
										tone === "lagoon"
											? "color-mix(in oklab, var(--lagoon) 16%, white)"
											: "color-mix(in oklab, var(--palm) 12%, white)",
									color:
										tone === "lagoon" ? "var(--lagoon-deep)" : "var(--palm)",
								}}
								aria-hidden
							>
								<Icon className="size-4" strokeWidth={1.75} />
							</div>
							<p className="text-[0.8rem] font-semibold leading-snug tracking-tight text-ink">
								{label}
							</p>
						</div>
					</StaggerItem>
				))}
			</Stagger>

			<Reveal delay={0.1} y={10} amount={0.25}>
				<p className="mt-4 border-t border-[color:var(--line)] pt-3.5 text-[0.72rem] font-medium leading-snug text-ink-soft">
					Self-serve by design — staff stay focused on the floor.
				</p>
			</Reveal>
		</section>
	);
}

function BudgetBar({
	label,
	value,
	cap,
	tone,
}: {
	label: string;
	value: string;
	cap: string;
	tone: "lagoon" | "palm";
}) {
	const pct = tone === "lagoon" ? 72 : 48;
	const fill =
		tone === "lagoon"
			? "linear-gradient(90deg, var(--lagoon-deep), var(--lagoon))"
			: "linear-gradient(90deg, var(--palm), color-mix(in oklab, var(--lagoon) 60%, var(--palm)))";
	return (
		<div className="rounded-lg border border-[color:var(--line)] bg-white/85 px-3 py-2">
			<div className="flex items-baseline justify-between gap-2">
				<span className="text-[0.78rem] font-medium text-ink">{label}</span>
				<span className="text-[0.72rem] tabular-nums text-ink-soft">
					{value}
					<span className="text-ink-soft/70"> / {cap}</span>
				</span>
			</div>
			<div
				className="mt-1.5 h-1.5 overflow-hidden rounded-full"
				style={{
					background: "color-mix(in oklab, var(--sea-ink) 10%, transparent)",
				}}
				aria-hidden
			>
				<div
					className="h-full rounded-full"
					style={{ width: `${pct}%`, background: fill }}
				/>
			</div>
		</div>
	);
}

export function WorkflowBudget() {
	return (
		<section
			className="surface-card p-4 sm:p-5"
			aria-labelledby="workflow-budget-heading"
		>
			<div className="flex items-center gap-2">
				<div
					className="flex size-8 items-center justify-center rounded-lg"
					style={{
						background: "color-mix(in oklab, var(--palm) 12%, white)",
						color: "var(--palm)",
					}}
					aria-hidden
				>
					<Wallet className="size-4" />
				</div>
				<h3
					id="workflow-budget-heading"
					className="text-[0.68rem] font-semibold uppercase tracking-wider text-ink-soft"
				>
					Budgets & visibility
				</h3>
			</div>
			<p className="mt-2 text-sm text-ink">
				Caps and spend stay visible — organizers see where money is before it
				becomes a spreadsheet emergency.
			</p>
			<Reveal delay={0.04}>
				<div className="mt-3 grid gap-2">
					<BudgetBar
						label="Ticketing revenue (ETB)"
						value="1.24M"
						cap="1.5M goal"
						tone="lagoon"
					/>
					<BudgetBar
						label="Onsite & production"
						value="410k"
						cap="850k cap"
						tone="palm"
					/>
					<BudgetBar
						label="Exhibitor deposits"
						value="280k"
						cap="320k hold"
						tone="lagoon"
					/>
				</div>
			</Reveal>
		</section>
	);
}

function SettingsRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="grid min-w-0 gap-1">
			<div className="text-[0.62rem] font-semibold uppercase tracking-wider text-ink-soft">
				{label}
			</div>
			<div className="hairline max-w-full min-w-0 w-full overflow-x-auto break-all rounded-md bg-white px-2.5 py-1.5 font-mono text-[0.72rem] text-ink">
				{value}
			</div>
		</div>
	);
}

export function WorkflowPurchasing() {
	const reduce = useReducedMotion();
	return (
		<section
			className="surface-card min-w-0 overflow-hidden p-4 sm:p-5"
			aria-labelledby="workflow-pay-heading"
		>
			<div className="flex items-center gap-2">
				<div
					className="flex size-8 items-center justify-center rounded-lg"
					style={{
						background: "color-mix(in oklab, var(--lagoon) 16%, white)",
						color: "var(--lagoon-deep)",
					}}
					aria-hidden
				>
					<CreditCard className="size-4" />
				</div>
				<h3
					id="workflow-pay-heading"
					className="text-[0.68rem] font-semibold uppercase tracking-wider text-ink-soft"
				>
					Purchasing / checkout
				</h3>
			</div>
			<p className="mt-2 text-sm text-ink">
				Built for Ethiopia: use the local rails your attendees already trust.
				Bring the provider you contract with — Tutto wires in with the API
				keys you supply, plus a clear configuration surface for webhooks and
				test mode.
			</p>

			<div className="mt-4 grid min-w-0 gap-4 md:grid-cols-2">
				<motion.div
					className="max-w-full min-w-0 overflow-hidden rounded-xl border border-[color:var(--line)] bg-white/80 p-3.5"
					initial={reduce ? false : { opacity: 0, y: 10 }}
					whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.35 }}
					transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
				>
					<div className="text-[0.62rem] font-semibold uppercase tracking-wider text-ink-soft">
						Checkout copy
					</div>
					<ul className="mt-2 grid gap-1.5 text-[0.82rem] text-ink-soft">
						<li className="flex gap-2">
							<span className="text-palm" aria-hidden>
								·
							</span>
							Mobile money, bank, and card flows your provider supports — not a
							fixed “three gateways” list.
						</li>
						<li className="flex gap-2">
							<span className="text-palm" aria-hidden>
								·
							</span>
							ETB-first totals, receipts buyers can reopen, and staff-visible
							order state.
						</li>
					</ul>
				</motion.div>

				<motion.div
					className="max-w-full min-w-0 overflow-hidden rounded-xl border border-[color:color-mix(in_oklab,var(--lagoon-deep)_28%,var(--line))] bg-gradient-to-b from-white to-[color-mix(in_oklab,var(--foam)_88%,white)] p-3.5 shadow-[inset_0_1px_0_white]"
					initial={reduce ? false : { opacity: 0, y: 10 }}
					whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.35 }}
					transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
				>
					<div className="flex min-w-0 items-center justify-between gap-2">
						<div className="min-w-0 text-[0.62rem] font-semibold uppercase tracking-wider text-ink-soft">
							Payment provider
						</div>
						<span className="shrink-0 rounded-md border border-[color:var(--line)] bg-[color:color-mix(in_oklab,var(--lagoon)_12%,white)] px-2 py-0.5 text-[0.62rem] font-semibold text-lagoon">
							Test mode
						</span>
					</div>
					<div className="mt-3 grid min-w-0 gap-2.5">
						<SettingsRow
							label="Provider display name"
							value="Chapa (example)"
						/>
						<SettingsRow label="Public key" value="pk_live_••••••••8f3a" />
						<SettingsRow label="Secret key" value="sk_live_••••••••91cd" />
						<SettingsRow
							label="Webhook URL"
							value="https://api.tutto.example/hooks/pay"
						/>
						<div className="flex min-w-0 flex-wrap gap-2 pt-1">
							<span className="rounded-md border border-[color:var(--line)] bg-white px-2 py-1 text-[0.62rem] text-ink-soft">
								Signing secret configured
							</span>
							<span className="rounded-md border border-[color:var(--line)] bg-white px-2 py-1 text-[0.62rem] text-ink-soft">
								Sandbox callbacks on
							</span>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
