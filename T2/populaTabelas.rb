require './classes.rb'

ActiveRecord::Base.establish_connection :adapter => 'sqlite3',
  :database => 'tabelas.sqlite3'

pessoas = [
  Pessoa.create(nome: 'Alex', sobrenome: 'Smith', endereco: '123 Main St', cidade: 'Anytown'),
  Pessoa.create(nome: 'Bianca', sobrenome: 'Smith', endereco: '123 Main St', cidade: 'Anytown'),
  Pessoa.create(nome: 'Johnatan', sobrenome: 'Jones', endereco: '127 Side St', cidade: 'Nowhereland'),
  Pessoa.create(nome: 'Stephanie', sobrenome: 'Jones', endereco: '127 Side St', cidade: 'Nowhereland'),
];

telefones = [
  Telefone.create(numero: '1234-5678', pessoa: pessoas[0]),
  Telefone.create(numero: '1234-5678', pessoa: pessoas[1]),
  Telefone.create(numero: '555-1234', pessoa: pessoas[2]),
  Telefone.create(numero: '555-1234', pessoa: pessoas[3]),
];

cursos = [Curso.create(nome: 'BCC'), Curso.create(nome: 'IBM'), Curso.create(nome: 'MED')];

inscricoes = [
  Inscricao.create(pessoa: pessoas[0], curso: cursos[1]),
  Inscricao.create(pessoa: pessoas[1], curso: cursos[1]),
  Inscricao.create(pessoa: pessoas[2], curso: cursos[0]),
  Inscricao.create(pessoa: pessoas[3], curso: cursos[2]),
];
