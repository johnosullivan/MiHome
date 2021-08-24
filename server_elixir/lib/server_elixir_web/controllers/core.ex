defmodule ServerElixirWeb.Controllers.System do
  use ServerElixirWeb, :controller
  use ServerElixirWeb, :json

  def index(conn, _params) do
    send_resp(conn, :ok, Poison.encode!(%ServerElixirWeb.SystemPingResponse{status: true}))
  end
end
