class Favourite < ApplicationRecord
  belongs_to :user
  belongs_to :favourited, polymorphic: true
  # ensure only 1 like per user per
  validates_uniqueness_of :user_id, 
    scope: [:favourited_id, :favourited_type],
    message: "You've already favourited this film!" 
end
