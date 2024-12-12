import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return `${date.getDate()}/${date.getMonth() + 1}`;
};

const TemperatureGraph = ({ data }) => {
    console.log("🚀 ~ TemperatureGraph ~ data:", data);
    return (
        <ResponsiveContainer width="100%" height={150}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tickFormatter={formatXAxis} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="temp" stroke="#8884d8" />
                {/* <Line type="monotone" dataKey="feels_like" stroke="#82ca9d" /> */}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default TemperatureGraph;
