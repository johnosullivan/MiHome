defmodule ServerElixir.Auth.Device do
  use Ecto.Schema
  import Ecto.Changeset

  schema "devices" do
    field(:device_name, :string)
    field(:mac_address, :string)
    field(:is_active, :boolean, default: true)
    field(:uuid, :string)
    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:device_name, :mac_address])
    |> validate_required([:mac_address])
    |> unique_constraint(:mac_address)
  end

end