defmodule ServerElixirWeb.PageController do
  use ServerElixirWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
