class Registro < ApplicationRecord
  has_many :relacoes, foreign_key: 'registro_id', class_name: 'Relacao'
  has_many :usuarios, through: :relacoes

  validates :nome, presence: true
end
