class CreateMovies < ActiveRecord::Migration[5.2]
  def change
    create_table :movies do |t|
      t.string :title
      t.text :description
      t.date :release_date
      t.string :rated
      t.integer :critic_rating

      t.timestamps
    end
  end
end
