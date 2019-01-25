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

@movie = Movie.create(title: 'alien')
@movie.save

@comment = @user.comments.build(
  title: "Ripley Rocks iT!",
  author: @user.username,
  commentable_id: @movie.id,
  commentable_type: @movie.class.name,
  body: "One of my all time favorites, Go Ripley!!",
  rating: 5
)
@comment.save
 
@response = @critic.comments.build(
  title: "Cameron rocks it better",
  author: @critic.username,
  commentable_id: @comment.id,
  commentable_type: @comment.class.name,
  body: "Well, I actually preferred the action in Camerons Aliens
  Much more credible and interesteing",
  rating: 5
)
@response.save

@testComment = @movie.comments.build(
  title: "can you comment on a movie dircetly?",
  commentable_id: @movie.id,
  commentable_type: @movie.class.name,
  body: "I'm hopint to comment on this film directly",
  rating: 5
)

@testComment.save