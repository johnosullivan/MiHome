defmodule ServerElixir.CoreRouter do
  use ServerElixir, :router

  pipeline :api do
    plug(:accepts, ["json"])
  end

  pipeline :api_auth do
    plug(:ensure_authenticated)
  end

  pipeline :bearer_auth do
    plug(Guardian.Plug.Pipeline,
      module: ServerElixir.Guardian,
      error_handler: ServerElixir.GuardianErrorHandler
    )

    plug(Guardian.Plug.VerifySession)
    plug(Guardian.Plug.VerifyHeader, realm: "Bearer")
    plug(Guardian.Plug.LoadResource)
  end

  pipeline :ensure_authed_access do
    plug(Guardian.Plug.EnsureAuthenticated, claims: %{"typ" => "access"})
  end

  defp ensure_authenticated(conn, _opts) do
    current_user_id = get_session(conn, :current_user_id)

    IO.puts("current_user_id")
    IO.puts(current_user_id)

    if current_user_id do
      conn
    else
      conn
      |> put_status(:unauthorized)
      |> render(ServerElixir.ErrorView, "unauthorized.json", message: "unauthenticated user")
      |> halt()
    end
  end

  scope "/api/v1", ServerElixir do
    pipe_through(:api)

    get("/", Controllers.System, :index)

    post("/authentication", Controllers.Authentication, :sign_in)
  end

  scope "/api/v1", ServerElixir do
    pipe_through([:api, :bearer_auth, :ensure_authed_access])

    get("/ping", Controllers.Authentication, :auth_ping)
  end
end
