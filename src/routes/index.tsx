import { createFileRoute } from "@tanstack/react-router";
import { CtaSection } from "#/components/landing/cta-section";
import { Faq } from "#/components/landing/faq";
import { Features } from "#/components/landing/features";
import { Hero } from "#/components/landing/hero";
import { Momentum } from "#/components/landing/momentum";
import { Pricing } from "#/components/landing/pricing";
import { Problem } from "#/components/landing/problem";
import { SiteFooter } from "#/components/landing/site-footer";
import { SiteHeader } from "#/components/landing/site-header";
import { TrustStrip } from "#/components/landing/trust-strip";
import { Workflows } from "#/components/landing/workflows";

export const Route = createFileRoute("/")({
	component: Home,
	head: () => ({
		meta: [
			{ title: "Jet Events — Operating system for conferences & exhibitions" },
			{
				name: "description",
				content:
					"Jet Events gives Ethiopian event organizers one place to launch ticket sales, run onsite registration, validate badges at the door, and report on exhibitors. Pricing in ETB.",
			},
			{
				property: "og:title",
				content: "Jet Events — Operating system for conferences & exhibitions",
			},
			{
				property: "og:description",
				content:
					"One platform for the entire event lifecycle. Ticketing, onsite, scanning and exhibitors — built for Ethiopian organizers.",
			},
		],
	}),
});

function Home() {
	return (
		<>
			<SiteHeader />
			<main>
				<Hero />
				<TrustStrip />
				<Problem />
				<Features />
				<Workflows />
				<Momentum />
				<Pricing />
				<Faq />
				<CtaSection />
			</main>
			<SiteFooter />
		</>
	);
}
