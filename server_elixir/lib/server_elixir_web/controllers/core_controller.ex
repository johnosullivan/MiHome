defmodule ServerElixir.SystemController do
  use ServerElixir, :controller
  use ServerElixir, :json

  def index(conn, _params) do
    # send_resp(conn, :ok, "pong")
    pretty_json conn, 200, %{status: true}
  end
end
