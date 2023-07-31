import { Link } from "react-router-dom";

export default function Links() {
  return (
    <header>
      <nav class="link-container">
        <Link class="link" to="/">
          Home
        </Link>

        <Link class="link" to="/course-recommender">
          Course Recommender
        </Link>

        <Link class="link" to="/top-courses">
          Top Courses
        </Link>

        <Link class="link" to="/about">
          About
        </Link>
      </nav>
    </header>
  );
}
