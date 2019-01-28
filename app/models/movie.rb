class Movie < ApplicationRecord
  self.primary_key = 'imdb_id'
  validates :imdb_id, uniqueness: {message: "Movie already in app database"}
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :users, through: :comments
end
