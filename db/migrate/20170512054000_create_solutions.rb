class CreateSolutions < ActiveRecord::Migration[5.0]
  def change
    create_table :solutions do |t|
    	t.text :answer
    	t.text :fixture
    	t.string :status, default: 'incompleted'
      t.references :user, foreign_key: true
      t.references :translation, foreign_key: true
      t.timestamps
    end
  end
end
