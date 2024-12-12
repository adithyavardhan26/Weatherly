import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getFormattedLocalDateTime } from "../../utils/widgetUtils";

const SmallWeather = ({ weatherData, primaryWeather }) => {
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
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                boxSizing: "border-box",
            }}
        >
            {/* Column 1: Weather Information */}
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ flexBasis: "50%" }}
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
                <Box mt={2}>
                    <Typography variant="body2" color="#333">
                        (Local Date & Time) {timeData.formattedLocalDate}
                    </Typography>
                    <Typography variant="body2" color="#333">
                        {timeData.formattedLocalTime}
                    </Typography>
                </Box>
            </Box>

            {/* Column 2: Weather Icon and Details */}
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ flexBasis: "50%" }}
            >
                <img
                    src={`http://openweathermap.org/img/wn/${primaryWeather.icon}@2x.png`}
                    alt={primaryWeather.description}
                    style={{ width: "50px", height: "50px" }}
                />
                <Typography
                    variant="h6"
                    sx={{
                        fontStyle: "italic",
                        fontSize: "16px",
                        color: "#333",
                        marginBottom: "5px",
                    }}
                >
                    {primaryWeather.description}
                </Typography>
                <Typography variant="body1">
                    <strong>H:</strong> {Math.round(weatherData.main.temp_max)}°C
                </Typography>
                <Typography variant="body1">
                    <strong>L:</strong> {Math.round(weatherData.main.temp_min)}°C
                </Typography>
            </Box>
        </Box>
    );
};

export default SmallWeather;
