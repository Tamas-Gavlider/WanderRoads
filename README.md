# WanderRoads

<strong>WanderRoads</strong> is a social media platform for travelers, where users can share their journeys, post travel stories on an interactive world map, and receive AI-driven travel recommendations based on their preferences. Unlike other social media platforms that prioritize likes and followers, WanderRoads focuses on sharing experiences and discovering more about different cultures and countries.

The live deployed site can be found [here](https://wanderroads-c8ef8cb5f31c.herokuapp.com/)

## Contents

- [Agile Development](#agile-development)
- [User Experience(UX)](#user-experienceux)
  - [Project Goals](#project-goals)
  - [User Stories](#user-stories)
- [Design](#design)
  - [Structure](#structure)
    - [Frontend Architecture](#frontend-architecture)
      - [Reusable Components](#reusable-components)
      - [Components](#components)
  - [Colour Scheme](#colour-scheme)
  - [Typography](#typography)
  - [Features](#features)
    - [Home](#home)
    - [Login](#login)
    - [Register](#register)
    - [Map](#map)
    - [Posts](#posts)
    - [Post](#post)
    - [Create Post](#create-post)
    - [Edit Post](#edit-post)
    - [Profile](#profile)
    - [Travel Preferences](#travel-preferences)
    - [Add Preferences](#add-preferences)
    - [Edit Preferences](#edit-preferences)
    - [Travel Recommendation](#travel-recommendation)
    - [Trip](#trip)
    - [Add Trip](#add-trip)
    - [Edit Trip](#edit-trip)
    - [Delete Trip](#delete-trip)
    - [Future Implementation](#future-implementations)
- [Technologies, Languages, and Programs used](#technologies-languages-and-programs-used)
- [Deployment & Local Development](#deployment--local-development)
  - [Local Deployment](#local-deployment)
    - [Running Frontend Locally](#running-the-react-frontend-locally)
  - [Testing](#testing)
    - [CSS](#css)
    - [JavaScript](#javascript)
    - [Python](#python)
    - [Lighthouse](#lighthouse)
    - [Wave](#wave)
    - [Automated Testing](#automated-testing)
    - [Backend Manual Testing](#backend-manual-testing)
      - [Registration](#registration)
      - [Profile](#profile-1)
      - [Login/Logout](#loginlogout)
      - [Posts](#posts-1)
      - [Comments](#comments)
      - [Travel Preferences](#travel-preferences)
      - [Travel Recommendation](#travel-recommendation-1)
      - [Trip](#trip-1)
    - [Full Testing](#full-testing)
    - [Bugs](#bugs)
    - [Known Bugs](#known-bugs)
- [Credits](#credits)
  - [Media](#media)
  - [Content](#content)
  - [Acknowledgments](#acknowledgments)

## Agile Development

User stories were prioritized using MoSCoW.
The Agile process emphasizes incremental development and user-focused delivery.

## User Experience(UX)

### Project Goals

The primary goals of the app is to provide a platform for travelers to share experiences and learn about different cultures and countries. Allow users to post stories which are visible on an interactive world map, making travel memories more immersive. Suggest travel destinations based on user preferences using AI-driven recommendations.

### User Stories

User Stories were tracked throughout the project as [GitHub issues](https://github.com/users/Tamas-Gavlider/projects/8).

## Design

### Structure

The diagram below represents the database structure for WanderRoads, illustrating the relationships between different entities within the platform.

- User: Stores authentication details (username, email, password). Each user has a related profile.
- Profile: Contains user details such as name, profile image, theme song, travel experience, visited countries, and status.
- Post: Represents travel stories shared by users, including title, content, images, and country tags.
- Comment: Allows users to interact with posts by leaving comments.
- Travel Preference: Stores user preferences for travel recommendations, such as preferred continent, climate, activities, budget, and duration.
- Travel Recommendation: AI-generated travel suggestions for users based on their preferences.
- Trip: Logs trips taken by users, including destination, start and end dates, and notes.

The database follows a relational structure, with users having a one-to-one relationship with profiles, while other entities, such as posts, comments, and trips, are linked through one-to-many relationships.

![Models](/docs/erd.png)<br>

#### Frontend architecture 

The frontend architecture for WanderRoads was designed and documented in an [Excel file](/docs/frontend.xlsx), outlining the structure and component hierarchy.<br>
Additionally, the initial UI wireframes, which served as a foundation for the design, are shown below. The final implementation differ from these initial designs.<br>
Home page
![Home](/docs/wireframes/home-page.png)<br>
Login page
![Login-Register](/docs/wireframes/login-page.png)<br>
Map page<br>
![Map](/docs/wireframes/map.png)<br>
Profile<br>
![Profile](/docs/wireframes/profile.png)<br>
Edit Profile<br>
![Edit Profile](/docs/wireframes/edit-profile.png)<br>
Post page<br>
![Post](/docs/wireframes/post.png)<br>
Users page<br>
![Users](/docs/wireframes/users.png)

##### Reusable Components 

- Asset - This component designed to display a spinner, an image, or a message based on the provided props. It is useful for handling loading states, placeholders, or error messages across the application.
- Avatar - Designed to display a user's profile image. It includes a loading state that shows a spinner while the image is being loaded.
- Loading -  A simple animated airplane icon to indicate a loading state. It can be used anywhere in the application where content is being fetched or processed. I used this loading component on the post page because I didn't want to overuse the spinner. A loading airplane catches the user's eye without making them focus too much on the loading process.
- MoreDropdown - A reusable three-dot menu that provides quick access to actions like editing and deleting. It is designed using React-Bootstrap’s Dropdown.
- ThemeSong - The ThemeSong component allows users to play or mute a background theme song. It is designed with a simple button that toggles the play/pause state and updates the corresponding volume icon dynamically.

#### Components

- Axios Defaults - This component configures Axios for making API requests within the app. It sets a default base URL for API calls. 
- Landing Page Text - This component displays the main landing page content for the app, welcoming users and inviting them to start their journey.
- NavBar - This navigation bar component is responsible for rendering different navigation options based on the user's authentication status.
- Not Found Page - This component handles the 404 error page for any unknown or invalid URLs.
- Popular Destinations - The component displays the top countries with the most posts on WanderRoads. It fetches post count data from the API and dynamically displays the most popular countries based on the number of posts.
- Current User Context - The component is a context provider that manages the authentication state of the current user, handles token refresh logic, and ensures that the user remains logged in across sessions. It leverages React Context and Axios interceptors for API requests and responses.
- Click Outside Toggle - A custom hook that provides functionality to manage the state of an expandable UI element (a dropdown menu or a mobile navbar). It ensures that the element collapses when a user clicks outside of it.
- Redirect - The hook handles user redirection based on their authentication status. It attempts to refresh the user's token and redirects them based on whether they are logged in or logged out.
- Sign In Form - The component handles user sign-in with validation, error handling, and redirection upon successful login. 
- Sign Up Form - It handles user registration by validating input fields, displaying error messages, and submitting the form to the backend.
- Comment - The component is responsible for rendering individual comments on posts. It supports the following functionality:
  - Display Comment
  - Edit Comment 
  - Delete Comment
  - Profile Link
- Comment Create Form - This component allows users to create and submit new comments on a post. 
- Comment Edit Form - This component allows users to edit the content of their comments. 
- Map - The component displays an interactive world map where users can view the number of posts made from different countries. The map is created using react-simple-maps and allows zooming and panning. The map is based on the world’s geography, fetched from an external URL (world-atlas data).
- Post - The component is responsible for displaying individual posts on the platform. 
- Post Create Form - The component is used to create a new post with a title, content, image, and country. 
- Post Edit Form - This component allows users to edit an existing post. 
- Post Page - The component allows users to view a specific post along with its associated comments.
- Posts Page - The component is designed to display a list of posts with features like search, infinite scroll, and an option to create new posts. 
- User Posts - The component is designed to fetch and display posts created by a specific user. 
- Add Country - The component allows users to select and add a country to their visited countries list.
- Change Theme Song - The component allows users to upload and update their profile's theme song.
- Edit Status - The component allows users to update their status on their profile. 
- Profile - The component is used to display a user's profile page, including personal information, posts, visited countries, travel preferences, and other editable fields.
- Profile Image Change Form - The  component is a form used for updating the profile image of a user.
- Profiles - The component is displaying a list of users, with search and sorting capabilities. 
- Username Form - The component allows users to update their username. 
- User Password Form - The component allows users to update their password. 
- Add Travel Preferences - The component allows users to add their travel preferences to their profile.
- Confirmation - The component serves as a confirmation page after the user successfully adds or updates their travel preferences. Initially, after creating travel preferences, the user was supposed to be redirected directly to their profile. However, after submitting the preference form, the profile_id in the user context was set to undefined, which caused issues with redirection. This confirmation page was introduced as a workaround to ensure a smooth user experience.
- Travel Preference Edit Form - The component allows users to edit their travel preferences. It fetches the existing preferences using the user's preference ID and pre-fills a form with the current data. 
- Travel Preferences - The component displays a user's travel preferences on their profile. It retrieves data from the backend and presents preferences in an organized layout.
- Travel Recommendation -  The component fetches and displays personalized travel recommendations based on the user's travel preferences.
- Add Trip - The component allows users to add a new trip by selecting a destination, specifying start and end dates, and adding optional notes. 
- Trip - The component displays a list of upcoming trips for the logged-in user. It allows users to edit or delete trips and automatically removes expired trips from the system.
- Trip Edit Form - This component allows the user to edit an existing trip. It pre-fills the form with the trip's data and allows changes to the destination, start date, end date, and notes. The form validates the dates to ensure the start date is not later than the end date. Upon successful form submission, the updated trip data is sent to the backend.

### Colour Scheme

![colour](/docs/color_palette.png)

1. #FF0000 (Red) – A bold, attention-grabbing color often associated with energy, passion, and urgency.
2. #00BAE2 (Cyan/Light Blue) – A vibrant and refreshing color that conveys trust, calmness, and modernity.
3. #281713 (Dark Brown) – A deep, earthy tone that adds warmth and a grounded, sophisticated feel.
   The chosen color palette creates a visually striking and dynamic experience:

- <strong>Contrast & Readability</strong>: The bold red and vibrant cyan provide strong contrast, making elements stand out. However, careful consideration is needed for text readability when using these colors together.
- <strong>Balance</strong>: The deep brown serves as a grounding element, making it suitable for backgrounds or accents to provide visual stability.
- <strong>Vibe</strong>: This combination blends high-energy red, fresh and modern cyan, and an earthy brown, reflecting an adventurous and engaging brand identity.

### Typography

TheAnonymous Pro font, available via Google Fonts.
Anonymous Pro is a family of four fixed-width fonts designed especially with coding in mind. It is inspired by Anonymous 9, a freeware Macintosh bitmap font developed in the mid-'90s by Susan Lesch and David Lamkins, that was intended as a more legible alternative to Monaco, the fixed-width Macintosh system font.

Characters that could be mistaken for one another (O, 0, I, l, 1, etc.) have distinct shapes to make them easier to tell apart in the context of source code. The regular and bold styles have embedded bitmaps for the smallest sizes (10-13 ppem.)

### Features

All pages feature a fully responsive navbar that transforms into a hamburger menu on smaller screens and a [favicon](/docs/favicon.png) in the browser tab.<br>
Navbar if user logged in
![Logged in](/docs/page_screenshots/navbar-logged-in.png)

Navbar is user logged out/not registered
![Logged out](/docs/page_screenshots/navbar-logged-out.png)

#### Home

The landing page includes the text 'Explore the World, Share Your Adventures. Connect with travelers, share memories, and get recommendations for your next journey,' along with a [background image of the world map](/frontend/src/assets/landing_page.webp) that gives visitors an idea of what the page is about. The background image is visible only on larger screens. Logged-out users will see a [button](/docs/page_screenshots/desktop-home-logged-out.png) that directs them to the signup page, while [logged-in](/docs/page_screenshots/desktop-home-logged-in.png) users will only see the text.
Mobile view:<br>
Logged in User
![logged_in_user](/docs/page_screenshots/mobile-home-logged-in.png)<br>
Logged out user
![logged_out](/docs/page_screenshots/mobile-home-logged-out.png)

#### Login

The login page includes the login form and an [image of mountains](/frontend/src/assets/sign_in_img.jpg) on larger screens. This image makes me feel relaxed and calm, so I believe it was a good choice for the login page. Below the login form, there is a link to the registration page for users who have not registered yet.
Desktop view:<br>
![desktop](/docs/page_screenshots/login-desktop.png)
Mobile view:<br>
![mobile](/docs/page_screenshots/login-mobile.png)

#### Register

The register page includes the registration form and an [image of accessories](/frontend/src/assets/reg_img.jpg) (such as a travel bag, camera lens, and shoes) on larger screens. This image conveys a 'let's go for an adventure' vibe, encouraging users to register and start their journey. Below the registration form, there is a link to the login page for users who have already registered.
Desktop view:<br>
![desktop](/docs/page_screenshots/register-desktop.png)
Mobile view:<br>
![mobile](/docs/page_screenshots/register-mobile.png)

#### Map

The [map](/docs/page_screenshots/map.png) is implemented using the React Simple Maps template. Countries where posts were taken are highlighted on the map. When hovering over a country, a tooltip will display the number of posts from that country.<br>
Country with posts:<br>
![country_with_posts](/docs/page_screenshots/country-with-posts.png)<br>
Country with 0 posts:<br>
![country_with_no_posts](/docs/page_screenshots/country-0-post.png)

#### Posts

The posts page allows users to view all existing posts. It uses infinite scroll, making it more user-friendly without the need to click to the next page. The search bar lets users search for posts by username or country. The 'Create Post' button, with the text 'Share Your Journey,' is positioned on the right side of the screen on larger screens and at the top of the search bar on smaller screens.<br>
Desktop view:<br>
![desktop](/docs/page_screenshots/posts-page-desktop.png)<br>
Mobile view:<br>
![mobile](/docs/page_screenshots/posts-page-mobile.png)

#### Post

The post page allows users to comment on the post or visit the post owner's profile by clicking on their username. The edit/delete buttons are accssible via the dropdown from the post page as well. The post page has an additional feature on larger screens: the right side of the screen displays a table with popular destinations. These destinations are ranked based on the number of posts from each country.<br>
![dropdown](/docs/page_screenshots/post-dropdown.png)<br>
Desktop view:<br>
![desktop](/docs/page_screenshots/post-page-desktop.png)<br>
Mobile view:<br>
![mobile](/docs/page_screenshots/post-page-mobile.png)<br>
Popular destinations:<br>
![popular_destinations](/docs/page_screenshots/popular-destinations.gif)

#### Create Post

The 'Create Post' button is accessible from the posts page. Validations ensure that users can only upload images, not videos or other file formats. The uploaded image must meet specific requirements, such as size and height. The title, content, and country are mandatory fields.

#### Edit Post

Users can edit their existing posts. The edit function includes changing the post image, title, content, and country.<br>
![edit_post](/docs/page_screenshots/edit-post.png)

#### Profile

From the profile page the users can see their profile image with a background image, status, experience level following their username,theme_song, posts created by profile owner, [visited countries](/docs/page_screenshots/visited-countries.png), travel recommendations and update their account details conveniently.<br>
![profile](/docs/page_screenshots/profile.png)<br>
Users can:

- Change their status.
- Change username
- Change password
- Change theme song.
- Add/Remove visited countries.
- Add/Change travel preferences<br>
![edit-profile](/docs/page_screenshots/edit-profile.png)
Profile visitors can see the visited countries and preferences of the owners from the tabs and the user experience level, status and theme song.<br>
![visitor](/docs/page_screenshots/profile-not-owner.png)

#### Travel Preferences

User can set up/edit their preferences from the profile page. Based on the preferences the travel recommendation will be regenerated.

#### Add Preferences

User will be directed to the add preferences page if they are setting up the preferences first time. Once the preferences created the user will be firected to the confirmaiton page.

#### Edit Preferences

User can edit the travel preferences anytime from the profile page by clicking on the edit button in the travel preference tab. The user can choose from the existing choices from dropdown. Based on the new preferences the travel recommendation will be regenerated.<br>
![travel-pref](/docs/page_screenshots/travel-preferences.png)<br>
Edit form:<br>
![edit-form](/docs/page_screenshots/travel-pref-edit.png)

#### Travel Recommendation

Travel recommendations are generated after the travel preferences set by the user. Top 5 recommended cities will be visible from the profile page. Anytime the user will update the preferences the recommendations will change. If there are no recommendations for a given preferences, an error message will show up instead of the recommended cities.<br>
![recommendation](/docs/page_screenshots/recommendations.png)

#### Travelers

Travelers page will show all the existing registered users. Users can search for other users by name or sort them by number of posts or name. By click on the profile image the user will be directed to the user profile. 
![profiles](/docs/page_screenshots/profiles.png)

#### Trip

Trip page is accessible from the Navbar. Customer can track their upcoming trips by adding the destinations (country) start date of trip, and date of trip and optional notes. The trip will have a countdown showing how many days are left until the trip. If day left is less than 0 the trip will be removed from the page. 
Start date and end date validation implemented to make sure that users cannot enter past dates for start date and the end date cannot be prior the start date.
Regardless of when the trip was created, the trips are sorted based on the days left until the trip. If less than 6 days left until the trip the color of the Trip card will change the color of the background. Also the trips can be edited/deleted by the user which are accesible via the dropdown menu within the trip card. 
<br>
Desktop view:<br>
![desktop](/docs/page_screenshots/trip-desktop.png)<br>
Mobile view:<br>
![mobile](/docs/page_screenshots/trip-mobile.png)

#### Add Trip

An upcoming trip can be added from the Trip page. It’s a simple form that allows users to select the destination country, choose the start and end dates for the trip, and add optional notes.<br>
![add_trip_btn](/docs/page_screenshots/add-trip-btn.png)<br>
![add_trip_form](/docs/page_screenshots/add-trip-form.png)

#### Edit Trip

User can edit the existing trip like adding notes, change the start/end date or destination.<br> 
![edit_dropdown](/docs/page_screenshots/edit-trip-dropdown.png)<br>
![edit_trip](/docs/page_screenshots/edit-trip-form.png)

#### Delete Trip

In case the trip gets canceled, the user will have the option to delete it from the dropdown menu.

#### Future Implementations

- Trip Fundraising: Users will be able to request funds for their trips by setting up a fundraising goal. Other users can contribute to help them reach their destination.
- Flight Search Integration: A feature will be added to allow users to search for flights directly within the platform, making trip planning more convenient.
- Notifications for natural disasters: Users will receive notifications about natural disasters if they have an upcoming trip to the affected country.
- Friendship and private messaging: Users can mark each other as friends and exchange private messages.

## Technologies, Languages, and Programs used

- CSS - Stylesheet language for styling the appearance of web pages.
- React Bootstrap - A framework for building responsive, mobile-first sites.
- React - A JavaScript library used for building user interfaces, particularly for single-page applications. It allows developers to build reusable UI components.
- Javascript - A programming language used for writing dynamic code in React. It’s the primary language for frontend development in React.
- Python - The programming language used for the project backend.
- Django REST Framework - Used for building the backend API.
- Djano Allauth - Used for authentication, registration, login & password reset.
- gunicorn - a Python WSGI HTTP Server
- psycopg2 - allow us to connect with a postgres database
- [React Simple Maps](https://www.react-simple-maps.io/) - react library to implement the Map page 
- [PyCountry](https://pypi.org/project/pycountry/) - Python library for working with country names, codes, and related information.
- [Cloudinary](https://cloudinary.com/) - A cloud service for hosting, managing, and delivering media files (images, videos, etc.).
- PostgreSQL - The database used to store transactions data, user information, and other relevant data for the application.
- Chrome Dev Tools - To troubleshoot, test features and solve issues with responsiveness and styling
- GitHub - Web-based platform for version control and collaboration on software projects.
- Google Fonts - Library of free and open-source web fonts.
- Heroku - Used to deploy the project for hosting and managing the live application.
- Favicon.io - To create Favicon.
- VS Code – Used for local development.
- [DBDiagram](https://dbdiagram.io/d) - To create ER Diagram
- [FreeConvert](https://www.freeconvert.com/convert/video-to-gif) - to convert screenrecordings to GIF
- [Font Awesome](https://fontawesome.com/) - A popular icon library that provides a collection of icons, which can be used throughout the page for various UI elements.
- [CloudConvert](https://cloudconvert.com/jpg-to-webp) - Convert jpg images to webp format.

## Deployment & Local Development

The project is deployed using Heroku. To deploy the project:

1. Create a live database - The database used in this project was provided by Code Institute.
2. Heroku app setup:
   1. From the Heroku dashboard, click the new button in the top right corner and select create new app.
   2. Give your app a name (this must be unique), select the region that is closest to you and then click the create app button bottom left.
   3. Open the settings tab and create a new config var of DATABASE_URL and paste the database URL(the value should not have quotation marks around it).
3. Prepare for deployment in VsCode:
   1. Install dj_database_url and psycopg2 (they are both needed for connecting to the external database you've just set up)<br>
      -- pip3 install dj-database-url==2.3.0 psycopg2==2.9.10 --
   2. Update your requirements.txt file with the installed packages.<br>
      -- pip3 freeze --local > requirements.txt --
   3. In settings.py underneath import os, add -- import dj_database_url --.
   4. To prevent your database URL from being misused, you can store it in the env.py file and add this file to .gitignore to keep it secure. Using the os library, you can then retrieve the database URL in your code instead of directly including it in settings.py.
   5. In the terminal, run the show migrations command to confirm connection to the external database.<br>
      -- python3 manage.py runserver --
   6. If you have set up the database correctly, you can now run migrations to migrate the models to the new database.<br>
      -- python3 manage.py migrate --
   7. Create a superuser for the new database.<br>
      -- python3 manage.py createsuperuser --
   8. Install gunicorn which will act as our webserver and freeze this to the requirements.txt file.<br>
      -- pip3 install gunicorn --
   9. Create a Procfile in the root directory. This tells Heroku to create a web dyno which runs gunicorn and serves our django app. Add the following to the file:<br>
      -- release: python manage.py makemigrations && python manage.py migrate
      web: gunicorn wonder_roads_api.wsgi:application --
   10. Add the Heroku app and localhost to ALLOWED_HOSTS = [] in settings.py:<br>
   11. Install whitenoise. It will allow your Heroku app to serve its own static files without relying on any external file hosting services like a content delivery network (CDN). Then add it to the requirements.txt.
       <br>
       -- pip3 install whitenoise~=6.8.2 --
       <br>
       The WhiteNoise middleware must be placed directly after the Django SecurityMiddleware in settings.py<br>
       -- 'whitenoise.middleware.WhiteNoiseMiddleware', --
       Staticfiles for this project stored on Cloudinary so in settings.py you will need to set<br>
       -- STATICFILES_STORAGE = "cloudinary_storage.storage.StaticCloudinaryStorage" --
   12. Add the following path to settings.py<br>
       -- STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles') --
   13. Create a staticfiles folder in the project root directory-- mkdir staticfiles -- <br>
       Collect admin and rest framework staticfiles-- python3 manage.py collectstatic -- <br>
       Cd to the frontend directory and compile the react app-- npm run build && mv build ../staticfiles/. -- <br>
       Add a runtime.txt file to your app's root directory. Check your Python version and copy the runtime closest to the one used in your IDE.
       [Python support](https://devcenter.heroku.com/articles/python-support#specifying-a-python-version)<br>
       In settings.py, the following needs to be set:<br>-- STATICFILES_DIRS = BASE_DIR / 'staticfiles' / 'build' --
   14. Save, add, commit and push the changes to GitHub.
   15. To enable automatic deploys on Heroku, go to the deploy tab and click the connect to GitHub button in the deployment method section. Search for the projects repository and then click connect. Click enable automatic deploys at the bottom of the page.
4. Django automatically sets a secret key when you create your project, however we shouldn't use this default key in our deployed version. We can use a random key generator to create a new SECRET_KEY which we can then add to our Heroku config vars.
5. The following entries must be added to the Heroku config vars:
   1. ALLOWED_HOST - the url of the deployed version with https://
   2. CLIENT_ORIGIN - the full page url including https://
   3. CLOUDINARY_URL
   4. DATABASE_URL
   5. SECRET_KEY


### Local Deployment

This repository can be cloned and run locally with the following steps:

- Login to GitHub.
- Select repository named: https://github.com/Tamas-Gavlider/WanderRoads
- Click code toggle button and copy the url (https://github.com/Tamas-Gavlider/WanderRoads.git).
- In your IDE, open the terminal and run the git clone command (git clone https://github.com/Tamas-Gavlider/WanderRoads.git). The repository will now be cloned in your workspace.
- Navigate to the project directory 
- Create a virtual environment:
  1. python3 -m venv env 
  2. source env/bin/activate
- Install dependencios -- pip3 install -r requirements.txt --
- Set up environment variables:
 - Create a file named env.py and define your variables:
   - import os
      os.environ['DATABASE_URL'] = 'your-local-database-url'
      os.environ['SECRET_KEY'] = 'your-secret-key'
   - Add env.py to .gitignore.
- Run migrations -- python3 manage.py migrate -- 
- Create superuser -- python3 manage.py createsuperuser --
- Run development server -- python3 manage.py runserver --

#### Running the React Frontend Locally

Create a folder for frontend -- mkdir frontend<br>
Navigate to the frontend directory and install the React app provided by Code Institute:<br>
-- cd frontend --<br>
-- npx create-react-app . --template git+https://github.com/Code-Institute-Org/cra-template-moments.git --use-npm -- <br>
To fix OpenSSL dependency issues, execute the following command in terminal before running the app:<br> -- export NODE_OPTIONS=--openssl-legacy-provider  --  <br>
Then, start the React app: -- npm run --

### Testing

I have used Chrome Developer tool while building the web page and troubleshoot any issues immediately.<br>
The following issues were raised during my mid project meeting with my mentor:
  - Error messages for invalid inputs on the frontend were unclear.
  - There was a mismatch between the backend and frontend requirements: the backend did not require an image for a post, while the frontend did.
  - The landing page lacked information on why users should register.
  - The option to attach background music to posts was removed.

#### CSS

[W3C](https://validator.w3.org/) was used to validate the CSS.

| File                      | Result |                                                       Screenshot |
| ------------------------- | :----: | ---------------------------------------------------------------: |
|   Add-Country  |  Pass  |  [add-country](/docs/testing/w3c/add-country-css.png)     |
|  Add-Trip   |  Pass  |  [add-trip](/docs/testing/w3c/add-trip-css.png)     |
|  App   |  Pass  |  [app](/docs/testing/w3c/app-css.png)     |
| Asset    |  Pass  |  [asset](/docs/testing/w3c/asset-css.png)     |
|  Avatar   |  Pass  |   [avatar](/docs/testing/w3c/avatar-css.png)    |
|  Button   |  Pass  |   [button](/docs/testing/w3c/button-css.png)    |
|  Comment-Create-Edit-Form   |  Pass  |   [comment-create-edit-form](/docs/testing/w3c/comment-create-edit-form-css.png)    |
|   Comment  |  Pass  |   [comment](/docs/testing/w3c/comment-css.png)    |
|  Confirmation   |  Pass  |   [confirmation](/docs/testing/w3c/confirmation-css.png)     |
|  Edit-Profile   |  Pass  |   [edit-profile](/docs/testing/w3c/edit-profile-css.png)    |
|  Edit-Status   |  Pass  |   [edit-status](/docs/testing/w3c/edit-status-css.png)    |
|  Edit-Travel-Preferences   |  Pass  |  [edit-travel-preferences](/docs/testing/w3c/edit-travel-preferences-css.png)     |
|   Landing-Page-Text  |  Pass  |  [landing-page-text](/docs/testing/w3c/landing-page-text-css.png)     |
|  Loading   |  Pass  |  [loading](/docs/testing/w3c/loading-css.png)     |
|  Map   |  Pass  |    [map](/docs/testing/w3c/map-css.png)   |
|   More-Dropdown  |  Pass  |   [more-dropdown](/docs/testing/w3c/moredropdown-css.png)    |
|  NavBar   |  Pass  |   [navbar](/docs/testing/w3c/navbar-css.png)    |
|  Not-Found-Page   |  Pass  |   [not-found-page](/docs/testing/w3c/not-found-page-css.png)    |
|  Popular-Destinations   |  Pass  |  [popular-destinations](/docs/testing/w3c/popular-destinations-css.png)     |
|  Post-Create-Edit-Form   |  Pass  |  [post-create-edit-form](/docs/testing/w3c/post-create-edit-form-css.png)     |
|  Post   |  Pass  |  [post](/docs/testing/w3c/post-css.png)     |
|  Post-Page   |  Pass  |  [post-page](/docs/testing/w3c/post-page-css.png)     |
|  Posts-Page   |  Pass  |  [posts-page](/docs/testing/w3c/posts-page-css.png)     |
|  Profile   |  Pass  |   [profile](/docs/testing/w3c/profile-css.png)    |
|  Profiles  |  Pass  |   [profiles](/docs/testing/w3c/profiles-css.png)    |
|  Sing-In-Up-Form   |  Pass  |   [sign-in-up-form](/docs/testing/w3c/sign-in-up-form-css.png)     |
|  Theme-Song   |  Pass  |   [theme-song](/docs/testing/w3c/theme-song-css.png)    |
|  Travel-Preferences   |  Pass  |  [travel-preferences](/docs/testing/w3c/travel-preference-css.png)     |
|  Travel-Recommendations   |  Pass  |  [travel-recommendation](/docs/testing/w3c/travel-recommendation-css.png)     |
|  Trip   |  Pass  |   [trip](/docs/testing/w3c/trip-css.png)    |
|  User-Posts   |  Pass  |   [user-posts](/docs/testing/w3c/user-posts-css.png)    |

#### JavaScript

JSX code was validated with ESLint. It helps to identify and fix issues in your JavaScript and JSX code. 
Errors due to the App.test file.
![eslint-error](/docs/testing/eslint/eslint-error.png)<br>
No errors after the code commented out in test file.
![eslint](/docs/testing/eslint/eslint.png)

#### Python

[Code Institute Python Linter](https://pep8ci.herokuapp.com/) was used to validate the python files.

| File                      | Result |                                                       Screenshot |
| ------------------------- | :----: | ---------------------------------------------------------------: |
|   Comment-Models    |  Pass  |     [comment-models](/docs/testing/pep8/comment_models.png)        |
|    Comment-Serializers   |  Pass  |     [comment-serializers](/docs/testing/pep8/comment-serializers.png)          |
|     Comment-Urls    |  Pass  |      [comment-urls](/docs/testing/pep8/comment-urls.png)        |
|      Comment-Views    |  Pass  |       [comment-views](/docs/testing/pep8/comment-views.png)         |
|  Post-Models    |  Pass  |   [post-models](/docs/testing/pep8/post-models.png)    |
|   Post-Serializers  |  Pass  |  [post-serializers](/docs/testing/pep8/post-serializers.png)    |
|     Post-Urls   |  Pass  |    [post-urls](/docs/testing/pep8/post-urls.png)        |
|   Post-Views    |  Pass  |   [post-views](/docs/testing/pep8/post-views.png)       |
|    Profile-Admin   |  Pass  |  [profile-admin](/docs/testing/pep8/profile-admin.png)         |
|   Profile-Models     |  Pass  |   [profile-models](/docs/testing/pep8/profile-models.png)     |
|    Profile-Tests   |  Pass  |   [post-tests](/docs/testing/pep8/profile-tests.png)       |
|   Profile-Serializers    |  Pass  |   [profile-serializers](/docs/testing/pep8/profile-serializers.png)          |
|   Profile-Urls    |  Pass  |     [profile-urls](/docs/testing/pep8/profile-urls.png)           |
|  Profile-Views   |  Pass  | [profile-views](/docs/testing/pep8/profile-views.png)   |
| Travel-Pref-Urls |  Pass  | [travel-pref-urls](/docs/testing/pep8/travel-pref-urls.png) |
| Travel-Pref-Models |  Pass  |   [travel-pref-models](/docs/testing/pep8/travel-pref-models.png)   |
| Travel-Pref-Serializers  |  Pass  |   [travel-pref-serializers](/docs/testing/pep8/travel-pref-serializers.png)   |
|  Travel-Pref-Views |  Pass  | [travel-pref-views](/docs/testing/pep8/travel-pref-views.png)   |
|   Recommendation-Models   |  Pass  |    [recommendation-models](/docs/testing/pep8/travel-recommendation-models.png)    |
|   Recommendation-Recommendations     |  Pass  |    [recommendation-recommendations](/docs/testing/pep8/travel-recommendation-recommendations.png)      |
|  Recommendation-Serializers    |  Pass  | [recommendation-serializers](/docs/testing/pep8/travel-recommendation-serializers.png)       |
|   Recommendation-Urls     |  Pass  |   [recommendation-urls](/docs/testing/pep8/travel-recommendation-urls.png)       |
|   Recommendation-Views   |  Pass  |    [recommendation-views](/docs/testing/pep8/travel-recommendation-views.png)    |
|  Trip-Models      |  Pass  |   [trip-models](/docs/testing/pep8/trip-models.png)       |
|   Trip-Serializers   |  Pass  |   [trip-serializers](/docs/testing/pep8/trip-serializers.png)     |
|    Trip-Urls    |  Pass  |   [trip-urls](/docs/testing/pep8/trip-urls.png)       |
|     Trip-Views   |  Pass  |   [trip-views](/docs/testing/pep8/trip-views.png)       |

#### Lighthouse

I have used Lighthouse to test the performance, accessibility, best practices and SEO of the site.<br>
The Lighthouse test gave a low score for best practices due to the use of third-party cookies. I was able to slightly improve this score by adding cache control settings in settings.py, as well as in the profile and post views. Performance issues are significantly lower on mobile devices compared to desktops. To enhance performance, I removed a second Google Font, eliminated background images on small devices, and reduced image sizes for smaller screens. Additionally, I implemented lazy loading for images, but the performance improvement on mobile was only slight.

| File                      | Result |                                                       Screenshot |
| ------------------------- | :----: | ---------------------------------------------------------------: |
|  Landing Page   |  Pass  |  [mobile](/docs/testing/lighthouse/landing-page-mobile.png) - [desktop](/docs/testing/lighthouse/landing-page-desktop.png) | 
|  Sign In   |  Pass  | [mobile](/docs/testing/lighthouse/sign-in-mobile.png) - [desktop](/docs/testing/lighthouse/sign-in-desktop.png)  | 
|  Sign Up   |  Pass  |  [mobile](/docs/testing/lighthouse/sign-up-mobile.png) - [desktop](/docs/testing/lighthouse/sign-up-desktop.png)  | 
|  Map   |  Pass  | [mobile](/docs/testing/lighthouse/map-mobile.png) - [desktop](/docs/testing/lighthouse/map-desktop.png)   | 
|  Posts Page   |  Pass  | [mobile](/docs/testing/lighthouse/posts-page-mobile.png) - [desktop](/docs/testing/lighthouse/posts-page-desktop.png)  | 
|   Post Page  |  Pass  | [mobile](/docs/testing/lighthouse/post-page-mobile.png) - [desktop](/docs/testing/lighthouse/post-page-desktop.png)  | 
|  Create Post   |  Pass  | [mobile](/docs/testing/lighthouse/create-post-mobile.png) - [desktop](/docs/testing/lighthouse/create-post-desktop.png)  | 
|  Edit Post   |  Pass  | [mobile](/docs/testing/lighthouse/edit-post-mobile.png) - [desktop](/docs/testing/lighthouse/edit-post-desktop.png)  | 
|  Profiles   |  Pass  | [mobile](/docs/testing/lighthouse/profiles-mobile.png) - [desktop](/docs/testing/lighthouse/profiles-desktop.png)  | 
|   Trip  |  Pass  |  [mobile](/docs/testing/lighthouse/trip-mobile.png) - [desktop](/docs/testing/lighthouse/trip-desktop.png) | 
|  Add Trip   |  Pass  | [mobile](/docs/testing/lighthouse/add-trip-mobile.png) - [desktop](/docs/testing/lighthouse/add-trip-desktop.png)  | 
|   Edit Trip  |  Pass  | [mobile](/docs/testing/lighthouse/edit-trip-mobile.png) - [desktop](/docs/testing/lighthouse/edit-trip-desktop.png)  | 
|   Profile  |  Pass  | [mobile](/docs/testing/lighthouse/profile-mobile.png) - [desktop](/docs/testing/lighthouse/profile-desktop.png)  | 
|  Change Profile Image   |  Pass  | [mobile](/docs/testing/lighthouse/change-profile-image-mobile.png) - [desktop](/docs/testing/lighthouse/change-profile-image-desktop.png)  | 
|  Change Username   |  Pass  |  [mobile](/docs/testing/lighthouse/change-username-mobile.png) - [desktop](/docs/testing/lighthouse/change-username-desktop.png) | 
|  Change Password   |  Pass  | [mobile](/docs/testing/lighthouse/change-password-mobile.png) - [desktop](/docs/testing/lighthouse/change-password-desktop.png)  | 
|   Change Theme Song  |  Pass  | [mobile](/docs/testing/lighthouse/change-theme-song-mobile.png) - [desktop](/docs/testing/lighthouse/change-theme-song-desktop.png)   | 
|  Update Status   |  Pass  | [mobile](/docs/testing/lighthouse/update-status-mobile.png) - [desktop](/docs/testing/lighthouse/update-status-desktop.png)   | 
|  Edit Travel Preferences   |  Pass  | [mobile](/docs/testing/lighthouse/edit-travel-preferences-mobile.png) - [desktop](/docs/testing/lighthouse/edit-travel-preferences-desktop.png)   | 
|  Confirmation   |  Pass  |  [mobile](/docs/testing/lighthouse/confirmation-mobile.png) - [desktop](/docs/testing/lighthouse/confirmation-desktop.png)  | 
|  Not Found Page   |  Pass  | [mobile](/docs/testing/lighthouse/not-found-page-mobile.png) - [desktop](/docs/testing/lighthouse/not-found-page-desktop.png)   | 
| Add Visited Country    |  Pass  |  [mobile](/docs/testing/lighthouse/add-visited-country-mobile.png) - [desktop](/docs/testing/lighthouse/add-visited-country-desktop.png)  | 

#### Wave

WAVE(Web Accessibility Evaluation Tool) allows developers to create content that is more accessible to users with disabilities. It does this by identifying accessibility and WGAC errors.

| File                      | Result |                                                       Screenshot |
| ------------------------- | :----: | ---------------------------------------------------------------: |
|   Landing Page   |  Pass  |  [landing-page](/docs/testing/wave/landing-page.png)   | 
|   Add Visited Country    |  Pass  |  [add-visited-country](/docs/testing/wave/add-visited-countries.png)   | 
|  Change Password  |  Pass  |  [change-password](/docs/testing/wave/change-password.png)  | 
| Change Profile Image   |  Pass  | [change-profile-image](/docs/testing/wave/change-profile-image.png)  | 
| Change Theme Song   |  Pass  | [change-theme-song](/docs/testing/wave/change-theme-song.png)  | 
| Change Username   |  Pass  | [change-username](/docs/testing/wave/change-username.png)  | 
|  Create Post  |  Pass  | [create-post](/docs/testing/wave/create-post.png)  | 
|  Edit Post  |  Pass  | [edit-post](/docs/testing/wave/edit-post.png)  | 
|  Edit Travel Preferences  |  Pass  | [edit-travel-preferences](/docs/testing/wave/edit-travel-preferences.png)  | 
|  Confirmation  |  Pass  | [confirmation](/docs/testing/wave/confirmation.png)  | 
|  Map  |  Pass  | [map](/docs/testing/wave/map.png)  | 
|  Post Page  |  Pass  | [post-page](/docs/testing/wave/post-page.png)  | 
|  Posts Page  |  Pass  |  [posts-page](/docs/testing/wave/posts-page.png)  | 
|  Profile  |  Pass  |  [profile](/docs/testing/wave/profile.png) | 
|  Profiles  |  Pass  |  [profiles](/docs/testing/wave/profiles.png) | 
|  Sign In  |  Pass  | [sing-in](/docs/testing/wave/sign-in.png)  | 
|  Sign Up  |  Pass  | [sign-up](/docs/testing/wave/sign-up.png)  | 
|  Trip  |  Pass  | [trip](/docs/testing/wave/trip.png)  | 
|  Add Trip  |  Pass  | [add-trip](/docs/testing/wave/add-trip.png)  | 
|  Edit Trip  |  Pass  | [edit-trip](/docs/testing/wave/edit-trip.png)  | 
|  Update Status  |  Pass  | [update-status](/docs/testing/wave/update-status.png)  | 
|  Not Found Page  |  Pass  | [not-found-page](/docs/testing/wave/not-found-page.png)  | 

#### Automated testing

Automated testing for this project was carried out with [TestCases](https://docs.djangoproject.com/en/5.1/topics/testing/overview/).

#### Backend Manual Testing 

##### Registration
- Tested edge cases such as short passwords, mismatched passwords, and existing usernames to ensure proper validation.<br>
Registration validation:<br>
![register](/docs/testing/api_test/api-registration-validation.gif)<br>
Registration with existing username:<br>
![regsiter_existing](/docs/testing/api_test/api-registration-existing-user.gif)


##### Profile
- Verified profile updates for both the profile owner and visitors. Only the owner can update their profiles.<br>
![profile](/docs/testing/api_test/edit-profile-not-owner.png)

- Ensured validation for invalid file formats when uploading a profile image or theme song.
Theme Song:
![theme_song](/docs/testing/api_test/api-change-theme-song.gif)<br>
Profile image test for wrong format:<br>
![profile_img](/docs/testing/api_test/api-profile-image.png)<br>
Profile image change with valid file:<br>
![profile_image](/docs/testing/api_test/api-profile-image-change.gif)<br>
- Testing the addition of visited countries could not be performed on the backend, as the API view returned the message: "Lists are not currently supported in HTML input." 
![visited_countries](/docs/testing/api_test/profile-visited-countries.png)<br>
The experience level is updated dynamically when countries are added, and it cannot be changed manually by the user.<br>
![experience_level](/docs/testing/api_test/api-experience-level.gif)

##### Login/Logout
- Tested login with a valid username and password.
- Attempted login with a nonexistent username and an incorrect password.<br>
![login](/docs/testing/api_test/api-login.gif)
- Verified that logout functionality works correctly.<br>
![logout](/docs/testing/api_test/api-logout.png)
##### Posts
- Attempted to create a post without a title, content, or image, and tested validation for wrong file formats and file sizes.
Post with title:<br>
![create_post](/docs/testing/api_test/api-post-create-missing-content.gif)<br>
Post without image:<br>
![create_post2](/docs/testing/api_test/api-post-without-image.gif)<br>
Post image size/format validation:<br>
![post_image](/docs/testing/api_test/api-post-image-size-validation.gif)<br>
![post_image_format](/docs/testing/api_test/api-post-image-wrong-file-format.gif)
- Edited an existing post and tested:

   - Removing the title or content (should not be allowed).

   - Changing an image to an invalid file format or size.<br>
   ![poset_edit_validation](/docs/testing/api_test/api-edit-post.gif)

   - Editing another user's post (should not be allowed).<br>
   ![post_owner_edit](/docs/testing/api_test/edit-post-not-owner.png)

##### Comments
- Added comments to posts and verified functionality.<br>
![comment](/docs/testing/api_test/api-create-edit-comment.gif)
- Tested editing and deleting comments, ensuring that only the comment owner can make changes.<br>
![comment_owner](/docs/testing/api_test/edit-comment-not-owner.png)
- Verified that comments do not exceed the maximum character limit set in the models.<br>
![comment_validation](/docs/testing/api_test/comment-more-than%20250-char.png)
##### Travel Preferences
- Created and manually updated travel preferences.<br>
![travel-pref](/docs/testing/api_test/edit-travel-preferences.gif)
- Confirmed that predefined choices prevent invalid inputs, ensuring users can only select from the available options.

##### Travel Recommendation
- Verified that travel recommendations are generated based on the user's travel preferences.

- Displayed an appropriate message if no recommendations were available due to specific preferences.

- Ensured that recommendations update dynamically when the user modifies their travel preferences.<br>
![travel-recommendation](/docs/testing/api_test/api-travel-pref-recommendation.gif)

##### Trip
- Attempted to create an upcoming trip with past start dates and end dates set before the start date to ensure validation works correctly.<br>
![add_trip](/docs/testing/api_test/api-add-trip.gif)
- Edited an existing trip and tested:

  - Changing the start date to a past date (should not be allowed).

  - Setting an end date earlier than the start date (should trigger an error).<br>
  ![edit_trip](/docs/testing/api_test/api-edit-trip.gif)

#### Manual Testing Frontend

##### Logged out user

Test to ensure that logged-out users and visitors cannot access specific pages without registering or signing in.

![user](/docs/testing/frontend_test/test-logged-out-user.gif)

##### Sign Up

Test the sign-up form to ensure that users cannot submit it with blank fields, create a profile with an existing username, or use a short/weak password.

![sign-up](/docs/testing/frontend_test/sign-up-validation.gif)

##### Sing In

Test the sign-in form to ensure that users cannot sing in with blank fields, invalid password or wrong username.

![sign-in](/docs/testing/frontend_test/sign-in-validation.gif)

##### Log Out

Test the logout functionality to ensure that the user is signed out when they click on the logout link in the navbar.

![logout](/docs/testing/frontend_test/logout.gif)

##### Map

Test whether the map dynamically updates the number of posts based on newly created posts.<br>
Before new post:<br>
![before-post](/docs/testing/frontend_test/map-before-new-post.png)<br>
After new post:<br>
![after-post](/docs/testing/frontend_test/map-after-new-post.png)

##### Create/Edit/Delete Post

Test to ensure that the create, edit, and delete functions work correctly and that users receive errors if any fields are blank or if the image does not meet the required criteria.

![create-post](/docs/testing/frontend_test/create-post-validation.gif)<br>

Validate image upload requirements:<br>
![create-post-2](/docs/testing/frontend_test/create-post-validation-2.gif)<br>

##### Create/Edit/Delete Comment

Test to verify that comments can be edited and deleted, and ensure that the user cannot submit a comment if the field is empty. Also, confirm that the buttons for canceling edits and deletions are functioning correctly.<br>

Comment on own post:<br>
![edit-del-own-comment](/docs/testing/frontend_test/edit-delete-own-comment.gif)<br>

Comment on other users' posts:<br>
![edit-del-comment-visitor](/docs/testing/frontend_test/edit-comment-visitor.gif)

##### Profile

###### Edit Status

###### Change Profile Image

###### Change Theme Song

###### Add Visited Countries

###### Change username

###### Change password

###### Profile Visitor 

#### Full Testing

Full testing was performed on the following devices:

- Mobile:
  - Iphone 11 - tested browsers Chrome and Safari
  - Iphone 13 - tested browser Safari
- Laptop:
  - Macbook Pro 2019 13 inch screen - tested browsers Safari and Chrome
  - Mackbook Pro 2014 15 inch screen - tested browsers Safari, Chrome and Firefox
- Desktop:
  - iMac 2013 21.5 inch - tested browsers Safari and Chrome

#### Bugs

Bugs were tracked throughout the project as [GitHub issues](https://github.com/users/Tamas-Gavlider/projects/5/views/1).
The following bugs were identified during the testing:

- If a user visits a profile and the profile owner hasn't set any travel preferences yet, the "Add Travel Preferences" button will be visible. However, if the visitor clicks on it, an error message saying, "You already have preferences," will appear.

- The issue where the edit post could not be submitted without updating the image has been fixed, but the image was not made a required field.

- Cache was added to the Post model in the backend; however, it caused an issue on the frontend. When a post was created, it did not immediately appear on the posts page or the map. The cache was removed from the post views to fix this issue.

#### Known Bugs

## Credits

### Media

The background image was downloaded from [Pexels](https://www.pexels.com/).
<br>
The default theme song was downloaded from [Pixabay](https://pixabay.com/).
<br>
The favicon logo was created on [FreeLogoDesign](https://www.freelogodesign.org/)
<br>
All screenshots used in this README file were taken by myself.

### Content

[W3Schools](https://www.w3schools.com/) to review how certain libraries (for example Pandas) function and for React tutorials and errors handling.

[Cloudinary](https://support.cloudinary.com/hc/en-us/community/posts/360009752479-How-to-resize-before-uploading-pictures-in-Django) to resize images to improve app speed.

[Simple maps](https://github.com/zcreativelabs/react-simple-maps/issues/344) - for simple maps template.

[Recommendation article ](https://pub.towardsai.net/building-a-recommender-system-with-pandas-1ca0bb03fdce) helped a lot to implement the travel recommendations. 

The travel recommendation csv file was generated with [ChatGPT](https://chatgpt.com/)

[React Lazy](https://www.dhiwise.com/post/implementing-react-lazy-loading-for-better-app-performance) component was added to my code after reading this article.

[StackOverFlow post](https://stackoverflow.com/questions/70850703/how-to-serialize-a-countryfield-from-django-countries) helped me to correctly use the serializes for Countryfield.

Additionally, I utilized the Moments and DRF API project from Code Institute to grasp basic functionalities and logic, applying these concepts to my own projects. I used the same default profile image from the DRF API project in my own API model.

### Acknowledgments


