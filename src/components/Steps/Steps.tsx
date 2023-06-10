import React from "react";
import style from "./Steps.module.scss";

type Props = {
	items: number;
	current: number;
	label?: boolean;
};

export const Steps: React.FC<Props> = ({ items, current, label }) => {
	if (current > items)
		return <span>{`Error: current ${current} > items ${items}`}</span>;

	const last = current === items;
	const list = new Array(items).fill(null);

	let width;
	if (current + 1 === items || last) {
		width = `98%`;
	} else if (current === 0) {
		width = `0%`;
	} else {
		const step = 100 / (items - 1);
		width = `${step * current - 1}%`;
	}
	const pstyle = { width };

	return (
		<div className={style.wrapper}>
			<div className={style.main}>
				{list.map((_, index) => {
					if (index < current) {
						return <div className={style.item_done} key={index} />;
					} else if (index === current) {
						if (last) {
							return <div className={style.item_done} key={index} />;
						} else {
							return <div className={style.item_process} key={index} />;
						}
					} else {
						return <div className={style.item_empty} key={index} />;
					}
				})}
				<span className={style.line} />
				<span className={style.progress} style={pstyle} />
			</div>
			{label && (
				<div className={style.main}>
					{list.map((_, index) => (
						<span
							className={index <= current ? style.text_done : style.text}
							key={index}
						>
							{index + 1}
						</span>
					))}
				</div>
			)}
		</div>
	);
};
