import * as React from "react";
import Links from "./Links";

export default function Home() {
  return (
    <div class="home-container">
      <Links />
      <main>
        <header>
          <h1>Home</h1>
          <h2>Instructions for using Course Recommender</h2>
        </header>

        <div class="instructions-container">
          <p>1. Go to Course Recommender</p>

          <p>
            2. Input your catalog year (the year you started at CPP, currently
            only 2021 to 2023)
          </p>

          <p>
            3. Input the general education section you would like to be
            recommended courses for
          </p>

          <p>4. Click recommend courses</p>

          <p>
            <em>Note that some classes may appear twice.</em>
          </p>
        </div>
      </main>
    </div>
  );
}