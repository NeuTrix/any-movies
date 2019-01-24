class Movie < ApplicationRecord
  has_many :comments, as: :commentable
  has_many :users, through: :comments
end
