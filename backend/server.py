import json
from flask import Flask, request
from flask_cors import CORS, cross_origin
from scraper import (
    scrape_cpp_data,
    categorize_courses,
    get_opencpp_api_data,
    recommend_course,
    get_top_courses,
)

app = Flask(__name__)
cors = CORS(app)

get_opencpp_api_data()


@app.route("/")
def hello_world():
    return "<p>Hello, world!</p>"


@app.route("/api/recommend", methods=["POST"])
def api_recommend_course():
    data = request.get_json()
    year = data.get("year")
    area_section = data.get("area_section")

    valid_year = scrape_cpp_data(year)

    if valid_year:
        response = {"Message": "Year invalid."}
        return json.dumps(response)

    categorize_courses()
    recommend_courses = recommend_course(area_section)

    return recommend_courses


@app.route("/api/top-courses", methods=["POST"])
def api_top_courses():
    data = request.get_json()
    year = data.get("year")

    valid_year = scrape_cpp_data(year)

    if valid_year:
        response = {"Message": "Year invalid."}
        return json.dumps(response)

    categorize_courses()
    top_courses = get_top_courses()

    return top_courses


# if __name__ == "__main__":
#     app.run(debug=True)
