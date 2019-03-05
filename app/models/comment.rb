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

  # populates the sub_comments property for each comment
  # used in the controller #index action, not stored in db
  def self.update_sub_comments(comments)
    # for each comment in the args array..
    comments.each do |com|
      # ...grab list of sub comments...
      subs = com.comments
      # ... and pass the list to each comments sub_comm prop
      subs.each { |s| com.sub_comments << s }
    end
  end
end
