import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OpacityIcon from "@mui/icons-material/Opacity";
import AirIcon from "@mui/icons-material/Air";
import SpeedIcon from "@mui/icons-material/Speed";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbIncandescentIcon from "@mui/icons-material/WbIncandescent";
import TemperatureGraph from "../TemperatureGraph";
import { getFormattedLocalDateTime } from "../../utils/widgetUtils";

const HugeWeather = ({ weatherData, primaryWeather, dailyPrecipitation, temperatureGraphData }) => {
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
                opacity: 0.9,
                borderRadius: "10px",
                padding: "15px",
                margin: "5px",
                textAlign: "center",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                boxSizing: "border-box",
            }}
        >
            {/* Top Row */}
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-around"
            >
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="h4" fontWeight="bold">
                        {weatherData.name} <LocationOnIcon fontSize="small" />
                    </Typography>
                    <Typography variant="h3" fontWeight="bold">
                        {Math.round(weatherData.main.temp)}°C
                    </Typography>
                </Box>

                {/* Weather Icon and Description */}
                <Box display="flex" flexDirection="column" alignItems="center">
                    <img
                        src={`http://openweathermap.org/img/wn/${primaryWeather.icon}@2x.png`}
                        alt={primaryWeather.description}
                        style={{ width: "70px", height: "70px" }}
                    />
                    <Typography variant="h6">{primaryWeather.description}</Typography>
                    <Typography variant="body1">
                        H: {Math.round(weatherData.main.temp_max)}°C | L:{" "}
                        {Math.round(weatherData.main.temp_min)}°C
                    </Typography>
                </Box>

                {/* Humidity, Pressure, and Wind */}
                <Box display="flex" flexDirection="column" justifyContent="space-around">
                    <Typography variant="body2">
                        <OpacityIcon fontSize="small" /> Humidity: {weatherData.main.humidity}%
                    </Typography>
                    <Typography variant="body2">
                        <SpeedIcon fontSize="small" /> Pressure: {weatherData.main.pressure} hPa
                    </Typography>
                    <Typography variant="body2">
                        <AirIcon fontSize="small" /> Wind: {weatherData.wind.speed} m/s
                    </Typography>
                </Box>
            </Box>

            {/* Second Row */}
            <Box
                display="flex"
                justifyContent="space-evenly"
                alignItems="center"
                flexDirection="row"
                width="100%"
                marginTop={0.5}
                marginBottom={0.5}
            >
                <Box>
                    <Typography variant="body2" color="#333">
                        (Local Date & Time)
                    </Typography>
                    <Typography variant="body2" color="#333">
                        {timeData.formattedLocalDate}, {timeData.formattedLocalTime}
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

            {/* Third Row */}
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-evenly"
            >
                {/* Visibility and Cloud Cover */}
                <Box display="flex" flexDirection="column" justifyContent="space-around">
                    <Typography variant="body2">
                        <VisibilityIcon fontSize="small" /> Visibility:{" "}
                        {weatherData.visibility / 1000} km
                    </Typography>
                    <Typography variant="body2">
                        <WbIncandescentIcon fontSize="small" /> Cloud Cover:{" "}
                        {weatherData.clouds.all}%
                    </Typography>
                </Box>

                {/* Sunrise and Sunset */}
                <Box display="flex" flexDirection="column" justifyContent="space-around">
                    <Typography variant="body2">
                        <WbSunnyIcon fontSize="small" /> Sunrise: {formattedSunrise}
                    </Typography>
                    <Typography variant="body2">
                        <NightsStayIcon fontSize="small" /> Sunset: {formattedSunset}
                    </Typography>
                </Box>

                {/* Precipitation Details */}
                {dailyPrecipitation && dailyPrecipitation.length >= 4 && (
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Typography variant="h6">Precipitation</Typography>
                        {dailyPrecipitation.slice(0, 3).map((day, index) => (
                            <Box
                                key={index}
                                display="flex"
                                alignItems="center"
                                flexDirection="column"
                            >
                                <Typography variant="body2">
                                    {index === 0 ? "Today" : index === 1 ? "Tomorrow" : "Next Day"}:{" "}
                                    {day.precipitation || "N/A"} mm
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>

            {/* Temperature Graph */}
            {temperatureGraphData && (
                <Box
                    sx={{
                        padding: "15px",
                        backgroundColor: "#ffffff",
                        borderRadius: "10px",
                        marginTop: "15px",
                    }}
                >
                    <Typography variant="h6" marginBottom="5px">
                        Temperature - Forecast
                    </Typography>
                    <TemperatureGraph data={temperatureGraphData} />
                </Box>
            )}
        </Box>
    );
};

export default HugeWeather;
