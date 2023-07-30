import { Link } from "react-router-dom";

export default function Links() {
  return (
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
  );
}
