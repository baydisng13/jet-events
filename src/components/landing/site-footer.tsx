import { JetMark } from "./jet-mark";

const COLS: Array<{
	heading: string;
	links: Array<{ label: string; href: string }>;
}> = [
	{
		heading: "Platform",
		links: [
			{ label: "Event setup", href: "#features" },
			{ label: "Checkout & payments", href: "#features" },
			{ label: "Onsite & badges", href: "#features" },
			{ label: "Door scanning", href: "#features" },
			{ label: "Exhibitors", href: "#features" },
		],
	},
	{
		heading: "Company",
		links: [
			{ label: "Pricing", href: "#pricing" },
			{ label: "Workflows", href: "#workflows" },
			{ label: "FAQ", href: "#faq" },
			{ label: "Book a demo", href: "#cta" },
		],
	},
	{
		heading: "Legal",
		links: [
			{ label: "Terms (placeholder)", href: "#" },
			{ label: "Privacy (placeholder)", href: "#" },
			{ label: "Data processing (placeholder)", href: "#" },
		],
	},
];

export function SiteFooter() {
	const year = new Date().getFullYear();

	return (
		<footer className="site-footer mt-6">
			<div className="page-wrap py-12">
				<div className="grid lg:grid-cols-12 gap-10">
					<div className="lg:col-span-4">
						<div className="flex items-center gap-2.5">
							<JetMark className="size-8" />
							<span className="text-ink font-semibold tracking-tight text-[1.05rem]">
								Jet Events
							</span>
						</div>
						<p className="prose-balance mt-4 text-ink-soft text-[0.95rem] max-w-sm">
							The operating system for conferences, exhibitions and trade fairs
							across Ethiopia. Built for organizers who care about the
							day-of-event details.
						</p>
						<p className="mt-4 text-[0.78rem] text-ink-soft">
							Addis Ababa &middot; Ethiopia
						</p>
					</div>

					<nav
						aria-label="Footer"
						className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8"
					>
						{COLS.map((col) => (
							<div key={col.heading}>
								<h2 className="text-[0.72rem] uppercase tracking-wider font-bold text-palm">
									{col.heading}
								</h2>
								<ul className="mt-3 grid gap-2">
									{col.links.map((l) => (
										<li key={l.label}>
											<a
												href={l.href}
												className="text-[0.92rem] text-ink-soft hover:text-ink no-underline"
											>
												{l.label}
											</a>
										</li>
									))}
								</ul>
							</div>
						))}
					</nav>
				</div>

				<div className="fine-divider mt-10" />

				<div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[0.82rem] text-ink-soft">
					<span>&copy; {year} Jet Events. All rights reserved.</span>
					<span className="opacity-80">
						Pricing in Ethiopian Birr. Subject to scope confirmation.
					</span>
				</div>
			</div>
		</footer>
	);
}
