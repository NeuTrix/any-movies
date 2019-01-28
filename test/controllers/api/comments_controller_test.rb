require 'test_helper'

class Api::CommentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @comment = comments(:one)
    @commentable = movies(:alien)
    @commentable_type = 'Movie'
    # @user = users(:one)
  end

  test "should get index" do
    skip
    get api_comments_url, as: :json
    assert_response :success
  end
  # no route for Post api/comments alone
  test "should create comment" do
    skip
    assert_difference('Comment.count') do
      post api_comments_url, params: {  
        body: @comment.body, 
        commentable_id: @commentable_id, 
        commentable_type: @commentable_type, 
        rating: @comment.rating, 
        title: @comment.title, 
        user_id: @user_id }, as: :json
    end

    assert_response 201
  end

  test "should show comment" do
    skip
    get api_comment_url(@comment), as: :json
    assert_response :success
  end

  # test "should update comment" do
    # skip
  #   patch api_comment_url(@comment), params: { comment: { body: @comment.body, commentable_id: @commentable_id, commentable_type: @commentable_type, rating: @comment.rating, title: @comment.title, user_id: @comment.user_id } }, as: :json
  #   assert_response 200
  # end

  # test "should destroy comment" do
    # skip
  #   assert_difference('Comment.count', -1) do
  #     delete api_comment_url(@comment), as: :json
  #   end

  #   assert_response 204
  # end
end
