# CalenderRangePicker 🗓️
![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/Simo-NBU-100673/CalenderRangePicker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![GitHub tag (with filter)](https://img.shields.io/github/v/tag/Simo-NBU-100673/CalenderRangePicker?label=latest-release)
![GitHub repo size](https://img.shields.io/github/repo-size/Simo-NBU-100673/CalenderRangePicker)
![GitHub Repo stars](https://img.shields.io/github/stars/Simo-NBU-100673/CalenderRangePicker)

<img src="https://user-images.githubusercontent.com/81335974/264511131-d8c1e05c-7306-4b53-9c90-cd0aa4aa0c10.gif">

## Description
Welcome to the Calendar Range Picker project! This project is designed to enhance user experience by offering a visually appealing calendar interface that allows users to effortlessly select date ranges. The selected start and end dates are conveniently provided as input, making them readily available for use within your web application.

## Setup Instructions
Follow these simple steps to integrate the Calendar Range Picker into your project:

1. **Download Files:**
    - `calendar.js` (functionality)
    - `calendar.css` (styling, optional but recommended)

2. **Place Files in Your Project Folder:** 
    Place the downloaded files in the root directory of your project.

3. **Include Stylesheet and Script in Your HTML File:**
    Add the following lines to your HTML file. Place the stylesheet link inside the `<head>` tag and the script after the closing `</body>` tag.

    ```html
    <!-- Add this inside the <head> tag -->
    <link rel="stylesheet" href="calendar.css">
    ```

    ```html
    <!-- Add this just before </body> tag -->
    <script src="calendar.js"></script>
    ```

4. **Create an Input Element for Date Range Selection:**
    Add an input element in your HTML with the `id` attribute set to "range-input." This input will be used to display and edit the selected date range.

    ```html
    <input type="text" id="range-input" placeholder="Select Date Range">
    ```

## Features
Our Calendar Range Picker offers a range of features to enhance your date selection experience:

- **Single Date Selection:** Easily choose a single date within the calendar.

- **Input Validation:** The system enforces validation to ensure that the end date cannot precede the start date, providing data integrity.

- **Flexible Date Ranges:** Modify the selected date range dynamically, making it shorter or longer according to your needs.

- **Cross-Month and Cross-Year Selection:** Effortlessly select date ranges that span different months and years.

- **Day of the Week Information:** Each date is accompanied by information about which day of the week it corresponds to, aiding in date selection.

- **Dynamic Input Update:** The selected date range is dynamically updated in the associated input field, providing a real-time visual representation of the chosen dates.

## Links
- [Codepen example](https://codepen.io/Simo-NBU-100673/pen/NWeNVxV)

## License

🚀 This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details. 📜

Feel free to explore and integrate this Calendar Range Picker into your project to enhance your user interface and streamline date selection for your users. Just remember to include the attribution notice in your own projects.

Let's collaborate and innovate together! 🌟
