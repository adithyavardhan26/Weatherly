import React, { useEffect } from "react";
import { Box } from "@mui/material";
import CloseButton from "../common/CloseButton";
import { useWeatherData } from "../../hooks/useWeatherData";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import WeatherBox from "./WeatherBox";
import WeatherInfo from "./WeatherInfo";
import Loading from "../common/Loading";
import { getWidgetSize } from "../../utils/widgetUtils";
import { getBackgroundGradient } from "../../utils/widgetUtils";

const CurrentTemperature = ({
    size,
    isEditing,
    onDelete,
    id,
    index,
    moveWidget,
    inPopup = false,
    city,
}) => {
    const { weatherData, dailyPrecipitation, temperatureGraphData, fetchWeatherData } =
        useWeatherData(city);
    console.log("🚀 ~ weatherData: ONE", weatherData);
    const { drag, drop, isDragging } = useDragAndDrop(id, index, moveWidget);

    useEffect(() => {
        fetchWeatherData();
    }, [fetchWeatherData]);

    const { colSpan, rowSpan } = getWidgetSize(size);

    // Helper function to determine the time of day
    const getTimeOfDay = (sunrise, sunset) => {
        const currentTime = new Date().getTime() / 1000; // Current time in seconds
        if (currentTime >= sunrise && currentTime < sunrise + 3 * 3600) {
            return "morning";
        } else if (currentTime >= sunrise + 3 * 3600 && currentTime < sunset - 3 * 3600) {
            return "afternoon";
        } else if (currentTime >= sunset - 3 * 3600 && currentTime < sunset) {
            return "evening";
        } else {
            return "night";
        }
    };

    const backgroundGradient = weatherData
        ? getBackgroundGradient(
              "current-temperature",
              weatherData?.main?.temp,
              getTimeOfDay(weatherData.sys.sunrise, weatherData.sys.sunset),
              weatherData?.weather[0]?.main?.toLowerCase()
          )
        : "linear-gradient(to bottom, #B0BEC5, #78909C)";

    const opacity = isDragging ? 0.4 : 1;

    const containerStyle = inPopup
        ? { width: "100%", height: "100%", borderRadius: "8px", overflow: "hidden" }
        : { opacity };

    return (
        <WeatherBox
            ref={inPopup ? null : drop}
            colSpan={colSpan}
            rowSpan={rowSpan}
            backgroundGradient={backgroundGradient}
            size={size}
            isEditing={isEditing}
            style={containerStyle}
        >
            <Box ref={inPopup ? null : drag}>
                {" "}
                {/* Only use drag if not in popup */}
                {isEditing && <CloseButton onDelete={() => onDelete(id)} />}
                {weatherData ? (
                    <>
                        <WeatherInfo
                            size={size}
                            weatherData={weatherData}
                            dailyPrecipitation={dailyPrecipitation}
                            temperatureGraphData={temperatureGraphData}
                            backgroundGradient={backgroundGradient}
                        />
                    </>
                ) : (
                    <Loading size={size} />
                )}
            </Box>
        </WeatherBox>
    );
};

export default CurrentTemperature;
