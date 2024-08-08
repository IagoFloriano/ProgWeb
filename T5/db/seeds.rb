# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Create Admin user
admin_user = Usuario.create(
  email: 'admin@example.com',
  password: 'admin123',
  admin: true
)
puts "Admin user created: #{admin_user.email}"

# Create Non-Admin user
non_admin_user = Usuario.create(
  email: 'user@example.com',
  password: 'user123',
  admin: false
)
puts "Non-Admin user created: #{non_admin_user.email}"

# Create a couple of registers
registros_data = [
  { nome: 'Fulano' },
  { nome: 'Siclano' },
  { nome: 'Beltrano' }
]

registros_data.each do |registro_data|
  Registro.create(registro_data)
end
