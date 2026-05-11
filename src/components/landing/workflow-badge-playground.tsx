import { useReducedMotion } from "motion/react";
import { lazy, Suspense, useEffect, useId, useState } from "react";
import { cn } from "#/lib/utils";
import {
	type WorkflowBadgeData,
	WORKFLOW_BADGE_DATA,
} from "./workflow-badge-data";

export type { WorkflowBadgeData } from "./workflow-badge-data";

const WorkflowBadgeR3fTable = lazy(() =>
	import("./workflow-badge-r3f-table").then((m) => ({
		default: m.WorkflowBadgeR3fTable,
	})),
);

function BadgeCanvasFallback({
	className,
	label = "Loading interactive badges...",
}: {
	className?: string;
	label?: string;
}) {
	return (
		<div
			className={cn(
				"absolute inset-0 overflow-hidden rounded-2xl bg-[linear-gradient(165deg,#070b12_0%,#0f1729_48%,#0a0e18_100%)]",
				className,
			)}
			role="img"
			aria-label="Static preview of five Jet Events lanyard badges"
		>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.55]"
				style={{
					backgroundImage:
						"radial-gradient(circle at center, rgba(148,163,184,0.11) 0.6px, transparent 0.65px)",
					backgroundSize: "20px 20px",
				}}
				aria-hidden
			/>
			<div className="relative flex h-full items-center justify-center px-3 py-7 sm:px-7">
				<div className="flex w-full max-w-5xl items-start justify-center gap-2 sm:gap-4">
					{WORKFLOW_BADGE_DATA.map((badge, index) => (
						<StaticBadge
							key={badge.id}
							badge={badge}
							className={cn(index % 2 === 0 ? "mt-3" : "mt-0", index === 2 && "mt-6")}
						/>
					))}
				</div>
			</div>
			<p className="sr-only">{label}</p>
		</div>
	);
}

function ClientBadgeCanvas() {
	const [ready, setReady] = useState(false);
	useEffect(() => {
		setReady(true);
	}, []);
	if (!ready) return <BadgeCanvasFallback />;
	return (
		<Suspense fallback={<BadgeCanvasFallback />}>
			<div className="absolute inset-0 h-full w-full min-h-0">
				<WorkflowBadgeR3fTable />
			</div>
		</Suspense>
	);
}

function StaticBadge({
	badge,
	className,
}: {
	badge: WorkflowBadgeData;
	className?: string;
}) {
	return (
		<div className={cn("flex min-w-0 flex-col items-center", className)}>
			<div className="h-10 w-3 rounded-full bg-[#c21f2b] shadow-[inset_1px_0_rgba(255,255,255,0.32)] sm:h-14 sm:w-4" />
			<div className="-mt-1 h-3 w-5 rounded-b-full border border-zinc-400 bg-zinc-200 shadow-sm" />
			<div
				className="relative aspect-[0.66] w-[4.15rem] overflow-hidden rounded-[13px] border shadow-[0_18px_34px_-18px_rgba(8,30,28,0.55)] sm:w-[6.1rem]"
				style={{
					background: badge.cardColor,
					color: badge.inkColor,
					borderColor:
						badge.variant === "paper"
							? "rgba(20,20,20,0.12)"
							: "rgba(255,255,255,0.2)",
				}}
			>
				<div className="flex h-[24%] items-center justify-center px-2 text-center text-[0.44rem] font-black uppercase tracking-[0.16em] sm:text-[0.58rem]">
					{badge.event}
				</div>
				<div
					className="relative flex h-[43%] items-center justify-center overflow-hidden"
					style={{ background: badge.bandColor }}
				>
					<div
						className="h-12 w-12 rotate-45 rounded-[18px] border-[9px] sm:h-16 sm:w-16 sm:border-[12px]"
						style={{ borderColor: badge.accent }}
					/>
					<div
						className="absolute h-16 w-2 -rotate-45 rounded-full sm:h-24 sm:w-3"
						style={{ background: badge.accent }}
					/>
				</div>
				<div className="flex h-[33%] flex-col justify-end px-2 pb-2 text-left sm:px-3 sm:pb-3">
					<div className="truncate font-display text-[0.58rem] font-semibold leading-none sm:text-[0.8rem]">
						{badge.name}
					</div>
					<div className="mt-1 truncate text-[0.43rem] font-bold uppercase tracking-[0.16em] opacity-70 sm:text-[0.56rem]">
						{badge.role}
					</div>
				</div>
			</div>
		</div>
	);
}

export function WorkflowBadgePlayground({
	className,
	headingId,
}: {
	className?: string;
	headingId: string;
}) {
	const reduce = useReducedMotion();
	const uid = useId();

	return (
		<div
			className={cn(
				"surface-card-strong w-full max-w-none overflow-hidden p-4 sm:p-5",
				className,
			)}
		>
			<div className="flex flex-wrap items-end justify-between gap-2">
				<div>
					<p className="text-[0.68rem] font-semibold uppercase tracking-wider text-ink-soft">
						Interactive event badges
					</p>
					<p id={`${uid}-hint`} className="mt-0.5 text-sm text-ink-soft">
						{reduce
							? "Five badge previews are shown without motion."
							: "Drag a badge by mouse or touch; release it to let the lanyard physics swing back."}
					</p>
				</div>
				<p className="text-[0.7rem] text-ink-soft/90">
					{reduce ? "" : "Touch or mouse · grab a card"}
				</p>
			</div>

			<div
				className={cn(
					"relative mt-4 w-full overflow-hidden rounded-2xl border border-white/[0.08]",
					reduce
						? "min-h-[360px]"
						: "min-h-[min(560px,calc(100vw-1.5rem))] sm:min-h-[500px]",
				)}
				style={{
					background:
						"linear-gradient(168deg, #080d16 0%, #111827 42%, #0c1220 100%)",
					boxShadow:
						"inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 0 rgba(0,0,0,0.45)",
				}}
				role="img"
				aria-labelledby={headingId}
				aria-describedby={`${uid}-hint`}
			>
				<div
					className="pointer-events-none absolute inset-0 opacity-[0.4]"
					aria-hidden
					style={{
						backgroundImage:
							"radial-gradient(circle at center, rgba(226,232,240,0.07) 0.55px, transparent 0.6px)",
						backgroundSize: "18px 18px",
					}}
				/>
				<div
					className="pointer-events-none absolute inset-[6%] rounded-[24px] bg-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
					aria-hidden
				/>

				{reduce ? (
					<BadgeCanvasFallback label="Static badge preview for reduced motion" />
				) : (
					<div className="relative h-[min(560px,calc(100vw-1.5rem))] w-full min-h-0 sm:h-[500px]">
						<ClientBadgeCanvas />
					</div>
				)}
			</div>
		</div>
	);
}
