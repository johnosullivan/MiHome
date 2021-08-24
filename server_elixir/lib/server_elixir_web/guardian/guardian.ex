defmodule ServerElixirWeb.Guardian do
  use Guardian, otp_app: :server_elixir

  alias ServerElixir.Repo
  alias ServerElixir.Schema.User

  def subject_for_token(resource, _claims) do
    sub = to_string(resource.id)
    {:ok, sub}
  end

  def resource_from_claims(claims) do
    id = claims["sub"]
    user = Repo.get!(User, id)
    {:ok, user}
  end
end
