defmodule ServerElixirWeb.UserView do
  use ServerElixirWeb, :view

  def render("sign_in_user.json", %{user: user, token: token}) do
    %{
      data: %{
        user: %{
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name
        },
        token: token
      }
    }
  end

  def render("sign_in_user_totp.json", %{token: token}) do
    %{
      data: %{
        token: token
      }
    }
  end

  def render("message.json", %{message: message}) do
    %{
      data: %{
        message: message
      }
    }
  end

  def render("qr.html", %{uri: uri}) do
    uri |> EQRCode.encode() |> EQRCode.svg(width: 250)
  end

  def render("ping_auth_user.json", %{user: user}) do
    %{
      data: %{
        user: %{
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name
        }
      }
    }
  end
end
