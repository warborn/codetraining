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

ActiveRecord::Schema.define(version: 20170506031653) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_categories_on_name", unique: true, using: :btree
  end

  create_table "challenges", force: :cascade do |t|
    t.string   "name"
    t.integer  "rank"
    t.text     "description"
    t.string   "category"
    t.string   "tags"
    t.string   "status",      default: "beta"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.index ["name"], name: "index_challenges_on_name", unique: true, using: :btree
  end

  create_table "examples", force: :cascade do |t|
    t.text     "setup"
    t.text     "answer"
    t.text     "fixture"
    t.integer  "language_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["language_id"], name: "index_examples_on_language_id", using: :btree
  end

  create_table "languages", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "translations", force: :cascade do |t|
    t.text     "initial_solution"
    t.text     "complete_solution"
    t.text     "example_fixture"
    t.text     "final_fixture"
    t.string   "status",            default: "pending"
    t.integer  "challenge_id"
    t.integer  "language_id"
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.index ["challenge_id"], name: "index_translations_on_challenge_id", using: :btree
    t.index ["language_id"], name: "index_translations_on_language_id", using: :btree
  end

  add_foreign_key "examples", "languages"
  add_foreign_key "translations", "challenges"
  add_foreign_key "translations", "languages"
end
