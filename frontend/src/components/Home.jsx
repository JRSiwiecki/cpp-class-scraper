import * as React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/course-recommender">Course Recommender</Link>
      <Link to="/credits">Credits</Link>
    </div>
  );
}
