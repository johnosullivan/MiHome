defmodule ServerElixir.SystemController do
  use ServerElixir, :controller
  use ServerElixir, :json

  def index(conn, _params) do
    send_resp(conn, :ok, Poison.encode!(%ServerElixir.SystemPingResponse{status: true}))
  end
end
