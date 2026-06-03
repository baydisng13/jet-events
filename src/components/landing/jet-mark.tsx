import { useId } from "react";

type Props = {
	className?: string;
	title?: string;
};

export function JetMark({ className, title = "Tutto" }: Props) {
	const uid = useId();
	const bg = `${uid}bg`;
	const rim = `${uid}rim`;

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
				{/* Deep radial — bright teal at upper-left, near-black at edges */}
				<radialGradient
					id={bg}
					cx="13"
					cy="11"
					r="30"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0%" stopColor="#2e7e90" />
					<stop offset="55%" stopColor="#17505e" />
					<stop offset="100%" stopColor="#0b2028" />
				</radialGradient>
				{/* Subtle highlight for the inset rim */}
				<radialGradient
					id={rim}
					cx="20%"
					cy="18%"
					r="62%"
					gradientUnits="objectBoundingBox"
				>
					<stop offset="0%" stopColor="white" stopOpacity="0.13" />
					<stop offset="100%" stopColor="white" stopOpacity="0" />
				</radialGradient>
			</defs>

			{/* Background */}
			<rect
				x="0.75"
				y="0.75"
				width="38.5"
				height="38.5"
				rx="11"
				fill={`url(#${bg})`}
			/>
			{/* Rim highlight + border */}
			<rect
				x="0.75"
				y="0.75"
				width="38.5"
				height="38.5"
				rx="11"
				fill={`url(#${rim})`}
				stroke="rgba(255,255,255,0.13)"
				strokeWidth="0.9"
			/>

			{/* T — crossbar */}
			<rect
				x="7.5"
				y="9"
				width="25"
				height="7.5"
				rx="3.75"
				fill="white"
				fillOpacity="0.96"
			/>
			{/* T — stem (overlaps crossbar at top; bottom rounds into a pill foot) */}
			<rect
				x="16.25"
				y="9"
				width="7.5"
				height="22.5"
				rx="3.25"
				fill="white"
				fillOpacity="0.96"
			/>

			{/* Accent dot */}
			<circle cx="20" cy="36" r="2.25" fill="white" fillOpacity="0.55" />
		</svg>
	);
}
