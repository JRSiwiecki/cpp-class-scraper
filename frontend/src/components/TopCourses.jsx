// React Imports
import React, { useEffect, useState } from "react";

// Component Imports
import Links from "./Links";

// MUI Imports
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  CircularProgress,
} from "@mui/material";

export default function TopCourses() {
  const [jsonResponse, setJsonResponse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    fetch(
      "https://cpp-ge-recommender-fe170ad56f61.herokuapp.com/api/top-courses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ year: "2023" }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (!ignore) {
          setJsonResponse(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  const areaSectionContainerStyle = {
    height: "750px", // Set a fixed height for all areaSection containers
    padding: "10px",
    border: "1px solid #ccc",
    margin: "10px 15px",
    borderRadius: "4px",
  };

  // Remove trailing "0" character from areas "E0" and "F0"
  function formatArea(area) {
    const firstDotIndex = area.indexOf(".");

    // Prevent issues from D1 and D2 since they contain more than one "."
    if (firstDotIndex !== -1) {
      const areaCode = area.slice(0, firstDotIndex);
      const areaName = area.slice(firstDotIndex + 1).trim();
      if (areaName) {
        const formattedArea = areaCode.endsWith("0")
          ? areaCode.slice(0, -1)
          : areaCode;
        return `${formattedArea}. ${areaName}`;
      }
    }
    return area; // Return the original area if there is no valid format
  }
  return (
    <div class="hall-of-fame-container">
      <Links />
      <h1>Top Courses Per GE Section (2023)</h1>
      <main>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            {Object.keys(jsonResponse).map((areaSection, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <section
                  key={index}
                  className="area-section-container"
                  style={areaSectionContainerStyle}
                >
                  <h3>{formatArea(areaSection)}</h3>
                  <List>
                    {jsonResponse[areaSection].map((course, courseIndex) => (
                      <ListItem key={courseIndex}>
                        <div>
                          <ListItemText
                            primary={"⭐ " + course["CourseCode"]}
                          />
                          <em>
                            <ListItemText primary={course["CourseTitle"]} />
                          </em>
                          <strong>
                            Average GPA: {course["AvgGPA"].toFixed(2)}
                          </strong>
                        </div>
                      </ListItem>
                    ))}
                  </List>
                </section>
              </Grid>
            ))}
          </Grid>
        )}
      </main>
    </div>
  );
}
