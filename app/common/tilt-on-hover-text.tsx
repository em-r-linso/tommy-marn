import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";

type TiltOnHoverTextProps = {
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
};

export default function TiltOnHoverText(props: TiltOnHoverTextProps) {
	const { children, className, style } = props;

	return (
		<span
			style={style}
			className={clsx(
				"pointer-events-none inline-block whitespace-nowrap transition-transform duration-150 group-hover:[transform:rotate(10deg)]",
				className,
			)}
		>
			{children}
		</span>
	);
}
