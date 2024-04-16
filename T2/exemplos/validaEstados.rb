require 'active_record'
class String
  def only_letters?
    !!match(/ˆ[[:alpha:]]+$/)
  end
end

ActiveRecord::Base.establish_connection :adapter => "sqlite3",
  :database => "Tabelas.sqlite3"

class Estado < ActiveRecord::Base;
  validate :sigla_tem_tamanho_dois, :sigla_somente_caracteres
  def sigla_tem_tamanho_dois
    if sigla.size != 2
      errors.add(:sigla, "Siga tem de ter tamanho dois")
    end
  end

  def sigla_somente_caracteres
    if !sigla.only_letters?
      errors.add(:sigla, "Sigla pode ter somente caracteres")
    end
  end
end

est = Estado.new ()
est.nome = "x"
est.sigla = "1"
if est.invalid?
  puts "Registro Invalido:"
  est.errors[:sigla].each do |s|
    puts " #{s}"
  end
end
