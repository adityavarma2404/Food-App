# Food Delivery App

This is a React application that simulates a food delivery platform. The application features a menu with various items, including mini meals, desi box, dum biryani, and main course. Users can add items to their cart, view the cart, and remove items from the cart.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [JSON Files](#json-files)
- [Components](#components)
- [Redux Store](#redux-store)

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/food-delivery-app.git`
2. Navigate to the project directory: `cd food-delivery-app`
3. Install the dependencies: `npm install`
4. Start the development server: `npm start`

The application will be running at `http://localhost:3000` in your browser.

## Project Structure

The project structure is as follows:

```
food-delivery-app/
  public/
    index.html
    favicon.ico
  src/
    components/
      homePage/
      UI components/
      Cart.tsx
    json/
      menu.json
      sideMenu.json
    store/
      cart-slice.ts
      index.ts
      hook.ts
    App.css
    App.tsx
    index.css
    index.tsx
    logo.svg
    reportWebVitals.ts
    setupTests.ts
```

## Available Scripts

In the project directory, you can run:

- `npm start`: Starts the development server.
- `npm test`: Launches the test runner in the interactive watch mode.
- `npm run build`: Builds the app for production to the `build` folder.
- `npm run eject`: Removes this tool and copies build dependencies, configuration files, and scripts into the project so you have full control over them.

## JSON Files

The application uses JSON files to store the menu items and side menu options.

- `menu.json`: Contains the menu items for each category (mini meals, desi box, dum biryani, main course).
- `sideMenu.json`: Contains the side menu options with their corresponding menu values and URLs.

## Components

The application consists of the following components:

- `Cart.tsx`: Displays the cart items, total price, and checkout button.
- `Menu.tsx`: Displays the menu items, allows users to add or remove items from the cart, and filters items based on the selected category.
- `Navbar.tsx`: Displays the navigation bar with the logo and links to the cart and menu pages.

## Redux Store

The application uses Redux to manage the state of the cart. The store consists of the following:

- `cart-slice.ts`: Defines the actions (add to cart, remove from cart, clear cart) and reducers for updating the cart state.
- `index.ts`: Combines the reducers and creates the Redux store.
- `hook.ts`: Exports custom hooks for accessing the cart state and dispatching actions.
