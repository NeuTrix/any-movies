# Set up Rails API
- [ ] generate rails new APP 
  `rails new [app] --api --database=postgresql`
- [ ] add git remote and merge first commit
- [ ] begin planting seed file
- [ ] create and seed database
- [ ] add Hirb gem  
  in Gemfile...
  `gem 'hirb', require: true`

  in rails console...
  `2.5.3 :001 > Hirb.enable`

- [ ] build models
  build model schema chart
    - Movie and Comments are 'commentable'
    - users-> many comments, movies via comments.  Dependent destroy
    - movies -> many comments as commentable, user through comments
    - comments b_t commentable and user, hasMay comments as commentable, polymorphic: true, depen-destroy

## exceptions
- [ ] dependent: :destroy for users, movies, comments

- [ ] add guard gem to Gemfile: automated testing
  - `bundle`, 
  - `be guard init`

### update routes
- [ ] add api namespace
- [ ] create commentable for comments/movies
- [ ] modularize controllers and controller directory to match

# Integrate React


# Deploy to Heroku


## Gems
- [x] hirb:  console prettifier
- [x] guard:  auto test runner
- [ ] rubocop: ruby linter