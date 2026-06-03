import { ArrowRight, CalendarCheck, MessageCircle } from "lucide-react";

import InteractiveNeuralVortexBackground from "#/components/ui/interactive-neural-vortex-background.tsx";
import { Button } from "#/components/ui/button.tsx";
import { Reveal } from "./reveal";

export function CtaSection() {
	return (
		<section id="cta" className="section pt-0" aria-labelledby="cta-heading">
			<div className="page-wrap">
				<Reveal>
					<InteractiveNeuralVortexBackground
						className="rounded-[28px] p-8 sm:p-12 lg:p-14 min-h-[min(28rem,100%)]"
						style={{
							boxShadow:
								"0 30px 60px -28px rgba(20,90,80,0.4), inset 0 1px 0 rgba(255,255,255,0.18)",
						}}
					>
						<div className="relative">
							<div
								aria-hidden
								className="absolute inset-0 dot-grid opacity-[0.18] pointer-events-none mix-blend-screen"
							/>

							<div className="relative grid lg:grid-cols-12 gap-8 items-center">
								<div className="lg:col-span-7">
									<p className="text-[0.72rem] uppercase tracking-[0.2em] font-bold font-sans text-white/70">
										Ready when you are
									</p>
									<h2
										id="cta-heading"
										className="display-title text-[2.2rem] sm:text-[2.8rem] leading-[1.04] font-medium mt-3 text-white"
									>
										Let&apos;s plan your next event on Tutto.
									</h2>
									<p className="prose-balance mt-4 text-white/85 text-[1.05rem] max-w-xl font-sans leading-relaxed">
										Book a 20-minute demo. We&apos;ll walk through the
										dashboard with your event in mind &mdash; ticket types,
										payments, scanning, exhibitors &mdash; and quote against
										your scope.
									</p>

									<div className="mt-7 flex flex-col sm:flex-row gap-3">
										<Button
											asChild
											size="lg"
											className="h-12 rounded-xl px-6 text-[0.95rem] font-semibold bg-white text-[var(--sea-ink)] hover:bg-white/92 shadow-[inset_0_-2px_0_color-mix(in_oklab,var(--sea-ink)_8%,transparent),0_8px_22px_-8px_rgba(0,0,0,0.35)]"
										>
											<a
												href="mailto:hello@tutto.io?subject=Demo%20request"
												className="no-underline inline-flex items-center justify-center gap-2"
											>
												<CalendarCheck className="size-4" />
												Book a demo
												<ArrowRight className="size-4" />
											</a>
										</Button>
										<Button
											asChild
											variant="outline"
											size="lg"
											className="h-12 rounded-xl px-6 text-[0.95rem] font-semibold border-white/22 bg-white/[0.08] !text-white hover:bg-white/14 hover:text-white"
										>
											<a
												href="mailto:hello@tutto.io?subject=Quick%20question"
												className="no-underline inline-flex items-center justify-center gap-2"
											>
												<MessageCircle className="size-4" />
												Ask a quick question
											</a>
										</Button>
									</div>
								</div>

								<div className="lg:col-span-5">
									<div className="rounded-2xl p-5 backdrop-blur-md bg-white/[0.06] border border-white/16 backdrop-blur-[1px]">
										<div className="text-[0.72rem] uppercase tracking-wider font-semibold font-sans text-white/70">
											What we&apos;ll cover
										</div>
										<ol className="mt-3 grid gap-2.5 list-none p-0 m-0">
											{[
												"Ticket types & roles: how your event maps to the dashboard",
												"Pesapal & bank transfer setup for your bank",
												"Door scanning: gates, devices, and throughput",
												"Pricing aligned to your event scope",
											].map((item, i) => (
												<li
													key={item}
													className="flex items-start gap-2.5 text-[0.92rem] font-sans text-white/90"
												>
													<span
														aria-hidden
														className="mt-[3px] size-5 inline-flex items-center justify-center rounded-full text-[0.68rem] font-bold tabular-nums shrink-0 bg-white/14 text-white"
													>
														{i + 1}
													</span>
													{item}
												</li>
											))}
										</ol>
									</div>
								</div>
							</div>
						</div>
					</InteractiveNeuralVortexBackground>
				</Reveal>
			</div>
		</section>
	);
}
