defmodule ServerElixirWeb.GuardianErrorHandler do
  @behaviour Guardian.Plug.ErrorHandler
  import Plug.Conn

  @impl Guardian.Plug.ErrorHandler
  def auth_error(conn, {_type, reason}, _opts) do
    conn
    |> put_req_header("content-type", "application/json")
    |> send_resp(:unauthorized, Poison.encode!(%{reason: reason}, pretty: true))
  end
end
