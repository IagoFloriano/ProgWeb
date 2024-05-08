$:.push './'
require 'pessoa.rb'
require 'estado.rb'

lista_pessoas = Pessoa.all()

lista_pessoas.each do |p|
  puts "#{p.nome} #{p.sobrenome} mora em #{p.endereco} #{p.estado.sigla}"
end
