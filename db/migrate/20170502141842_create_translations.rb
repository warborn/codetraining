class CreateTranslations < ActiveRecord::Migration[5.0]
  def change
    create_table :translations do |t|
      t.text :initial_solution
      t.text :final_solution
      t.text :example_fixture
      t.text :final_fixture
      t.string :status, default: 'pending'
      t.references :challenge, foreign_key: true
      t.references :language, foreign_key: true

      t.timestamps
    end
  end
end
