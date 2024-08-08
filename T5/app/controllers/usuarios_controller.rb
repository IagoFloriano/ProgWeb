class UsuariosController < ApplicationController
  def login
    @usuario = Usuario.new
  end

  def login_submit
    @usuario = Usuario.find_by(email: params[:usuario][:email])

    if @usuario # Skip safe-authentication (this is a college's project)
      # Authentication successful
      session[:usuario_id] = @usuario.id
      session[:admin] = @usuario.admin
      redirect_to registros_path
    else
      # Authentication failed
      flash.now[:alert] = 'Invalid email or password'
      render :login
    end
  end
end
