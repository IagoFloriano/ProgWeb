require './classes.rb'

ActiveRecord::Base.establish_connection :adapter => 'sqlite3',
  :database => 'tabelas.sqlite3'

comando = ARGV.shift
nome_tabela = ARGV.shift
atributos = ARGV

tabela = {}

if nome_tabela.nil? then
  STDERR.puts "Nome da tabela não especificado"
  return
end

begin
  tabela = nome_tabela.capitalize.constantize
rescue NameError
  STDERR.puts "Tabela '#{nome_tabela.capitalize}' não encontrada"
  return
end

def trata_comando (comando, tabela, atributos)
  case comando.downcase
  when "inclusao"
    inclusao tabela, atributos
    puts "Incluído com sucesso"
  when "alteracao"
    r = alteracao tabela, atributos
    if r.nil? then
      return
    end
    puts "Alterado com sucesso"
  when "exclusao"
    r = exclusao tabela, atributos
    if r.nil? then
      return
    end
    puts "Excluido com sucesso"
  when "lista"
    lista tabela
  else
    STDERR.puts "Comando '#{comando}' inválido"
  end
end

def inclusao (tabela, atributos)
  novo = tabela.new
  atributos.each do |a|
    atr, vlr = a.split("=")
    novo[atr] = vlr
  end
  novo.save
end

def alteracao (tabela, atributos)
  id = atributos.shift.split("=").last
  registro = tabela.find_by(id: id)
  if registro.nil?
    STDERR.puts "Registro não encontrado"
    return
  end
  atributos.each do |a|
    chv, vlr = a.split("=")
    registro[chv] = vlr
  end
  registro.save
  return registro
end

def exclusao (tabela, atributos)
  id = atributos.shift.split("=").last
  registro = tabela.find_by(id: id)
  if registro.nil?
    STDERR.puts "Registro não encontrado!"
    return
  end
  registro.destroy
  return registro
end

def lista (tabela)
  registros = tabela.all
  registros.each do |r|
    r.imprime
  end
end

trata_comando comando, tabela, atributos
