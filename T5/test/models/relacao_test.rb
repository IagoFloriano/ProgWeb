require 'test_helper'

class RelacaoTest < ActiveSupport::TestCase
  test "should associate relacao with registro and usuario" do
    registro = Registro.create(nome: "Test Registro")
    usuario = Usuario.create(email: "test@example.com", password: "password")
    relacao = Relacao.new(registro: registro, usuario: usuario)
    relacao.save

    assert_equal registro, relacao.registro
    assert_equal usuario, relacao.usuario
  end
end
