class Movie < ApplicationRecord
  # utiliing the id's of movies from the OMDB api
  self.primary_key = 'imdb_id'
  validates :imdb_id, uniqueness: {message: "Movie already in app database"}
  # movies can get comments
  has_many :comments, as: :commentable, dependent: :destroy
  # movies can get favourited
  has_many :favourites, as: :favourited, dependent: :destroy
  # user can have a lot of movies, perhaps better through favorites
  has_many :users, through: :comments
  # connecting users through favorites
  has_many :users, through: :favourites
end
