defmodule ServerElixir.Controllers.Authentication do
  use ServerElixir, :controller

  alias ServerElixir.Schema.User

  def sign_in(conn, %{"email" => email, "password" => password}) do
    send_resp(conn, :ok, Poison.encode!(%ServerElixir.SystemPingResponse{status: true}))
  end

end
