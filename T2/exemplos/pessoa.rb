require 'active_record'

ActiveRecord::Base.establish_connection :adapter => "sqlite3",
  :database => "Tabelas.sqlite3"

class Pessoa < ActiveRecord::Base;
  # attr_accessible :sobrenome :nome :endereco :estado
  belongs_to :estado
  has_one :documento
end
