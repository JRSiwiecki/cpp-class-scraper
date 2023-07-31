// React Imports
import React from "react";
import { Routes, Route } from "react-router-dom";

// MUI Imports
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Component Imports
import Home from "./components/Home";
import CourseRecommender from "./components/CourseRecommender";
import About from "./components/About";
import TopCourses from "./components/TopCourses";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-recommender" element={<CourseRecommender />} />
        <Route path="/about" element={<About />} />
        <Route path="/top-courses" element={<TopCourses />} />
      </Routes>
    </ThemeProvider>
  );
}
