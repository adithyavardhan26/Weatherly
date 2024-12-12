import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OpacityIcon from "@mui/icons-material/Opacity";
import AirIcon from "@mui/icons-material/Air";
import SpeedIcon from "@mui/icons-material/Speed";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { getFormattedLocalDateTime } from "../../utils/widgetUtils";

const MediumWeather = ({ weatherData, primaryWeather }) => {
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
                padding: "15px",
                textAlign: "center",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                boxSizing: "border-box",
            }}
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                mb={2}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    sx={{ flexBasis: "37.5%" }}
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
                </Box>

                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{ flexBasis: "33.33%" }}
                >
                    <img
                        src={`http://openweathermap.org/img/wn/${primaryWeather.icon}@2x.png`}
                        alt={primaryWeather.description}
                        style={{ width: "60px", height: "60px" }}
                    />
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
                </Box>

                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-end"
                    sx={{ flexBasis: "29.17%" }}
                >
                    <Typography variant="body1">
                        <strong>H:</strong> {Math.round(weatherData.main.temp_max)}°C
                    </Typography>
                    <Typography variant="body1">
                        <strong>L:</strong> {Math.round(weatherData.main.temp_min)}°C
                    </Typography>
                </Box>
            </Box>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexDirection="row"
                width="100%"
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

            <Box
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                width="100%"
                mt={2}
                flexWrap="wrap"
            >
                <Box display="flex" alignItems="center" mb={1}>
                    <OpacityIcon fontSize="small" sx={{ marginRight: "4px" }} />
                    <Typography variant="body2">Humidity: {weatherData.main.humidity}%</Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={1}>
                    <AirIcon fontSize="small" sx={{ marginRight: "4px" }} />
                    <Typography variant="body2">Wind: {weatherData.wind.speed} m/s</Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={1}>
                    <SpeedIcon fontSize="small" sx={{ marginRight: "4px" }} />
                    <Typography variant="body2">
                        Pressure: {weatherData.main.pressure} hPa
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={1}>
                    <VisibilityIcon fontSize="small" sx={{ marginRight: "4px" }} />
                    <Typography variant="body2">
                        Visibility: {weatherData.visibility / 1000} km
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={1}>
                    <WbSunnyIcon fontSize="small" sx={{ marginRight: "4px" }} />
                    <Typography variant="body2">Sunrise: {formattedSunrise}</Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={1}>
                    <NightsStayIcon fontSize="small" sx={{ marginRight: "4px" }} />
                    <Typography variant="body2">Sunset: {formattedSunset}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default MediumWeather;
