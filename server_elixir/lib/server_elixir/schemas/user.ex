defmodule ServerElixir.Schema.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field(:email, :string)
    field(:is_active, :boolean, default: false)
    field(:password, :string, virtual: true)
    field(:password_hash, :string)
    field(:uuid, :string)
    field(:first_name, :string)
    field(:last_name, :string)
    field(:two_factor_auth, :string)
    field(:status, :integer)
    timestamps()
  end

  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :is_active, :password, :uuid, :first_name, :last_name])
    |> validate_required([:email, :is_active, :password])
    |> unique_constraint(:email)
    |> put_password_hash()
  end

  defp put_password_hash(%Ecto.Changeset{
    valid?: true, changes: %{password: password}
  } = changeset) do
    change(changeset, password_hash: Bcrypt.hash_pwd_salt(password))
  end

  defp put_password_hash(changeset) do
    changeset
  end
end
