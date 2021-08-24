defmodule ServerElixirWeb.CoreRouter do
  use ServerElixirWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
    plug(:fetch_session)
  end

  pipeline :api_cookie_auth do
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

  pipeline :ensure_authed_totp do
    plug(Guardian.Plug.EnsureAuthenticated, claims: %{"typ" => "totp"})
  end

  defp ensure_authenticated(conn, _opts) do
    current_user_id = get_session(conn, :current_user_id)

    if current_user_id do
      conn
    else
      conn
      |> put_status(:unauthorized)
      |> put_view(ServerElixir.ErrorView)
      |> render("error.json", reason: "unauthenticated user")
    end
  end

  scope "/api/v1", ServerElixir do
    pipe_through(:api)

    get("/", Controllers.System, :index)

    post("/authentication", Controllers.Authentication, :create)
  end

  scope "/api/v1", ServerElixir do
    pipe_through([:api, :bearer_auth, :ensure_authed_totp])

    patch("/authentication", Controllers.MultiFactorAuthentication, :confirm)
  end

  scope "/api/v1", ServerElixir do
    pipe_through([:api, :bearer_auth, :ensure_authed_access])

    get("/ping", Controllers.Authentication, :index)

    post("/totp", Controllers.MultiFactorAuthentication, :create)
    patch("/totp", Controllers.MultiFactorAuthentication, :update)
  end
end
