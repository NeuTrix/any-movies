class AddAuthenitcationToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :email, :string
    add_column :users, :password_digest, :string
    add_column :users, :admin, :boolean, default: false
  end
end
