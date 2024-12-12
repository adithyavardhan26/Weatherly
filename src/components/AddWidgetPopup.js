import React, { useState } from "react";
import {
    Box,
    Dialog,
    List,
    ListItemButton,
    ListItemText,
    Typography,
    Grid,
    Tabs,
    Tab,
    TextField,
    InputAdornment,
    Snackbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import MuiAlert from "@mui/material/Alert";
import { cities } from "../utils/widgetUtils";
import PlaceholderComponent from "../components/PlaceholderComponent";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NoteSection = () => (
    <Box
        sx={{
            mt: 2,
            backgroundColor: "rgba(173, 216, 230, 0.8)",
            padding: 2,
            borderRadius: 1,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
    >
        <Typography fontWeight="bold" variant="body1" color="text.primary">
            Note:
        </Typography>
        <Typography variant="body2" color="text.secondary">
            Yet to implement other widgets apart from Current Temperature.
        </Typography>
    </Box>
);

const widgetTypes = [
    { id: "current-temperature", name: "Current Temperature" },
    { id: "weather-forecast", name: "Weather Forecast" },
    { id: "wind-speed", name: "Wind Speed" },
    { id: "humidity-level", name: "Humidity Level" },
    { id: "uv-index", name: "UV Index" },
    { id: "sunrise-sunset", name: "Sunrise & Sunset" },
    { id: "air-quality", name: "Air Quality Index" },
    { id: "precipitation", name: "Precipitation Chance" },
    // Add more widgets here as needed
];

const WidgetList = ({ widgetTypes, selectedWidget, handleListItemClick, searchQuery }) => (
    <List>
        {widgetTypes
            .filter((widget) => widget?.name?.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((widget) => (
                <ListItemButton
                    key={`${widget.id}-${widget.size}`}
                    selected={selectedWidget === widget.id}
                    onClick={() => handleListItemClick(widget.id)}
                    sx={{
                        "&.Mui-selected": {
                            backgroundColor: "rgba(200, 200, 200, 2)",
                            borderRadius: "4px",
                        },
                        "&.Mui-selected:hover": {
                            backgroundColor: "rgba(200, 200, 200, 1)",
                        },
                        transition: "background-color 0.2s ease",
                    }}
                >
                    <ListItemText
                        primary={
                            <Typography
                                fontWeight="bold"
                                color="text.primary"
                            >{`${widget.name}`}</Typography>
                        }
                    />
                </ListItemButton>
            ))}
        <NoteSection />
    </List>
);

const AddWidgetPopup = ({ open, onClose, onAddWidget }) => {
    const [selectedWidget, setSelectedWidget] = useState(widgetTypes[0].id);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCity, setSelectedCity] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleListItemClick = (widgetId) => {
        setSelectedWidget(widgetId);
    };

    const handleAddWidget = (size) => {
        if (selectedCity) {
            onAddWidget(size, selectedCity.name);
            onClose();
        } else {
            setSnackbarOpen(true);
        }
    };

    const handleCityChange = (event, newValue) => {
        setSelectedCity(newValue);
    };

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="lg"
            PaperProps={{
                style: {
                    width: "100%",
                    maxHeight: "90vh",
                    borderRadius: "8px",
                    overflow: "hidden",
                },
            }}
        >
            <Box
                display="flex"
                height="100%"
                sx={{
                    backgroundImage: `url(${
                        process.env.PUBLIC_URL + "/images/sky-5534319_1920.jpg"
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    maxHeight: "90vh",
                    overflow: "auto",
                }}
            >
                <Box
                    width="20%"
                    borderRight="1px solid #ccc"
                    p={2}
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
                        maxHeight: "90vh",
                        overflowY: "auto",
                    }}
                >
                    <Typography variant="h6" mb={2} fontWeight="bold" color="text.primary">
                        Select Widget
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="Search Widgets"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            mb: 2,
                            backgroundColor: "rgba(245, 245, 245, 0.9)",
                            borderRadius: "4px",
                        }}
                    />
                    <WidgetList
                        widgetTypes={widgetTypes}
                        selectedWidget={selectedWidget}
                        handleListItemClick={handleListItemClick}
                        searchQuery={searchQuery}
                    />
                </Box>
                <Box
                    flex={1}
                    display="flex"
                    flexDirection="column"
                    maxHeight="90vh"
                    overflow="auto"
                >
                    <Tabs
                        value={tabIndex}
                        onChange={handleTabChange}
                        indicatorColor="#333"
                        textColor="#333"
                        variant="fullWidth"
                        centered
                        sx={{
                            ".MuiTabs-indicator": {
                                backgroundColor: "#333",
                                height: "4px",
                            },
                            ".MuiTabs-flexContainer": {
                                justifyContent: "space-around",
                            },
                        }}
                    >
                        <Tab label={<Typography fontWeight="bold">Standard Sizes</Typography>} />
                        <Tab label={<Typography fontWeight="bold">Large Sizes</Typography>} />
                    </Tabs>
                    <Box p={2} display="flex" flexDirection="column" alignItems="center">
                        <Autocomplete
                            options={cities}
                            getOptionLabel={(option) => `${option.name}, ${option.country}`}
                            value={selectedCity}
                            onChange={handleCityChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Location"
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        backgroundColor: "#f5f5f5",
                                        borderRadius: "10px",
                                        transition: "all 0.3s ease",
                                        width: "50%",
                                        margin: "0 auto",
                                    }}
                                />
                            )}
                            sx={{
                                mb: 3,
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        />
                        <Box
                            sx={{
                                height: "100%",
                                width: "100%",
                                padding: "0 16px",
                            }}
                        >
                            <Grid
                                container
                                spacing={4}
                                direction="row"
                                justifyContent="space-evenly"
                                columns={12}
                                marginBottom={5}
                            >
                                {tabIndex === 0 && (
                                    <>
                                        <Grid
                                            container
                                            spacing={4}
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            marginTop={5}
                                        >
                                            <Grid
                                                item
                                                xs={6}
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                            >
                                                <Box
                                                    onClick={() => handleAddWidget("tiny")}
                                                    sx={{
                                                        width: "10rem",
                                                        height: "10rem",
                                                        cursor: "pointer",
                                                        ml: "2rem",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <PlaceholderComponent size="Tiny" />
                                                </Box>
                                                <Box
                                                    onClick={() => handleAddWidget("small")}
                                                    sx={{
                                                        width: "20rem",
                                                        height: "10rem",
                                                        cursor: "pointer",
                                                        marginTop: "4rem",
                                                        ml: "2rem",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <PlaceholderComponent size="Small" />
                                                </Box>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={6}
                                                display="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <Box
                                                    onClick={() => handleAddWidget("medium")}
                                                    sx={{
                                                        width: "20rem",
                                                        height: "20rem",
                                                        cursor: "pointer",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <PlaceholderComponent size="Medium" />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </>
                                )}
                                {tabIndex === 1 && (
                                    <>
                                        <Grid
                                            item
                                            xs={2.5}
                                            display="flex"
                                            justifyContent="left"
                                            marginTop={5}
                                        >
                                            <Box
                                                onClick={() => handleAddWidget("large")}
                                                sx={{
                                                    width: "12rem",
                                                    height: "27rem",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <PlaceholderComponent size="Large" />
                                            </Box>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={6}
                                            display="flex"
                                            justifyContent=""
                                            marginTop={5}
                                        >
                                            <Box
                                                onClick={() => handleAddWidget("huge")}
                                                sx={{
                                                    width: "40rem",
                                                    height: "27rem",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <PlaceholderComponent size="Huge" />
                                            </Box>
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {/* Snackbar Warning */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: "100%" }}>
                    Please select a location before adding a widget.
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default AddWidgetPopup;
