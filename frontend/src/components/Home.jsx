import * as React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div class="home-container">
      <h1>Home</h1>
      <div class="link-container">
        <Link class="link" to="/course-recommender">
          Course Recommender
        </Link>
        <Link class="link" to="/instructions">
          Instructions
        </Link>
        <Link class="link" to="/credits">
          Credits
        </Link>
      </div>
    </div>
  );
}
