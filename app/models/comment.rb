class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :commentable
  has_many :comments, as: :commentable
end
