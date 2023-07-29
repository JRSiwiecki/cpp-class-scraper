import json
from flask import Flask, jsonify, request
from scraper import (
    scrape_cpp_data,
    categorize_courses,
    get_opencpp_api_data,
    recommend_course,
)

app = Flask(__name__)

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


if __name__ == "__main__":
    app.run(debug=True)
