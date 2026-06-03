import { Check } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./reveal";

function GatewayRow({
	name,
	connected,
	showKeyInput,
}: {
	name: string;
	connected?: boolean;
	showKeyInput?: boolean;
}) {
	return (
		<div
			className="flex items-center gap-3 px-6 py-3"
			style={{ borderBottom: "1px solid var(--line)" }}
		>
			<span
				className="size-2 rounded-full shrink-0"
				style={{
					background: connected
						? "rgb(52 211 153)"
						: "var(--line)",
				}}
			/>
			<span className="text-[0.88rem] font-medium text-ink flex-1">{name}</span>
			{connected ? (
				<span
					className="text-[0.72rem] font-semibold"
					style={{ color: "var(--lagoon-deep)" }}
				>
					Connected ✓
				</span>
			) : showKeyInput ? (
				<div className="flex items-center gap-1.5">
					<span
						className="text-[0.62rem] font-mono px-2 py-1 rounded"
						style={{
							background:
								"color-mix(in oklab, var(--sea-ink) 5%, transparent)",
							border: "1px solid var(--line)",
							color: "var(--sea-ink-soft)",
						}}
					>
						sk_live_••••••••••••
					</span>
					<button
						type="button"
						className="text-[0.68rem] font-semibold px-2.5 py-1 rounded"
						style={{ background: "var(--lagoon)", color: "white" }}
					>
						Connect
					</button>
				</div>
			) : (
				<button
					type="button"
					className="text-[0.72rem] font-semibold text-ink-soft"
				>
					Connect →
				</button>
			)}
		</div>
	);
}

function GatewayPanel() {
	return (
		<div className="rounded-2xl overflow-hidden surface-card-strong">
			<div
				className="px-6 py-4 flex items-center justify-between"
				style={{
					borderBottom: "1px solid var(--line)",
					background:
						"color-mix(in oklab, var(--sea-ink) 4%, var(--surface-strong))",
				}}
			>
				<div>
					<p className="text-[0.95rem] font-semibold text-ink">
						Payment gateways
					</p>
					<p className="text-[0.78rem] text-ink-soft mt-0.5">
						Connect your own accounts. Settlement goes directly to you.
					</p>
				</div>
				<span className="tag-chip">Direct settlement</span>
			</div>

			{/* Local section */}
			<div
				className="px-6 py-2"
				style={{
					borderBottom: "1px solid var(--line)",
					background:
						"color-mix(in oklab, var(--sea-ink) 3%, transparent)",
				}}
			>
				<p className="text-[0.62rem] font-bold uppercase tracking-widest text-ink-soft">
					Ethiopia · Local
				</p>
			</div>
			<GatewayRow name="Telebirr" connected />
			<GatewayRow name="CBE Birr" connected />
			<GatewayRow name="Awash Pay" />
			<GatewayRow name="Amole · HelloCash" />

			{/* International section */}
			<div
				className="px-6 py-2"
				style={{
					borderBottom: "1px solid var(--line)",
					background:
						"color-mix(in oklab, var(--sea-ink) 3%, transparent)",
				}}
			>
				<p className="text-[0.62rem] font-bold uppercase tracking-widest text-ink-soft">
					International
				</p>
			</div>
			<GatewayRow name="Stripe" showKeyInput />
			<GatewayRow name="PayPal" />
			<GatewayRow name="Pesapal · Visa · Mastercard" />

			{/* Footer */}
			<div
				className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
				style={{
					borderTop: "1px solid var(--line)",
					background:
						"color-mix(in oklab, var(--lagoon) 6%, var(--surface-strong))",
				}}
			>
				<div className="flex items-center gap-2">
					<span
						className="size-2 rounded-full"
						style={{ background: "rgb(52 211 153)" }}
					/>
					<span className="text-[0.82rem] text-ink-soft">Tutto holds</span>
					<span className="text-[0.88rem] font-bold text-ink">ETB 0.00</span>
					<span className="text-[0.78rem] text-ink-soft">— always</span>
				</div>
				<p className="text-[0.75rem] text-ink-soft">
					Every sale settles directly into your connected account
				</p>
			</div>
		</div>
	);
}

export function PaymentsSection() {
	return (
		<section
			className="section"
			id="payments"
			aria-labelledby="payments-heading"
			style={{
				background:
					"color-mix(in oklab, var(--lagoon) 3%, var(--background))",
				borderTop: "1px solid var(--line)",
			}}
		>
			<div className="page-wrap">
				<div className="grid lg:grid-cols-12 gap-12 items-start">
					{/* Left */}
					<div className="lg:col-span-5">
						<Reveal>
							<div className="eyebrow mb-4">Payments</div>
						</Reveal>
						<Reveal delay={0.05}>
							<h2
								id="payments-heading"
								className="display-title text-[2rem] sm:text-[2.4rem] leading-[1.05] font-medium text-ink"
							>
								Any gateway.{" "}
								<span className="text-lagoon">
									Every birr lands in your account.
								</span>
							</h2>
						</Reveal>
						<Reveal delay={0.1}>
							<p className="prose-balance mt-5 text-ink-soft text-[1.02rem] max-w-md">
								Connect your own Stripe, Pesapal or Telebirr account and give us
								the keys. The moment a ticket sells, the money settles straight
								to you. Tutto is never in the payment chain.
							</p>
						</Reveal>

						<Stagger className="mt-8 space-y-4" delay={0.15}>
							{[
								{
									title: "5+ local methods",
									body: "Telebirr, CBE Birr, Awash Pay, Amole, HelloCash and more — all under one dashboard.",
								},
								{
									title: "International ready",
									body: "Stripe, PayPal, Pesapal. Visa and Mastercard accepted globally. Any processor you already have an account with.",
								},
								{
									title: "Zero custody",
									body: "Tutto holds ETB 0. Your keys, your gateway, your settlement. We're the software — not the bank.",
								},
							].map((p) => (
								<StaggerItem key={p.title}>
									<div className="flex gap-3 items-start">
										<span
											className="mt-0.5 size-5 rounded-full flex items-center justify-center shrink-0"
											style={{
												background:
													"color-mix(in oklab, var(--lagoon) 15%, transparent)",
											}}
										>
											<Check
												className="size-3"
												style={{ color: "var(--lagoon)" }}
												strokeWidth={3}
											/>
										</span>
										<div>
											<span className="text-[0.97rem] font-semibold text-ink">
												{p.title}
											</span>
											<span className="text-[0.97rem] text-ink-soft">
												{" "}
												— {p.body}
											</span>
										</div>
									</div>
								</StaggerItem>
							))}
						</Stagger>
					</div>

					{/* Right */}
					<Reveal className="lg:col-span-7" delay={0.12}>
						<GatewayPanel />
					</Reveal>
				</div>
			</div>
		</section>
	);
}
