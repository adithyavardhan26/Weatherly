import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CloseButton = ({ onDelete }) => {
    return (
        <IconButton
            size="small"
            onClick={onDelete}
            sx={{
                position: "absolute",
                top: -12,
                right: -12,
                color: "black",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "50%",
                padding: "4px",
                zIndex: 10,
                "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                },
            }}
        >
            <CloseIcon />
        </IconButton>
    );
};

export default CloseButton;
