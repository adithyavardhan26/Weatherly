import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loading = ({ size }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}
        >
            <CircularProgress
                size={size === "large" ? 60 : 40}
                color="inherit"
            />
        </Box>
    );
};

export default Loading;
