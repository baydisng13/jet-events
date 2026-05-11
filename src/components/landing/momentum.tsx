import { Quote } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./reveal";

const STATS = [
	{ value: "< 1s", label: "Average badge scan" },
	{ value: "98%", label: "Successful checkouts" },
	{ value: "5×", label: "Faster setup vs. manual ops" },
];

const TESTIMONIALS = [
	{
		quote:
			"We replaced three tools and a shared spreadsheet with one workspace. Our finance lead reconciled the event in an afternoon.",
		author: "Operations Lead",
		org: "Conference team",
		isPlaceholder: true,
	},
	{
		quote:
			"The scanning surface is the calmest I've used at the door. Our volunteers got it in under five minutes.",
		author: "Door staff captain",
		org: "Trade fair",
		isPlaceholder: true,
	},
];

export function Momentum() {
	return (
		<section
			className="section bg-sand-soft"
			aria-labelledby="momentum-heading"
		>
			<div className="page-wrap">
				<div className="grid lg:grid-cols-12 gap-10 items-end">
					<div className="lg:col-span-7">
						<Reveal>
							<div className="eyebrow mb-4">Momentum</div>
						</Reveal>
						<Reveal delay={0.05}>
							<h2
								id="momentum-heading"
								className="display-title text-[2.2rem] sm:text-[2.7rem] leading-[1.04] font-medium text-ink"
							>
								Numbers organizers care about, on the day that matters.
							</h2>
						</Reveal>
					</div>
					<Reveal delay={0.1} className="lg:col-span-5">
						<p className="prose-balance text-ink-soft text-[1.02rem]">
							These benchmarks reflect what well-run events on Jet Events look
							like. Your mileage will vary by venue, network and team &mdash;
							we'll talk you through what's realistic.
						</p>
					</Reveal>
				</div>

				<Stagger className="mt-10 grid sm:grid-cols-3 gap-4">
					{STATS.map((s) => (
						<StaggerItem key={s.label}>
							<div className="surface-card-strong p-6">
								<div className="display-title text-[2.6rem] leading-none font-medium text-ink tabular-nums">
									{s.value}
								</div>
								<div className="mt-2 text-[0.95rem] text-ink-soft">
									{s.label}
								</div>
							</div>
						</StaggerItem>
					))}
				</Stagger>

				<Stagger className="mt-8 grid md:grid-cols-2 gap-4" stagger={0.1}>
					{TESTIMONIALS.map((t) => (
						<StaggerItem key={t.quote}>
							<figure className="surface-card p-6 h-full flex flex-col">
								<Quote
									className="size-5 text-lagoon"
									aria-hidden
									strokeWidth={2.4}
								/>
								<blockquote className="prose-balance mt-3 text-ink text-[1.02rem] leading-snug">
									&ldquo;{t.quote}&rdquo;
								</blockquote>
								<figcaption className="mt-4 pt-4 border-t border-[color:var(--line)] flex items-center justify-between text-[0.84rem]">
									<div>
										<div className="font-semibold text-ink">{t.author}</div>
										<div className="text-ink-soft">{t.org}</div>
									</div>
									{t.isPlaceholder && (
										<span className="tag-chip" title="Example testimonial">
											Example
										</span>
									)}
								</figcaption>
							</figure>
						</StaggerItem>
					))}
				</Stagger>
			</div>
		</section>
	);
}
