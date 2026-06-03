import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────

const SCAN_QUEUE = [
	{
		name: "Yohannes Tesfaye",
		role: "VIP Delegate",
		gate: "Hall A",
		id: "#ETH-2847",
	},
	{
		name: "Marta Hailu",
		role: "Speaker",
		gate: "Main Stage",
		id: "#ETH-1204",
	},
	{
		name: "Bekele Shiferaw",
		role: "Exhibitor",
		gate: "Booth B7",
		id: "#ETH-3391",
	},
	{
		name: "Tigist Alemu",
		role: "Press",
		gate: "Media Zone",
		id: "#ETH-0892",
	},
] as const;

const AVATAR_COLORS = ["#4fb8b2", "#2f6a4a", "#328f97"];

// ─── Hero ─────────────────────────────────────────────────────

export function Hero() {
	const reduce = useReducedMotion();
	const [scanIdx, setScanIdx] = useState(0);
	const [admitted, setAdmitted] = useState(1247);

	useEffect(() => {
		if (reduce) return;
		const id = setInterval(() => {
			setScanIdx((i) => (i + 1) % SCAN_QUEUE.length);
			setAdmitted((n) => n + 1);
		}, 2800);
		return () => clearInterval(id);
	}, [reduce]);

	const scan = SCAN_QUEUE[scanIdx];

	return (
		<section id="main" className="mx-4 md:mx-8 rounded-2xl overflow-hidden">
			<div
				className="relative flex flex-col"
				style={{
					minHeight: "92vh",
					background:
						"linear-gradient(140deg, #0c2228 0%, #173a40 50%, #1b3d32 100%)",
				}}
			>
				{/* ── Background ──────────────────────────────── */}

				{/* Animated ambient glow orbs */}
				{!reduce && (
					<>
						<motion.div
							className="absolute rounded-full pointer-events-none"
							style={{
								width: 700,
								height: 700,
								top: "-15%",
								right: "-8%",
								background:
									"radial-gradient(ellipse at center, rgba(79,184,178,0.13) 0%, transparent 68%)",
							}}
							animate={{ x: [0, 28, -14, 0], y: [0, -18, 14, 0] }}
							transition={{
								duration: 16,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
							}}
						/>
						<motion.div
							className="absolute rounded-full pointer-events-none"
							style={{
								width: 520,
								height: 520,
								bottom: "2%",
								left: "-6%",
								background:
									"radial-gradient(ellipse at center, rgba(47,106,74,0.16) 0%, transparent 68%)",
							}}
							animate={{ x: [0, -18, 24, 0], y: [0, 22, -12, 0] }}
							transition={{
								duration: 20,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
								delay: 3,
							}}
						/>
						<motion.div
							className="absolute rounded-full pointer-events-none"
							style={{
								width: 380,
								height: 380,
								top: "30%",
								left: "35%",
								background:
									"radial-gradient(ellipse at center, rgba(79,184,178,0.07) 0%, transparent 68%)",
							}}
							animate={{ x: [0, 14, -20, 0], y: [0, -14, 8, 0] }}
							transition={{
								duration: 13,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
								delay: 6,
							}}
						/>
					</>
				)}

				{/* Dot grid */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={{
						backgroundImage:
							"radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
						backgroundSize: "28px 28px",
						opacity: 0.042,
					}}
				/>

				{/* Vertical scan beam — sweeps full hero */}
				{!reduce && (
					<motion.div
						className="absolute inset-x-0 pointer-events-none"
						style={{
							height: 240,
							background:
								"linear-gradient(to bottom, transparent 0%, rgba(79,184,178,0.05) 50%, transparent 100%)",
						}}
						animate={{ y: ["-100%", "200vh"] }}
						transition={{
							duration: 10,
							repeat: Number.POSITIVE_INFINITY,
							ease: "linear",
							repeatDelay: 6,
						}}
					/>
				)}

				{/* ── Content ─────────────────────────────────── */}
				<div className="page-wrap relative z-10 flex flex-col flex-1 pb-12 pt-8">
					<div className="flex-1" />

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
						{/* Left — headline + CTAs */}
						<div className="lg:col-span-5 flex flex-col gap-7">
							{/* Eyebrow */}
							<motion.div
								className="inline-flex items-center gap-2"
								initial={{ opacity: 0, y: 14 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
							>
								<motion.span
									className="size-1.5 rounded-full"
									style={{ background: "var(--lagoon)" }}
									animate={reduce ? {} : { opacity: [1, 0.35, 1] }}
									transition={{
										duration: 2,
										repeat: Number.POSITIVE_INFINITY,
										ease: "easeInOut",
									}}
								/>
								<span
									className="text-[0.68rem] font-semibold uppercase tracking-[0.2em]"
									style={{ color: "var(--lagoon)" }}
								>
									Event infrastructure · Ethiopia
								</span>
							</motion.div>

							{/* Headline */}
							<motion.h1
								className="display-title leading-[0.94]"
								style={{
									fontSize: "clamp(2.9rem, 6.5vw, 5.2rem)",
									fontWeight: 500,
									color: "white",
								}}
								initial={{ opacity: 0, y: 22 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.65,
									delay: 0.08,
									ease: [0.16, 1, 0.3, 1],
								}}
							>
								Every event.
								<br />
								<span style={{ color: "rgba(255,255,255,0.38)" }}>
									One workspace.
								</span>
							</motion.h1>

							{/* Description */}
							<motion.p
								className="text-[1rem] leading-relaxed max-w-[42ch]"
								style={{ color: "rgba(183,217,212,0.72)" }}
								initial={{ opacity: 0, y: 14 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.55,
									delay: 0.17,
									ease: [0.16, 1, 0.3, 1],
								}}
							>
								Launch ticket sales, run onsite registration, validate badges
								at the door, and report on exhibitors — without stitching
								together five tools.
							</motion.p>

							{/* CTAs */}
							<motion.div
								className="flex flex-wrap gap-3"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.5,
									delay: 0.26,
									ease: [0.16, 1, 0.3, 1],
								}}
							>
								<a
									href="#cta"
									className="no-underline bg-white text-[#0c2228] inline-flex items-center gap-2 h-12 rounded-xl px-6 text-[0.9rem] font-semibold transition-transform hover:-translate-y-px active:translate-y-0"
								>
									Book a 20-min demo
									<ArrowRight className="size-4 text-[#0c2228]" />
								</a>
								<a
									href="#pricing"
									className="no-underline inline-flex items-center border border-white/14 bg-white/04 text-white/85 h-12 rounded-xl px-6 text-[0.9rem] font-semibold transition-colors hover:text-white/95"
								>
									See pricing in ETB
								</a>
							</motion.div>

							{/* Social proof */}
							<motion.div
								className="flex items-center gap-3"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5, delay: 0.36 }}
							>
								<div className="flex -space-x-2">
									{AVATAR_COLORS.map((c, i) => (
										<div
											key={i}
											className="size-7 rounded-full border-2"
											style={{ background: c, borderColor: "#173a40" }}
										/>
									))}
								</div>
								<p
									className="text-[0.82rem]"
									style={{ color: "rgba(255,255,255,0.45)" }}
								>
									<span className="text-white font-semibold">500+</span>{" "}
									events managed across Ethiopia
								</p>
							</motion.div>
						</div>

						{/* Right — live event dashboard window */}
						<div className="lg:col-span-7">
							<EventWindow
								scan={scan}
								scanIdx={scanIdx}
								admitted={admitted}
								reduce={!!reduce}
							/>
						</div>
					</div>

					{/* Bottom nav pill */}
					
				</div>
			</div>
		</section>
	);
}

// ─── Event Window ─────────────────────────────────────────────

type ScanEntry = (typeof SCAN_QUEUE)[number];

function EventWindow({
	scan,
	scanIdx,
	admitted,
	reduce,
}: {
	scan: ScanEntry;
	scanIdx: number;
	admitted: number;
	reduce: boolean;
}) {
	const recentScans = SCAN_QUEUE.filter((_, i) => i !== scanIdx).slice(0, 2);

	return (
		<motion.div
			initial={{ opacity: 0, y: 32, scale: 0.96 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
			style={{
				borderRadius: 20,
				overflow: "hidden",
				background: "#ffffff",
				border: "1px solid rgba(12,34,40,0.1)",
				boxShadow:
					"0 48px 96px -24px rgba(0,0,0,0.28), 0 8px 32px -8px rgba(12,34,40,0.12)",
				transform:
					"perspective(1200px) rotateX(1.5deg) rotateY(-3deg) rotateZ(0.4deg)",
				transformOrigin: "center center",
			}}
		>
			{/* Teal rim at very top */}
			<div
				style={{
					height: 3,
					background:
						"linear-gradient(90deg, transparent 0%, var(--lagoon) 25%, var(--lagoon) 75%, transparent 100%)",
				}}
			/>

			{/* Window chrome */}
			<div
				style={{
					padding: "11px 18px",
					display: "flex",
					alignItems: "center",
					gap: 12,
					borderBottom: "1px solid rgba(12,34,40,0.07)",
					background: "#f7fafa",
				}}
			>
				<div style={{ display: "flex", gap: 6 }}>
					{(["#ff5f57", "#ffbd2e", "#28c840"] as const).map((c) => (
						<div
							key={c}
							style={{ width: 10, height: 10, borderRadius: 5, background: c }}
						/>
					))}
				</div>
				<p
					style={{
						flex: 1,
						textAlign: "center",
						fontSize: "0.7rem",
						fontWeight: 600,
						color: "rgba(12,34,40,0.38)",
						letterSpacing: "0.05em",
					}}
				>
					Tutto · Tech Summit 2025 · Skylight Hotel
				</p>
				<div style={{ display: "flex", alignItems: "center", gap: 5 }}>
					<motion.span
						style={{
							display: "block",
							width: 6,
							height: 6,
							borderRadius: 3,
							background: "#28c840",
						}}
						animate={reduce ? {} : { opacity: [1, 0.4, 1] }}
						transition={{
							duration: 1.6,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					/>
					<span
						style={{
							fontSize: "0.62rem",
							fontWeight: 700,
							color: "#1a9e35",
							letterSpacing: "0.1em",
						}}
					>
						LIVE
					</span>
				</div>
			</div>

			{/* Body */}
			<div style={{ padding: "20px 20px 0" }}>
				{/* Scanner bar */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						marginBottom: 14,
					}}
				>
					<div style={{ display: "flex", alignItems: "center", gap: 7 }}>
						<div
							style={{
								width: 6,
								height: 6,
								borderRadius: 3,
								background: "var(--lagoon)",
								boxShadow: "0 0 6px rgba(79,184,178,0.6)",
							}}
						/>
						<span
							style={{
								fontSize: "0.67rem",
								fontWeight: 600,
								color: "rgba(12,34,40,0.42)",
								letterSpacing: "0.1em",
								textTransform: "uppercase",
							}}
						>
							Gate A · Scanning
						</span>
					</div>

					{/* Scan progress bar */}
					<div
						style={{
							width: 72,
							height: 3,
							borderRadius: 2,
							background: "rgba(12,34,40,0.08)",
							overflow: "hidden",
							position: "relative",
						}}
					>
						{!reduce && (
							<motion.div
								style={{
									position: "absolute",
									top: 0,
									bottom: 0,
									width: 28,
									background:
										"linear-gradient(90deg, transparent, rgba(79,184,178,0.9), transparent)",
									borderRadius: 2,
								}}
								animate={{ left: ["-28px", "100px"] }}
								transition={{
									duration: 1.4,
									repeat: Number.POSITIVE_INFINITY,
									ease: "linear",
								}}
							/>
						)}
					</div>
				</div>

				{/* Live scan result */}
				<div style={{ minHeight: 90 }}>
					<AnimatePresence mode="wait">
						<motion.div
							key={scanIdx}
							initial={{ opacity: 0, y: 14, scale: 0.97 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -8, scale: 0.98 }}
							transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
							style={{
								borderRadius: 14,
								padding: "14px 16px",
								background: "rgba(34,197,94,0.07)",
								border: "1px solid rgba(34,197,94,0.2)",
								display: "flex",
								gap: 14,
								alignItems: "center",
							}}
						>
							<div
								style={{
									width: 38,
									height: 38,
									borderRadius: 19,
									background: "#0c2228",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									flexShrink: 0,
									boxShadow: "0 4px 14px rgba(7, 37, 18, 0.35)",
								}}
							>
								<Check
									style={{ color: "white", width: 19, height: 19 }}
									strokeWidth={2.8}
								/>
							</div>
							<div>
								<p
									style={{
										fontSize: "1.02rem",
										fontWeight: 700,
										color: "var(--sea-ink)",
										lineHeight: 1.1,
									}}
								>
									{scan.name}
								</p>
								<p
									style={{
										fontSize: "0.75rem",
										color: "rgba(12,34,40,0.46)",
										marginTop: 4,
									}}
								>
									{scan.role} · {scan.gate} · {scan.id}
								</p>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Recent list */}
				<div style={{ marginTop: 10 }}>
					<p
						style={{
							fontSize: "0.6rem",
							fontWeight: 600,
							color: "rgba(12,34,40,0.28)",
							letterSpacing: "0.12em",
							textTransform: "uppercase",
							marginBottom: 4,
						}}
					>
						Recent
					</p>
					{recentScans.map((s) => (
						<div
							key={s.id}
							style={{
								display: "flex",
								alignItems: "center",
								gap: 10,
								padding: "7px 0",
								borderTop: "1px solid rgba(12,34,40,0.06)",
							}}
						>
							<div
								style={{
									width: 5,
									height: 5,
									borderRadius: 2.5,
									background: "rgba(34,197,94,0.5)",
									flexShrink: 0,
								}}
							/>
							<span
								style={{
									fontSize: "0.8rem",
									fontWeight: 500,
									color: "rgba(12,34,40,0.55)",
									flex: 1,
								}}
							>
								{s.name}
							</span>
							<span
								style={{ fontSize: "0.7rem", color: "rgba(12,34,40,0.3)" }}
							>
								{s.role}
							</span>
						</div>
					))}
				</div>
			</div>

			{/* Stats strip */}
			<div
				style={{
					marginTop: 16,
					display: "grid",
					gridTemplateColumns: "repeat(3, 1fr)",
					borderTop: "1px solid rgba(12,34,40,0.07)",
					background: "#f7fafa",
				}}
			>
				{[
					{ label: "Admitted", value: admitted.toLocaleString(), accent: true },
					{ label: "Gates Active", value: "3", accent: false },
					{ label: "Avg Scan", value: "0.8s", accent: false },
				].map((s, i) => (
					<div
						key={s.label}
						style={{
							padding: "14px 18px",
							borderLeft: i > 0 ? "1px solid rgba(12,34,40,0.07)" : "none",
							textAlign: "center",
						}}
					>
						<AnimatePresence mode="wait">
							<motion.p
								key={s.value}
								initial={{ opacity: 0, y: 5 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -3 }}
								transition={{ duration: 0.22 }}
								style={{
									fontSize: "1.45rem",
									fontWeight: 700,
									lineHeight: 1,
									color: s.accent ? "var(--sea-ink)" : "rgba(12,34,40,0.65)",
								}}
							>
								{s.value}
							</motion.p>
						</AnimatePresence>
						<p
							style={{
								fontSize: "0.62rem",
								color: "rgba(12,34,40,0.36)",
								marginTop: 4,
								letterSpacing: "0.08em",
								textTransform: "uppercase",
							}}
						>
							{s.label}
						</p>
					</div>
				))}
			</div>

			{/* Revenue bar */}
			<div
				style={{
					padding: "12px 20px",
					borderTop: "1px solid rgba(12,34,40,0.07)",
					display: "flex",
					alignItems: "center",
					gap: 12,
					background: "#f7fafa",
				}}
			>
				<span
					style={{
						fontSize: "0.65rem",
						fontWeight: 600,
						color: "rgba(12,34,40,0.36)",
						letterSpacing: "0.1em",
						textTransform: "uppercase",
						flexShrink: 0,
					}}
				>
					Revenue
				</span>
				<div
					style={{
						flex: 1,
						height: 4,
						borderRadius: 2,
						background: "rgba(12,34,40,0.08)",
						overflow: "hidden",
					}}
				>
					<motion.div
						style={{
							height: "100%",
							borderRadius: 2,
							background:
								"linear-gradient(90deg, var(--lagoon), #0c2228)",
						}}
						initial={{ width: 0 }}
						animate={{ width: "72%" }}
						transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
					/>
				</div>
				<span
					style={{
						fontSize: "0.78rem",
						fontWeight: 700,
						color: "var(--sea-ink)",
						flexShrink: 0,
					}}
				>
					ETB 1.2M
				</span>
			</div>
		</motion.div>
	);
}
