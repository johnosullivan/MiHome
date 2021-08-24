defmodule ServerElixirWeb.GuardianSerializer do
  alias ServerElixir.Schema.User

  def for_token(user = %User{}), do: {:ok, "User:#{user.id}"}
  def for_token(_), do: {:error, "unknown resource type"}
  def from_token(_), do: {:error, "unknown resource type"}
end
