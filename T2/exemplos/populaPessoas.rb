$:.push './'
require 'pessoa.rb'
require 'estado.rb'

est = Estado.find_by_sigla("TO")
lista_pessoa = [
  {:sobrenome => "Sobrenome", :nome => "Nome", :endereco => "Endereco", :estado_id => est.id},
  {:sobrenome => "Floriano", :nome => "Iago", :endereco => "Rua", :estado_id => est.id},
  {:sobrenome => "Xumt", :nome => "xumt", :endereco => "Bairro", :estado_id => est.id},
  {:sobrenome => "Vitu", :nome => "vitu", :endereco => "Estado", :estado_id => est.id},
  {:sobrenome => "Cringel", :nome => "togo", :endereco => "Pais", :estado_id => est.id},
]

lista_pessoa.each do |p|
  pes = Pessoa.new()
  pes.sobrenome = p[:sobrenome]
  pes.nome = p[:nome]
  pes.endereco = p[:endereco]
  pes.estado_id = p[:estado_id]
  pes.save
end
