# Course Management System

## Overview
The **Course Management System** is a Vue.js application developed for a University. This project aims to create an intuitive and efficient interface for managing courses using the Vuetify UI framework. The application enables users to view, add, edit, and delete courses while providing essential information about course enrollment and availability.

## Features
- **Vue.js Framework**: Built using Vue.js with Vue Router and Vuex for state management.
- **Responsive UI**: Utilizes Vuetify for a modern and responsive design.
- **Home Interface**: Displays all available courses in card format.
- **Navigation Bar**: Easy access to the Home and Administration sections.

## Functionality

### Home Interface
- Displays all courses from the state as cards.
- Provides a visually appealing layout for users to browse available courses.

### Administration Interface
- Accessible via the navigation bar.
- Displays a table with all courses available in the state.
- Allows users to:
  - **Add Courses**: Opens a modal with a form to input course details (name, image URL, capacity, enrolled students, duration, cost, and description).
  - **Delete Courses**: Confirms deletion with a modal prompt.
  - **Edit Courses**: Redirects to an edit interface with pre-filled course information.

### Course Management Features
- **Informative Dashboard**: Displays key metrics:
  - Total allowed students
  - Total enrolled students
  - Remaining slots
  - Total completed courses
  - Total active courses
  - Total courses

### Course Addition & Validation
- Ensures enrolled students do not exceed available slots.
- Default course status is set to inactive (false).
- Records the registration date upon course addition.

### Course Deletion & Confirmation
- Prompts user confirmation before deleting a course.
- Updates all views immediately after deletion.

### Course Editing
- Allows users to edit course information with validation on enrolled students.
- Resets enrolled students to zero if the course status changes to completed.
- Includes a button to return to the administration interface after editing.

## Getting Started

### Prerequisites
- Node.js
- Vue CLI

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/course-management-system.git
   ```
2. Navigate to the project directory:
   ```bash
   cd course-management-system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
To start the development server, run:
```bash
npm run serve
```
Visit `http://localhost:8080` in your browser to view the application.

## Contributing
I welcome contributions! Please fork the repository and submit a pull request.

<!-- 
## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
 -->

## Acknowledgments
- Thanks to E-Camp for the opportunity to develop this project.
- Special thanks to the Vue.js and Vuetify communities for their invaluable resources and support.

<!-- # pc-m7 -->
