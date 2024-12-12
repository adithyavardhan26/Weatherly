import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getFormattedLocalDateTime } from "../../utils/widgetUtils";

const TinyWeather = ({ weatherData, primaryWeather }) => {
    const [timeData, setTimeData] = useState({
        formattedLocalTime: "",
        formattedLocalDate: "",
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            const utcTime = new Date().getTime();
            const utcOffset = weatherData.timezone * 1000;
            const { formattedLocalTime, formattedLocalDate } = getFormattedLocalDateTime(
                utcTime,
                utcOffset
            );
            setTimeData({ formattedLocalTime, formattedLocalDate });
        }, 1000); // Update every second

        return () => clearInterval(intervalId);
    }, [weatherData.timezone]);

    return (
        <Box
            sx={{
                backgroundColor: "#D3D3D3",
                opacity: "0.9",
                borderRadius: "10px",
                padding: "10px",
                textAlign: "center",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                boxSizing: "border-box",
            }}
        >
            <Box display="flex" alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                    {weatherData.name}
                </Typography>
                <LocationOnIcon fontSize="small" sx={{ marginLeft: "4px" }} />
            </Box>
            <Typography variant="h4" fontWeight="bold">
                {Math.round(weatherData.main.temp)}°C
            </Typography>

            {/* Display Current Date & Time */}
            <Typography variant="subtitle2" color="#333">
                (Current Date & Time)
            </Typography>
            <Typography variant="subtitle2" color="#333">
                {timeData.formattedLocalDate}
            </Typography>
            <Typography variant="subtitle2" color="#333">
                {timeData.formattedLocalTime}
            </Typography>
        </Box>
    );
};

export default TinyWeather;
