require 'test_helper'

class RegistroTest < ActiveSupport::TestCase
  test "should not save registro without a nome" do
    registro = Registro.new
    assert_not registro.save, "Saved the registro without a nome"
  end

  test "should associate registro with usuario" do
    usuario = Usuario.create(email: "test@example.com", password: "password")
    registro = Registro.new(nome: "Test Registro")
    registro.save
  
    usuario.registros << registro
    usuario.reload
  
    assert_includes usuario.registros, registro
    assert_includes registro.usuarios, usuario
  end
end
