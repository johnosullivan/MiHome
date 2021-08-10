defmodule ServerElixirSystem do
  import Phoenix.ConnTest

  use ExUnit.Case
  doctest ServerElixir

  @endpoint ServerElixir.CoreEndpoint

  # runs simple GET /api/v1 ping to confirm system is online.
  test "GET /api/v1 - Ping SystemController" do
    conn = get(build_conn(), "/api/v1")
    response = Poison.decode!(conn.resp_body, as: %ServerElixir.SystemPingResponse{})
    assert response.status == true
  end
end
