import { Reveal } from "./reveal";
import { WorkflowBadgePlayground } from "./workflow-badge-playground";
import {
	WorkflowAttendee,
	WorkflowBudget,
	WorkflowEndToEnd,
	WorkflowPurchasing,
	WorkflowScanning,
} from "./workflow-blocks";

export function Workflows() {
	return (
		<section
			id="workflows"
			className="section"
			aria-labelledby="workflows-heading"
		>
			<div className="page-wrap">
				<div className="max-w-2xl">
					<Reveal>
						<div className="eyebrow mb-3">Workflows</div>
					</Reveal>
					<Reveal delay={0.05}>
						<h2
							id="workflows-heading"
							className="display-title text-[2rem] sm:text-[2.5rem] leading-[1.05] font-medium text-ink"
						>
							From badge pickup to balance sheet — one calm surface.
						</h2>
					</Reveal>
					<Reveal delay={0.1}>
						<p className="prose-balance mt-3 text-ink-soft text-base sm:text-[1.05rem]">
							A tighter read than role-by-role tabs: the whole story at a
							glance, with small motions that cue what each role feels in the
							product.
						</p>
					</Reveal>
				</div>

				<a href="#workflow-end-to-end" className="skip-link">
					Skip interactive badge table
				</a>

				<div className="mt-8">
					<WorkflowBadgePlayground headingId="workflows-heading" />
				</div>

				<div className="mt-8 grid gap-4 lg:gap-5">
					<WorkflowEndToEnd />

					<div className="grid gap-4 md:grid-cols-2">
						<WorkflowScanning />
						<WorkflowAttendee />
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						<WorkflowBudget />
						<WorkflowPurchasing />
					</div>
				</div>
			</div>
		</section>
	);
}
