class CreateChallenges < ActiveRecord::Migration[5.0]
  def change
    create_table :challenges do |t|
      t.string :name
      t.integer :rank
      t.text :description
      t.string :category
      t.string :tags
      t.string :status, default: 'beta'
      t.references :user, foreign_key: true

      t.timestamps
    end
    add_index :challenges, :name, unique: true
  end
end
