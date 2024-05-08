require 'active_record'

class Pessoa < ActiveRecord::Base
  has_many :telefones, dependent: :destroy
  has_many :inscricoes, dependent: :destroy, class_name: 'Inscricao'
  has_many :cursos, through: :inscricoes
  def imprime
    puts "#{self.id} | #{self.nome} #{self.sobrenome} | #{self.endereco}, #{self.cidade}"
  end
end

class Telefone < ActiveRecord::Base
  belongs_to :pessoa
  def imprime
    puts "#{self.id} | #{self.pessoa.nome} #{self.pessoa.sobrenome} | #{self.numero}"
  end
end

class Curso < ActiveRecord::Base
  has_many :inscricoes, dependent: :destroy, class_name: 'Inscricao'
  has_many :pessoas, through: :inscricoes
  def imprime
    puts "#{self.id} | #{self.nome}"
  end
end

class Inscricao < ActiveRecord::Base
  self.table_name = 'inscricoes'
  belongs_to :pessoa
  belongs_to :curso
  def imprime
    puts "#{self.id} | #{self.pessoa.nome} #{self.pessoa.sobrenome} | #{self.curso.nome}"
  end
end
