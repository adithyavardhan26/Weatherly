import { useState, useCallback } from "react";
import { fetchWeatherData, fetchDailyWeatherData } from "../utils/api";

export const useWeatherData = (city) => {
    const [weatherData, setWeatherData] = useState(null);
    const [dailyPrecipitation, setDailyPrecipitation] = useState(null);
    const [temperatureGraphData, setTemperatureGraphData] = useState(null);

    const loadDemoData = () => {
        const demoData = {
            name: "Bengaluru",
            main: {
                temp: 28.18,
                feels_like: 29.96,
                temp_min: 26.29,
                temp_max: 29.65,
                pressure: 1008,
                humidity: 62,
            },
            weather: [
                {
                    description: "scattered clouds",
                    icon: "03d",
                },
            ],
            wind: {
                speed: 6.17,
                deg: 240,
            },
            clouds: {
                all: 40,
            },
            visibility: 8000,
            sys: {
                country: "IN",
                sunrise: 1724459902,
                sunset: 1724504755,
            },
            coord: {
                lat: 12.9716,
                lon: 77.5946,
            },
            timezone: 19800,
            id: 1277333,
            cod: 200,
        };
        setWeatherData(demoData);
        setDailyPrecipitation([
            { date: "2024-08-25", precipitation: 0 },
            { date: "2024-08-26", precipitation: 0 },
        ]);
        setTemperatureGraphData([
            { time: "2024-08-25 12:00:00", temp: 28.18, feels_like: 29.96 },
            { time: "2024-08-25 15:00:00", temp: 30.2, feels_like: 32.0 },
            { time: "2024-08-25 18:00:00", temp: 27.9, feels_like: 29.1 },
        ]);
    };

    const fetchWeatherDataCallback = useCallback(async () => {
        const data = await fetchWeatherData(city);
        console.log("🚀 ~ fetchWeatherDataCallback ~ data:", data);

        if (data) {
            setWeatherData(data);

            const { lat, lon } = data.coord;
            const forecastData = await fetchDailyWeatherData(lat, lon);
            console.log("🚀 ~ fetchWeatherDataCallback ~ forecastData:", forecastData.list);

            if (forecastData) {
                // Extract precipitation data for each day from the forecast data
                const precipitationData = [];
                const temperatureData = [];

                forecastData.list.forEach((entry) => {
                    const date = entry.dt_txt.split(" ")[0];
                    const time = entry.dt_txt;
                    const precipitation = parseFloat(entry.rain ? entry.rain["3h"] || 0 : 0);

                    // Handle daily precipitation
                    const existingEntry = precipitationData.find((item) => item.date === date);
                    if (existingEntry) {
                        existingEntry.precipitation = (
                            parseFloat(existingEntry.precipitation) + precipitation
                        ).toFixed(2);
                    } else {
                        precipitationData.push({
                            date,
                            precipitation: precipitation.toFixed(2),
                        });
                    }

                    // Handle temperature data for graph
                    temperatureData.push({
                        time,
                        temp: parseFloat(entry.main.temp).toFixed(2),
                        feels_like: parseFloat(entry.main.feels_like).toFixed(2),
                    });
                });

                console.log(
                    "🚀 ~ fetchWeatherDataCallback ~ precipitationData:",
                    precipitationData
                );
                console.log("🚀 ~ fetchWeatherDataCallback ~ temperatureData:", temperatureData);

                setDailyPrecipitation(precipitationData);
                setTemperatureGraphData(temperatureData);
            } else {
                loadDemoData();
            }
        } else {
            loadDemoData();
        }
    }, [city]);

    return {
        weatherData,
        dailyPrecipitation,
        temperatureGraphData,
        fetchWeatherData: fetchWeatherDataCallback,
    };
};
