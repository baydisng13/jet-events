import { ArrowRight, Star } from "lucide-react";
import { Reveal } from "./reveal";

const NAV_ITEMS = [
	{ href: "#features", label: "Platform", active: true },
	{ href: "#workflows", label: "Workflows" },
	{ href: "#pricing", label: "Pricing" },
	{ href: "#faq", label: "FAQ" },
];

const AVATAR_COLORS = ["#4fb8b2", "#2f6a4a", "#328f97"];

export function Hero() {
	return (
		<section id="main" className="mx-4 md:mx-8 rounded-2xl overflow-hidden">
			<div
				className="relative flex flex-col"
				style={{
					minHeight: "88vh",
					background:
						"linear-gradient(140deg, #0c2228 0%, #173a40 50%, #1b3d32 100%)",
				}}
			>
				{/* Ambient glows */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={{
						background: `
              radial-gradient(ellipse at 75% 38%, rgba(79,184,178,0.13) 0%, transparent 52%),
              radial-gradient(ellipse at 18% 78%, rgba(47,106,74,0.16) 0%, transparent 46%)
            `,
					}}
				/>
				{/* Dot grid texture */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={{
						backgroundImage:
							"radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
						backgroundSize: "24px 24px",
						opacity: 0.055,
					}}
				/>

				{/* Main content — pushed to bottom */}
				<div className="page-wrap relative z-10 flex flex-col flex-1 pb-10 pt-8">
					<div className="flex-1" />

					{/* Two-column content row */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-end">
						{/* Left — eyebrow + heading */}
						<div>
							<Reveal>
								<div
									className="inline-flex items-center gap-2 uppercase tracking-[0.22em] text-[0.65rem] font-semibold mb-6"
									style={{ color: "var(--lagoon)" }}
								>
									<span
										className="block w-5 h-px"
										style={{ background: "var(--lagoon)" }}
									/>
									Built for event teams
								</div>
							</Reveal>

							<Reveal delay={0.06}>
								<h1 className="display-title text-[2.75rem] sm:text-[3.35rem] md:text-[4.1rem] lg:text-[4.5rem] leading-[0.96] font-medium text-white max-w-[13ch]">
									The operating system for conferences &amp; exhibitions.
								</h1>
							</Reveal>
						</div>

						{/* Right — cards + description + CTAs */}
						<div className="flex flex-col gap-6">
							{/* Floating stat cards */}
							<div className="flex flex-wrap gap-3">
								<Reveal delay={0.14}>
									<div
										className="rounded-xl px-4 py-3 flex items-center gap-3"
										style={{
											background: "rgba(255,255,255,0.07)",
											backdropFilter: "blur(14px)",
											WebkitBackdropFilter: "blur(14px)",
											border: "1px solid rgba(255,255,255,0.11)",
										}}
									>
										<div>
											<p className="text-white text-[0.75rem] font-semibold leading-none">
												Rated 4.8/5
											</p>
											<div className="flex gap-0.5 mt-1.5">
												{Array.from({ length: 5 }).map((_, i) => (
													<Star
														key={i}
														className="size-3 fill-amber-400 text-amber-400"
													/>
												))}
											</div>
										</div>
									</div>
								</Reveal>

								<Reveal delay={0.19}>
									<div
										className="rounded-xl px-4 py-3 flex items-center gap-2.5"
										style={{
											background: "rgba(255,255,255,0.07)",
											backdropFilter: "blur(14px)",
											WebkitBackdropFilter: "blur(14px)",
											border: "1px solid rgba(255,255,255,0.11)",
										}}
									>
										<div className="flex -space-x-2">
											{AVATAR_COLORS.map((color, i) => (
												<div
													key={i}
													className="size-6 rounded-full border-2"
													style={{
														background: color,
														borderColor: "#173a40",
													}}
												/>
											))}
										</div>
										<span className="text-white text-[0.8rem] font-semibold">
											500+ Events managed
										</span>
									</div>
								</Reveal>
							</div>

							{/* Description */}
							<Reveal delay={0.1}>
								<p
									className="prose-balance text-[0.98rem] md:text-[1.04rem] leading-relaxed max-w-[44ch]"
									style={{ color: "rgba(183,217,212,0.78)" }}
								>
									One place to launch ticket sales, run onsite registration,
									validate badges at the door, and report on exhibitors — without
									stitching together five tools.
								</p>
							</Reveal>

							{/* CTAs */}
							<Reveal delay={0.23}>
								<div className="flex flex-wrap items-center gap-3">
									<a
										href="#cta"
										className="no-underline inline-flex items-center gap-2 h-12 rounded-xl px-6 text-[0.9rem] font-semibold transition-transform hover:-translate-y-px active:translate-y-0"
										style={{
											background: "var(--lagoon)",
											color: "#0c2228",
										}}
									>
										Book a 20-min demo
										<ArrowRight className="size-4" />
									</a>
									<a
										href="#pricing"
										className="no-underline inline-flex items-center h-12 rounded-xl px-6 text-[0.9rem] font-semibold text-white/75 hover:text-white transition-colors"
										style={{
											border: "1px solid rgba(255,255,255,0.16)",
											background: "rgba(255,255,255,0.05)",
										}}
									>
										See pricing in ETB
									</a>
								</div>
							</Reveal>
						</div>
					</div>

					{/* Bottom nav pill */}
					<Reveal delay={0.32}>
						<nav
							className="flex items-center gap-0.5 mx-auto mt-10 rounded-full px-2 py-1.5 w-fit"
							style={{
								background: "rgba(255,255,255,0.07)",
								backdropFilter: "blur(14px)",
								WebkitBackdropFilter: "blur(14px)",
								border: "1px solid rgba(255,255,255,0.1)",
							}}
							aria-label="Hero navigation"
						>
							{NAV_ITEMS.map((item) => (
								<a
									key={item.href}
									href={item.href}
									className={`no-underline flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[0.8rem] font-medium transition-colors ${
										item.active
											? "text-[#0c2228]"
											: "text-white/55 hover:text-white/85"
									}`}
									style={
										item.active
											? { background: "var(--lagoon)" }
											: undefined
									}
								>
									{item.active && (
										<span className="size-1.5 rounded-full bg-[#0c2228]/50 shrink-0" />
									)}
									{item.label}
								</a>
							))}
						</nav>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
