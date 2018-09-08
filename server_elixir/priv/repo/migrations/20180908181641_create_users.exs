defmodule ServerElixir.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add(:email, :string, null: false)
      add(:password_hash, :string)
      add(:is_active, :boolean, default: false, null: false)
      add(:uuid, :string)
      add(:first_name, :string)
      add(:last_name, :string)
      add(:two_factor_auth, :string)
      timestamps()
    end

    create unique_index(:users, [:email])
  end
end
