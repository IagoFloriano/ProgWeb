class Usuario < ApplicationRecord
  has_many :relacoes, foreign_key: 'usuario_id', class_name: 'Relacao'
  has_many :registros, through: :relacoes

  # Add admin column
  attribute :admin, :boolean, default: false

  # Include email and password fields
  attribute :email, :string
  attribute :password, :string
end
