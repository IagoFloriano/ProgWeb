$:.push './'
require 'estado.rb'

ests = Estado.all()

ests.each do |est|
  puts "#{est.sigla}\t#{est.nome}"
end
