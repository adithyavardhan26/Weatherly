import axios from "axios";

const apiKey = process.env.OPEN_WEATHER_API_KEY || "bd59e03010a09a55afbc436539b05c71";

// Fetch current weather data for all widget sizes
export const fetchWeatherData = async (city) => {
    console.log("🚀 ~ fetchWeatherData ~ city:", city);
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};

// Fetch 5-day / 3-hour weather forecast data including precipitation
export const fetchDailyWeatherData = async (lat, lon) => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching daily weather data:", error);
        return null;
    }
};
