// React Imports
import React, { useEffect, useState } from "react";

// Component Imports
import Links from "./Links";

// MUI Imports
import { List, ListItem, ListItemText, Grid } from "@mui/material";

export default function TopCourses() {
  const [jsonResponse, setJsonResponse] = useState([]);

  useEffect(() => {
    let ignore = false;

    const response = fetch("http://127.0.0.1:5000//api/top-courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ year: "2023" }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!ignore) {
          setJsonResponse(data);
          console.log(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    return () => {
      ignore = true;
    };
  }, []);

  const areaSectionContainerStyle = {
    height: "725px", // Set a fixed height for all areaSection containers
    padding: "10px",
    border: "1px solid #ccc",
    margin: "10px 20px",
    borderRadius: "4px",
  };

  return (
    <div class="hall-of-fame-container">
      <Links />
      <h1>Top Courses Per GE Section</h1>
      <main>
        <Grid container spacing={2}>
          {Object.keys(jsonResponse).map((areaSection, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <section
                key={index}
                className="area-section-container"
                style={areaSectionContainerStyle}
              >
                <h3>{areaSection}</h3>
                <List>
                  {jsonResponse[areaSection].map((course, courseIndex) => (
                    <ListItem key={courseIndex}>
                      <div>
                        <ListItemText primary={"⭐ " + course["CourseCode"]} />
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
      </main>
    </div>
  );
}
