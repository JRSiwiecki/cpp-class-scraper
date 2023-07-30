import json
from flask import Flask, request
from flask_cors import CORS, cross_origin
from scraper import (
    scrape_cpp_data,
    categorize_courses,
    get_opencpp_api_data,
    recommend_course,
)

app = Flask(__name__, static_folder="../frontend/build", static_url_path="")
cors = CORS(app)

get_opencpp_api_data()

# @app.route("/")
# def hello_world():
#     return "<p>Hello, world!</p>"


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


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    return app.send_static_file("index.html")


# if __name__ == "__main__":
#     app.run(debug=True)
