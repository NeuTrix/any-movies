# README

\*\* Setting up

### Required tech

- Ruby, Rails, postgres, and Node
- At the root, run `bundle install` to load the required Ruby gems
- At `/client` run `yarn` to install required npm packages

\*\* Starting the application

- To run both React and Rails, in terminal at the application root run `foreman start`
- To just run the React frontend, in the `/client` for React, run `yarn start`
- For just the Rails api, in the root, run `rails s -p 3001`. This runs rails on PORT=3001 and aligns with the React Proxy code (avoiding CORS issues)
- to start the postgres database server via homebrew: `brew services start postgresql` and `brew services stop postgresql` to stop

===================

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

- Ruby version

- System dependencies

- Configuration

- Database creation

- Database initialization

- How to run the test suite

- Services (job queues, cache servers, search engines, etc.)

- Deployment instructions

- ...
