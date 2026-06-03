import { motion } from "motion/react";
import { Reveal } from "./reveal";

function Window({
	title,
	warning,
	children,
	delay = 0,
	rotate = 0,
	top,
	left,
	right,
	bottom,
	zIndex,
}: {
	title: string;
	warning?: string;
	children: React.ReactNode;
	delay?: number;
	rotate?: number;
	top?: number | string;
	left?: number | string;
	right?: number | string;
	bottom?: number | string;
	zIndex?: number;
}) {
	return (
		<motion.div
			className="absolute overflow-hidden rounded-xl"
			style={{
				width: 248,
				top,
				left,
				right,
				bottom,
				rotate,
				zIndex,
				border: "1px solid var(--line)",
				background: "var(--surface-strong)",
				boxShadow:
					"0 8px 32px -8px color-mix(in oklab, var(--sea-ink) 22%, transparent), 0 2px 8px -2px color-mix(in oklab, var(--sea-ink) 10%, transparent)",
			}}
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.15 }}
			transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
		>
			<div
				className="flex items-center gap-1.5 px-3 py-2"
				style={{
					borderBottom: "1px solid var(--line)",
					background:
						"color-mix(in oklab, var(--sea-ink) 6%, var(--surface-strong))",
				}}
			>
				<span className="size-2 rounded-full bg-red-400" />
				<span className="size-2 rounded-full bg-amber-400" />
				<span className="size-2 rounded-full bg-emerald-400" />
				<span className="ml-2 text-[0.6rem] font-medium text-ink-soft truncate flex-1">
					{title}
				</span>
				{warning && (
					<span
						className="shrink-0 text-[0.52rem] font-bold px-1.5 py-0.5 rounded-full"
						style={{
							background:
								"color-mix(in oklab, rgb(239 68 68) 12%, transparent)",
							color: "rgb(239 68 68)",
						}}
					>
						{warning}
					</span>
				)}
			</div>
			{children}
		</motion.div>
	);
}

export function Problem() {
	return (
		<section className="section" aria-labelledby="problem-heading">
			<div className="page-wrap">
				<div className="grid lg:grid-cols-12 gap-10 items-center">
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
								Your team isn't short on effort. They're short on one system
								that treats ticketing, registration, scanning and exhibitor ops
								as the same job.
							</p>
						</Reveal>
					</div>

					<div className="lg:col-span-7 relative min-h-[440px] overflow-hidden lg:overflow-visible">
						{/* Spreadsheet */}
						<Window
							title="Attendees_FINAL_v3.xlsx"
							warning="3 errors"
							rotate={-4}
							top={0}
							left={0}
							zIndex={1}
							delay={0.08}
						>
							<div>
								<div
									className="grid px-3 py-1.5 text-[0.55rem] font-semibold text-ink-soft"
									style={{
										gridTemplateColumns: "1fr 70px 44px",
										borderBottom: "1px solid var(--line)",
										background:
											"color-mix(in oklab, var(--sea-ink) 4%, transparent)",
									}}
								>
									<span>Name</span>
									<span>Type</span>
									<span>Paid</span>
								</div>
								{[
									{ name: "Yohannes T.", type: "VIP", paid: "✓", ok: true },
									{
										name: "Marta H.",
										type: "General",
										paid: "✓",
										ok: true,
									},
									{ name: "Bekele S.", type: "VIP", paid: "?", ok: false },
									{
										name: "Tigist A.",
										type: "Exhibitor",
										paid: "✗",
										ok: false,
									},
								].map((row) => (
									<div
										key={row.name}
										className="grid px-3 py-1.5 text-[0.6rem]"
										style={{
											gridTemplateColumns: "1fr 70px 44px",
											borderBottom: "1px solid var(--line)",
											background: row.ok
												? "transparent"
												: "color-mix(in oklab, rgb(239 68 68) 7%, transparent)",
										}}
									>
										<span className="text-ink truncate">{row.name}</span>
										<span className="text-ink-soft">{row.type}</span>
										<span
											style={{
												fontWeight: 700,
												color: row.ok
													? "var(--lagoon-deep)"
													: "rgb(239 68 68)",
											}}
										>
											{row.paid}
										</span>
									</div>
								))}
								<div className="px-3 py-2 text-[0.55rem] text-ink-soft italic">
									+247 more rows...
								</div>
							</div>
						</Window>

						{/* Chat */}
						<Window
							title="Badge list 📎 — Event Ops"
							warning="9+ unread"
							rotate={3}
							top={20}
							right={0}
							zIndex={2}
							delay={0.18}
						>
							<div className="p-3 space-y-2">
								{[
									{
										msg: "Did you send the badge file?",
										mine: false,
									},
									{ msg: "Which version? I have three 😅", mine: true },
									{
										msg: "THE FINAL ONE. Print starts at 10",
										mine: false,
									},
									{ msg: "Resending now...", mine: true },
								].map((m, i) => (
									<div
										key={i}
										className={`flex ${m.mine ? "justify-end" : "justify-start"}`}
									>
										<div
											className="text-[0.6rem] px-2.5 py-1.5 rounded-lg max-w-[85%] leading-relaxed"
											style={{
												background: m.mine
													? "color-mix(in oklab, var(--lagoon) 20%, var(--surface-strong))"
													: "color-mix(in oklab, var(--sea-ink) 9%, var(--surface-strong))",
												color: "var(--sea-ink)",
											}}
										>
											{m.msg}
										</div>
									</div>
								))}
							</div>
						</Window>

						{/* Payments */}
						<Window
							title="Telebirr / CBE / Chapa — June"
							warning="41 unmatched"
							rotate={-2}
							bottom={0}
							left="18%"
							zIndex={3}
							delay={0.28}
						>
							<div>
								{[
									{
										source: "Telebirr",
										count: "84 transfers",
										ok: false,
									},
									{
										source: "CBE Birr",
										count: "57 transfers",
										ok: false,
									},
									{
										source: "Chapa",
										count: "103 payments",
										ok: true,
									},
								].map((row) => (
									<div
										key={row.source}
										className="flex items-center gap-3 px-3 py-2.5 text-[0.62rem]"
										style={{ borderBottom: "1px solid var(--line)" }}
									>
										<span className="font-semibold text-ink flex-1">
											{row.source}
										</span>
										<span className="text-ink-soft">{row.count}</span>
										<span
											className="px-1.5 py-0.5 rounded text-[0.52rem] font-bold"
											style={{
												background: row.ok
													? "color-mix(in oklab, var(--lagoon) 14%, transparent)"
													: "color-mix(in oklab, rgb(239 68 68) 12%, transparent)",
												color: row.ok
													? "var(--lagoon-deep)"
													: "rgb(239 68 68)",
											}}
										>
											{row.ok ? "Reconciled" : "Unmatched"}
										</span>
									</div>
								))}
								<div className="px-3 py-2 flex items-center gap-1.5">
									<span
										className="size-1.5 rounded-full animate-pulse"
										style={{ background: "rgb(239 68 68)" }}
									/>
									<span
										className="text-[0.58rem] font-medium"
										style={{ color: "rgb(239 68 68)" }}
									>
										41 transfers need manual review
									</span>
								</div>
							</div>
						</Window>
					</div>
				</div>
			</div>
		</section>
	);
}
