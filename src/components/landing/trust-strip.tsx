import { motion } from "motion/react";
import { Reveal } from "./reveal";

const PARTNERS = [
	{
		name: "Addis Devs",
		logoSrc: "/partners/addis-devs.png",
		logoAlt: "Addis Devs logo",
	},
	{
		name: "Enkopa Summit",
		fallbackMark: "ENKOPA",
	},
	{
		name: "African Fine Coffees Association",
		logoSrc: "/partners/afca.png",
		logoAlt: "AFCA logo",
	},
	{
		name: "Ice Addis",
		logoSrc: "/partners/ice-addis.svg",
		logoAlt: "Ice Addis logo",
	},
];

const ITEMS = [...PARTNERS, ...PARTNERS, ...PARTNERS];

export function TrustStrip() {
	return (
		<section
			className="py-14 overflow-hidden"
			aria-label="Our partners"
			style={{
				borderTop: "1px solid var(--line)",
				borderBottom: "1px solid var(--line)",
				background:
					"color-mix(in oklab, var(--sea-ink) 3%, var(--surface-strong) 97%)",
			}}
		>
			<div className="page-wrap mb-10">
				<Reveal>
					<div className="flex items-center gap-5">
						<span
							className="flex-1 h-px"
							style={{
								background:
									"linear-gradient(to right, transparent, var(--line))",
							}}
						/>
						<p className="text-[0.7rem] uppercase tracking-[0.22em] font-bold text-ink-soft whitespace-nowrap">
							Trusted by Ethiopia's leading events
						</p>
						<span
							className="flex-1 h-px"
							style={{
								background:
									"linear-gradient(to left, transparent, var(--line))",
							}}
						/>
					</div>
				</Reveal>
			</div>

			<div
				className="relative"
				style={{
					maskImage:
						"linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
					WebkitMaskImage:
						"linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
				}}
			>
				<motion.div
					className="flex items-center"
					style={{ width: "max-content" }}
					animate={{ x: ["0%", "-33.333%"] }}
					transition={{ duration: 28, ease: "linear", repeat: Infinity }}
				>
					{ITEMS.map((p, i) => (
						<div
							key={`${p.name}-${i}`}
							className="partner-logo flex items-center justify-center px-12 min-w-[200px]"
							title={p.name}
						>
							{p.logoSrc ? (
								<img
									src={p.logoSrc}
									alt={p.logoAlt}
									className="h-10 w-auto max-w-[150px] object-contain"
									loading="lazy"
								/>
							) : (
								<span className="text-lg font-black tracking-[0.18em] text-ink-soft">
									{p.fallbackMark}
								</span>
							)}
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
