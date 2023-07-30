import * as React from "react";
import { Link } from "react-router-dom";

export default function Instructions() {
  return (
    <div class="instructions-container">
      <h1>Instructions</h1>
      <div class="link-container">
        <Link class="link" to="/">
          Home
        </Link>
        <Link class="link" to="/course-recommender">
          Course Recommender
        </Link>
        <Link class="link" to="/credits">
          Credits
        </Link>
      </div>
    </div>
  );
}
