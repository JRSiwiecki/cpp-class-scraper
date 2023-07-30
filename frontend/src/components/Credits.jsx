import * as React from "react";
import { Link } from "react-router-dom";

export default function Credits() {
  return (
    <div class="credits-container">
      <h1>Credits</h1>
      <div class="link-container">
        <Link class="link" to="/">
          Home
        </Link>
        <Link class="link" to="/course-recommender">
          Course Recommender
        </Link>
        <Link class="link" to="/instructions">
          Instructions
        </Link>
      </div>
    </div>
  );
}
