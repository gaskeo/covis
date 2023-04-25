import React, {RefObject} from "react";
import styles from "../styles/tooltip.module.css";

interface TooltipProps {
    title: React.ReactNode;
    text: React.ReactNode;
    subtext?: React.ReactNode;
    tooltipRef?: RefObject<HTMLDivElement>
}

const Tooltip = ({title, text, subtext, tooltipRef}: TooltipProps) => {
    return (
        <div className={styles.tooltip} ref={tooltipRef}>
            <p className={styles.title}>{title}</p>
            <span>{text}</span>
            {subtext && <p className={styles.subtext}>{subtext}</p>}
        </div>
    );
}

interface AbsoluteTooltipProps extends TooltipProps {
    position: {top: number | string, left: number | string};
}

const AbsoluteTooltip = ({title, text, tooltipRef, position}: AbsoluteTooltipProps) => {
    return (
        <div
            className={`${styles.tooltip} ${styles.absoluteTooltip}`}
            ref={tooltipRef}
            style={{...position}}
        >
            <p>{title}</p>
            <span>{text}</span>
        </div>
    );
}

export default Tooltip;
export {AbsoluteTooltip};
