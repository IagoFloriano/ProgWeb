require './classes.rb'

=begin
  A tabela "pessoas" tem uma conexão de um para muitos com a tabela "telefones" onde uma
  pessoa pode ter vários telefones. A tabela "pessoas" também tem um conexão de muitos para
  muitos com a tabela "cursos" tendo a tabela "inscricoes" como um intermediário, cada
  pessoa pode estar inscrita em vários cursos e cada curso pode ter várias pessoas
  inscritas.
=end

ActiveRecord::Base.establish_connection :adapter => 'sqlite3',
  :database => 'tabelas.sqlite3'

ActiveRecord::Base.connection.create_table :pessoas do |t|
  t.string :sobrenome
  t.string :nome
  t.string :endereco
  t.string :cidade
  t.timestamps null: false
end

ActiveRecord::Base.connection.create_table :telefones do |t|
  t.string :numero
  t.references :pessoa
  t.timestamps null: false
end

ActiveRecord::Base.connection.create_table :cursos do |t|
  t.string :nome
  t.timestamps null: false
end

ActiveRecord::Base.connection.create_table :inscricoes do |t|
  t.references :pessoa
  t.references :curso
  t.timestamps null: false
end
