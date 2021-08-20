defmodule ServerElixir.Controllers.Authentication do
  use ServerElixir, :controller

  alias ServerElixir.Authentication

  def create(conn, %{"email" => email, "password" => password}) do
    case Authentication.authenticate_user(email, password) do
      {:ok, user} ->
        if user.is_active do
          if user.two_factor do
            {:ok, token, _} =
              ServerElixir.Guardian.encode_and_sign(user, %{typ: "totp"}, ttl: {2, :minute})

            conn
            |> put_status(:ok)
            |> put_view(ServerElixir.UserView)
            |> render("sign_in_user_totp.json", token: token)
          else
            {:ok, token, _} = ServerElixir.Guardian.encode_and_sign(user, %{}, ttl: {7, :day})

            conn
            |> fetch_session
            |> put_session(:current_user_id, user.id)
            |> put_status(:ok)
            |> put_view(ServerElixir.UserView)
            |> render("sign_in_user.json", user: user, token: token)
          end
        else
          conn
          |> put_status(:unauthorized)
          |> put_view(ServerElixir.ErrorView)
          |> render("error.json", reason: "account is deactivated: #{user.email}")
        end

      {:error, message} ->
        conn
        |> put_status(:unauthorized)
        |> put_view(ServerElixir.ErrorView)
        |> render("error.json", reason: message)
    end
  end

  def index(conn, _params) do
    user = ServerElixir.Guardian.Plug.current_resource(conn)

    conn
    |> put_status(:ok)
    |> put_view(ServerElixir.UserView)
    |> render("ping_auth_user.json", user: user)
  end
end
