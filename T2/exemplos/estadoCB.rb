require 'active_record'

ActiveRecord::Base.establish_connection :adapter => "sqlite3",
  :database => "Tabelas.sqlite3"

class Estado < ActiveRecord::Base;
  before_save :antes_do_save
  after_find :apos_o_find

  private
  def antes_do_save
    puts "ANTES DO SAVE"
  end
  def apos_o_find
    puts "DEPOIS DO FIND #{sigla} #{nome}"
  end
end

est = Estado.new()
est.nome = "x"
est.sigla = "1"

est = Estado.all
est.each do |e|
  puts "#{e.sigla} #{e.nome}"
end
