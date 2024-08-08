Rails.application.routes.draw do
  root 'usuarios#login'

  # Rotas para registros
  resources :registros

  # Rotas para usuários
  resources :usuarios do
    post 'login_submit', on: :collection
  end

  match '/login', to: 'usuarios#login_submit', via: [:post, :get], as: 'login'

  # Rotas para relações
  resources :relacoes, only: [:create, :destroy]
end
