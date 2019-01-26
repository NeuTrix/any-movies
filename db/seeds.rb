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

@comment = @user.comments.build(
  title: "Ripley Rocks iT!",
  author: @user.username,
  commentable_id: @movie.id,
  commentable_type: @movie.class.name,
  body: "One of my all time favorites, Go Ripley!!",
  rating: 4
)
@comment.save

@comment2 = @user.comments.build(
  title: "Star Wars was romantic",
  author: @user.username,
  commentable_id: @movie.id,
  commentable_type: @movie.class.name,
  body: "I had my first kiss at this movie.  
        Yes, it was the 70's, but who's counting?",
  rating: 5
)
@comment2.save
 
@response = @critic.comments.build(
  title: "Cameron rocks it better",
  author: @critic.username,
  commentable_id: @comment.id,
  commentable_type: @comment.class.name,
  body: "Well, I actually preferred the action in Camerons Aliens
  Much more credible and interesteing",
  rating: 4
)
@response.save

@response2 = @critic.comments.build(
  title: "Yuck",
  author: @critic.username,
  commentable_id: @comment.id,
  commentable_type: @comment.class.name,
  body: "I had NO idea it was that old.  Old people kiss :(|)",
  rating: 3
)
@response2.save

@testComment = @movie.comments.build(
  title: "can you comment on a movie dircetly?",
  commentable_id: @movie.id,
  commentable_type: @movie.class.name,
  body: "I'm hopint to comment on this film directly",
  rating: 5
)

@testComment.save