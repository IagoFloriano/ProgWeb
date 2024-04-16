$:.push './'
require 'estado.rb'

est = Estado.new()
est.nome = "Acre"
est.sigla = "AC"
est.save

est = Estado.new({:nome => "Alagoas", :sigla => "AL"})
est.save

lista_estados = [
  {:nome => "Bahia", :sigla => "BA"},
  {:nome => "Ceará", :sigla => "CE"},
  {:nome => "Sergipe", :sigla => "SE"},
  {:nome => "Tocantins", :sigla => "TO"},
]

lista_estados.each do |e|
  est = Estado.new()
  est.nome = e[:nome]
  est.sigla = e[:sigla]
  est.save
end
