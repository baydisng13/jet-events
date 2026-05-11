import { Reveal } from "./reveal";

const PARTNERS = [
	{ name: "Bole Convention Centre", initials: "BCC" },
	{ name: "Skylight Hotel Events", initials: "SLH" },
	{ name: "AAU Innovation Hub", initials: "AAU" },
	{ name: "Ethio Trade Fair", initials: "ETF" },
	{ name: "Sheraton Addis", initials: "SHA" },
	{ name: "Adwa Events Co.", initials: "ADW" },
];

export function TrustStrip() {
	return (
		<section className="pb-2" aria-label="Venues and partners">
			<div className="page-wrap">
				<Reveal>
					<p className="text-center text-[0.74rem] uppercase tracking-[0.18em] font-semibold text-ink-soft">
						Designed with venues &amp; organizers across Addis Ababa
						<span className="ml-2 lowercase tracking-normal text-[0.7rem] opacity-70">
							(example placeholders)
						</span>
					</p>
				</Reveal>

				<Reveal delay={0.05}>
					<div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
						{PARTNERS.map((p) => (
							<div
								key={p.name}
								className="hairline rounded-xl bg-white/70 backdrop-blur-sm h-14 flex items-center justify-center px-3"
								title={p.name}
							>
								<span className="text-ink-soft text-[0.78rem] font-semibold tracking-wide">
									{p.initials}
									<span className="opacity-50 ml-1.5 font-normal hidden md:inline">
										{p.name.split(" ")[0]}
									</span>
								</span>
							</div>
						))}
					</div>
				</Reveal>
			</div>
		</section>
	);
}
