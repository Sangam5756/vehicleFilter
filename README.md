# Vehicle Data Filtering App

## Description

This application is designed to filter and search vehicle data. Users can select a specific category (e.g., "Name", "Model", "Type", etc.) and optionally a sub-category, then search for relevant vehicles based on those inputs. The search feature is flexible and searches across multiple fields, allowing users to find vehicles easily.


## Features

- **Category Selection**: Users can select a category (e.g., "Name", "Model", "Type", etc.) and search within it.
- **Sub-Category Filtering**: Based on the selected category, users can select specific types to further refine the search.
- **Search Across Multiple Fields**: The search input searches across fields like `Name`, `Model`, `Type`, `Manufacturer`, and `Seating`.
- **Real-Time Data Filtering**: The application filters the vehicle data in real-time as the user inputs a search term or selects a category.

## Technologies Used

- **Next.js & Reactjs**: Frontend framework used to build the interactive UI.
- **Redux**: For managing the application's state, including vehicle data and loading states.
- **Ant Design**: For UI components like tables and dropdowns.
- **TypeScript**: Ensures type safety throughout the application.
- **TailwindCss**: used for improve the user experience and better styling.


## Installation

To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Sangam5756/InternTask.git
    ```

2. Navigate into the project directory:
    ```bash
    cd InternTask
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

The app will be available at `http://localhost:3000`. || `http://vehicle5756.vercel.app`

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




## Code Structure & Approach

### Main Components

1. **VehicleTable.tsx**
    - Fetches data from an external API and stores it in the Redux store.
    - Implements real-time search and filtering based on user input.
    - Uses Ant Design's table and dropdown components for easy UI integration.

2. **Search Logic**
    - The search term is converted to lowercase for case-insensitive matching.
    - The search term is checked across multiple fields (`Name`, `Model`, `Type`, `Manufacturer`, and `Seating`).
    - Filtering is done in two layers:
        - **Category Filtering**: Filters based on the selected category (e.g., `Type`, `Model`).
        - **Search Term Filtering**: Filters based on the search term across all relevant fields.

3. **State Management**
    - The app uses Redux to store and manage the fetched vehicle data and the loading state.

