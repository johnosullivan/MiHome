defmodule ServerElixirWeb.Router do
  use ServerElixirWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    # plug(:fetch_session)
  end

  pipeline :api_auth do
    # plug(:ensure_authenticated)
  end

  pipeline :bearer_auth do
    plug Guardian.Plug.Pipeline, module: ServerElixirWeb.Guardian, error_handler: ServerElixirWeb.GuardianErrorHandler


    plug(Guardian.Plug.VerifySession)
    plug(Guardian.Plug.VerifyHeader, realm: "Bearer")
    plug(Guardian.Plug.LoadResource)
  end

  pipeline :ensure_authed_access do
    plug Guardian.Plug.EnsureAuthenticated, claims: %{"typ" => "access"}
  end

  scope "/", ServerElixirWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  pipeline :api_auth do
    plug(:ensure_authenticated)
  end

  scope "/api", ServerElixirWeb do
    pipe_through(:api)
    post("/users/sign_in", UserController, :sign_in)
    post("/readings", UserController, :readings)
  end

  scope "/api", ServerElixirWeb do
    pipe_through([:api, :bearer_auth, :ensure_authed_access])
    resources("/users", UserController, except: [:new, :edit])
  end

  # Plug function
  defp ensure_authenticated(conn, _opts) do
    current_user_id = get_session(conn, :current_user_id)

    IO.puts current_user_id

    if current_user_id do
      conn
    else
      conn
      |> put_status(:unauthorized)
      |> render(ServerElixirWeb.ErrorView, "401.json", message: "Unauthenticated User")
      |> halt()
    end
  end

  # Other scopes may use custom stacks.
  # scope "/api", ServerElixirWeb do
  #   pipe_through :api
  # end
end
