import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { getFormattedLocalDateTime } from "../../utils/widgetUtils";

const LargeWeather = ({ weatherData, primaryWeather }) => {
    const formatTimeWithOffset = (timestamp, offset) => {
        const date = new Date((timestamp + offset) * 1000);
        let hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;
    };

    const utcOffset = weatherData.timezone; // Offset in seconds
    const formattedSunrise = formatTimeWithOffset(weatherData.sys.sunrise, utcOffset);
    const formattedSunset = formatTimeWithOffset(weatherData.sys.sunset, utcOffset);

    const [timeData, setTimeData] = useState({
        formattedLocalTime: "",
        formattedLocalDate: "",
    });

    // Effect to update time every second
    useEffect(() => {
        const intervalId = setInterval(() => {
            const utcTime = new Date().getTime();
            const offset = weatherData.timezone * 1000;
            const { formattedLocalTime, formattedLocalDate } = getFormattedLocalDateTime(
                utcTime,
                offset
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
                padding: "15px",
                textAlign: "center",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxSizing: "border-box",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "10px",
                }}
            >
                <Box display="flex" alignItems="center">
                    <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "20px" }}>
                        {weatherData.name}
                    </Typography>
                    <LocationOnIcon fontSize="small" sx={{ marginLeft: "4px" }} />
                </Box>
                <Typography variant="h3" fontWeight="bold" sx={{ fontSize: "32px" }}>
                    {Math.round(weatherData.main.temp)}°C
                </Typography>
            </Box>

            <Box>
                <img
                    src={`http://openweathermap.org/img/wn/${primaryWeather.icon}@2x.png`}
                    alt={primaryWeather.description}
                    style={{ width: "80px" }}
                />
            </Box>

            <Typography
                variant="body1"
                sx={{
                    fontStyle: "italic",
                    fontSize: "18px",
                    color: "#333",
                }}
            >
                {primaryWeather.description}
            </Typography>

            <Box
                sx={{
                    marginTop: "10px",
                    marginBottom: "10px",
                }}
            >
                <Typography variant="body2" color="#333">
                    (Local Date & Time)
                </Typography>
                <Typography variant="body2" color="#333">
                    {timeData.formattedLocalDate}
                </Typography>
                <Typography variant="body2" color="#333">
                    {timeData.formattedLocalTime}
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "10px",
                }}
            >
                <Typography variant="body1">
                    H: {Math.round(weatherData.main.temp_max)}°C | L:{" "}
                    {Math.round(weatherData.main.temp_min)}°C
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "10px",
                }}
            >
                <Typography variant="body1" sx={{ fontSize: "14px" }}>
                    <WbSunnyIcon fontSize="small" sx={{ marginRight: "4px" }} />
                    Sunrise: {formattedSunrise}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "14px" }}>
                    <NightsStayIcon fontSize="small" sx={{ marginRight: "4px" }} />
                    Sunset: {formattedSunset}
                </Typography>
            </Box>

            <Box
                sx={{
                    marginBottom: "10px",
                }}
            >
                <Typography variant="body1" sx={{ fontSize: "16px" }}>
                    Feels like: {Math.round(weatherData.main.feels_like)}°C
                </Typography>
            </Box>
        </Box>
    );
};

export default LargeWeather;
