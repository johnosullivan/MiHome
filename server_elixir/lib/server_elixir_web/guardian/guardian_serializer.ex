defmodule ServerElixir.GuardianSerializer do
  @behaviour Guardian.Serializer

  alias ServerElixir.Schema.User

  def for_token(user = %User{}), do: {:ok, "User:#{user.uuid}"}
  def for_token(_), do: {:error, "unknown resource type"}
  def from_token(_), do: {:error, "unknown resource type"}
end
