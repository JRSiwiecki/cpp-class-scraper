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
        <Link class="link" to="/credits">
          Credits
        </Link>
      </nav>
    </header>
  );
}
