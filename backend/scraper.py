import requests
import json
from bs4 import BeautifulSoup


# scrape data using beautifulsoup
def scrape_cpp_data(catalog_year):
    url_2021 = "https://catalog.cpp.edu/preview_program.php?catoid=57&poid=14912"
    url_2022 = "https://catalog.cpp.edu/preview_program.php?catoid=61&poid=15936"
    url_2023 = "https://catalog.cpp.edu/preview_program.php?catoid=65&poid=17161"

    accepted_years = ["2021", "2022", "2023"]

    if catalog_year not in accepted_years:
        response = {"Message": "Year invalid."}
        return json.dumps(response)

    match catalog_year:
        case "2021":
            URL = url_2021
        case "2022":
            URL = url_2022
        case "2023":
            URL = url_2023
        case _:
            URL = url_2023
            response = {"Message": "Year invalid."}
            return json.dumps(response)

    page = requests.get(URL)

    soup = BeautifulSoup(page.content, "html.parser")

    global class_areas
    class_areas = soup.find_all("div", class_="acalog-core")


def categorize_courses():
    # top element is current area
    global area_stack
    area_stack = []

    # top element is current section
    global section_stack
    section_stack = []

    # contains list of dicts containing sections in that area
    global area_map
    area_map = {}

    # contains list of classes in that section
    global section_map
    section_map = {}

    for class_area in class_areas:
        area = class_area.find("h2")
        section = class_area.find("h3")

        courses = class_area.find_all("li", class_="acalog-course")

        if area:
            # 5th index contains area letter
            area_stack.insert(0, area.text[5])
            current_area = area_stack[0]

            # edge case as these two don't have sections, just the area
            if current_area == "E":
                current_section = "0. E SECTION"
                section_map[current_section] = []
            elif current_area == "F":
                current_section = "0. F SECTION"
                section_map[current_section] = []

            area_map[current_area] = []

        if section:
            if "Note(s)" in section.text:
                break

            if "(" in section.text:
                end_marker = section.text.index("(") - 1
            else:
                end_marker = section.text.index(":")

            # 0th index contains section number
            section_stack.insert(0, section.text[0:end_marker])
            current_section = section_stack[0]

            section_map[current_section] = []
            area_map[current_area].append(section.text[0:end_marker])

        for course in courses:
            spans = course.find_all("span")

            for span in spans:
                if span:
                    end_marker = span.text.index("(")

                    section_map[current_section].append(span.text[0 : end_marker - 1])

    # hard code solution for E and F
    area_map["E"].append("0. E SECTION")
    area_map["F"].append("0. F SECTION")


def get_opencpp_api_data():
    global response
    response = requests.post("https://cpp-scheduler.herokuapp.com/data/courses/find")

    global json_object
    json_object = json.loads(response.text)


def recommend_course(area_section):
    requested_data = area_section

    if len(requested_data) < 2:
        response = {"Message": "Input too short."}
        return json.dumps(response)

    requested_area = requested_data[0].upper()
    requested_section = requested_data[1]

    accepted_area_sections = [
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
        "E0",
        "F0",
        "E",
        "F",
    ]

    if requested_area not in accepted_area_sections:
        response = {"Message": "Invalid area section."}

    if requested_area.isdigit():
        response = {"Message": "Area must be a letter."}
        return json.dumps(response)

    if requested_section.isalpha():
        response = {"Message": "Section must be a number."}
        return json.dumps(response)

    if requested_area not in area_map:
        response = {"Message": "Area does not exist."}
        return json.dumps(response)

    found_sections = area_map[requested_area]

    found_classes = []

    for section in found_sections:
        if requested_section in section:
            found_classes = section_map[section]
            break

    if not found_classes:
        response = {"Message": "No sections found."}
        return json.dumps(response)

    course_codes = []

    for found_class in found_classes:
        end_marker = found_class.index("-") - 1

        course_codes.append(found_class[0:end_marker])

    course_gpas = []

    for object in json_object:
        for course_code in course_codes:
            course_label = object["Label"]

            if course_code in course_label:
                course_title = object["CourseTitle"]

                if course_title is not None and (
                    "Honors" in course_title or "Activity" in course_title
                ):
                    continue

                course_component = course_label[-1]

                if course_label is not None and (
                    "M" in course_component
                    or "H" in course_component
                    or "L" in course_component
                    or "A" in course_component
                ):
                    continue

                if object["AvgGPA"] is None:
                    course_gpas.append([course_code, course_title, 0])
                    continue

                course_avg_gpa = object["AvgGPA"]

                course_gpas.append(
                    [
                        course_code,
                        course_title,
                        round(float(course_avg_gpa), 2),
                    ]
                )

    course_gpas = sorted(course_gpas, key=lambda x: x[2], reverse=True)

    result_json = json.dumps(course_gpas)
    return result_json


def get_hall_of_fame_courses():
    return {"hello": "yes"}
