import { styled } from "@mui/system";
import { Box } from "@mui/material";

const WeatherBox = styled(Box)(({ colSpan, rowSpan, backgroundGradient, isEditing }) => ({
    gridColumnEnd: `span ${colSpan}`,
    gridRowEnd: `span ${rowSpan}`,
    display: "flex",
    flexDirection: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "5px",
    borderRadius: "10px",
    background: `${backgroundGradient}`,
    width: "100%",
    height: "100%",
    position: "relative",
    cursor: isEditing ? "grab" : "default",
    animation: isEditing ? "shake 0.8s infinite" : "none",
    transition: "transform 0.3s ease",
    margin: "12px",
    overflow: "visible",

    "@keyframes shake": {
        "0%": { transform: "translate(1px, 1px) rotate(0deg)" },
        "10%": { transform: "translate(-1px, -2px) rotate(-1deg)" },
        "20%": { transform: "translate(-3px, 0px) rotate(1deg)" },
        "30%": { transform: "translate(3px, 2px) rotate(0deg)" },
        "40%": { transform: "translate(1px, -1px) rotate(1deg)" },
        "50%": { transform: "translate(-1px, 2px) rotate(-1deg)" },
        "60%": { transform: "translate(-3px, 1px) rotate(0deg)" },
        "70%": { transform: "translate(3px, 1px) rotate(-1deg)" },
        "80%": { transform: "translate(-1px, -1px) rotate(1deg)" },
        "90%": { transform: "translate(1px, 2px) rotate(0deg)" },
        "100%": { transform: "translate(1px, -2px) rotate(-1deg)" },
    },

    "@keyframes bounce": {
        "0%, 100%": {
            transform: "translateY(0)",
        },
        "50%": {
            transform: "translateY(-5px)",
        },
    },

    "@keyframes fadeIn": {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
    },
}));

export default WeatherBox;
