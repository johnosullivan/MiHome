defmodule ServerElixir.UserView do
  use ServerElixir, :view

  def render("sign_in_user.json", %{user: user, token: token}) do
    %{
      data: %{
        user: %{
          uuid: user.uuid,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name
        },
        token: token
      }
    }
  end

  def render("ping_auth_user.json", %{user: user}) do
    %{
      data: %{
        user: %{
          uuid: user.uuid,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name
        }
      }
    }
  end
end
