defmodule ServerElixir.Authentication do
  @moduledoc """
  The Authentication Context.
  """

  import Ecto.Query, warn: false
  alias ServerElixir.Repo

  alias ServerElixir.Schema.User

  def authenticate_user(email, password) do
    query = from(u in User, where: u.email == ^email)
    query |> Repo.one() |> verify_password(password)
  end

  defp verify_password(nil, _) do
    Bcrypt.no_user_verify()
    {:error, "wrong email or password"}
  end

  defp verify_password(user, password) do
    if Bcrypt.verify_pass(password, user.password_hash) do
      {:ok, user}
    else
      {:error, "wrong email or password"}
    end
  end

  def list_users do
    Repo.all(User)
  end

  def get_user!(id), do: Repo.get!(User, id)

  # ServerElixir.Authentication.create_user(%{email: "john@mihome.io", password: "test_password", first_name: "John", last_name: "O'Sullivan", uuid: UUID.uuid4() })
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end
end
