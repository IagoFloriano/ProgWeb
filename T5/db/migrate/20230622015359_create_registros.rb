class CreateRegistros < ActiveRecord::Migration[5.2]
  def change
    create_table :registros do |t|
      t.string :nome

      t.timestamps
    end
  end
end
