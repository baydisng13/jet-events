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
					aria-label="Jet Events home"
				>
					<JetMark className="size-8" />
					<span className="text-ink font-semibold tracking-tight text-[1.05rem]">
						Jet Events
					</span>
				</a>

				<nav aria-label="Primary" className="hidden md:flex items-center gap-7">
					{NAV.map((item) => (
						<a
							key={item.href}
							href={item.href}
							className="nav-link text-sm font-medium no-underline"
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
						className="btn-primary-brand inline-flex items-center justify-center rounded-lg h-9 px-4 text-sm font-semibold no-underline"
					>
						Book a demo
					</a>
				</div>

				<button
					type="button"
					className="md:hidden inline-flex items-center justify-center rounded-md size-9 hairline bg-white"
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
								className="flex-1 text-center text-sm font-semibold text-ink no-underline btn-secondary-brand rounded-lg h-9 inline-flex items-center justify-center"
							>
								Sign in
							</a>
							<a
								href="#cta"
								className="flex-1 text-center btn-primary-brand inline-flex items-center justify-center rounded-lg h-9 text-sm font-semibold no-underline"
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
