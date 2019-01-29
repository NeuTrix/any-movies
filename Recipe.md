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
- [ ] add commentable conern (fixes controller test errors. Turn off comments cont test: should be created through users/comments)
- [ ] add api namespace
- [ ] create commentable for comments/movies
- [ ] modularize controllers and controller directory to match

# Integrate React
- [ ] display a movie poster.  Use the url in the img tag

# Deploy to Heroku



## Gems
- [x] hirb:  console prettifier
- [x] guard:  auto test runner
- [ ] rubocop: ruby linter

## npm
- [x] http-proxy-middleware: works with CRA-2 for proxys
- [ ] eslint
- [x] axios: for api calls
- [ ] Redux
- [ ] React Router
- [ ] @material/ui/core

## Redux
https://www.youtube.com/watch?v=sX3KeP7v7Kg

## Add yarn add npm packages
  - [ ] react
  - [ ] react-redux

## Connect the Provider (`/index.js file`)
- [ ] 
## set up the Store
## set up Helpers folder
- [ ] api/url helper
- [ ] Constants helper (ensure constants integrity)
## Set up Actions
 - [ ] `actions/movieActions.js` 
 - [ ] `actions/commentActions.js` 
 - [ ] `actions/userActions.js` 
## Set up Reducers
## Set up the logger?
  - requires middleware in the store

# How does this flow?
*Keep all of this in a `redux/` folder?*
- ACTION is called by a components
  - `/action/..` folder
  - e.g. make an api call 
  - each returns an Action object (type, payload)
    - individually exported functions
  - CONSTANTS used by action are drawn from a helper file
    - `/actions/typeConstants.js`, same folder level but could be in `/helpers`
  - API url drawn from helper file
    - `/helpers/apiHelper.js`
    - action functions up top, api functions at the bottom
      - require `axios`, `thunk`, `redux-promise` (in the store?)
- ACTION flows to the REDUCER
  - `/reducers/...` folder
  - only the reducer can (immutably) change the state object
  - reducer takes an `initialState` object and an action
  - can have one reducer for CRUD or specifi group of actions
  - map that name to an action file
- REDUCER files roll up to an index reducer file (combined)
  - `/reducers/index.js`
- REDUCER is passed to a STORE function(file)
- STORE is passed to a PROVIDER as an arg
  - `/store/...` folder
  - `<Provider store={store}>`
- PROVIDER is wrapped around the index.js top level application
- COMPONENT (container) is connected to the store
  - `import { connect } from 'react-redux'`
  - state and state.dispatch objects are mapped to the component
  - component exports the connected component
  - `export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);`
  - state and dispatch values passed to children as props
  - Rinse and Repeat (Action is called by a component)
  - ** a child component can also subscribeor connect to the store directly **
    - investigate this.  Reduce need for a connected component? Reduce nesting?


- [ ] add Redux gems
    - [ ] react-redux


# set th view port
in /public/index.html:
 ```html
 <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
 ```
