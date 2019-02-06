# set basic seeds for database
@user = User.new
@user.username = 'Dantastic3339'
@user.email = 'dantonio@dl.com'
@user.password = 'anyRoadCanGetYouThere'
@user.password_confirmation = 'anyRoadCanGetYouThere'
@user.admin = true
@user.save

@critic = User.new
@critic.username = 'theDog'
@critic.email = 'goofy@dl.com'
@critic.password = 'bananaBro'
@critic.password_confirmation = 'bananaBro'
@critic.save

# create some MOVIES
@alien = Movie.create(
  title: 'Alien', 
  imdb_id: 'tt0078748'
  )
@alien.save

@starwars = Movie.create(
  title: 'Star Wars',
  imdb_id: 'tt0076759'
  )
@starwars.save

# comments of first user on both aliens
@comment_alien = @alien.comments.build(
  title: 'ALIEN: Ripley Rocks iT!',
  author: @user.username,
  user_id: @user.id,
  commentable_id: @alien.imdb_id,
  commentable_type: @alien.class.name,
  body: 'One of my all time favorites, Go Ripley!!',
  rating: 4
)
@comment_alien.save

@comment_alien2 = @alien.comments.build(
  title: 'ALIEN: meh!',
  author: @user.username,
  user_id: @user.id,
  commentable_id: @alien.imdb_id,
  commentable_type: @alien.class.name,
  body: 'Gave me chest pains!!',
  rating: 2
)
@comment_alien2.save

@comment_alien3 = @alien.comments.build(
  title: 'Corny',
  author: @user.username,
  user_id: @user.id,
  commentable_id: @alien.imdb_id,
  commentable_type: @alien.class.name,
  body: 'In Space, no one can hear you scream...  
  Wow. this was quite the film. 
  I loved this movie when it first came out.  
  Had seen nothing like it before.
  It is easy to take the special effects and heroine for granted now that that precedent has been set.
  ',
  rating: 3
)
@comment_alien3.save

@comment_starwars = @starwars.comments.build(
  title: 'STAR WARS: As romantic as the universe',
  author: @user.username,
  user_id: @user.id,
  commentable_id: @starwars.imdb_id,
  commentable_type: @starwars.class.name,
  body: 'I had my first kiss at this alien.  
        Yes, it was the 70s, but who is counting?',
  rating: 5
)
@comment_starwars.save
 
# comments of second user, on those Comments
@response_alien = @comment_alien.comments.build(
  title: 'Cameron rocks it better',
  author: @critic.username,
  user_id: @critic.id,
  commentable_id: @comment_alien.id,
  commentable_type: @comment_alien.class.name,
  body: 'Well, I actually preferred the action in Camerons Aliens
  Much more credible and interesteing',
  rating: 4
)
@response_alien.save

@response2_alien = @response_alien.comments.build(
  title: 'Yuck',
  author: @critic.username,
  user_id: @critic.id,
  commentable_id: @response_alien.id,
  commentable_type: @response_alien.class.name,
  body: 'I had NO idea it was that old.  Old people kiss :(|)',
  rating: 3
)
@response2_alien.save

# test to see if a comment can be built directly from a Movie
@testComment = @alien.comments.build(
  title: 'can you comment on a alien dircetly?',
  commentable_id: @alien.imdb_id,
  commentable_type: @alien.class.name,
  body: 'I am hoping to comment on this film directly',
  rating: 5
)

@testComment.save

# Adding favourites
@fav01 = @user.favourites.build(
  favourited_id: 'tt0078748',
  favourited_type: 'Movie'
)
@fav01.save

@fav02 = @user.favourites.build(
  favourited_id: 'tt0076759',
  favourited_type: 'Movie'
)
@fav02.save

# @fav03 = @user.favourites.build(
#   favourited_id: 5,
#   favourited_type: 'Comment'
# )
@fav03.save
