class AddTitleToFavourites < ActiveRecord::Migration[5.2]
  def change
    add_column :favourites, :title, :string
  end
end
