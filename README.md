# Vehicle Data Filtering App

## Description

This application is designed to filter, search, and sort vehicle data. Users can select a specific category (e.g., "Name", "Model", "Type", etc.) and optionally a sub-category, then search for and sort relevant vehicles based on those inputs. The search feature is flexible and searches across multiple fields, allowing users to find and sort vehicles easily.

## Features

- **Category Selection**: Users can select a category (e.g., "Name", "Model", "Type", etc.) and search within it.
- **Sub-Category Filtering**: Based on the selected category, users can select specific types to further refine the search.
- **Search Across Multiple Fields**: The search input searches across fields like `Name`, `Model`, `Type`, `Manufacturer`, and `Seating`.
- **Sorting**: Users can sort the vehicle data by any selected category in ascending or descending order.
- **Real-Time Data Filtering and Sorting**: The application filters and sorts the vehicle data in real-time as the user inputs a search term, selects a category, or chooses a sorting option.

## Technologies Used

- **Next.js & React.js**: Frontend framework used to build the interactive UI.
- **Redux**: For managing the application's state, including vehicle data and loading states.
- **Ant Design**: For UI components like tables and dropdowns.
- **TypeScript**: Ensures type safety throughout the application.
- **Tailwind CSS**: Used for improved user experience and better styling.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Sangam5756/vehicleFilter.git
    ```

2. Navigate into the project directory:
    ```bash
    cd vehicleFilter
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

The app will be available at `http://localhost:3000` or at the live version `http://vehicle5756.vercel.app`.

## How to Use

### 1. Category Selection

- Select a category from the dropdown (e.g., `Name`, `Model`, `Type`, `Manufacturer`, etc.). This will define the field in which you'd like to search or filter data.

### 2. Sub-Category Selection (Optional)

- After selecting a category, if it's relevant (like `Type` or `Model`), a second dropdown will appear to allow you to filter by a specific value within that category.
- For example, if you select `Type`, you'll be able to choose between types like `Sedan`, `Hatchback`, `SUV`, etc.

### 3. Search Input

- The search input allows you to filter vehicles by typing in a search term.
- The app performs a **global search across multiple fields** (i.e., `Name`, `Model`, `Type`, `Manufacturer`, and `Seating`). This means that regardless of which category is selected, the app will still search across all fields for the term you provide.
- As you type, the table updates in real time, displaying only the matching vehicles.

### 4. Sorting Feature

- **Sorting by Category**: Click on the column headers (e.g., `Name`, `Model`, `Manufacturer`, `Seating`, etc.) to sort the data in ascending or descending order based on the selected category.
- **Sorting Behavior**: The sorting toggles between ascending and descending order each time the header is clicked. Sorting is case-insensitive and applies to both text and numeric fields.
- **Real-Time Sorting**: Sorting is updated in real time as users interact with the sorting controls.

## Code Structure & Approach

### Main Components

1. **VehicleTable.tsx**
    - Fetches data from an external API and stores it in the Redux store.
    - Implements real-time search, filtering, and sorting based on user input.
    - Uses Ant Design's table and dropdown components for easy UI integration.

2. **Search, Filter & Sort Logic**
    - **Search**: The search term is converted to lowercase for case-insensitive matching. The search term is checked across multiple fields (`Name`, `Model`, `Type`, `Manufacturer`, and `Seating`).
    - **Category Filtering**: Filters based on the selected category (e.g., `Type`, `Model`).
    - **Search Term Filtering**: Filters based on the search term across all relevant fields.
    - **Sorting**: Supports sorting by any column in ascending or descending order. Sorting is implemented to handle both text and numeric data types.

3. **State Management**
    - The app uses Redux to store and manage the fetched vehicle data and the loading state.

4. **Real-Time Filtering and Sorting**
    - The data is filtered and sorted in real-time based on user input and interactions with the UI elements.

### Server-Side Rendering (SSR)
- Utilizes Next.js for server-side rendering to improve performance and SEO.

### Responsive Design & Optimization
- The application is designed to be responsive and optimized for various screen sizes using Tailwind CSS.

## Conclusion

The **Vehicle Data Filtering App** offers a comprehensive and user-friendly solution for searching, filtering, and sorting vehicle data. Built with modern technologies like Next.js, Redux, Ant Design, and TypeScript, it provides an efficient and responsive experience for users. Future updates will focus on expanding functionality and enhancing user experience.
