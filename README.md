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
  - [Colour Scheme](#colour-scheme)
  - [Typography](#typography)
  - [Features](#features)
    - [Home](#home)
    - [Map](#)
    - [Posts](#)
    - [Post](#)
    - [Create Post](#)
    - [Edit Post](#)
    - [Profile](#)
    - [Update Profile](#)
    - [Delete Profile](#)
    - [Travel Preferences](#)
    - [Add Preferences](#)
    - [Edit Preferences](#)
    - [Travel Recommendation](#)
    - [Trip](#)
    - [Add Trip](#)
    - [Edit Trip](#)
    - [Delete Trip](#)
    - [Future Implementation](#future-implementations)
- [Technologies, Languages, and Programs used](#technologies-languages-and-programs-used)
- [Deployment & Local Development](#deployment--local-development)
  - [Local Deployment](#local-deployment)
  - [Testing](#testing)
    - [CSS](#css)
    - [JavaScript](#javascript)
    - [Python](#python)
    - [Lighthouse](#lighthouse)
    - [Wave](#wave)
    - [Automated Testing](#automated-testing)
    - [Manual Testing](#manual-testing)
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

![Models](/docs/erd.png)

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

![Backgorund]()

#### Map

#### Posts

#### Post

#### Create Post

#### Edit Post

#### Profile

From the profile page the users can see their profile image with a background image, status, experience level following their username,theme_song, posts created by profile owner, visited countries, travel recommendations and update their account details conveniently. Users can:

- Change their status.
- Add their first name and last name.
- Change username
- Change password
- Change theme song.
- Add/Remove visited countries.
- Add/Change travel preferences

Profile visitors can see the visited countries and preferences of the owners from the tabs and the user experience level, status and theme song. 

#### Add Preferences

User will be directed to the add preferences page if they are setting up the preferences first time. Once the preferences created the user will be firected to the confirmaiton page.

#### Edit Preferences

User can edit the travel preferences anytime from the profile page by clicking on the edit button in the travel preference tab. The user can choose from the existing choices from dropdown. Based on the new preferences the travel recommendation will be regenerated.

#### Travel Recommendation

Travel recommendations are generated after the travel preferences set by the user. Top 5 recommended cities will be visible from the profile page. Anytime the user will update the preferences the recommendations will change. If there are no recommendations for a given preferences, an error message will show up instead of the recommended cities.

#### Travelers

Travelers page will show all the existing registered users. Users can search for other users by name or sort them by number of posts or name. By click on the profile image the user will be directed to the user profile. 

#### Trip

Trip page is accessible from the Navbar. Customer can track their upcoming trips by adding the destinations (country) start date of trip, and date of trip and optional notes. The trip will have a countdown showing how many days are left until the trip. If day left is less than 0 the trip will be removed from the page. 
Start date and end date validation implemented to make sure that users cannot enter past dates for start date and the end date cannot be prior the start date.
Regardless of when the trip was created, the trips are sorted based on the days left until the trip. If less than 6 days left until the trip the color of the Trip card will change the color of the background. Also the trips can be edited/deleted by the user which are accesible via the dropdown menu within the trip card. 

#### Add Trip

An upcoming trip can be added from the Trip page. It’s a simple form that allows users to select the destination country, choose the start and end dates for the trip, and add optional notes.

#### Edit Trip

User can edit the existing trip like adding notes, change the start/end date or destination. 

#### Delete Trip

In case the trip gets canceled, the user will have the option to delete it from the dropdown menu.

#### Future Implementations

- Trip Fundraising: Users will be able to request funds for their trips by setting up a fundraising goal. Other users can contribute to help them reach their destination.
- Flight Search Integration: A feature will be added to allow users to search for flights directly within the platform, making trip planning more convenient.
- Notifications for natural disasters: Users will receive notifications about natural disasters if they have an upcoming trip to the affected country.
- Friendship and private messaging: Users can mark each other as friends and exchange private messages.

## Technologies, Languages, and Programs used

- CSS - Stylesheet language for styling the appearance of web pages.
- Bootstrap - A framework for building responsive, mobile-first sites.
- React - A JavaScript library used for building user interfaces, particularly for single-page applications. It allows developers to build reusable UI components.
- Javascript - A programming language used for writing dynamic code in React. It’s the primary language for frontend development in React.
- Python - The programming language used for the project backend.
- Django REST Framework - Used for building the backend API.
- Djano Allauth - Used for authentication, registration, login & password reset.
- gunicorn - a Python WSGI HTTP Server
- psycopg2 - allow us to connect with a postgres database
- [React Simple Maps](https://www.react-simple-maps.io/) - to implement the Map page 
- PostgreSQL - The database used to store transactions data, user information, and other relevant data for the application.
- Chrome Dev Tools - To troubleshoot, test features and solve issues with responsiveness and styling
- GitHub - Web-based platform for version control and collaboration on software projects.
- Google Fonts - Library of free and open-source web fonts.
- Heroku - Used to deploy the project for hosting and managing the live application.
- Favicon.io - To create Favicon.
- [DBDiagram](https://dbdiagram.io/d) - To create ER Diagram
- [FreeConvert](https://www.freeconvert.com/convert/video-to-gif) - to convert screenrecordings to GIF

## Deployment & Local Development

The project is deployed using Heroku. To deploy the project:

1. Create a live database - The database used in this project was provided by Code Institute.
2. Heroku app setup:
   1. From the Heroku dashboard, click the new button in the top right corner and select create new app.
   2. Give your app a name (this must be unique), select the region that is closest to you and then click the create app button bottom left.
   3. Open the settings tab and create a new config var of DATABASE_URL and paste the database URL(the value should not have quotation marks around it).
3. Prepare for deployment in GitPod:
   1. Install dj_database_url and psycopg2 (they are both needed for connecting to the external database you've just set up)<br>
      -- pip3 install dj-database-url==2.2.0 psycopg2 --
   2. Update your requirements.txt file with the installed packages.<br>
      -- pip3 freeze --local > requirements.txt --
   3. In settings.py underneath import os, add -- import dj_database_url --.
   4. To prevent your database URL from being misused, you can store it in the env.py file and add this file to .gitignore to keep it secure. Using the os library, you can then retrieve the database URL in your code instead of directly including it in settings.py.
   5. In the terminal, run the show migrations command to confirm connection to the external database.<br>
      -- python3 manage.py runserver --
   6. If you have to the database correctly, you can now run migrations to migrate the models to the new database.<br>
      -- python3 manage.py migrate --
   7. Create a superuser for the new database.<br>
      -- python3 manage.py createsuperuser --
   8. Install gunicorn which will act as our webserver and freeze this to the requirements.txt file.<br>
      -- pip3 install gunicorn --
   9. Create a Procfile in the root directory. This tells Heroku to create a web dyno which runs gunicorn and serves our django app. Add the following to the file:<br>
      -- release: python manage.py makemigrations && python manage.py migrate
      web: gunicorn wonder_roads_api.wsgi:application
      --
   10. Add the Heroku app and localhost (which will allow GitPod to still work) to ALLOWED_HOSTS = [] in settings.py:<br>
       
   11. Install whitenoise. It will allow your Heroku app to serve its own static files without relying on any external file hosting services like a content delivery network (CDN). Then add it to the requirements.txt.
       <br>
       -- pip3 install whitenoise~=5.3.0 --
       <br>
       The WhiteNoise middleware must be placed directly after the Django SecurityMiddleware in settings.py<br>
       -- 'whitenoise.middleware.WhiteNoiseMiddleware', --
   12. Add the following path to settings.py<br>
       -- STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles') --
   13. Collect static files -- python3 manage.py collectstatic -- and add a runtime.txt file to your app's root directory. Check your Python version and copy the runtime closest to the one used in your IDE.
       [Python support](https://devcenter.heroku.com/articles/python-support#specifying-a-python-version)
   14. Save, add, commit and push the changes to GitHub.
   15. To enable automatic deploys on Heroku, go to the deploy tab and click the connect to GitHub button in the deployment method section. Search for the projects repository and then click connect. Click enable automatic deploys at the bottom of the page.
4. Django automatically sets a secret key when you create your project, however we shouldn't use this default key in our deployed version. We can use a random key generator to create a new SECRET_KEY which we can then add to our Heroku config vars.
5. The following entries must be added to the Heroku config vars:


### Local Deployment

This repository can be cloned and run locally with the following steps:

- Login to GitHub.
- Select repository named: https://github.com/Tamas-Gavlider/WanderRoads
- Click code toggle button and copy the url (https://github.com/Tamas-Gavlider/WanderRoads.git).
- In your IDE, open the terminal and run the git clone command (git clone https://github.com/Tamas-Gavlider/WanderRoads.git). The repository will now be cloned in your workspace.

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
|    Post-Tests   |  Pass  |   [post-tests](/docs/testing/pep8/post-tests.png)       |
|     Post-Urls   |  Pass  |    [post-urls](/docs/testing/pep8/post-urls.png)        |
|   Post-Views    |  Pass  |   [post-views](/docs/testing/pep8/post-views.png)       |
|    Profile-Admin   |  Pass  |  [profile-admin](/docs/testing/pep8/profile-admin.png)         |
|   Profile-Models     |  Pass  |   [profile-models](/docs/testing/pep8/profile-models.png)     |
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

I have used Lighthouse to test the performance, accessibility, best practices and SEO of the site.



#### Wave

WAVE(Web Accessibility Evaluation Tool) allows developers to create content that is more accessible to users with disabilities. It does this by identifying accessibility and WGAC errors.


#### Automated testing

Automated testing for this project was carried out with [APITestCase](https://www.django-rest-framework.org/api-guide/testing/).

#### Backend Manual Testing 

Registration
- Tested edge cases such as short passwords, mismatched passwords, and existing usernames to ensure proper validation.

Profile
- Verified profile updates for both the profile owner and visitors.

- Ensured validation for invalid file formats when uploading a profile image or theme song.

- Testing the addition of visited countries could not be performed on the backend, as the API view returned the message: "Lists are not currently supported in HTML input." The experience level is updated automatically on the frontend when countries are added, and it cannot be changed manually.

Login/Logout
- Tested login with a valid username and password.

- Attempted login with a nonexistent username and an incorrect password.

- Verified that logout functionality works correctly.

Posts
- Attempted to create a post without a title, content, or image, and tested validation for wrong file formats and file sizes.

- Edited an existing post and tested:

   - Removing the title or content (should not be allowed).

   - Changing an image to an invalid file format or size.

   - Editing another user's post (should not be allowed).

Comments
- Added comments to posts and verified functionality.

- Tested editing and deleting comments, ensuring that only the comment owner can make changes.

- Verified that comments do not exceed the maximum character limit set in the models.

Travel Preferences
- Created and manually updated travel preferences.

- Confirmed that predefined choices prevent invalid inputs, ensuring users can only select from the available options.

Travel Recommendation
- Verified that travel recommendations are generated based on the user's travel preferences.

- Displayed an appropriate message if no recommendations were available due to specific preferences.

- Ensured that recommendations update dynamically when the user modifies their travel preferences.

Trip
- Attempted to create an upcoming trip with past start dates and end dates set before the start date to ensure validation works correctly.

- Edited an existing trip and tested:

  - Changing the start date to a past date (should not be allowed).

  - Setting an end date earlier than the start date (should trigger an error).

#### Manual Testing Frontend

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


#### Known Bugs

## Credits

### Media

The background image was downloaded from [Pexels](https://www.pexels.com/).
<br>
The favicon logo was created on [FreeLogoDesign](https://www.freelogodesign.org/)
<br>
All screenshots used in this README file were taken by myself.

### Content

[W3Schools](https://www.w3schools.com/) to review how certain libraries function and for React tutorials.

Additionally, I utilized the Moments and DRF API project from Code Institute to grasp basic functionalities and logic, applying these concepts to my own projects.

### Acknowledgments

I would like to acknowledge:

- My Code Institute mentor for her valuable advices.
