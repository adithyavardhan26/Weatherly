export const getWidgetSize = (size) => {
    switch (size) {
        case "tiny":
            return { colSpan: 2, rowSpan: 2 };
        case "small":
            return { colSpan: 4, rowSpan: 2 };
        case "medium":
            return { colSpan: 4, rowSpan: 4 };
        case "large":
            return { colSpan: 2, rowSpan: 6 };
        case "huge":
            return { colSpan: 6, rowSpan: 6 };
        default:
            return { colSpan: 2, rowSpan: 2 };
    }
};

// Function to generate gradient based on time of day
const getTimeOfDayGradient = (timeOfDay) => {
    switch (timeOfDay) {
        case "morning":
            return { start: "#FFEB3B", end: "#FFC107" }; // Yellow gradient for morning
        case "midday":
            return { start: "#03A9F4", end: "#0288D1" }; // Blue gradient for midday
        case "evening":
            return { start: "#FF9800", end: "#FF5722" }; // Orange gradient for evening
        case "night":
            return { start: "#212121", end: "#0D47A1" }; // Dark Blue/Black gradient for night
        default:
            return { start: "#B0BEC5", end: "#78909C" }; // Default gray gradient
    }
};

// Function to generate color modifier based on temperature
const getTemperatureModifier = (temperature) => {
    if (temperature <= 0) {
        return "#E0F7FA"; // Light Blue for freezing temperatures
    } else if (temperature > 0 && temperature <= 15) {
        return "#B2EBF2"; // Cool Blue
    } else if (temperature > 15 && temperature <= 30) {
        return "#FFECB3"; // Warm Yellow
    } else {
        return "#FFCCBC"; // Hot Orange
    }
};

// Function to generate gradient based on weather condition
const getWeatherGradientModifier = (weatherCondition) => {
    switch (weatherCondition) {
        case "snow":
            return "#B3E5FC"; // Light Blue for snow
        case "rain":
            return "#4FC3F7"; // Sky Blue for rain
        case "clear":
            return "#FFD54F"; // Yellow for clear skies
        case "clouds":
            return "#90A4AE"; // Gray for clouds
        default:
            return "#B0BEC5"; // Default gray for other conditions
    }
};

// Main function to get the background gradient
export const getBackgroundGradient = (widgetType, temperature, timeOfDay, weatherCondition) => {
    if (widgetType === "current-temperature") {
        const timeOfDayColors = getTimeOfDayGradient(timeOfDay);
        const temperatureColor = getTemperatureModifier(temperature);
        const weatherColor = getWeatherGradientModifier(weatherCondition);

        // Create a combined gradient
        return `linear-gradient(to bottom, ${timeOfDayColors.start}, ${weatherColor}, ${temperatureColor}, ${timeOfDayColors.end})`;
    }

    // Default gradient if no specific conditions are met
    return "linear-gradient(to bottom, #B0BEC5, #78909C)";
};

// list of cities with names used by OpenWeather
export const cities = [
    { id: 1, name: "Hyderabad", country: "IN" },
    { id: 2, name: "Bengaluru", country: "IN" },
    { id: 3, name: "Mumbai", country: "IN" },
    { id: 4, name: "Chennai", country: "IN" },
    { id: 5, name: "Delhi", country: "IN" },
    { id: 6, name: "Kolkata", country: "IN" },
    { id: 7, name: "Ahmedabad", country: "IN" },
    { id: 8, name: "Pune", country: "IN" },
    { id: 9, name: "Jaipur", country: "IN" },
    { id: 10, name: "Lucknow", country: "IN" },
    { id: 11, name: "Nagpur", country: "IN" },
    { id: 12, name: "Surat", country: "IN" },
    { id: 13, name: "Kanpur", country: "IN" },
    { id: 14, name: "Patna", country: "IN" },
    { id: 15, name: "Bhopal", country: "IN" },
    { id: 16, name: "Ludhiana", country: "IN" },
    { id: 17, name: "Agra", country: "IN" },
    { id: 18, name: "Thiruvananthapuram", country: "IN" },
    { id: 19, name: "Coimbatore", country: "IN" },
    { id: 20, name: "Indore", country: "IN" },
    { id: 21, name: "Vishakhapatnam", country: "IN" },
    { id: 22, name: "Vijayawada", country: "IN" },
    { id: 23, name: "Madurai", country: "IN" },
    { id: 24, name: "Nashik", country: "IN" },
    { id: 25, name: "Meerut", country: "IN" },
    { id: 26, name: "Rajkot", country: "IN" },
    { id: 27, name: "Jodhpur", country: "IN" },
    { id: 28, name: "Amritsar", country: "IN" },
    { id: 29, name: "Varanasi", country: "IN" },
    { id: 30, name: "Ranchi", country: "IN" },
    { id: 31, name: "Chandigarh", country: "IN" },
    { id: 32, name: "Guwahati", country: "IN" },
    { id: 33, name: "Noida", country: "IN" },
    { id: 34, name: "Faridabad", country: "IN" },
    { id: 35, name: "Ghaziabad", country: "IN" },
    { id: 36, name: "Gurgaon", country: "IN" },
    { id: 37, name: "Vadodara", country: "IN" },
    { id: 38, name: "Visakhapatnam", country: "IN" },
    { id: 39, name: "Amravati", country: "IN" },
    { id: 40, name: "Allahabad", country: "IN" },
    { id: 41, name: "Tiruchirappalli", country: "IN" },
    { id: 42, name: "Salem", country: "IN" },
    { id: 43, name: "Aurangabad", country: "IN" },
    { id: 44, name: "Jabalpur", country: "IN" },
    { id: 45, name: "Gwalior", country: "IN" },
    { id: 46, name: "Kochi", country: "IN" },
    { id: 47, name: "Mysuru", country: "IN" },
    { id: 48, name: "Guntur", country: "IN" },
    { id: 49, name: "Kakinada", country: "IN" },
    { id: 50, name: "Rajahmundry", country: "IN" },
    { id: 51, name: "Warangal", country: "IN" },
    { id: 52, name: "Nellore", country: "IN" },
    { id: 53, name: "Tirupati", country: "IN" },
    { id: 54, name: "Hubli", country: "IN" },
    { id: 55, name: "Belgaum", country: "IN" },
    { id: 56, name: "Udaipur", country: "IN" },
    { id: 57, name: "Thane", country: "IN" },
    { id: 58, name: "Howrah", country: "IN" },
    { id: 59, name: "Vasai-Virar", country: "IN" },
    { id: 60, name: "Durgapur", country: "IN" },
    { id: 61, name: "Siliguri", country: "IN" },
    { id: 62, name: "Gandhinagar", country: "IN" },
    { id: 63, name: "Margao", country: "IN" },
    { id: 64, name: "Panaji", country: "IN" },
    { id: 65, name: "Porbandar", country: "IN" },
    { id: 66, name: "Srinagar", country: "IN" },
    { id: 67, name: "Shimla", country: "IN" },
    { id: 68, name: "Dehradun", country: "IN" },
    { id: 69, name: "Leh", country: "IN" },
    { id: 70, name: "Port Blair", country: "IN" },
    { id: 71, name: "Daman", country: "IN" },
    { id: 72, name: "Diu", country: "IN" },
    { id: 73, name: "Aizawl", country: "IN" },
    { id: 74, name: "Agartala", country: "IN" },
    { id: 75, name: "Gangtok", country: "IN" },
    { id: 76, name: "Kohima", country: "IN" },
    { id: 77, name: "Itanagar", country: "IN" },
    { id: 78, name: "Shillong", country: "IN" },
    { id: 79, name: "Imphal", country: "IN" },
    { id: 80, name: "Puducherry", country: "IN" },
    { id: 81, name: "Tokyo", country: "JP" },
    { id: 82, name: "New York", country: "US" },
    { id: 83, name: "Los Angeles", country: "US" },
    { id: 84, name: "Chicago", country: "US" },
    { id: 85, name: "Houston", country: "US" },
    { id: 86, name: "Miami", country: "US" },
    { id: 87, name: "San Francisco", country: "US" },
    { id: 88, name: "Seattle", country: "US" },
    { id: 89, name: "Washington, D.C.", country: "US" },
    { id: 90, name: "Boston", country: "US" },
    { id: 91, name: "Paris", country: "FR" },
    { id: 92, name: "London", country: "GB" },
    { id: 93, name: "Berlin", country: "DE" },
    { id: 94, name: "Rome", country: "IT" },
    { id: 95, name: "Madrid", country: "ES" },
    { id: 96, name: "Lisbon", country: "PT" },
    { id: 97, name: "Moscow", country: "RU" },
    { id: 98, name: "Beijing", country: "CN" },
    { id: 99, name: "Shanghai", country: "CN" },
    { id: 100, name: "Hong Kong", country: "HK" },
    { id: 101, name: "Seoul", country: "KR" },
    { id: 102, name: "Bangkok", country: "TH" },
    { id: 103, name: "Singapore", country: "SG" },
    { id: 104, name: "Kuala Lumpur", country: "MY" },
    { id: 105, name: "Jakarta", country: "ID" },
    { id: 106, name: "Sydney", country: "AU" },
    { id: 107, name: "Melbourne", country: "AU" },
    { id: 108, name: "Auckland", country: "NZ" },
    { id: 109, name: "Cape Town", country: "ZA" },
    { id: 110, name: "Johannesburg", country: "ZA" },
    { id: 111, name: "Cairo", country: "EG" },
    { id: 112, name: "Dubai", country: "AE" },
    { id: 113, name: "Istanbul", country: "TR" },
    { id: 114, name: "Riyadh", country: "SA" },
    { id: 115, name: "Tehran", country: "IR" },
    { id: 116, name: "Karachi", country: "PK" },
    { id: 117, name: "Lahore", country: "PK" },
    { id: 118, name: "Dhaka", country: "BD" },
    { id: 119, name: "Kathmandu", country: "NP" },
    { id: 120, name: "Colombo", country: "LK" },
    { id: 121, name: "Hanoi", country: "VN" },
    { id: 122, name: "Phnom Penh", country: "KH" },
    { id: 123, name: "Manila", country: "PH" },
    { id: 124, name: "Ho Chi Minh City", country: "VN" },
    { id: 125, name: "Mexico City", country: "MX" },
    { id: 126, name: "Rio de Janeiro", country: "BR" },
    { id: 127, name: "São Paulo", country: "BR" },
    { id: 128, name: "Buenos Aires", country: "AR" },
    { id: 129, name: "Santiago", country: "CL" },
    { id: 130, name: "Lima", country: "PE" },
    { id: 131, name: "Bogotá", country: "CO" },
    { id: 132, name: "Caracas", country: "VE" },
    { id: 133, name: "Quito", country: "EC" },
    { id: 134, name: "La Paz", country: "BO" },
    { id: 135, name: "Montevideo", country: "UY" },
    { id: 136, name: "Asunción", country: "PY" },
    { id: 137, name: "Brasília", country: "BR" },
    { id: 138, name: "Havana", country: "CU" },
    { id: 139, name: "Kingston", country: "JM" },
    { id: 140, name: "Santo Domingo", country: "DO" },
    { id: 141, name: "San Juan", country: "PR" },
    { id: 142, name: "Panama City", country: "PA" },
    { id: 143, name: "San José", country: "CR" },
    { id: 144, name: "Guatemala City", country: "GT" },
    { id: 145, name: "San Salvador", country: "SV" },
    { id: 146, name: "Tegucigalpa", country: "HN" },
    { id: 147, name: "Managua", country: "NI" },
    { id: 148, name: "Belmopan", country: "BZ" },
    { id: 149, name: "Reykjavík", country: "IS" },
    { id: 150, name: "Oslo", country: "NO" },
];

// utils.js

export const getFormattedLocalDateTime = (utcTime, utcOffset) => {
    const localTimeAtLocation = new Date(utcTime + utcOffset);

    let localHours = localTimeAtLocation.getUTCHours();
    const localMinutes = localTimeAtLocation.getUTCMinutes();
    const localSeconds = localTimeAtLocation.getUTCSeconds();
    const localDay = localTimeAtLocation.getUTCDate();
    const localMonth = localTimeAtLocation.getUTCMonth() + 1;
    const localYear = localTimeAtLocation.getUTCFullYear();

    const period = localHours >= 12 ? "PM" : "AM";
    localHours = localHours % 12 || 12;

    const formattedLocalTime = `${String(localHours).padStart(2, "0")}:${String(
        localMinutes
    ).padStart(2, "0")}:${String(localSeconds).padStart(2, "0")} ${period}`;
    const formattedLocalDate = `${localMonth}/${localDay}/${localYear}`;

    return {
        formattedLocalTime,
        formattedLocalDate,
    };
};
