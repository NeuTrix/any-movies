# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_02_05_194711) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.bigint "user_id"
    t.string "commentable_type"
    t.string "commentable_id"
    t.integer "rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "author"
    t.index ["commentable_type", "commentable_id"], name: "index_comments_on_commentable_type_and_commentable_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "favourites", force: :cascade do |t|
    t.bigint "user_id"
    t.string "favourited_type"
    t.string "favourited_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["favourited_type", "favourited_id"], name: "index_favourites_on_favourited_type_and_favourited_id"
    t.index ["user_id"], name: "index_favourites_on_user_id"
  end

  create_table "movies", force: :cascade do |t|
    t.string "title"
    t.date "release_date"
    t.string "rated"
    t.integer "critic_rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.string "imdb_id", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email"
    t.string "password_digest"
    t.boolean "admin", default: false
  end

  add_foreign_key "comments", "users"
  add_foreign_key "favourites", "users"
end
