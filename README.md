# Tech Blog

  ## Table of Contents:

  1. [License](#License)

  2. [Description](#Description)

  3. [Installation](#Installation)

  4. [Usage](#Usage)

  5. [Contributing](#Contributing)

  6. [Tests](#Tests)


  ## License

  ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg) https://opensource.org/licenses/MIT

  This project is covered under MIT license.

  ## Description
  
  https://intense-oasis-65970.herokuapp.com/
  
  ![Screen Shot 2022-10-28 at 3 45 03 PM](https://user-images.githubusercontent.com/106997623/198729478-7c2d37dc-34ab-4504-b290-27c7fefdd7c8.png)
  
  Tech Blog is a site where users can create an account and post freely. Users may also comment on each others posts, edit their own posts and comments, and delete posts and comments. Users passwords must be at least 8 characters long. The goal is to provide a place for conversations and tips to be shared freely. It is supposed to be about technology, but there really is no restricitons. This project was built to practice using technologies such as Node.js, Express, Handlebars, MySQL, etc... Tech Blog solves the need for a space to embrace your inner nerd and express yourself free from censorship. There is no monitering the site, so please don't post anything innapropriate. Or do, because that's what freedom means. Working on this project, mostly I learned about UX and website design. Setting up the back-end for the site was relatively easy and didn't take me that much time. Most of my time was devoted to making the website look good. If I were to continue working on this site, there are many things I would improve / add to give the site a more professional look and improve functionality.

  ## Installation

  This application is deployed on Heroku. There is no need to install the application, however if you would like to clone the repository and make your own changes, feel free. After cloning the repo, open an integrated terminal in the package.json file and run "npm i", then create a ".env" file using the database: "techblog_db", user: "root", and password: "(yourpassword)". Next, run "mysql -p", enter your mysql password, then run "source db/schema.sql", "use techblog_db;", "quit". Finally, seed the database with "npm run seed" then start the application with "npm start". After theis, the site will be running on localhost:3001.

  ## Usage

  Upon arriving at the homepage, the user is able to see all the posts the exist in the database. Click on a post to view any comments relating to the post. To create your own comments or posts, you must first sign in. If you don't have an account you must create one with a password thatis at least 8 characters long. Next you will be redirectwd to your dashboard where you can create new posts or edits existing posts. You may now edit any comments you post as well by visiting the post and viewing the comments. Your session will expire after 50 minutes and you will be logged out.

  ## Contributing

  If you would like to contribute to the project you must do so by creating a separate branch and creating a pull request that must be approved by me. Or you may clone the repository and set the upstream to a new repo.

  ## Tests

  Testing the application involves simply visiting the site and playing around with it. I have not yet added formal tests.

  ## Questions

  My github:
  https://github.com/NateDogg97
  My Email:
  natmays97@gmail.com
