require 'test_helper'

class RegistrosControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:registros)
  end

  test "should get new" do
    get :new
    assert_response :success
    assert_not_nil assigns(:registro)
  end

  test "should create registro" do
    assert_difference('Registro.count') do
      post :create, params: { registro: { nome: "Test Registro" } }
    end

    assert_redirected_to registro_path(assigns(:registro))
  end

  test "should get edit" do
    registro = registros(:one)
    get :edit, params: { id: registro.id }
    assert_response :success
    assert_equal registro, assigns(:registro)
  end

  test "should show registro" do
    registro = registros(:one)
    get :show, params: { id: registro.id }
    assert_response :success
    assert_equal registro, assigns(:registro)
  end

  test "should update registro" do
    registro = registros(:one)
    patch :update, params: { id: registro.id, registro: { nome: "Updated Registro" } }
    assert_redirected_to registro_path(assigns(:registro))
    assert_equal "Updated Registro", assigns(:registro).nome
  end

  test "should destroy registro" do
    registro = registros(:one)
    assert_difference('Registro.count', -1) do
      delete :destroy, params: { id: registro.id }
    end

    assert_redirected_to registros_path
  end
end
