defmodule ServerElixirWeb.Endpoint do
  use Plug.Router

  # This module is a Plug, that also implements it's own plug pipeline, below:

  # Using Plug.Logger for logging request information
  plug(Plug.Logger)
  # responsible for matching routes
  plug(:match)
  # Using Poison for JSON decoding
  # Note, order of plugs is important, by placing this _after_ the 'match' plug,
  # we will only parse the request AFTER there is a route match.
  plug(Plug.Parsers, parsers: [:json], json_decoder: Poison)
  # responsible for dispatching responses
  plug(:dispatch)

  # A simple route to test that the server is up
  # Note, all routes must return a connection as per the Plug spec.
  get "/ping" do
    send_resp(conn, 200, "pong!")
  end

  # use Phoenix.Endpoint, otp_app: :server_elixir

  """
    socket("/socket", ServerElixirWeb.UserSocket)
  """

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phoenix.digest
  # when deploying your static files in production.
  """
    plug(Plug.Static,
      at: "/",
      from: :server_elixir,
      gzip: false,
      only: ~w(css fonts images js favicon.ico robots.txt)
    )
  """

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  """
    if code_reloading? do
      socket("/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket)
      plug(Phoenix.LiveReloader)
      plug(Phoenix.CodeReloader)
    end

    plug(Plug.Logger)

    plug(Plug.Parsers,
      parsers: [:urlencoded, :multipart, :json],
      pass: ["*/*"],
      json_decoder: Poison
    )

    plug(Plug.MethodOverride)
    plug(Plug.Head)
  """

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  """
  plug(Plug.Session,
    store: :cookie,
    key: "_server_elixir_key",
    signing_salt: "TxWBClmM"
  )

  plug(ServerElixirWeb.Router)
  """

  @doc """
  Callback invoked for dynamically configuring the endpoint.

  It receives the endpoint configuration and checks if
  configuration should be loaded from the system environment.
  """
  def init(_key, config) do
    if config[:load_from_system_env] do
      port = System.get_env("PORT") || raise "expected the PORT environment variable to be set"
      {:ok, Keyword.put(config, :http, [:inet6, port: port])}
    else
      {:ok, config}
    end
  end
end
