defmodule ServerElixir.Controllers.MultiFactorAuthentication do
  use ServerElixir, :controller

  alias ServerElixir.Authentication

  def confirm(conn, %{"code" => code}) do
    user = ServerElixir.Guardian.Plug.current_resource(conn)

    if NimbleTOTP.valid?(user.two_factor_secret, code) do
      {:ok, token, _} = ServerElixir.Guardian.encode_and_sign(user, %{}, ttl: {7, :day})

      conn
      |> fetch_session
      |> put_session(:current_user_id, user.id)
      |> put_status(:ok)
      |> put_view(ServerElixir.UserView)
      |> render("sign_in_user.json", user: user, token: token)
    else
      conn
      |> put_status(:unauthorized)
      |> put_view(ServerElixir.ErrorView)
      |> render("error.json", reason: "invalid totp code")
    end
  end

  def update(conn, %{"code" => code}) do
    user = ServerElixir.Guardian.Plug.current_resource(conn)

    if NimbleTOTP.valid?(user.two_factor_secret, code) do
      case Authentication.update_user(user, %{two_factor: true}) do
        {:ok, _} ->
          conn
          |> put_status(:ok)
          |> put_view(ServerElixir.UserView)
          |> render("message.json", message: "totp set")

        {:error, _} ->
          conn
          |> put_status(:bad_request)
          |> put_view(ServerElixir.ErrorView)
          |> render("error.json", reason: "totp code not available")
      end
    else
      conn
      |> put_status(:unauthorized)
      |> put_view(ServerElixir.ErrorView)
      |> render("error.json", reason: "invalid totp code")
    end
  end

  def create(conn, _params) do
    user = ServerElixir.Guardian.Plug.current_resource(conn)

    case Authentication.update_user(user, %{
           two_factor_secret: NimbleTOTP.secret(),
           two_factor: false
         }) do
      {:ok, user} ->
        uri =
          NimbleTOTP.otpauth_uri(user.email, user.two_factor_secret,
            issuer: Application.get_env(:server_elixir, :totp_key_name)
          )

        conn
        |> put_status(:ok)
        |> put_resp_header("Content-Type", "text/html")
        |> put_root_layout(false)
        |> put_view(ServerElixir.UserView)
        |> render("qr.html", uri: uri, layout: false)

      {:error, _} ->
        conn
        |> put_status(:bad_request)
        |> put_view(ServerElixir.ErrorView)
        |> render("error.json", reason: "totp code not available")
    end
  end
end
