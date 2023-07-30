import * as React from "react";
import { Link } from "react-router-dom";

export default function Credits() {
  return (
    <div>
      <h1>Credits</h1>
      <Link to="/">Home</Link>
      <Link to="/course-recommender">Course Recommender</Link>
      <Link to="/instructions">Instructions</Link>
    </div>
  );
}
