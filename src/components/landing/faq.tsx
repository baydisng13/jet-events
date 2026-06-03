import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "#/components/ui/accordion";
import { Reveal } from "./reveal";

const FAQS = [
	{
		q: "Which payment providers does Tutto support?",
		a: "Pesapal is integrated for card and mobile money checkout, and bank transfer flows are first-class for CBE, Awash, Dashen and similar local banks. Reach out for additional regional gateways — we'll talk through scope and timing.",
	},
	{
		q: "Can we sell tickets in ETB and accept payments in another currency?",
		a: "Pricing and reconciliation are denominated in ETB. If you need a multi-currency presentation layer for international attendees, mention it in your demo — we'll align on the right approach for your event.",
	},
	{
		q: "Does scanning need a stable internet connection at the venue?",
		a: "Scanning runs in the browser on any phone or tablet, so it works wherever your network does. We'll talk you through gate placement, fallback procedures and the right device count for your throughput.",
	},
	{
		q: "How do exhibitors fit into the platform?",
		a: "Exhibitors live alongside your main event — you onboard each company, import their attendees, and manage their orders without leaving the workspace.",
	},
	{
		q: "Is white-label branding included?",
		a: "Branding via primary color and logo is included in every tier. Full white-label deployments — including a custom domain and removal of Tutto marks — are part of the Enterprise tier.",
	},
	{
		q: "Who owns the attendee data?",
		a: "You do. Attendee, order and payment data is yours to export at any time. Talk to us about specific data residency or retention requirements during onboarding.",
	},
];

export function Faq() {
	return (
		<section id="faq" className="section" aria-labelledby="faq-heading">
			<div className="page-wrap">
				<div className="grid lg:grid-cols-12 gap-10">
					<div className="lg:col-span-4">
						<Reveal>
							<div className="eyebrow mb-4">Questions</div>
						</Reveal>
						<Reveal delay={0.05}>
							<h2
								id="faq-heading"
								className="display-title text-[2.2rem] sm:text-[2.6rem] leading-[1.04] font-medium text-ink"
							>
								Answers before you book the demo.
							</h2>
						</Reveal>
						<Reveal delay={0.1}>
							<p className="prose-balance mt-4 text-ink-soft text-[1rem]">
								Anything not here? Send the question on the demo form &mdash;
								we'll have an honest answer ready.
							</p>
						</Reveal>
					</div>

					<div className="lg:col-span-8">
						<Reveal delay={0.1}>
							<div className="surface-card p-2 sm:p-4">
								<Accordion type="single" collapsible className="w-full">
									{FAQS.map((item, i) => (
										<AccordionItem
											key={item.q}
											value={`item-${i}`}
											className="px-3 sm:px-4"
										>
											<AccordionTrigger className="text-ink text-[1.02rem] font-semibold hover:no-underline">
												{item.q}
											</AccordionTrigger>
											<AccordionContent className="text-ink-soft text-[0.96rem] leading-relaxed prose-balance pb-5">
												{item.a}
											</AccordionContent>
										</AccordionItem>
									))}
								</Accordion>
							</div>
						</Reveal>
					</div>
				</div>
			</div>
		</section>
	);
}
