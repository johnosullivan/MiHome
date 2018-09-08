defmodule ServerElixirWeb.UserView do
  use ServerElixirWeb, :view
  alias ServerElixirWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{
      uuid: user.uuid,
      email: user.email,
      is_active: user.is_active,
      first_name: user.first_name,
      last_name: user.last_name
    }
  end

  def render("version.json", %{version: version}) do
    %{version: version}
  end

  def render("sign_in.json", %{user: user}) do
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