defmodule ServerElixir.Controllers.Authentication do
  use ServerElixir, :controller

  def sign_in(conn, %{"email" => email, "password" => password}) do
    case ServerElixir.Authentication.authenticate_user(email, password) do
      {:ok, user} ->
        {:ok, token, _} = ServerElixir.Guardian.encode_and_sign(user, %{}, ttl: {7, :day})

        conn
        |> fetch_session
        |> put_session(:current_user_id, user.uuid)
        |> put_status(:ok)
        |> put_view(ServerElixir.UserView)
        |> render("sign_in_user.json", user: user, token: token)

      {:error, message} ->
        conn
        |> put_status(:unauthorized)
        |> put_view(ServerElixir.ErrorView)
        |> render("unauthorized.json", reason: message)
    end
  end

  def auth_ping(conn, _params) do
    resource = ServerElixir.Guardian.Plug.current_resource(conn)

    conn
    |> put_status(:ok)
    |> put_view(ServerElixir.UserView)
    |> render("ping_auth_user.json", user: resource)
  end
end
