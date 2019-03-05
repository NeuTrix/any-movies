class AddSubCommentsToMovie < ActiveRecord::Migration[5.2]
  def change
    add_column :movies, :sub_comments, :text
  end
end
