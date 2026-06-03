import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "./reveal";

const TESTIMONIALS = [
	{
		quote:
			"We replaced three tools and a shared spreadsheet with one workspace. Our finance lead reconciled the event in an afternoon — something that used to take a week.",
		author: "Operations Lead",
		org: "Annual conference, Addis Ababa",
		initials: "OL",
		accent: "#4fb8b2",
		cardFrom: "#1a4d5c",
	},
	{
		quote:
			"The scanning surface is the calmest I've used at the door. Our volunteers were up and running in under five minutes. No confusion, no queues.",
		author: "Door Staff Captain",
		org: "Trade fair, Millennium Hall",
		initials: "DS",
		accent: "#64a6ea",
		cardFrom: "#1e3a5f",
	},
	{
		quote:
			"Badge printing used to mean a driver fight and a prayer the morning of the event. Tutto turned it into a two-click operation on any phone at the desk.",
		author: "Event Director",
		org: "Tech Summit 2025",
		initials: "ED",
		accent: "#7ec8a0",
		cardFrom: "#2a4a3a",
	},
];

const variants = {
	enter: (d: number) => ({ opacity: 0, x: d * 52 }),
	center: { opacity: 1, x: 0 },
	exit: (d: number) => ({ opacity: 0, x: d * -52 }),
};

export function Momentum() {
	const [idx, setIdx] = useState(0);
	const [dir, setDir] = useState(1);
	const t = TESTIMONIALS[idx];
	const total = TESTIMONIALS.length;

	const go = (next: number, d: number) => {
		setDir(d);
		setIdx(next);
	};

	return (
		<section
			id="momentum"
			aria-labelledby="momentum-heading"
			className="section"
			style={{
				background:
					"linear-gradient(140deg, #0c2228 0%, #173a40 50%, #1b3d32 100%)",
			}}
		>
			<div className="page-wrap">
				{/* Heading */}
				<div className="mb-12 lg:mb-16">
					<Reveal>
						<p
							style={{
								fontSize: "0.68rem",
								fontWeight: 600,
								letterSpacing: "0.14em",
								color: "rgba(255,255,255,0.35)",
								marginBottom: 16,
								textTransform: "uppercase",
							}}
						>
							// Testimonials
						</p>
					</Reveal>
					<Reveal delay={0.05}>
						<h2
							id="momentum-heading"
							style={{
								fontSize: "clamp(1.75rem, 4vw, 2.55rem)",
								fontWeight: 500,
								lineHeight: 1.1,
								color: "white",
								maxWidth: 560,
							}}
						>
							What event organizers say about running with Tutto
						</h2>
					</Reveal>
				</div>

				{/* Card row */}
				<div className="grid lg:grid-cols-12 gap-8 items-start">
					{/* Testimonial card */}
					<div className="lg:col-span-8">
						<AnimatePresence mode="wait" custom={dir}>
							<motion.figure
								key={idx}
								custom={dir}
								variants={variants}
								initial="enter"
								animate="center"
								exit="exit"
								transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
								style={{
									margin: 0,
									borderRadius: 16,
									padding: "clamp(28px, 4vw, 44px)",
									background: `radial-gradient(ellipse 80% 90% at 16% 22%, ${t.cardFrom} 0%, #0e2530 55%, #0c2228 100%)`,
									minHeight: 290,
									display: "flex",
									flexDirection: "column",
									border: "1px solid rgba(255,255,255,0.06)",
								}}
							>
								{/* Avatar */}
								<div
									style={{
										width: 40,
										height: 40,
										borderRadius: "50%",
										background: `${t.accent}22`,
										border: `1.5px solid ${t.accent}44`,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: "0.66rem",
										fontWeight: 700,
										color: t.accent,
										letterSpacing: "0.06em",
										flexShrink: 0,
									}}
								>
									{t.initials}
								</div>

								{/* Quote */}
								<blockquote
									style={{
										marginTop: 28,
										marginBottom: 0,
										fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
										color: "rgba(255,255,255,0.9)",
										lineHeight: 1.68,
										fontWeight: 400,
										flex: 1,
									}}
								>
									{t.quote}
								</blockquote>

								{/* Attribution */}
								<figcaption style={{ marginTop: 32 }}>
									<p
										style={{
											fontSize: "0.88rem",
											fontWeight: 600,
											color: "white",
											lineHeight: 1,
										}}
									>
										{t.author}
									</p>
									<p
										style={{
											fontSize: "0.78rem",
											color: "rgba(255,255,255,0.4)",
											marginTop: 4,
										}}
									>
										{t.org}
									</p>
								</figcaption>
							</motion.figure>
						</AnimatePresence>
					</div>

					{/* Right: counter + nav */}
					<div className="lg:col-span-4 flex lg:flex-col items-center lg:items-start justify-between lg:justify-start lg:h-full">
						{/* Counter */}
						<p
							style={{
								fontSize: "0.68rem",
								fontWeight: 500,
								letterSpacing: "0.1em",
								color: "rgba(255,255,255,0.3)",
								whiteSpace: "nowrap",
							}}
						>
							{idx + 1} OF {total} //
						</p>

						{/* Spacer */}
						<div className="hidden lg:block" style={{ flex: 1 }} />

						{/* Navigation */}
						<div className="flex lg:flex-col gap-1">
							<button
								type="button"
								onClick={() => go((idx - 1 + total) % total, -1)}
								className="group flex items-center gap-2.5 py-2 transition-opacity"
								style={{ background: "none", border: "none", cursor: "pointer", padding: "8px 0" }}
								aria-label="Previous testimonial"
							>
								<span
									className="transition-colors duration-150"
									style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.35)" }}
								>
									←
								</span>
								<span
									className="transition-colors duration-150"
									style={{
										fontSize: "0.82rem",
										fontWeight: 500,
										color: "rgba(255,255,255,0.35)",
									}}
								>
									Previous
								</span>
							</button>
							<button
								type="button"
								onClick={() => go((idx + 1) % total, 1)}
								className="group flex items-center gap-2.5 transition-opacity"
								style={{ background: "none", border: "none", cursor: "pointer", padding: "8px 0" }}
								aria-label="Next testimonial"
							>
								<span
									className="transition-colors duration-150"
									style={{
										fontSize: "0.82rem",
										fontWeight: 500,
										color: "rgba(255,255,255,0.9)",
									}}
								>
									Next
								</span>
								<span
									className="transition-colors duration-150"
									style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.9)" }}
								>
									→
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
