defmodule ServerElixir.Repo.Migrations.CreateDevices do
  use Ecto.Migration

  def change do
    create table(:devices) do
      add :device_name, :string
      add :mac_address, :string
      add :is_active, :boolean, default: false, null: false
      add :uuid, :string
      timestamps()
    end

    create unique_index(:devices, [:mac_address])
  end
end
