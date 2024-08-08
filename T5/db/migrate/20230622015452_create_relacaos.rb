class CreateRelacaos < ActiveRecord::Migration[5.2]
  def change
    create_table :relacaos do |t|
      t.integer :registro_id
      t.integer :usuario_id

      t.timestamps
    end
  end
end
