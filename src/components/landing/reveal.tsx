import type { HTMLMotionProps } from "motion/react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = HTMLMotionProps<"div"> & {
	children: ReactNode;
	delay?: number;
	y?: number;
	once?: boolean;
	amount?: number;
};

export function Reveal({
	children,
	delay = 0,
	y = 18,
	once = true,
	amount = 0.25,
	...rest
}: RevealProps) {
	const reduce = useReducedMotion();

	if (reduce) {
		return (
			<div {...(rest as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once, amount }}
			transition={{
				duration: 0.7,
				delay,
				ease: [0.16, 1, 0.3, 1],
			}}
			{...rest}
		>
			{children}
		</motion.div>
	);
}

type StaggerProps = {
	children: ReactNode;
	className?: string;
	stagger?: number;
	delay?: number;
	once?: boolean;
};

export function Stagger({
	children,
	className,
	stagger = 0.08,
	delay = 0,
	once = true,
}: StaggerProps) {
	const reduce = useReducedMotion();

	if (reduce) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			className={className}
			initial="hidden"
			whileInView="visible"
			viewport={{ once, amount: 0.2 }}
			variants={{
				hidden: {},
				visible: {
					transition: {
						staggerChildren: stagger,
						delayChildren: delay,
					},
				},
			}}
		>
			{children}
		</motion.div>
	);
}

type StaggerItemProps = HTMLMotionProps<"div"> & {
	children: ReactNode;
	y?: number;
};

export function StaggerItem({ children, y = 14, ...rest }: StaggerItemProps) {
	const reduce = useReducedMotion();

	if (reduce) {
		return (
			<div {...(rest as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>
		);
	}

	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y },
				visible: {
					opacity: 1,
					y: 0,
					transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
				},
			}}
			{...rest}
		>
			{children}
		</motion.div>
	);
}
