"use client";

import {CircularProgressbar, buildStyles,} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  percent: number;
  label: string;
  color: string;
}

export default function StatusCircle({ percent, label, color }: Props) {
  return (
    <div className="flex flex-col justify-center items-center mt-8 font-bold">
      <div style={{ width: 110, height: 110}}>
        <CircularProgressbar
          value={percent}
          text={`${percent}%`}
          styles={buildStyles({
            pathColor: color,
            textColor: "#000",
            trailColor: "#D9D9D9",
          })}
        />
      </div>
      <p className=" p-4" style={{ color }}>
        {label}
      </p>
    </div>
  );
}
