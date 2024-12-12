import React, { useState, useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import CurrentTemperature from "./CurrentTemperature/CurrentTemperature";
import AddWidgetPopup from "./AddWidgetPopup";
import { v4 as uuidv4 } from "uuid";
import { getWidgetSize, getBackgroundGradient } from "../utils/widgetUtils";
import { useWeatherData } from "../hooks/useWeatherData";

const defaultWidgets = [
    {
        id: uuidv4(),
        size: "tiny",
        ...getWidgetSize("tiny"),
        city: "Dubai",
        index: 0,
    },
    {
        id: uuidv4(),
        size: "small",
        ...getWidgetSize("small"),
        city: "Reykjavík",
        index: 1,
    },
    {
        id: uuidv4(),
        size: "medium",
        ...getWidgetSize("medium"),
        city: "Mumbai",
        index: 2,
    },
    {
        id: uuidv4(),
        size: "large",
        ...getWidgetSize("large"),
        city: "Moscow",
        index: 3,
    },
    {
        id: uuidv4(),
        size: "huge",
        ...getWidgetSize("huge"),
        city: "Sydney",
        index: 4,
    },
];

const WidgetDashboard = ({ toggleEditMode, openAddWidgetPopup, isEditing, setPopupOpen }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [widgets, setWidgets] = useState(defaultWidgets);
    const [newCity, setNewCity] = useState("");
    const [newWidgetSize, setNewWidgetSize] = useState(null);

    const { weatherData, fetchWeatherData } = useWeatherData(newCity);

    useEffect(() => {
        if (newCity && weatherData) {
            addWidgetToDashboard();
        }
    }, [weatherData]);

    const handleDelete = (id) => {
        console.log("Deleting widget with id:", id);
        setWidgets((prevWidgets) => prevWidgets.filter((widget) => widget.id !== id));
    };

    const moveWidget = (fromIndex, toIndex) => {
        setWidgets((prevWidgets) => {
            const updatedWidgets = [...prevWidgets];
            const [movedWidget] = updatedWidgets.splice(fromIndex, 1);
            updatedWidgets.splice(toIndex, 0, movedWidget);
            return updatedWidgets.map((widget, idx) => ({
                ...widget,
                index: idx,
            }));
        });
    };

    const addWidget = (size, selectedCity) => {
        setNewCity(selectedCity);
        setNewWidgetSize(size);
        fetchWeatherData();
    };

    const addWidgetToDashboard = () => {
        const { colSpan, rowSpan } = getWidgetSize(newWidgetSize);

        if (weatherData) {
            const {
                main: { temp },
                sys: { sunrise, sunset },
                weather,
            } = weatherData;
            const timeOfDay = getTimeOfDay(sunrise, sunset);
            const weatherCondition = weather[0]?.main?.toLowerCase();

            const backgroundGradient = getBackgroundGradient(
                "current-temperature",
                temp,
                timeOfDay,
                weatherCondition
            );

            const newWidget = {
                id: uuidv4(),
                size: newWidgetSize,
                colSpan: colSpan,
                rowSpan: rowSpan,
                backgroundGradient: backgroundGradient,
                index: widgets.length,
                city: newCity,
            };

            setWidgets((prevWidgets) => [...prevWidgets, newWidget]);
            toggleEditMode(true);
            setNewCity("");
            setNewWidgetSize(null); // Reset the state after adding
        }
    };

    const gapSize = isSmallScreen ? "16px" : "24px";
    const gridTemplateColumns = isSmallScreen ? "repeat(6, 1fr)" : "repeat(12, 1fr)";

    return (
        <Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: gridTemplateColumns,
                    gridAutoRows: "80px",
                    gap: gapSize,
                    position: "relative",
                    mt: 4,
                }}
            >
                {widgets.map((widget) => (
                    <CurrentTemperature
                        key={widget.id}
                        size={widget.size}
                        colSpan={widget.colSpan}
                        rowSpan={widget.rowSpan}
                        backgroundGradient={
                            widget.backgroundGradient ||
                            getBackgroundGradient("current-temperature", 28, "morning", "clear")
                        }
                        isEditing={isEditing}
                        onDelete={handleDelete}
                        id={widget.id}
                        index={widget.index}
                        moveWidget={moveWidget}
                        city={widget.city}
                    />
                ))}
            </Box>

            <AddWidgetPopup
                open={openAddWidgetPopup}
                setNewCity={() => setNewCity()}
                onClose={() => setPopupOpen(false)}
                onAddWidget={addWidget}
            />
        </Box>
    );
};

export default WidgetDashboard;

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
