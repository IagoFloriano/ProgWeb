require 'test_helper'

class UsuarioTest < ActiveSupport::TestCase
  test "should have default admin value as false" do
    usuario = Usuario.new
    assert_equal false, usuario.admin
  end

  test "should create usuario with email and password" do
    usuario = Usuario.new(email: "test@example.com", password: "password")
    assert usuario.save
  end

  test "should associate usuario with registro" do
    registro = Registro.create(nome: "Test Registro")
    usuario = Usuario.new(email: "test@example.com", password: "password")
    usuario.save

    usuario.registros << registro
    usuario.reload

    assert_includes registro.usuarios, usuario
    assert_includes usuario.registros, registro
  end
end
