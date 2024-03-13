"use client"
import { formatDistance } from 'date-fns';
import {
    ResponsiveContainer,
    ComposedChart,
    Bar,
    XAxis,
    Legend,
  } from 'recharts';

export function WeeklyStatsChart({ dayWiseIssueCount }: any) {
	const renderCustomBarLabel = ({ payload, x, y, width, height, value }: any) => {
		return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`${value}`}</text>;
	  };
	  const CustomXAxisTick = ({ x, y, payload }: any) => {
		return (
		  <g transform={`translate(${x},${y})`}>
			<text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
			  {formatDistance(new Date(payload.value), new Date(), { addSuffix: true })}
			</text>
		  </g>
		);
	  };
    return (
        <div style={{ width: '90%', height: 400 }} className="mr-auto border rounded p-4">
			<ResponsiveContainer>
				<ComposedChart
					data={dayWiseIssueCount}
					margin={{
					top: 20,
					right: 20,
					bottom: 20,
					left: 20,
					}}
				>
					<XAxis dataKey="date" tick={CustomXAxisTick}   />
					<Legend />
					<Bar name={" Books Issued per day"} type='monotone' dataKey="count" barSize={40} fill="#FFFFFF" label={renderCustomBarLabel} />
				</ComposedChart>
			</ResponsiveContainer>
      </div>
    )
}