class Movie < ApplicationRecord
  self.primary_key = 'imdb_id'
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :users, through: :comments
end
