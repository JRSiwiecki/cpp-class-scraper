### CPP GE Recommender

## API 
API: https://cpp-ge-recommender-fe170ad56f61.herokuapp.com/
  # Endpoints
  POST /api/recommend 
  * Returns a JSON of all courses in the given year and given area section, sorted by highest average GPA.
  * Requires JSON body containing "year" and "area_section" parameters.
  * EXAMPLE:
      {
        "year": "2021",
        "area_section": "B2"
      }

  POST /api/top-courses
  * Returns a JSON of up to the top 5 courses per area section in the given year.
  * Requires JSON body containing "year" parameter.
  * EXAMPLE:
      { "year": "2023" }

## Front-end
Front-end: https://jrsiwiecki.github.io/cpp-ge-recommender/
