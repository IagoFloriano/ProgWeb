require 'active_record'

ActiveRecord::Base.establish_connection :adapter => "sqlite3",
  :database => "Tabelas.sqlite3"

ActiveRecord::Base.connection.create_table :documentos do |t|
  t.string :rg
  t.string :cpf
  t.string :motorista
  t.references :pessoa, foreign_key: true
end
