class Comment < ApplicationRecord
  # created by users
  belongs_to :user
  
  belongs_to :commentable, polymorphic: true
  # comments can be commented upon
  has_many :comments, as: :commentable, dependent: :destroy
  # users can favorite a comment
  has_many :favourites, as: :favourited, dependent: :destroy
  
  # serialize :sub
end
