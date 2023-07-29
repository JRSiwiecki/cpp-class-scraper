import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import "./App.css";

export default function App() {
  const [year, setYear] = useState("");
  const [areaSection, setAreaSection] = useState("");

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
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleClick() {
    postJSON({ year: year, area_section: areaSection });
  }

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleAreaSectionChange = (event) => {
    setAreaSection(event.target.value);
  };

  return (
    <div className="App">
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
      <Button variant="contained" onClick={handleClick}>
        Recommend Course
      </Button>
    </div>
  );
}
