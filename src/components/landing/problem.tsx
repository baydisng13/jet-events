import { AlertCircle, GitMerge, Receipt } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./reveal";

const PAIN = [
	{
		icon: AlertCircle,
		title: "Five tools, one event",
		body: "Tickets in one platform, badges in another, scanning on someone's laptop, payments in a spreadsheet. Things slip.",
	},
	{
		icon: Receipt,
		title: "Payments that don't reconcile",
		body: "Bank transfers, mobile money and online checkout end up in different inboxes. Your finance team chases each one.",
	},
	{
		icon: GitMerge,
		title: "No single source of truth",
		body: "Exhibitors, attendees and staff each see different data. The day-of-event surprises are the expensive kind.",
	},
];

export function Problem() {
	return (
		<section className="section" aria-labelledby="problem-heading">
			<div className="page-wrap">
				<div className="grid lg:grid-cols-12 gap-10 items-start">
					<div className="lg:col-span-5">
						<Reveal>
							<div className="eyebrow mb-4">The status quo</div>
						</Reveal>
						<Reveal delay={0.05}>
							<h2
								id="problem-heading"
								className="display-title text-[2rem] sm:text-[2.4rem] leading-[1.05] font-medium text-ink"
							>
								Most events still run on glue, late nights and{" "}
								<span className="text-lagoon">spreadsheets</span>.
							</h2>
						</Reveal>
						<Reveal delay={0.1}>
							<p className="prose-balance mt-5 text-ink-soft text-[1.02rem] max-w-md">
								Your team isn't short on effort. They're short on a system that
								treats ticketing, registration, scanning and exhibitor ops as
								the same job &mdash; because, on event day, they are.
							</p>
						</Reveal>
					</div>

					<Stagger className="lg:col-span-7 grid sm:grid-cols-1 gap-3">
						{PAIN.map((p) => (
							<StaggerItem key={p.title}>
								<div className="surface-card p-5 flex gap-4">
									<div
										className="size-10 rounded-xl shrink-0 inline-flex items-center justify-center"
										style={{
											background:
												"color-mix(in oklab, var(--lagoon) 14%, white)",
											color: "var(--lagoon-deep)",
										}}
										aria-hidden
									>
										<p.icon className="size-4.5" />
									</div>
									<div>
										<h3 className="text-ink font-semibold text-[1.02rem]">
											{p.title}
										</h3>
										<p className="prose-balance mt-1 text-ink-soft text-[0.95rem]">
											{p.body}
										</p>
									</div>
								</div>
							</StaggerItem>
						))}
					</Stagger>
				</div>
			</div>
		</section>
	);
}
