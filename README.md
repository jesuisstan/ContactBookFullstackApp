# Project Documentation: Contact Book Fullstack App

The deployed project can be accessed at http://157.230.26.202:3333/. \
The source code with explanatory comments is available on GitHub [repository](https://github.com/jesuisstan/ContactBookFullstackApp).

## Objective

The objective of this project is to create a contact directory that will be a simple CRUD.

## Implementation

The project was implemented using functional components and popular hooks in ReactJS with TypeScript and [Create React App](https://facebook.github.io/create-react-app/docs/getting-started), leveraging the Material UI library for its components and styling, in addition to custom CSS modules. The Contact Book App was developed to be responsive, following a multi-platform approach. The following steps were taken to complete the project:

1.  **API Integration**: Three APIs provided by Tictactrip were used to populate the autocomplete functionality of the search bar. The APIs used are as follows:

    1.1. Autocomplete for cities available on Tictactrip:

        Endpoint: https://api.comparatrip.eu/cities/autocomplete/?q=par (Replacing "par" with user input)

    1.2. Popular cities:

        Endpoint: https://api.comparatrip.eu/cities/popular/5 (Retrieving the 5 most popular cities)

    1.3. Popular cities from a specific city (e.g., Paris):

        Endpoint: https://api.comparatrip.eu/cities/popular/from/paris/5 (Retrieving the 5 most popular cities departing from a given city)

Proper API calls were made to fetch the required data for autocomplete suggestions.

2. **Material UI, Custom Styling with CSS Modules & Custom Fonts**: Material UI components were utilized to achieve a consistent and visually appealing design. Components such as TextField, Drawer, Card and LoadingButton were used to create responsive and user-friendly web-app and related elements. The GTWalsheimPro font was installed and applied to the project to improve attractiveness of the App.

3. **Deployment**: The code was deployed on a Digital Ocean web server and made accessible through the [URL](http://157.230.26.202:3333/).

4. **Version Control**: The code was hosted on GitHub and made publicly accessible. The repository can be found at https://github.com/jesuisstan/ContactBookFullstackApp.

## Results

The implemented search bar closely resembles the one found on Omio, providing autocomplete suggestions based on user input. The responsive design ensures a seamless experience across different devices. The deployment of the project on a web server allows users to access and interact with the search bar through the provided [URL](http://157.230.26.202:3333/).

## Demonstration


https://github.com/jesuisstan/OmioSearchBar/assets/82715902/d4079f8e-1b19-4c48-a47a-21982cd0f59c


## Future Improvements

While the project has been successfully implemented and deployed, there are potential areas for improvement:

- **Error Handling**: Error handling mechanisms can be implemented to gracefully handle scenarios such as API failures, network issues, and invalid user inputs. This would provide a more robust and reliable user experience.

- **Unit Testing**: Implementing unit tests for the components and functionality of the search bar would help ensure the stability and maintainability of the codebase, allowing for easier future modifications and bug fixes.

- **Safari browser support** was not tested.

By addressing these areas for improvement, the project can be further optimized and polished, providing an even better user experience similar to that of Omio.

## How to use
Firstly install all the dependencies according to 'package.json' file:
```sh
npm install
```
### To run the production build of the app:
1. Install [serve](https://github.com/vercel/serve) and let it handle the rest:
```sh
npm install -g serve
```

2. Start 'Omio-Like Search Bar' App:
```sh
npm run build
```

### To run the app in the development mode:
1. Start 'Omio-Like Search Bar' App:
```sh
npm start
```

Open [http://localhost:5555](http://localhost:5555) to view the App in browser.
