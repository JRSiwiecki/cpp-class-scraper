import * as React from "react";
import { Link } from "react-router-dom";

export default function Instructions() {
  return (
    <div>
      <h1>Instructions</h1>
      <Link to="/">Home</Link>
      <Link to="/course-recommender">Course Recommender</Link>
      <Link to="/credits">Credits</Link>
    </div>
  );
}
