# Project Documentation: Contact Book Fullstack App

The deployed project can be accessed at http://157.230.26.202:3333/. \
The source code with explanatory comments is available on GitHub [repository](https://github.com/jesuisstan/ContactBookFullstackApp).

## Objective

The primary goal of this project was to develop a straightforward CRUD contact directory.

## Implementation

The project was implemented using functional components and popular hooks in ReactJS with TypeScript and [Create React App](https://facebook.github.io/create-react-app/docs/getting-started), leveraging the Material UI library for its components and styling, in addition to custom CSS modules. The Contact Book App was developed to be responsive, following a multi-platform approach. The following steps were taken to complete the project:

1.  **Backend + MongoDB implementation**: Backend was built with NodeJS and Express server to save time. Database (MongoDB) was attached to backend to store all contacts User would create or modify. Additionally I tried to implement authentication with Github and Google but finally I had to refuse this attempt because did not handle the CORS error (need more time).

2. **Material UI, Custom Styling with CSS Modules & Custom Fonts**: Material UI components were utilized to achieve a consistent and visually appealing design. Components such as TextField, Drawer, Card and LoadingButton were used to create responsive and user-friendly web-app and related elements. The GTWalsheimPro font was installed and applied to the project to improve attractiveness of the App.

3. **Deployment**: The code was deployed on a Digital Ocean web server and made accessible through the [URL](http://157.230.26.202:3333/).

4. **Version Control**: The code was hosted on GitHub and made publicly accessible. The repository can be found at https://github.com/jesuisstan/ContactBookFullstackApp.

## Results

Final version of the App allows user to:

- get access to his contact list;

- search for specific contacts by his Lastname;

- create a new contact by opening a side panel with empty fields;

- edit an existing contact by opening a side panel pre-filled with the contact's current information;

- delete a contact from the directory.

## Demonstration


https://github.com/jesuisstan/ContactBookFullstackApp/assets/82715902/bc108f24-05cf-4a7a-8ff9-b05992d08b6a


## Future Improvements

While the project has been successfully implemented and deployed, there are potential areas for improvement:

- **Authentication**: this would allow to use the App by maltiple persons and provide a more robust and reliable user experience.

- **Unit Testing**: Implementing unit tests for the components and functionality of the Contact Book would help ensure the stability and maintainability of the codebase, allowing for easier future modifications and bug fixes.

- **Safari browser support** was not tested.

By addressing these areas for improvement, the project can be further optimized and polished, providing an even better user experience.

## How to use
1. install all the dependencies according to 'package.json' file from the root dir:
```sh
npm install
```

2. Start Contact Book Fullstack App:
```sh
npm start
```

3. Open [http://localhost:3333](http://localhost:3333) to view the App in browser.
