import * as React from "react";
import Links from "./Links";

export default function Home() {
  return (
    <div class="home-container">
      <Links />
      <main>
        <header>
          <h1>Home</h1>
          <h2>What is this?</h2>
          <p>
            This is a web application designed for CPP students to more easily
            choose which general education courses to take.
          </p>

          <p>
            For those asking for the "easiest" courses for GE sections like C3,
            D1, E, etc., this is for you.
          </p>

          <h2>Instructions for using Course Recommender</h2>
        </header>

        <div class="instructions-container">
          <p>1. Go to Course Recommender</p>

          <p>
            2. Input your catalog year (the year you started at CPP, currently
            only 2021 to 2023)
          </p>

          <p>
            3. Input the general education section for which you would like a
            course recommendation
          </p>

          <p>4. Click recommend courses!</p>

          <p>
            5. The resulting list of classes contains the course label, course
            title, and the total average GPA of all CPP students who have taken
            the course
          </p>

          <p>
            <em>Note that some classes may appear twice.</em>
          </p>
        </div>
      </main>
    </div>
  );
}
