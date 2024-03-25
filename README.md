Hello everyone!

This is a food delivery browser application which I developed using Typescript. The core benefit of TypeScript is static typing. It allows you to define the data types of variables, functions, and properties. This improves code clarity, maintainability, and helps catch errors early in the development process.

Addition to Typescript I used Redux toolkit for state management for adding the food items from menu section/search page, managing quantitiies from cart. To ensure data persistency, I integrated the redux-persist library, which conveniently stores data in the local storage. 

I utilized the features of react-router-dom for navigation and for handling the invalid URL path's. Furthermore, I implemented forms using the Formik library along with Yup for validation. This combination simplified form handling and ensured data persistency. To store form data locally, I utilized formik-persist. 

This application is designed primarily for browser experience. As such, we redirect mobile users to the mobile app for an optimal experience.