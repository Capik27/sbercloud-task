import React from "react";
import style from "./Container.module.scss";

type Props = {
	children?: React.ReactNode;
	smallPadding?: boolean;
};

export const Container: React.FC<Props> = ({ children, smallPadding }) => {
	return (
		<div className={smallPadding ? style.main : style.create}>{children}</div>
	);
};
