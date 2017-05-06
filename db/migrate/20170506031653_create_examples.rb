class CreateExamples < ActiveRecord::Migration[5.0]
  def change
    create_table :examples do |t|
      t.text :setup
      t.text :answer
      t.text :fixture
      t.references :language, foreign_key: true

      t.timestamps
    end
  end
end
