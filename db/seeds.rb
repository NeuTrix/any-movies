@user = User.create(username: "mickey")
@user.save

@critic = User.create(username: "goofy")

@movie = Movie.create(title: 'alien')
@movie.save

@comment = @user.comments.build(
  commentable_id: @movie.id,
  commentable_type: @movie.class.name,
  body: "One of my all time favorites, Go Ripley!!",
  rating: 5
)
@comment.save
 
@response = @critic.comments.build(
  commentable_id: @comment.id,
  commentable_type: @comment.class.name,
  body: "Well, I actually preferred the action in Camerons Aliens
  Much more credible and interesteing",
  rating: 5
)
@response.save

admin = User.new
admin.email = 'admin@bananas.com'
admin.password = 'bananaKing'
admin.password_confirmation = 'bananaKing'
admin.admin = true
admin.save
user = User.new
user.email = 'user@bananas.com'
user.password = 'bananaBro'
user.password_confirmation = 'bananaBro'
user.save