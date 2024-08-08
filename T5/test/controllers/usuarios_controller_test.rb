require 'test_helper'

class UsuariosControllerTest < ActionController::TestCase
  test "should get login" do
    get :login
    assert_response :success
    assert_not_nil assigns(:usuario)
  end
end
