import requests
from bs4 import BeautifulSoup

URL = "https://catalog.cpp.edu/preview_program.php?catoid=65&poid=17161"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

class_areas = soup.find_all("div", class_="acalog-core")

# top element is current area
area_stack = []

# top element is current section
section_stack = []

# contains list of dicts containing sections in that area
area_map = {}

# contains list of classes in that section
section_map = {}

for class_area in class_areas:
    area = class_area.find("h2")
    section = class_area.find("h3")

    courses = class_area.find_all("li", class_="acalog-course")

    if area:
        # 5th index contains area letter
        area_stack.insert(0, area.text[5])
        current_area = area_stack[0]

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


print("Welcome! Here are the available areas and their sections: \n")

for area in area_map.keys():
    print(area)
    print(area_map[area])
    print()

requested_data = input(
    "Enter the class area + section you would like to search the easiest class for (ex. A1, B2, C3):"
)

requested_area = requested_data[0]
requested_section = requested_data[1]

found_sections = area_map[requested_area]

found_classes = []

for section in found_sections:
    if requested_section in section:
        found_classes = section_map[section]
        break

# print(found_classes)

course_codes = []

for found_class in found_classes:
    end_marker = found_class.index("-") - 1

    course_codes.append(found_class[0:end_marker])

# print(course_codes)
