import React from "react";
import TinyWeather from "./TinyWeather";
import SmallWeather from "./SmallWeather";
import MediumWeather from "./MediumWeather";
import LargeWeather from "./LargeWeather";
import HugeWeather from "./HugeWeather";

const WeatherInfo = ({ size, weatherData, dailyPrecipitation, temperatureGraphData }) => {
    const primaryWeather = weatherData.weather[0];

    const renderWeatherDetails = () => {
        switch (size) {
            case "tiny":
                return <TinyWeather weatherData={weatherData} primaryWeather={primaryWeather} />;
            case "small":
                return <SmallWeather weatherData={weatherData} primaryWeather={primaryWeather} />;
            case "medium":
                return <MediumWeather weatherData={weatherData} primaryWeather={primaryWeather} />;
            case "large":
                return <LargeWeather weatherData={weatherData} primaryWeather={primaryWeather} />;
            case "huge":
                return (
                    <HugeWeather
                        weatherData={weatherData}
                        primaryWeather={primaryWeather}
                        dailyPrecipitation={dailyPrecipitation}
                        temperatureGraphData={temperatureGraphData}
                    />
                );
            default:
                return null;
        }
    };

    return <>{renderWeatherDetails()}</>;
};

export default WeatherInfo;
