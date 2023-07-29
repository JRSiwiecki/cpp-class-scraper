import requests
import json
from bs4 import BeautifulSoup


def scrape_cpp_data():
    URL = "https://catalog.cpp.edu/preview_program.php?catoid=65&poid=17161"
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


def recommend_course():
    run = True

    while run:
        print("Here are the available areas and their sections: \n")

        for area in area_map.keys():
            # if area_map[area]:
            print("AREA " + area)
            print(area_map[area])
            print()

        requested_data = input(
            "Enter the class area + section you would like to search the easiest class for (ex. A1, B2, C3) or enter Q to quit: "
        )

        if requested_data.lower() == "q":
            run = False
            break

        if len(requested_data) < 2:
            print("Input is too short. Try again.")
            continue

        requested_area = requested_data[0].upper()
        requested_section = requested_data[1]

        if requested_area.isdigit():
            print("Area must be a letter. Try again.")
            continue

        if requested_section.isalpha():
            print("Section must be a number. Try again.")
            continue

        if requested_area not in area_map:
            print("Area does not exist. Try again.")
            continue

        found_sections = area_map[requested_area]

        found_classes = []

        for section in found_sections:
            if requested_section in section:
                found_classes = section_map[section]
                break

        if not found_classes:
            print("No sections found. Try again.")
            continue

        course_codes = []

        for found_class in found_classes:
            end_marker = found_class.index("-") - 1

            course_codes.append(found_class[0:end_marker])

        course_gpas = []

        for object in json_object:
            for course_code in course_codes:
                if course_code in object["Label"]:
                    if object["AvgGPA"] is None:
                        course_gpas.append([course_code, 0])
                        continue

                    course_gpas.append([course_code, round(float(object["AvgGPA"]), 2)])

        course_gpas = sorted(course_gpas, key=lambda x: x[1], reverse=True)

        print("The classes you should take by highest GPA are in this order: \n")
        for course_gpa in course_gpas:
            print(course_gpa)

        requested_data = input("\nSearch again? Y/N: ")

        if requested_data.lower() == "y":
            continue
        else:
            run = False
            break


scrape_cpp_data()
categorize_courses()
print()
get_opencpp_api_data()
recommend_course()
