@user = User.new
@user.username = 'theMouse'
@user.email = 'mickey@dl.com'
@user.password = 'bananaKing'
@user.password_confirmation = 'bananaKing'
@user.admin = true
@user.save

@critic = User.new
@critic.username = 'theDog'
@critic.email = 'goofy@dl.com'
@critic.password = 'bananaBro'
@critic.password_confirmation = 'bananaBro'
@critic.save

# create some aliens
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
  title: "ALIEN: Ripley Rocks iT!",
  author: @user.username,
  user_id: @user.id,
  commentable_id: @alien.id,
  commentable_type: @alien.class.name,
  body: "One of my all time favorites, Go Ripley!!",
  rating: 4
)
@comment_alien.save

@comment_starwars = @starwars.comments.build(
  title: "STAR WARS: As romantic as the universe",
  author: @user.username,
  user_id: @user.id,
  commentable_id: @starwars.id,
  commentable_type: @starwars.class.name,
  body: "I had my first kiss at this alien.  
        Yes, it was the 70's, but who's counting?",
  rating: 5
)
@comment_starwars.save
 
# comments of second user, on those Comments
@response_alien = @comment_alien.comments.build(
  title: "Cameron rocks it better",
  author: @critic.username,
  user_id: @critic.id,
  commentable_id: @comment_alien.id,
  commentable_type: @comment_alien.class.name,
  body: "Well, I actually preferred the action in Camerons Aliens
  Much more credible and interesteing",
  rating: 4
)
@response_alien.save

@response2_alien = @response_alien.comments.build(
  title: "Yuck",
  author: @critic.username,
  user_id: @critic.id,
  commentable_id: @response_alien.id,
  commentable_type: @response_alien.class.name,
  body: "I had NO idea it was that old.  Old people kiss :(|)",
  rating: 3
)
@response2_alien.save


# test to see if a comment can be built from a alien
@testComment = @alien.comments.build(
  title: "can you comment on a alien dircetly?",
  commentable_id: @alien.id,
  commentable_type: @alien.class.name,
  body: "I'm hoping to comment on this film directly",
  rating: 5
)

@testComment.save