import React, { useState } from "react";

// MUI Imports
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

// CSS Imports
import "../css/App.css";

// Component Imports
import Class from "./Class";
import Links from "./Links";

export default function CourseRecommender() {
  const [year, setYear] = useState("");
  const [areaSection, setAreaSection] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [jsonResponse, setJsonResponse] = useState([]);

  async function postJSON(data) {
    try {
      const response = await fetch(
        "https://cpp-ge-recommender-fe170ad56f61.herokuapp.com//api/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

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

    if (areaSection === "B3") {
      alert(
        "Section B3 contains no classes and is meant to be taken with a B2 class. Search in section B2 instead."
      );
      return;
    }

    let yearInt = parseInt(year);

    if (yearInt < 2021 || yearInt > 2023) {
      alert("Only catalogs from year 2021 to 2023 are available for search.");
      return;
    }

    if (areaSection === "E") {
      postJSON({ year: year, area_section: "E0" });
      return;
    }

    if (areaSection === "F") {
      postJSON({ year: year, area_section: "F0" });
      return;
    }

    postJSON({ year: year, area_section: areaSection });
  }

  return (
    <div class="course-recommender-container">
      <Links />
      <main>
        <header>
          <h1 class="app-header">CPP GE Course Recommender</h1>
        </header>

        <div class="text-input-container">
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
            helperText="Ex) A1, B2, E0, F0"
            value={areaSection}
            onChange={handleAreaSectionChange}
          />
        </div>

        <br />
        <br />

        <Button
          variant="contained"
          onClick={handleClick}
          disabled={isButtonDisabled}
        >
          Recommend Course
        </Button>

        <h2>Recommended Courses</h2>

        <h3>
          {year} {areaSection}
        </h3>
        <Class jsonResponse={jsonResponse} />
      </main>
    </div>
  );
}