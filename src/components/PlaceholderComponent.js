import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const TinyWidget = ({ metrics }) => (
    <Box
        sx={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            textAlign: "center",
        }}
    >
        {metrics.map((metric, index) => (
            <Typography key={index} variant="body1" fontSize={16}>
                {metric}
            </Typography>
        ))}
    </Box>
);

const PlaceholderComponent = ({ size }) => {
    const renderContent = () => {
        switch (size) {
            case "Tiny":
                return <TinyWidget metrics={["Location,", "Date & Time,", "Temperature."]} />;
            case "Small":
                return (
                    <Grid container>
                        <Grid item xs={12}>
                            <TinyWidget
                                metrics={[
                                    "Location,",
                                    "Date & Time,",
                                    "Temperature,",
                                    "Min Temp & Max Temp,",
                                    "Weather Description,",
                                    "Humidity & Pressure.",
                                ]}
                            />
                        </Grid>
                    </Grid>
                );
            case "Medium":
                return (
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TinyWidget
                                metrics={[
                                    "Location",
                                    "Date & Time",
                                    "Temperature",
                                    "Weather Description",
                                    "Min Temp & Max Temp",
                                    "Humidity & Pressure",
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TinyWidget
                                metrics={[
                                    "Feels Like Temp & Cloud Cover",
                                    "Wind Speed & Visibility",
                                    "Sunrise & Sunset",
                                ]}
                            />
                        </Grid>
                    </Grid>
                );
            case "Large":
                return (
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TinyWidget
                                metrics={[
                                    "Location",
                                    "Date & Time",
                                    "Temperature",
                                    "Feels Like Temp",
                                    "Min Temp & Max Temp",
                                    "Humidity & Pressure",
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TinyWidget
                                metrics={[
                                    "Wind Speed & Direction",
                                    "Visibility & Cloud Cover",
                                    "Sunrise & Sunset",
                                ]}
                            />
                        </Grid>
                    </Grid>
                );
            case "Huge":
                return (
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TinyWidget
                                metrics={[
                                    "Location",
                                    "Date & Time",
                                    "Temperature",
                                    "Feels Like Temp",
                                    "Min Temp & Max Temp",
                                    "Humidity & Pressure",
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TinyWidget
                                metrics={[
                                    "Wind Speed & Direction",
                                    "Visibility & Cloud Cover",
                                    "Sunrise & Sunset",
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TinyWidget
                                metrics={[
                                    "Precipitation (Today, Tomorrow, Next Day)",
                                    "Temperature - Forecast",
                                    "Other Metrics",
                                ]}
                            />
                        </Grid>
                    </Grid>
                );
            default:
                return null;
        }
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            sx={{
                width: "100%",
                height: "100%",
                border: "1px dashed #ccc",
                borderRadius: "10px",
                padding: "1rem",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                textAlign: "center",
                transition: "transform 0.3s ease",
                "&:hover": {
                    transform: "scale(1.10)", // Magnify effect
                },
            }}
        >
            {renderContent()}
        </Box>
    );
};

export default PlaceholderComponent;
