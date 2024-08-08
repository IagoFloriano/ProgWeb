class RegistrosController < ApplicationController
  def index
    @registros = Registro.all
  end

  def new
    @registro = Registro.new
  end

  def create
    @registro = Registro.new(registro_params)
    if @registro.save
      redirect_to @registro, notice: 'Registro criado com sucesso.'
    else
      render :new
    end
  end

  def edit
    @registro = Registro.find(params[:id])
  end

  def show
    @registro = Registro.find(params[:id])
  end

  def update
    @registro = Registro.find(params[:id])
    if @registro.update(registro_params)
      redirect_to @registro, notice: 'Registro atualizado com sucesso.'
    else
      render :edit
    end
  end

  def destroy
    @registro = Registro.find(params[:id])
    @registro.destroy
    redirect_to registros_path, notice: 'Registro excluído com sucesso.'
  end

  private

  def registro_params
    params.require(:registro).permit(:nome)
  end
end

