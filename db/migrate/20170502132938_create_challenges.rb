class CreateChallenges < ActiveRecord::Migration[5.0]
  def change
    create_table :challenges do |t|
      t.string :name
      t.integer :level
      t.text :description
      t.string :discipline
      t.string :tags
      t.string :status, default: 'beta'

      t.timestamps
    end
  end
end
