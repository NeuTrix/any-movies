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

# create some movies
@movie = Movie.create(
  title: 'Alien', 
  imdb_id: 'tt0078748'
  )
@movie.save

@movie2 = Movie.create(
  title: 'Star Wars',
  imdb_id: 'tt0076759'
  )
@movie2.save

# comments of first user on both movies
@comment = @movie.comments.build(
  title: "ALIEN: Ripley Rocks iT!",
  author: @user.username,
  user_id: @user.id,
  commentable_id: @movie.imdb_id,
  commentable_type: @movie.class.name,
  body: "One of my all time favorites, Go Ripley!!",
  rating: 4
)
@comment.save

@comment2 = @movie.comments.build(
  title: "STAR WARS: As romantic as the universe",
  author: @user.username,
  user_id: @user.id,
  commentable_id: @movie2.imdb_id,
  commentable_type: @movie2.class.name,
  body: "I had my first kiss at this movie.  
        Yes, it was the 70's, but who's counting?",
  rating: 5
)
@comment2.save
 
# comments of second user, on those Comments
@response = @comment2.comments.build(
  title: "Cameron rocks it better",
  author: @critic.username,
  user_id: @critic.id,  
  commentable_id: @comment2.id,
  commentable_type: @comment2.class.name,
  body: "Well, I actually preferred the action in Camerons Aliens
  Much more credible and interesteing",
  rating: 4
)
@response.save

@response2 = @response.comments.build(
  title: "Yuck",
  author: @critic.username,
  user_id: @critic.id,
  commentable_id: @response.id,
  commentable_type: @response.class.name,
  body: "I had NO idea it was that old.  Old people kiss :(|)",
  rating: 3
)
@response2.save


# test to see if a comment can be built from a movie
@testComment = @movie.comments.build(
  title: "can you comment on a movie dircetly?",
  commentable_id: @movie.imdb_id,
  commentable_type: @movie.class.name,
  body: "I'm hopint to comment on this film directly",
  rating: 5
)

@testComment.save