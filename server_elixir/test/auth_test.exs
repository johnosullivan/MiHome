defmodule ServerElixirAuth do
  import Phoenix.ConnTest

  use ExUnit.Case
  doctest ServerElixir

  @endpoint ServerElixir.CoreEndpoint

  test "POST /api/v1/authentication - Sign In Authentication" do
    conn =
      post(build_conn(), "/api/v1/authentication",
        email: "john@mihome.io",
        password: "test_password"
      )

    # confirm the login was good
    assert conn.status == 200
    # decode the body to comfirm auth ping
    body = Poison.decode!(conn.resp_body)
    # ping the auth endpoints with bearer header
    conn_with_api_header =
      build_conn()
      |> Plug.Conn.put_req_header("authorization", "#{"Bearer"} #{body["data"]["token"]}")

    conn = get(conn_with_api_header, "/api/v1/ping")
    # confirm that the ping was successfukl
    assert conn.status == 200
    # confirm user details match up
    assert body["data"]["user"]["first_name"] == "John"
    assert body["data"]["user"]["last_name"] == "Doe"
    assert body["data"]["user"]["email"] == "john@mihome.io"
  end
end
