# CalenderRangePicker 🗓️
![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/Simo-NBU-100673/CalenderRangePicker)
![GitHub tag (with filter)](https://img.shields.io/github/v/tag/Simo-NBU-100673/CalenderRangePicker?label=latest-release)
![GitHub repo size](https://img.shields.io/github/repo-size/Simo-NBU-100673/CalenderRangePicker)
![GitHub Repo stars](https://img.shields.io/github/stars/Simo-NBU-100673/CalenderRangePicker)

<img src="https://user-images.githubusercontent.com/81335974/264511131-d8c1e05c-7306-4b53-9c90-cd0aa4aa0c10.gif">

### Description
This project intends to give users better UX by providing a great-looking calendar from which they can select a range of dates.
The start and end dates are provided in the input for later use from the web app.

### Set up
1. Download:
    calender.js (functionality)
    calender.css (styling/optional)
2. Place the files in your project folder
3. Add in the HTML file that you intend to have the calendar range picker:
   ```HTML
   <!-- place inside the head tag -->
   <link rel="stylesheet" href="calender.css">
   ```
   
   ```HTML
   <!-- place after the body tag -->
   <script src="calender.js"></script>
   ```
5. Add an input element with id="range-input"
### Features
- Single date selection
- Input validation(the end date can not be before the start date)
- Making the range shorter or longer
- Range picking from different months and years
- Showing which date of the week is for every date
- Dynamically update the input
