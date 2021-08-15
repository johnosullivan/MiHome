defmodule ServerElixir.CoreEndpoint do
  use Phoenix.Endpoint, otp_app: :server_elixir

  plug(Plug.RequestId)

  plug(Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Phoenix.json_library()
  )

  plug(Plug.Session,
    store: :cookie,
    key: "_mihome_ex_api",
    signing_salt: "8ixXSdpw",
    key_length: 64,
    log: :debug
  )

  plug(Plug.MethodOverride)
  plug(Plug.Head)

  # plug into the core router
  plug(ServerElixir.CoreRouter)
end
