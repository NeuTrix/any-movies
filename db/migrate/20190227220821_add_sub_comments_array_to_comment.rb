class AddSubCommentsArrayToComment < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :subcomments, :text
  end
end
