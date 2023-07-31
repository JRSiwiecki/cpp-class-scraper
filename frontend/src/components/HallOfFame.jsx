import React, { useEffect } from "react";

export default function HallOfFame() {
  const courseAreaSections = [
    "A1",
    "A2",
    "A3",
    "B1",
    "B2",
    "B4",
    "B5",
    "C1",
    "C2",
    "C3",
    "D1",
    "D2",
    "D4",
    "E",
    "F",
  ];

  return (
    <div class="hall-of-fame-container">
      <h1>Hall of Fame</h1>
      <main>
        {courseAreaSections.map((areaSection, index) => (
          <section key={index} class="area-section-container">
            {areaSection}
          </section>
        ))}
      </main>
    </div>
  );
}
