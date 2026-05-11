import { ArrowRight, ScanLine, ShieldCheck, Ticket } from "lucide-react";
import { DashboardPreview } from "./dashboard-preview";
import { Reveal } from "./reveal";

export function Hero() {
	return (
		<section id="main" className="relative pt-10 md:pt-14 pb-20 md:pb-28">
			<div aria-hidden className="shimmer-line top-[64px]" />

			<div className="page-wrap relative">
				<div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
					<div className="lg:col-span-6 xl:col-span-6">
						<Reveal>
							<div className="eyebrow mb-5">
								Built for Ethiopian event teams
							</div>
						</Reveal>

						<Reveal delay={0.05}>
							<h1 className="display-title text-[2.6rem] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.2rem] leading-[1.02] font-medium text-ink">
								The operating system for{" "}
								<span className="gradient-text">
									conferences &amp; exhibitions
								</span>
								.
							</h1>
						</Reveal>

						<Reveal delay={0.12}>
							<p className="prose-balance mt-6 text-lg text-ink-soft max-w-xl">
								Jet Events gives organizers one place to launch ticket sales,
								run onsite registration, validate badges at the door, and report
								on exhibitors &mdash; without stitching together five tools.
							</p>
						</Reveal>

						<Reveal delay={0.2}>
							<div className="mt-8 flex flex-col sm:flex-row gap-3">
								<a
									href="#cta"
									className="btn-primary-brand inline-flex items-center justify-center gap-2 rounded-xl h-12 px-6 text-[0.95rem] font-semibold no-underline"
								>
									Book a 20-min demo
									<ArrowRight className="size-4" />
								</a>
								<a
									href="#pricing"
									className="btn-secondary-brand inline-flex items-center justify-center gap-2 rounded-xl h-12 px-6 text-[0.95rem] font-semibold no-underline"
								>
									See pricing in ETB
								</a>
							</div>
						</Reveal>

						<Reveal delay={0.28}>
							<div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-soft">
								<span className="inline-flex items-center gap-2">
									<ShieldCheck className="size-4 text-palm" />
									Pesapal &amp; bank transfer ready
								</span>
								<span className="inline-flex items-center gap-2">
									<ScanLine className="size-4 text-palm" />
									Door scanning that works offline-friendly
								</span>
								<span className="inline-flex items-center gap-2">
									<Ticket className="size-4 text-palm" />
									Multi-tier ticketing &amp; coupons
								</span>
							</div>
						</Reveal>
					</div>

					<div className="lg:col-span-6 xl:col-span-6 relative">
						<Reveal y={28} delay={0.18}>
							<DashboardPreview />
						</Reveal>
					</div>
				</div>
			</div>
		</section>
	);
}
