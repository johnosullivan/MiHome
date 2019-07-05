defmodule ServerElixirWeb.UserController do
  use ServerElixirWeb, :controller

  alias ServerElixir.Auth
  alias ServerElixir.Auth.User

  action_fallback ServerElixirWeb.FallbackController

  def version(conn, _params) do
    render(conn, "version.json", version: "v1.0")
  end

  def readings(conn, _params \\ %{}) do
    IO.puts(_params)
    render(conn, "version.json", version: "v1.0")
  end

  def index(conn, _params) do
    users = Auth.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Auth.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Auth.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Auth.get_user!(id)

    with {:ok, %User{} = user} <- Auth.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Auth.get_user!(id)
    with {:ok, %User{}} <- Auth.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end

  def sign_in(conn, %{"email" => email, "password" => password}) do
    case ServerElixir.Auth.authenticate_user(email, password) do
      {:ok, user} ->
        {:ok, token, _} = ServerElixirWeb.Guardian.encode_and_sign(user, %{}, ttl: {24, :hour})
        conn
        # |> put_session(:current_user_id, user.id)
        |> put_status(:ok)
        |> render(ServerElixirWeb.UserView, "sign_in.json", user: user, token: token)

      {:error, message} ->
        conn
        |> delete_session(:current_user_id)
        |> put_status(:unauthorized)
        |> render(ServerElixirWeb.ErrorView, "401.json", message: message)
    end
  end

end