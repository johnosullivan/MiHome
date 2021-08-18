defmodule ServerElixir.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users, primary_key: false) do
      add :id, :uuid, primary_key: true, null: false
      add(:email, :string, null: false)
      add(:password_hash, :string, null: false)
      add(:is_active, :boolean, default: false, null: false)
      add(:first_name, :string, null: false)
      add(:last_name, :string, null: false)
      add(:two_factor_secret, :binary)
      add(:two_factor, :boolean, default: false, null: false)
      add(:status, :integer, default: 0, null: false)
      timestamps()
    end

    create unique_index(:users, [:email])
  end
end
