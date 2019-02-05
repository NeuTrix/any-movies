# allow user to favourite movies, reviews, or other users/critics
class ChangeFavouritedIdTypeForFavourite < ActiveRecord::Migration[5.2]
  def self.up
    change_column :favourites, :favourited_id, :string
  end

  def self.down
    change_column :favourites, :favourited_id, :bigint
  end
end
