class Relacao < ApplicationRecord
  belongs_to :registro
  belongs_to :usuario
end
