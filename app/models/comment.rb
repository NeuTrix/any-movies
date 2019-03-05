# Comments modle
class Comment < ApplicationRecord
  # created by users
  belongs_to :user

  belongs_to :commentable, polymorphic: true
  # comments can be commented upon
  has_many :comments, as: :commentable, dependent: :destroy
  # users can favorite a comment
  has_many :favourites, as: :favourited, dependent: :destroy

  serialize :sub_comments, Array

  def self.filter(filter)
    # return an array of comments if no additional filter params provided
    return Comment.all unless filter # guard clause

    filter = JSON.parse(filter) # ensure conversion from string to array
    @comments = Comment.all.where(id: filter) # filter for results
  end

  # populates the sub_comments property for each comment
  # used in the controller #index action, not stored in db
  def self.update_sub_comments(comments)
    # return 'no comments' unless comments
    comments.each do |comment|
      comment.sub_comments = comment.comments.ids
    end
  end
end
