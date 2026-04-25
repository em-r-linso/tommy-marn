import clsx from "clsx";
import type { ReactNode } from "react";

type TiltOnHoverTextProps = {
	children: ReactNode;
	className?: string;
};

export default function TiltOnHoverText(props: TiltOnHoverTextProps) {
	const { children, className } = props;

	return (
		<span
			className={clsx(
				"pointer-events-none inline-block whitespace-nowrap transition-transform duration-150 group-hover:[transform:rotate(10deg)]",
				className,
			)}
		>
			{children}
		</span>
	);
}
