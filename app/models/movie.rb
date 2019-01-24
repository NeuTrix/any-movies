class Movie < ApplicationRecord
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :users, through: :comments
end
