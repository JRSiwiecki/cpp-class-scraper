import * as React from "react";
import Links from "./Links";

export default function About() {
  return (
    <div class="credits-container">
      <Links />
      <main>
        <header>
          <h1>About + Credits</h1>
        </header>

        <h1>Creator</h1>
        <p>Made by Joseph Siwiecki</p>

        <a href="https://www.linkedin.com/in/josephsiwiecki/">LinkedIn</a>

        <br />

        <a href="https://github.com/JRSiwiecki/cpp-ge-recommender">
          Github Repository
        </a>

        <h2>Frameworks & Libraries</h2>

        <a href="https://react.dev/">React (Front-end + Router)</a>

        <br />

        <a href="https://flask.palletsprojects.com/en/2.3.x/">
          Flask (Server, Scraper)
        </a>

        <br />

        <a href="https://www.crummy.com/software/BeautifulSoup/">
          BeautifulSoup (Scraper)
        </a>

        <h2>Data</h2>

        <a href="https://catalog.cpp.edu/preview_program.php?catoid=53&poid=13914">
          California State Polytechnic University, Pomona - General Education
          Course List
        </a>

        <br />

        <a href="https://github.com/ZombiMigz/opencpp-api">
          ZombiMigz - OpenCPP API
        </a>

        <br />

        <a
          href="https://www.flaticon.com/free-icons/education"
          title="education icons"
        >
          Education icons created by Freepik - Flaticon
        </a>

        <br />

        <p>Not affiliated with CPP.</p>
      </main>
    </div>
  );
}
