class AddPostersUrlsToFavourites < ActiveRecord::Migration[5.2]
  def change
    add_column :favourites, :poster, :string
  end
end
