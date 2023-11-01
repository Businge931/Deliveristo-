DOG BREEED IMAGE DISPLAY APP DOCUMENTATION

Visit site:  https://businge-dog-breeds.netlify.app/
The Docker image runs on port http://localhost:3000/

Introduction
The Dog Breed Image Display App is a React-Typescript application designed to display images of dog breeds and their sub-breeds. This documentation will guide you through the app's features and components.


1. Getting Started
Prerequisites
Before using the Dog Breed Image Display App, make sure you have the following prerequisites in place:

Node.js and npm (Node Package Manager) installed.
A code editor (e.g., Visual Studio Code) for development.
Basic knowledge of React and TypeScript.

Installation
To install and run the app locally, follow these steps:

Clone the repository from GitHub:
https://github.com/Businge931/Deliveristo-
Navigate to the project directory:
cd deliveristo
Install the required dependencies:
npm install
Start the development server:
npm start


Dog Breed Image Display App Documentation
Introduction
The Dog Breed Image Display App is a React-Typescript application designed to display images of dog breeds and their sub-breeds. 
This documentation will guide you through the app's features and components.


2. App Structure
Components
The app consists of four main components:

Random Image by Breed
Images List by Breed
Random Image by Breed and Sub-Breed
Images List by Breed and Sub-Breed
Sidebar
The app features a sidebar with four buttons, each corresponding to one of the four main components. Clicking a button renders the respective component on the main screen.

Functionality Overview
Components that display images randomly have a button to generate random breed images.
Other components with lists use a select input field to choose a breed, triggering a backend call to fetch and display random images.

3. Using the App
This section will provide detailed instructions on how to use each component within the app.

Random Image by Breed
To display a random image of a specific breed:

Click the "Random Image by Breed" button on the sidebar.
Click the "Generate Random Image" button within the component.

Images List by Breed
To view a list of images for a specific breed:

Click the "Images List by Breed" button on the sidebar.
Select a breed from the dropdown.
The app will make a backend call and display a list of images for the selected breed.

Random Image by Breed and Sub-Breed
To display a random image of a specific sub-breed within a breed:

Click the "Random Image by Breed and Sub-Breed" button on the sidebar.
Click the "Generate Random Image" button within the component.
Images List by Breed and Sub-Breed
To view a list of images for a specific sub-breed within a breed:

Click the "Images List by Breed and Sub-Breed" button on the sidebar.
Select a breed and sub-breed from the respective dropdowns.
The app will make a backend call and display a list of images for the selected sub-breed.

4. Development and Customization
This section provides information for developers who want to extend or customize the app.

Folder Structure
The project structure is made up of the components folder in the src which contains all the component files, then a utils folder with custom hooks and all constants such as types/interfaces.

API Integration
Interfacing with the api is through a custon useFetch hook which handles all the generic responses from the backend. It is used in all the components that require data fetching.
Styling
For styling, I used the CSS modules for each component and added all global styles in the index.css file.
Additional Features
I added error handling and loading state for a smooth and better user experience. I also wrote end-to-end tests for all the flow of the application.

5. Conclusion
   Generally, the app acts a dashboard for displaying images of dog breeds as well as thier corresponding sub breed images in their respective categories.
