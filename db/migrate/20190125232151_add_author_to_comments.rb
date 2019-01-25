class AddAuthorToComments < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :author, :string
  end
end
