// React Imports
import React, { useState } from "react";

// MUI Imports
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// CSS Imports
import "./App.css";

// Component Imports
import Class from "./components/Class.jsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [year, setYear] = useState("");
  const [areaSection, setAreaSection] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [jsonResponse, setJsonResponse] = useState([]);

  async function postJSON(data) {
    try {
      const response = await fetch("/api/recommend", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setJsonResponse(result);
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleYearChange = (event) => {
    setYear(event.target.value);
    validateInput(event.target.value, areaSection);
  };

  const handleAreaSectionChange = (event) => {
    setAreaSection(event.target.value);
    validateInput(year, event.target.value);
  };

  const validateInput = (yearValue, areaSectionValue) => {
    const isValid = yearValue.trim() !== "" && areaSectionValue.trim() !== "";
    setIsButtonDisabled(!isValid);
  };

  function handleClick() {
    if (isButtonDisabled) {
      return;
    }

    postJSON({ year: year, area_section: areaSection });
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div class="App">
        <h1>General Education Course Recommender</h1>
        <TextField
          id="outlined-basic"
          label="Catalog Year"
          variant="outlined"
          required
          helperText="2021-2023"
          value={year}
          onChange={handleYearChange}
        />
        <TextField
          id="outlined-basic"
          label="Area + Section"
          variant="outlined"
          required
          helperText="Ex) A1, B2, C3, E0, F0"
          value={areaSection}
          onChange={handleAreaSectionChange}
        />
        <br />
        <br />
        <Button
          variant="contained"
          onClick={handleClick}
          disabled={isButtonDisabled}
        >
          Recommend Course
        </Button>

        <Class jsonResponse={jsonResponse} />
      </div>
    </ThemeProvider>
  );
}
