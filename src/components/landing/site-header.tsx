import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { JetMark } from "./jet-mark";

const NAV = [
	{ href: "#features", label: "Platform" },
	{ href: "#workflows", label: "Workflows" },
	{ href: "#pricing", label: "Pricing" },
	{ href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		const close = () => setOpen(false);
		window.addEventListener("hashchange", close);
		return () => window.removeEventListener("hashchange", close);
	}, []);

	return (
		<header
			className="sticky top-0 z-40 transition-colors"
			style={{
				backgroundColor: scrolled ? "var(--header-bg)" : "transparent",
				backdropFilter: scrolled ? "saturate(140%) blur(10px)" : undefined,
				WebkitBackdropFilter: scrolled
					? "saturate(140%) blur(10px)"
					: undefined,
				borderBottom: scrolled
					? "1px solid var(--line)"
					: "1px solid transparent",
			}}
		>
			<a href="#main" className="skip-link">
				Skip to content
			</a>

			<div className="page-wrap flex items-center justify-between py-3">
				<a
					href="/"
					className="flex items-center gap-2.5 no-underline"
					aria-label="Tutto home"
				>
					<JetMark className="size-8" />
					<span
						className="font-bold tracking-tight text-[1.08rem]"
						style={{ color: "var(--sea-ink)" }}
					>
						Tutto
					</span>
				</a>

				<nav aria-label="Primary" className="hidden md:flex items-center gap-7">
					{NAV.map((item) => (
						<a
							key={item.href}
							href={item.href}
							className="relative text-sm font-medium text-ink-soft hover:text-ink no-underline transition-colors after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[color:var(--lagoon)] after:transition-transform hover:after:scale-x-100"
						>
							{item.label}
						</a>
					))}
				</nav>

				<div className="hidden md:flex items-center gap-2">
					<a
						href="#login"
						className="text-sm font-medium text-ink-soft hover:text-ink no-underline px-3 py-2"
					>
						Sign in
					</a>
					<a
						href="#cta"
						className="inline-flex items-center justify-center rounded-xs h-9 px-4 text-[0.77rem] uppercase tracking-[0.08em] font-semibold no-underline border hover:bg-[rgba(79,184,178,0.12)]"
						style={{ color: "var(--lagoon)", borderColor: "var(--lagoon)" }}
					>
						Book a demo
					</a>
				</div>

				<button
					type="button"
					className="md:hidden inline-flex items-center justify-center rounded-xs size-9 border border-[color:var(--line)] bg-white/80 text-ink"
					onClick={() => setOpen((v) => !v)}
					aria-label="Toggle menu"
					aria-expanded={open}
				>
					{open ? <X className="size-4" /> : <Menu className="size-4" />}
				</button>
			</div>

			{open && (
				<div className="md:hidden border-t border-[color:var(--line)] bg-[color:var(--header-bg)] backdrop-blur">
					<div className="page-wrap flex flex-col gap-1 py-3">
						{NAV.map((item) => (
							<a
								key={item.href}
								href={item.href}
								className="text-sm font-medium text-ink-soft hover:text-ink no-underline px-2 py-2.5 rounded-md"
							>
								{item.label}
							</a>
						))}
						<div className="flex items-center gap-2 pt-2">
							<a
								href="#login"
								className="flex-1 text-center text-sm font-semibold text-ink no-underline rounded-xs h-9 inline-flex items-center justify-center border border-[color:var(--line)] hover:border-[color:var(--lagoon)]"
							>
								Sign in
							</a>
							<a
								href="#cta"
								className="flex-1 text-center inline-flex items-center justify-center rounded-xs h-9 text-[0.75rem] uppercase tracking-[0.08em] font-semibold no-underline border hover:bg-[rgba(79,184,178,0.12)]"
								style={{ color: "var(--lagoon)", borderColor: "var(--lagoon)" }}
							>
								Book a demo
							</a>
						</div>
					</div>
				</div>
			)}
		</header>
	);
}
