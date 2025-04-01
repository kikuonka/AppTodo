import React from "react";
import { Button } from "@mui/material";
import { SxProps, Theme } from "@mui/system";

type FilterType = "all" | "incomplete" | "completed";

interface FilterButtonProps {
    filter: FilterType;
    currentFilter: FilterType;
    setFilter: (filter: FilterType) => void;
    language: 'ru' | 'en';
}

const FilterButton: React.FC<FilterButtonProps> = ({ filter, currentFilter, setFilter, language }) => {
    const filterTexts = {
        ru: {
            all: "все",
            incomplete: "невыполненные",
            completed: "выполненные"
        },
        en: {
            all: "all",
            incomplete: "incomplete",
            completed: "completed"
        }
    };

    const currentFilterText = filterTexts[language];

    const buttonStyles: SxProps<Theme> = {
        fontFamily: '"Sofia Sans", sans-serif',
        background: "none",
        color: "#744129",
        borderRadius: "8px",
        borderBottom: filter === currentFilter ? "3px solid #744129" : "none",
        padding: "8px 16px",
        textTransform: "capitalize",
        transition: "background-color 0.3s ease, transform 0.2s ease",
        "&:hover": {
            borderBottom: "3px solid #744129",
            transform: "scale(1.05)",
        },
        "&:active": {
            backgroundColor: "rgba(116, 65, 41, 0.6)",
        }
    };

    return (
        <Button
            sx={buttonStyles}
            variant={filter === currentFilter ? "contained" : "text"}
            onClick={() => setFilter(filter)}
        >
            {currentFilterText[filter]}
        </Button>
    );
};

export default FilterButton;
