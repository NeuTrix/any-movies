class AddTitleToFavourites < ActiveRecord::Migration[5.2]
  def change
    add_column :favourites, :favourited_title, :string
  end
end
