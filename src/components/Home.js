import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Container, Box, Button, Menu, MenuItem } from "@mui/material";
import WidgetDashboard from "./WidgetDashboard";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";

const HomePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [selectedUserGroup, setSelectedUserGroup] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const resetToDefaultLayout = () => {
        window.location.reload();
    };

    const handleDropdownClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDropdownClose = () => {
        setAnchorEl(null);
    };

    const handleUserGroupSelect = (userGroup) => {
        setSelectedUserGroup(userGroup);
        setAnchorEl(null);
    };

    const handleAddWidgetClick = () => {
        setIsEditing(false);
        setPopupOpen(true);
    };

    return (
        <Box
            sx={{
                backgroundImage: `url(${process.env.PUBLIC_URL + "/images/sky-5534319_1920.jpg"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <AppBar position="sticky" sx={{ backgroundColor: "#6C7A89", opacity: 1 }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
                    >
                        <FilterDramaIcon sx={{ mr: 1 }} />
                        Weatherly
                    </Typography>

                    <Typography sx={{ fontSize: 14, opacity: 0.8 }}>
                        (Yet to Implement the Customize)
                    </Typography>

                    <Button
                        color="inherit"
                        onClick={handleDropdownClick}
                        endIcon={<ArrowDropDownIcon />}
                        sx={{ textTransform: "none", ml: 2 }}
                    >
                        Customize
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleDropdownClose}
                        sx={{ mt: 1 }}
                    >
                        <MenuItem onClick={() => handleUserGroupSelect("eventPlanners")}>
                            Event Planners
                        </MenuItem>
                        <MenuItem onClick={() => handleUserGroupSelect("farmers")}>
                            Farmers
                        </MenuItem>
                        <MenuItem onClick={() => handleUserGroupSelect("travelers")}>
                            Travelers
                        </MenuItem>
                    </Menu>

                    <Button
                        color="inherit"
                        onClick={toggleEditMode}
                        sx={{ textTransform: "none", ml: 2 }}
                    >
                        {isEditing ? "Save Layout" : "Edit Layout"}
                    </Button>
                    <Button
                        color="inherit"
                        onClick={resetToDefaultLayout}
                        sx={{ textTransform: "none", ml: 2 }}
                    >
                        Default Layout
                    </Button>
                    <Button
                        color="inherit"
                        onClick={handleAddWidgetClick}
                        sx={{ textTransform: "none", ml: 2 }}
                    >
                        Add Widget
                    </Button>
                </Toolbar>
            </AppBar>

            <Container sx={{ flex: 1, mt: 4, mb: 4 }}>
                <Box mt={4}>
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        sx={{ fontWeight: 500, color: "rgba(255, 255, 255, 0.9)" }}
                    >
                        Hi User, Welcome!
                    </Typography>
                </Box>

                <WidgetDashboard
                    toggleEditMode={toggleEditMode}
                    openAddWidgetPopup={isPopupOpen}
                    isEditing={isEditing}
                    setPopupOpen={setPopupOpen}
                />
            </Container>

            <Box
                component="footer"
                sx={{
                    py: 2,
                    backgroundColor: "#6C7A89",
                    color: "rgba(255, 255, 255, 0.8)",
                    textAlign: "center",
                    width: "100%",
                    position: "sticky",
                    bottom: 0,
                    pt: 3,
                }}
            >
                <Typography variant="body2">
                    &copy; {new Date().getFullYear()} Weather Dashboard. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default HomePage;
