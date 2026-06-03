type Props = {
	className?: string;
	title?: string;
};

export function JetMark({ className, title = "Tutto" }: Props) {
	return (
		<svg
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label={title}
			className={className}
		>
			<title>{title}</title>
			<defs>
				<linearGradient
					id="jet-mark-fill"
					x1="6"
					y1="6"
					x2="34"
					y2="34"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" stopColor="#3aa39c" />
					<stop offset="1" stopColor="#2f6a4a" />
				</linearGradient>
				<linearGradient
					id="jet-mark-edge"
					x1="6"
					y1="6"
					x2="34"
					y2="34"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" stopColor="#9be9d9" stopOpacity="0.9" />
					<stop offset="1" stopColor="#173a40" stopOpacity="0.5" />
				</linearGradient>
			</defs>
			<rect
				x="2.5"
				y="2.5"
				width="35"
				height="35"
				rx="10"
				fill="url(#jet-mark-fill)"
				stroke="url(#jet-mark-edge)"
				strokeWidth="0.8"
			/>
			<path
				d="M11 25.5 L20 11 L29 25.5 L24.2 25.5 L20 18.4 L15.8 25.5 Z"
				fill="white"
				fillOpacity="0.96"
			/>
			<circle cx="20" cy="29.5" r="1.6" fill="white" fillOpacity="0.85" />
		</svg>
	);
}
