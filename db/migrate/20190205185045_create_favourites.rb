class CreateFavourites < ActiveRecord::Migration[5.2]
  def change
    create_table :favourites do |t|
      t.belongs_to :user, foreign_key: true
      t.references :favourited, polymorphic: true

      t.timestamps
    end
  end
end
