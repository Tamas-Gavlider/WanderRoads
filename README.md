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

The primary goals of the app is to provide a platform for travelers to share experiences and learn about different cultures and countries. Allow users to post stories on an interactive world map, making travel memories more immersive. uggest travel destinations based on user preferences using AI-driven recommendations. Help travelers find and connect with like-minded individuals through the TravelBuddy feature.

### User Stories

User Stories were tracked throughout the project as [GitHub issues](https://github.com/users/Tamas-Gavlider/projects/8).

## Design

### Structure

The diagram below represents the database structure for WanderRoads, illustrating the relationships between different entities within the platform.

- User: Stores authentication details (username, email, password). Each user has a related profile.
- Profile: Contains user details such as name, profile image, theme song, travel experience, visited countries, and status.
- Post: Represents travel stories shared by users, including title, content, images, and country tags.
- Comment: Allows users to interact with posts by leaving comments.
- Travel Buddy: Establishes a relationship between users who have traveled together.
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
![Logged in]()

Navbar is user logged out/not registered
![Logged out]()

#### Home

![Backgorund]()

#### Map

#### Posts

#### Post

#### Create Post

#### Edit Post

#### Profile

#### Update Profile

The Edit Profile page allows users to manage and update their account details conveniently. Users can:

- Change their status.
- Add their first name and last name.
- Change username
- Change password
- Change theme song.
- Add/Remove visited countries.

#### Delete Profile

#### Travel Preferences

#### Add Preferences

#### Edit Preferences

#### Travel Recommendation

#### Trip

#### Add Trip

#### Edit Trip

#### Delete Trip

#### Future Implementations

- Trip Fundraising: Users will be able to request funds for their trips by setting up a fundraising goal. Other users can contribute to help them reach their destination.
- Flight Search Integration: A feature will be added to allow users to search for flights directly within the platform, making trip planning more convenient.

## Technologies, Languages, and Programs used

- CSS - Stylesheet language for styling the appearance of web pages.
- Bootstrap - A framework for building responsive, mobile-first sites.
- React - A JavaScript library used for building user interfaces, particularly for single-page applications. It allows developers to build reusable UI components.
- Javascript - A programming language used for writing dynamic code in React. It’s the primary language for frontend development in React.
- Python - The programming language used for the project backend.
- Django REST Framework
- Djano Allauth - Used for authentication, registration, login & password reset.
- gunicorn - a Python WSGI HTTP Server
- psycopg2 - allow us to connect with a postgres database
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

#### CSS

[W3C](https://validator.w3.org/) was used to validate the CSS.


#### JavaScript



#### Python

[Code Institute Python Linter](https://pep8ci.herokuapp.com/) was used to validate the python files.

| File                      | Result |                                                       Screenshot |
| ------------------------- | :----: | ---------------------------------------------------------------: |
|       |  Pass  |             |
|       |  Pass  |               |
|         |  Pass  |              |
|          |  Pass  |                |
|      |  Pass  |       |
|     |  Pass  |      |
|       |  Pass  |          |
|        |  Pass  |            |
|       |  Pass  |          |
|       |  Pass  |           |
|        |  Pass  |        |
|       |  Pass  |             |
|       |  Pass  |                |
|  |  Pass  |   |
|  |  Pass  |  |
|  |  Pass  |      |
|   |  Pass  |      |
|   |  Pass  |    |
|      |  Pass  |        |
|        |  Pass  |          |

#### Lighthouse

I have used Lighthouse to test the performance, accessibility, best practices and SEO of the site.



#### Wave

WAVE(Web Accessibility Evaluation Tool) allows developers to create content that is more accessible to users with disabilities. It does this by identifying accessibility and WGAC errors.


#### Automated testing

Automated testing for this project was carried out with [Django TestCase](https://docs.djangoproject.com/en/4.1/topics/testing/overview/).

#### Manual Testing

- All buttons, anchor tags, and forms were thoroughly tested to verify that they performed the expected actions.
- Responsiveness: The application was tested on multiple screen sizes (e.g., mobile,and desktop) to confirm that the layout adapts correctly and elements adjust according to the screen size.
- Edge Case Scenarios: Manual testing was performed for edge cases such as entering invalid data, uploading incorrect file format and checking system behavior under unusual conditions (e.g., comment is too long, image size exceed the max limit).
- User Flow: Testing ensured that the user flow was seamless and intuitive, including actions such as logging in, making payments, sending funds, and updating account details.

Registration<br>

Edit profile<br>

Login and password reset<br>


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
