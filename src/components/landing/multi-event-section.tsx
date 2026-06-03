import { Reveal, Stagger, StaggerItem } from "./reveal";

const EVENT_TYPES = [
	{
		label: "Concert & Live Music",
		dot: "bg-violet-400",
		features: ["General / VIP / Backstage tiers", "Floor-plan seating", "Age-gating"],
	},
	{
		label: "Conference & Summit",
		dot: "bg-amber-400",
		features: ["Multi-track sessions", "Speaker badges", "Exhibitor booths"],
	},
	{
		label: "Trade Exhibition",
		dot: "bg-sky-400",
		features: ["Company onboarding", "Booth assignment", "Bulk attendee import"],
	},
	{
		label: "Corporate & Private",
		dot: "bg-emerald-400",
		features: ["Invite-only tickets", "RSVP flow", "White-label branding"],
	},
	{
		label: "Gala & Awards",
		dot: "bg-rose-400",
		features: ["Table seating plans", "VIP check-in lanes", "Branded badges"],
	},
	{
		label: "Workshop & Training",
		dot: "bg-orange-400",
		features: ["Cohort management", "Attendance tracking", "Certificate QR"],
	},
];

function EventTypeCard({
	label,
	dot,
	features,
}: {
	label: string;
	dot: string;
	features: string[];
}) {
	return (
		<div
			className="rounded-xl p-4 h-full"
			style={{
				border: "1px solid var(--line)",
				background:
					"color-mix(in oklab, var(--sea-ink) 2%, var(--surface-strong))",
			}}
		>
			<div className="flex items-center gap-2 mb-3">
				<span className={`size-2.5 rounded-full shrink-0 ${dot}`} />
				<span className="text-[0.88rem] font-semibold text-ink">{label}</span>
			</div>
			<ul className="space-y-1.5">
				{features.map((f) => (
					<li
						key={f}
						className="flex items-center gap-2 text-[0.78rem] text-ink-soft"
					>
						<span
							className="size-1 rounded-full shrink-0"
							style={{ background: "var(--sea-ink-soft)" }}
						/>
						{f}
					</li>
				))}
			</ul>
		</div>
	);
}

export function MultiEventSection() {
	return (
		<section
			className="section"
			id="multi-event"
			aria-labelledby="multi-event-heading"
		>
			<div className="page-wrap">
				<div className="grid lg:grid-cols-12 gap-12 items-start">
					{/* Left */}
					<div className="lg:col-span-5 lg:sticky lg:top-28">
						<Reveal>
							<div className="eyebrow mb-4">Every event type</div>
						</Reveal>
						<Reveal delay={0.05}>
							<h2
								id="multi-event-heading"
								className="display-title text-[2rem] sm:text-[2.4rem] leading-[1.05] font-medium text-ink"
							>
								One portfolio.{" "}
								<span className="text-lagoon">
									Every format you run.
								</span>
							</h2>
						</Reveal>
						<Reveal delay={0.1}>
							<p className="prose-balance mt-5 text-ink-soft text-[1.02rem] max-w-md">
								Concert tonight, conference next month, trade fair in Q3. Tutto
								adapts to the event — not the other way around. All your events
								live under one account, one dashboard, one report.
							</p>
						</Reveal>

						<Reveal delay={0.15}>
							<div
								className="mt-8 rounded-xl p-5"
								style={{
									border: "1px solid var(--line)",
									background:
										"color-mix(in oklab, var(--lagoon) 5%, var(--surface-strong))",
								}}
							>
								<p className="text-[0.78rem] font-semibold text-ink-soft uppercase tracking-wider mb-3">
									Your workspace
								</p>
								{[
									{ label: "Addis Music Fest", type: "Concert", dot: "bg-violet-400" },
									{ label: "Tech Summit 2025", type: "Conference", dot: "bg-amber-400" },
									{ label: "AFCA Exhibition", type: "Exhibition", dot: "bg-sky-400" },
								].map((ev) => (
									<div
										key={ev.label}
										className="flex items-center gap-2.5 py-2.5"
										style={{ borderTop: "1px solid var(--line)" }}
									>
										<span
											className={`size-2 rounded-full shrink-0 ${ev.dot}`}
										/>
										<span className="text-[0.88rem] font-medium text-ink flex-1">
											{ev.label}
										</span>
										<span className="text-[0.72rem] text-ink-soft">
											{ev.type}
										</span>
									</div>
								))}
							</div>
						</Reveal>
					</div>

					{/* Right: event type cards */}
					<Stagger
						className="lg:col-span-7 grid sm:grid-cols-2 gap-3"
						delay={0.1}
					>
						{EVENT_TYPES.map((et) => (
							<StaggerItem key={et.label}>
								<EventTypeCard {...et} />
							</StaggerItem>
						))}
					</Stagger>
				</div>
			</div>
		</section>
	);
}
